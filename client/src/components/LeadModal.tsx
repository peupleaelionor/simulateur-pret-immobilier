import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle, Shield, Users, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { formaterEuros } from "@shared/mortgage-calculator";

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
  } | null;
  onSuccess: () => void;
}

export default function LeadModal({
  open,
  onOpenChange,
  simulationData,
  onSuccess,
}: LeadModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [apport, setApport] = useState("");
  const [zone, setZone] = useState("");
  const [typeBien, setTypeBien] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; consent?: string }>({});
  const [submitted, setSubmitted] = useState(false);

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
    onSuccess: () => {
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
      setTimeout(() => {
        onSuccess();
      }, 2000);
    },
  });

  // Track event mutation
  const trackEvent = trpc.analytics.track.useMutation();

  // Validate email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate French phone number
  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\s/g, "");
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(cleaned);
  };

  // Format phone number as user types
  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4)}`;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    if (!validateEmail(email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }
    
    if (!validatePhone(phone)) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone français valide";
    }
    
    if (!consentement) {
      newErrors.consent = "Vous devez accepter les conditions pour continuer";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0 && simulationData) {
      createLead.mutate({
        email,
        phone: phone.replace(/\s/g, ""),
        montantEmprunte: simulationData.montantEmprunte,
        dureeAns: simulationData.dureeAns,
        revenusNets: simulationData.revenusNets,
        apport: simulationData.apport,
        mensualite: simulationData.mensualite,
        tauxUtilise: simulationData.tauxUtilise.toString(),
        consentementRgpd: true,
        apportPersonnel: apport ? parseInt(apport) : undefined,
        zoneGeographique: zone || undefined,
        typeBien: typeBien || undefined,
        ...utmParams,
      });
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPhone("");
      setApport("");
      setZone("");
      setTypeBien("");
      setConsentement(false);
      setErrors({});
      setSubmitted(false);
    }
  }, [open]);

  // Success state
  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Demande envoyée !</h3>
            <p className="text-muted-foreground">
              Nos partenaires vous contacteront dans les plus brefs délais avec leurs meilleures offres.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center font-bold">
            🌟 3 offres de nos partenaires vous attendent
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Recevez gratuitement des propositions personnalisées de courtiers experts
          </DialogDescription>
        </DialogHeader>

        {/* Trust signals in modal */}
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
            <p className="text-xs font-semibold">100% gratuit</p>
            <p className="text-xs text-muted-foreground">sans engagement</p>
          </div>
        </div>

        {/* Simulation summary */}
        {simulationData && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-1">Votre simulation</p>
            <p className="text-2xl font-bold text-primary">
              {formaterEuros(simulationData.montantEmprunte)}
            </p>
            <p className="text-sm text-muted-foreground">
              sur {simulationData.dureeAns} ans • {formaterEuros(simulationData.mensualite)}/mois
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="votre@email.fr"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(formatPhone(e.target.value));
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="06 12 34 56 78"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Apport field */}
          <div className="space-y-2">
            <Label htmlFor="apport">Apport personnel estimé (€)</Label>
            <Input
              id="apport"
              type="text"
              value={apport}
              onChange={(e) => setApport(e.target.value)}
              placeholder="Ex: 50000"
            />
            <p className="text-xs text-muted-foreground">Montant que vous pouvez investir personnellement</p>
          </div>

          {/* Zone field */}
          <div className="space-y-2">
            <Label htmlFor="zone">Zone géographique</Label>
            <select
              id="zone"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">Sélectionnez une région</option>
              <option value="ile-de-france">Île-de-France</option>
              <option value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</option>
              <option value="nouvelle-aquitaine">Nouvelle-Aquitaine</option>
              <option value="occitanie">Occitanie</option>
              <option value="provence-alpes-cote-azur">Provence-Alpes-Côte d'Azur</option>
              <option value="bretagne">Bretagne</option>
              <option value="bourgogne-franche-comte">Bourgogne-Franche-Comté</option>
              <option value="centre-val-de-loire">Centre-Val de Loire</option>
              <option value="corse">Corse</option>
              <option value="grand-est">Grand Est</option>
              <option value="hauts-de-france">Hauts-de-France</option>
              <option value="normandie">Normandie</option>
              <option value="pays-de-la-loire">Pays de la Loire</option>
            </select>
            <p className="text-xs text-muted-foreground">Pour affiner les offres selon les taux régionaux</p>
          </div>

          {/* Type de bien field */}
          <div className="space-y-2">
            <Label htmlFor="typeBien">Type de bien immobilier</Label>
            <select
              id="typeBien"
              value={typeBien}
              onChange={(e) => setTypeBien(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">Sélectionnez un type</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="terrain">Terrain</option>
              <option value="immeuble">Immeuble</option>
              <option value="autre">Autre</option>
            </select>
            <p className="text-xs text-muted-foreground">Cela aide nos partenaires à personnaliser les offres</p>
          </div>

          {/* RGPD consent */}
          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={consentement}
              onCheckedChange={(checked) => {
                setConsentement(checked === true);
                if (errors.consent) setErrors({ ...errors, consent: undefined });
              }}
              className={errors.consent ? "border-destructive" : ""}
            />
            <Label htmlFor="consent" className="text-sm leading-tight cursor-pointer">
              J'accepte d'être contacté par les partenaires et je reconnais avoir lu la{" "}
              <a href="/mentions-legales" className="text-primary hover:underline" target="_blank">
                politique de confidentialité
              </a>
            </Label>
          </div>
          {errors.consent && (
            <p className="text-sm text-destructive">{errors.consent}</p>
          )}

          {/* Submit button - MEGA CTA */}
          <Button
            type="submit"
            className="w-full btn-cta h-14 text-lg font-bold"
            disabled={createLead.isPending}
          >
            {createLead.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "✅ RECEVOIR MES 3 OFFRES GRATUITES"
            )}
          </Button>

          {/* Error message */}
          {createLead.isError && (
            <p className="text-sm text-destructive text-center">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </form>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-5 w-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground">100% gratuit</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="h-5 w-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground">+1 247 clients</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Clock className="h-5 w-5 text-accent mb-1" />
            <span className="text-xs text-muted-foreground">Réponse 24h</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
