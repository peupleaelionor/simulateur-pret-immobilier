import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle, Shield, Users, Clock, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { type ResultatSimulation } from "@shared/mortgage-calculator";
import { genererSynthesePDF } from "@/lib/pdf-generator";

interface LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simulationData: {
    montantEmprunte: number;
    dureeAns: number;
    revenusNets: number;
    apport: number;
    mensualite: number;
    tauxUtilise: number;
    result: ResultatSimulation;
  } | null;
  onSuccess?: () => void;
}

export default function LeadModal({ open, onOpenChange, simulationData, onSuccess }: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [apport, setApport] = useState("");
  const [zone, setZone] = useState("");
  const [typeBien, setTypeBien] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; consent?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Track event mutation
  const trackEvent = trpc.analytics.track.useMutation();

  // Get UTM params from URL
  const [utmParams] = useState(() => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmContent: params.get("utm_content") || undefined,
    };
  });

  // Create lead mutation
  const createLead = trpc.leads.create.useMutation({
    onSuccess: async () => {
      setSubmitted(true);
      // Track conversion event
      trackEvent.mutate({
        eventName: "lead_soumis",
        eventData: JSON.stringify({
          montant: simulationData?.montantEmprunte,
          duree: simulationData?.dureeAns,
        }),
        ...utmParams,
      });

      // Generate PDF automatically on success
      if (simulationData) {
        try {
          setIsGeneratingPdf(true);
          const pdfBlob = await genererSynthesePDF(simulationData.result, name);
          const url = URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `Synthese_Simvan_Immo_${name.replace(/\s+/g, "_")}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error("Erreur génération PDF:", err);
        } finally {
          setIsGeneratingPdf(false);
        }
      }

      setTimeout(() => {
        onSuccess?.();
      }, 3000);
    },
    onError: (error) => {
      console.error("Erreur lors de la création du lead:", error);
      alert("Une erreur est survenue lors de l'envoi de votre demande : " + error.message);
    }
  });

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate phone number (more flexible)
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length >= 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; phone?: string; consent?: string } = {};

    if (!validateEmail(email)) newErrors.email = "Email invalide";
    if (!validatePhone(phone)) newErrors.phone = "Numéro de téléphone invalide (10 chiffres min)";
    if (!consentement) newErrors.consent = "Vous devez accepter les conditions";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && simulationData) {
      createLead.mutate({
        email,
        phone,
        montantEmprunte: simulationData.montantEmprunte,
        dureeAns: simulationData.dureeAns,
        revenusNets: simulationData.revenusNets,
        apport: simulationData.apport,
        mensualite: simulationData.mensualite,
        tauxUtilise: simulationData.tauxUtilise.toFixed(3),
        consentementRgpd: true,
        apportPersonnel: apport ? parseInt(apport) : undefined,
        zoneGeographique: zone || undefined,
        typeBien: typeBien || undefined,
        ...utmParams,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Demande envoyée !</h3>
            <p className="text-muted-foreground">
              Merci {name}, votre synthèse PDF est en cours de téléchargement. Un expert va analyser votre dossier.
            </p>
            {isGeneratingPdf && (
              <div className="flex items-center gap-2 text-primary animate-pulse">
                <FileText className="h-5 w-5" />
                <span>Génération de votre dossier...</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl text-center font-bold">
                🌟 3 offres de nos partenaires vous attendent
              </DialogTitle>
              <DialogDescription className="text-center text-base">
                Recevez gratuitement des propositions personnalisées de courtiers experts
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-3 bg-accent/5 p-4 rounded-lg">
              <div className="text-center">
                <Users className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="text-xs font-semibold">1,247 clients</p>
                <p className="text-xs text-muted-foreground">ce mois</p>
              </div>
              <div className="text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold">Réponse 24h</p>
                <p className="text-xs text-muted-foreground">garantie</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 text-accent mx-auto mb-1" />
                <p className="text-xs font-semibold">100% Sécurisé</p>
                <p className="text-xs text-muted-foreground">RGPD</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel ou personnel</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@exemple.com"
                    className={errors.email ? "border-destructive" : ""}
                    required
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className={errors.phone ? "border-destructive" : ""}
                    required
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="consent"
                  checked={consentement}
                  onCheckedChange={(checked) => setConsentement(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent"
                    className="text-xs text-muted-foreground leading-snug"
                  >
                    J'accepte d'être recontacté par Simvan Immo et ses partenaires courtiers pour mon projet immobilier. 
                    Mes données sont traitées conformément à la <a href="/mentions-legales" className="text-primary underline">politique de confidentialité</a>.
                  </label>
                  {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-accent hover:bg-accent/90"
                disabled={createLead.isPending}
              >
                {createLead.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ENVOI EN COURS...
                  </>
                ) : (
                  "RECEVOIR MES OFFRES GRATUITES"
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground">
                Service 100% gratuit et sans engagement. Vos données ne sont jamais revendues à des tiers non autorisés.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
