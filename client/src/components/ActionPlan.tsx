import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, FileText, Calendar, ShieldCheck, AlertCircle } from "lucide-react";
import { type ResultatSimulation } from "@shared/mortgage-calculator";

interface ActionPlanProps {
  result: ResultatSimulation;
  onDownloadAttestation: () => void;
  onContactExpert: () => void;
}

export default function ActionPlan({ result, onDownloadAttestation, onContactExpert }: ActionPlanProps) {
  const isEligible = result.tauxEndettement <= 35;

  const steps = isEligible ? [
    {
      title: "Téléchargez votre attestation",
      description: "Obtenez votre attestation de faisabilité Simvan Immo pour rassurer les agents immobiliers.",
      icon: FileText,
      action: { label: "Télécharger", onClick: onDownloadAttestation }
    },
    {
      title: "Validez votre taux",
      description: "Prenez rendez-vous avec un courtier partenaire pour bloquer les conditions actuelles.",
      icon: Calendar,
      action: { label: "Prendre RDV", onClick: onContactExpert }
    },
    {
      title: "Lancez vos visites",
      description: "Avec votre budget validé, vous pouvez visiter sereinement les biens à Bordeaux.",
      icon: ShieldCheck,
    }
  ] : [
    {
      title: "Analysez vos blocages",
      description: "Votre taux d'endettement est de " + result.tauxEndettement.toFixed(1) + "%. Le seuil recommandé est de 35%.",
      icon: AlertCircle,
    },
    {
      title: "Optimisez votre apport",
      description: "Augmenter votre apport de 5 000€ permettrait de réduire vos mensualités significativement.",
      icon: ArrowRight,
      action: { label: "Refaire une simulation", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) }
    },
    {
      title: "Coaching Financement",
      description: "Échangez avec un expert pour assainir vos comptes et préparer votre dossier.",
      icon: Calendar,
      action: { label: "Contacter un expert", onClick: onContactExpert }
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-center mb-8">🚀 Votre Plan d'Action Personnalisé</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full border-t-4 ${isEligible ? "border-t-accent" : "border-t-amber-500"} shadow-lg hover:shadow-xl transition-shadow`}>
              <CardHeader className="pb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${isEligible ? "bg-accent/10 text-accent" : "bg-amber-100 text-amber-600"}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {step.action && (
                  <Button 
                    onClick={step.action.onClick}
                    variant={isEligible ? "default" : "outline"}
                    className={`w-full font-bold ${isEligible ? "bg-accent hover:bg-accent/90" : ""}`}
                  >
                    {step.action.label}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {isEligible && (
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 mt-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Conciergerie Simvan Immo
            </h3>
            <p className="text-muted-foreground">
              Nous avons sélectionné pour vous le courtier le plus performant à Bordeaux pour votre profil. 
              Bénéficiez d'un accompagnement VIP et de frais de dossier réduits.
            </p>
          </div>
          <Button onClick={onContactExpert} size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 text-lg">
            ACTIVER MA CONCIERGERIE
          </Button>
        </div>
      )}
    </div>
  );
}
