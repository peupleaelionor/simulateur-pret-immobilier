import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Home, Calculator, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const faqData = [
  {
    question: "Quelle est la différence entre un taux fixe et un taux variable ?",
    answer: `Un **taux fixe** reste identique pendant toute la durée du prêt. Vos mensualités sont constantes et prévisibles, ce qui facilite la gestion de votre budget. C'est l'option la plus populaire en France (plus de 95% des prêts).

Un **taux variable** (ou révisable) évolue en fonction d'un indice de référence (généralement l'Euribor). Vos mensualités peuvent augmenter ou diminuer. Ce type de prêt peut être intéressant si vous anticipez une baisse des taux, mais comporte un risque.

**Notre conseil** : En période de taux bas, privilégiez le taux fixe pour sécuriser votre emprunt.`,
  },
  {
    question: "Quel apport minimum faut-il pour obtenir un prêt immobilier ?",
    answer: `Techniquement, il est possible d'emprunter sans apport, mais c'est de plus en plus rare. Les banques demandent généralement :

- **Minimum recommandé** : 10% du prix du bien (pour couvrir les frais de notaire et de garantie)
- **Idéal** : 20% à 30% du prix du bien (meilleures conditions de taux)

Un apport plus important vous permet :
- D'obtenir un meilleur taux d'intérêt
- De réduire le montant emprunté et donc les intérêts
- De rassurer la banque sur votre capacité d'épargne

**Sans apport**, vous devrez démontrer une situation financière très stable (CDI, ancienneté, revenus élevés).`,
  },
  {
    question: "Comment est calculé le taux d'endettement ?",
    answer: `Le taux d'endettement mesure la part de vos revenus consacrée au remboursement de vos crédits. La formule est :

**Taux d'endettement = (Total des mensualités / Revenus nets) × 100**

Depuis janvier 2022, le HCSF (Haut Conseil de Stabilité Financière) impose un **maximum de 35%** d'endettement, assurance emprunteur incluse.

**Exemple** : Avec 3 500€ de revenus nets, votre mensualité maximale est de 1 225€ (3 500 × 0,35).

Les revenus pris en compte :
- Salaires nets (100%)
- Revenus locatifs (70% généralement)
- Pensions, allocations stables
- Revenus des indépendants (moyenne sur 3 ans)`,
  },
  {
    question: "Qu'est-ce que le reste à vivre et pourquoi est-il important ?",
    answer: `Le **reste à vivre** est la somme qui vous reste après paiement de toutes vos charges fixes (loyer/crédit, charges, impôts, etc.). C'est un critère essentiel pour les banques.

**Minimums généralement exigés** :
- Personne seule : 800€ à 1 000€
- Couple : 1 200€ à 1 500€
- Par enfant supplémentaire : +300€ à 400€

Même si votre taux d'endettement est inférieur à 35%, la banque peut refuser votre dossier si le reste à vivre est insuffisant.

**Notre simulateur** prend en compte ce critère pour vous donner une estimation réaliste de votre capacité d'emprunt.`,
  },
  {
    question: "Quelle durée de prêt choisir ?",
    answer: `La durée maximale autorisée est de **25 ans** (27 ans pour un achat dans le neuf avec différé).

**Avantages d'une durée courte (10-15 ans)** :
- Taux d'intérêt plus bas
- Coût total du crédit réduit
- Mensualités plus élevées

**Avantages d'une durée longue (20-25 ans)** :
- Mensualités plus faibles
- Capacité d'emprunt plus importante
- Coût total du crédit plus élevé

**Notre conseil** : Trouvez l'équilibre entre mensualité confortable et coût total raisonnable. Privilégiez une durée qui vous laisse une marge de manœuvre financière.`,
  },
  {
    question: "L'assurance emprunteur est-elle obligatoire ?",
    answer: `L'assurance emprunteur n'est pas légalement obligatoire, mais **aucune banque ne vous prêtera sans**. Elle protège la banque (et vous) en cas de :

- Décès
- Invalidité permanente (PTIA, IPT, IPP)
- Incapacité temporaire de travail (ITT)
- Perte d'emploi (optionnelle)

**Coût moyen** : 0,20% à 0,50% du capital emprunté par an.

**Bon à savoir** : Depuis la loi Lemoine (2022), vous pouvez changer d'assurance à tout moment sans frais. Comparez les offres pour économiser plusieurs milliers d'euros !`,
  },
  {
    question: "Quels sont les frais annexes à prévoir ?",
    answer: `En plus du prix du bien, prévoyez :

**Frais de notaire** :
- Ancien : 7% à 8% du prix
- Neuf : 2% à 3% du prix

**Frais bancaires** :
- Frais de dossier : 500€ à 1 500€
- Frais de garantie : 1% à 2% du montant emprunté

**Autres frais** :
- Frais d'agence (si applicable) : 3% à 8%
- Frais de déménagement
- Travaux éventuels

**Total à prévoir** : Environ 10% à 15% du prix du bien en frais annexes.`,
  },
  {
    question: "Puis-je emprunter si je suis en CDD ou intérimaire ?",
    answer: `C'est plus difficile mais pas impossible. Les banques privilégient les CDI, mais acceptent d'autres situations :

**CDD/Intérim** : Possible si vous justifiez de :
- 2 à 3 ans d'ancienneté dans le même secteur
- Des revenus réguliers et stables
- Un apport conséquent (20% minimum)

**Indépendants/Auto-entrepreneurs** :
- Minimum 2 à 3 ans d'activité
- Bilans comptables positifs
- Revenus moyennés sur 3 ans

**Fonctionnaires** : Profil très apprécié (emploi stable)

**Notre conseil** : Faites appel à un courtier qui connaît les banques les plus souples pour votre profil.`,
  },
  {
    question: "Comment améliorer mon dossier de prêt ?",
    answer: `Voici les points clés pour optimiser votre dossier :

**1. Stabilité professionnelle**
- CDI avec période d'essai validée
- Ancienneté dans l'entreprise

**2. Gestion financière saine**
- Pas de découvert bancaire
- Épargne régulière
- Pas de crédits à la consommation

**3. Apport personnel**
- Minimum 10%, idéalement 20%
- Montrez votre capacité d'épargne

**4. Taux d'endettement**
- Remboursez vos crédits en cours
- Évitez les nouveaux crédits avant votre demande

**5. Dossier complet**
- 3 derniers bulletins de salaire
- 3 derniers relevés de compte
- Avis d'imposition
- Justificatif d'apport`,
  },
  {
    question: "Qu'est-ce qu'un courtier et dois-je en utiliser un ?",
    answer: `Un **courtier en prêt immobilier** est un intermédiaire qui négocie votre crédit auprès de plusieurs banques pour obtenir les meilleures conditions.

**Avantages** :
- Accès à de nombreuses banques
- Négociation du taux et des conditions
- Gain de temps (un seul interlocuteur)
- Expertise du marché
- Souvent gratuit (rémunéré par la banque)

**Inconvénients** :
- Parfois des frais de courtage (1% max)
- Toutes les banques ne travaillent pas avec les courtiers

**Notre conseil** : Utilisez un courtier ET faites une demande directe à votre banque pour comparer. Notre simulateur vous met en relation avec des courtiers partenaires de confiance.`,
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Scroll to calculator on home page
  const scrollToCalculator = () => {
    window.location.href = "/#calculateur";
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="FAQ Prêt Immobilier - Questions Fréquentes | Simulateur"
        description="Réponses aux questions fréquentes sur le prêt immobilier : taux fixe vs variable, apport minimum, taux d'endettement, durée de prêt, assurance emprunteur."
        canonical="https://simulateur-pret-immobilier.fr/faq"
        type="faq"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg hidden sm:inline">Simvan Digital</span>
          </a>
          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </a>
            <Button onClick={scrollToCalculator} size="sm" className="bg-accent hover:bg-accent/90">
              Simuler
            </Button>
          </nav>
        </div>
      </header>

      <main className="container py-12 sm:py-16">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Questions fréquentes sur le prêt immobilier
          </h1>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir avant d'emprunter pour votre projet immobilier
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="space-y-4"
          >
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="finance-card px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div 
                    className="prose prose-sm max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ 
                      __html: item.answer
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                        .replace(/\n\n/g, '</p><p class="mt-3">')
                        .replace(/\n- /g, '</p><li class="ml-4">')
                        .replace(/^/, '<p>')
                        .replace(/$/, '</p>')
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <div className="finance-card p-8 bg-primary/5">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à calculer votre capacité d'emprunt ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Utilisez notre simulateur gratuit pour obtenir une estimation précise en quelques secondes.
            </p>
            <Button onClick={scrollToCalculator} size="lg" className="btn-cta">
              <Calculator className="mr-2 h-5 w-5" />
              SIMULER MON PRÊT
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 mt-12">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Accueil</a>
              <a href="/mentions-legales" className="hover:text-foreground">Mentions légales</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Simvan Digital
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
