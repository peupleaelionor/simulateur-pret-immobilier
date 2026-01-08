import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Home, Shield, Calculator, CheckCircle, X, ArrowRight } from "lucide-react";

const assuranceData = [
  {
    name: "Assurance groupe (banque)",
    tauxMoyen: "0.30% - 0.50%",
    avantages: ["Simplicité", "Inclus dans l'offre de prêt", "Pas de formalités médicales simplifiées"],
    inconvenients: ["Plus cher", "Moins personnalisé", "Garanties standards"],
    recommande: false,
  },
  {
    name: "Délégation d'assurance",
    tauxMoyen: "0.10% - 0.30%",
    avantages: ["Économies importantes", "Garanties sur mesure", "Meilleure couverture possible"],
    inconvenients: ["Démarches supplémentaires", "Questionnaire médical", "Délais de mise en place"],
    recommande: true,
  },
];

const garantiesData = [
  { garantie: "Décès", obligatoire: true, description: "Remboursement du capital restant dû en cas de décès" },
  { garantie: "PTIA", obligatoire: true, description: "Perte Totale et Irréversible d'Autonomie" },
  { garantie: "IPT", obligatoire: true, description: "Invalidité Permanente Totale (taux > 66%)" },
  { garantie: "IPP", obligatoire: false, description: "Invalidité Permanente Partielle (taux 33-66%)" },
  { garantie: "ITT", obligatoire: true, description: "Incapacité Temporaire de Travail" },
  { garantie: "Perte d'emploi", obligatoire: false, description: "Prise en charge des mensualités en cas de chômage" },
];

export default function ComparatifAssurances() {
  const scrollToCalculator = () => {
    window.location.href = "/#calculateur";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg hidden sm:inline">Simulateur Prêt Immobilier</span>
          </a>
          <nav className="flex items-center gap-4">
            <a href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
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
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Comparatif des assurances de prêt immobilier
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprenez les différentes options et économisez jusqu'à 15 000€ sur votre assurance emprunteur
          </p>
        </div>

        {/* Key info */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="finance-card bg-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-accent flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-2">Loi Lemoine : changez d'assurance à tout moment</h2>
                  <p className="text-muted-foreground">
                    Depuis le 1er juin 2022, vous pouvez changer d'assurance emprunteur à tout moment, 
                    sans frais et sans justification. C'est l'occasion de faire des économies significatives !
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-center">Assurance groupe vs Délégation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assuranceData.map((assurance) => (
              <Card key={assurance.name} className={`finance-card ${assurance.recommande ? "border-accent" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{assurance.name}</CardTitle>
                    {assurance.recommande && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                        Recommandé
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-primary">{assurance.tauxMoyen}</p>
                  <p className="text-sm text-muted-foreground">du capital emprunté / an</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm mb-2 text-accent">Avantages</p>
                      <ul className="space-y-1">
                        {assurance.avantages.map((avantage, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            {avantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-sm mb-2 text-destructive">Inconvénients</p>
                      <ul className="space-y-1">
                        {assurance.inconvenients.map((inconvenient, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <X className="h-4 w-4 text-destructive" />
                            {inconvenient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Savings example */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="finance-card">
            <CardHeader>
              <CardTitle>Exemple d'économies potentielles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Pour un prêt de <strong className="text-foreground">200 000€</strong> sur <strong className="text-foreground">20 ans</strong> :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Assurance groupe (0.35%)</p>
                    <p className="text-xl font-bold">14 000€</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Délégation (0.15%)</p>
                    <p className="text-xl font-bold">6 000€</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent">
                    <p className="text-sm text-accent">Économies</p>
                    <p className="text-xl font-bold text-accent">8 000€</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guarantees table */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Les garanties de l'assurance emprunteur</h2>
          
          <Card className="finance-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Garantie</TableHead>
                      <TableHead className="text-center">Obligatoire</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {garantiesData.map((item) => (
                      <TableRow key={item.garantie}>
                        <TableCell className="font-medium">{item.garantie}</TableCell>
                        <TableCell className="text-center">
                          {item.obligatoire ? (
                            <CheckCircle className="h-5 w-5 text-accent mx-auto" />
                          ) : (
                            <span className="text-muted-foreground text-sm">Optionnel</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {item.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Nos conseils pour bien choisir</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="finance-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Comparez les garanties, pas seulement le prix</h3>
                <p className="text-sm text-muted-foreground">
                  Une assurance moins chère peut avoir des exclusions importantes. 
                  Vérifiez les conditions de prise en charge et les délais de carence.
                </p>
              </CardContent>
            </Card>
            
            <Card className="finance-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Attention aux exclusions</h3>
                <p className="text-sm text-muted-foreground">
                  Lisez attentivement les exclusions : sports à risque, maladies préexistantes, 
                  conditions de travail particulières.
                </p>
              </CardContent>
            </Card>
            
            <Card className="finance-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Quotité : 100% sur chaque tête</h3>
                <p className="text-sm text-muted-foreground">
                  Pour un couple, privilégiez une quotité de 100% sur chaque emprunteur 
                  pour une protection maximale.
                </p>
              </CardContent>
            </Card>
            
            <Card className="finance-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Profitez de la loi Lemoine</h3>
                <p className="text-sm text-muted-foreground">
                  Même si vous avez déjà signé, vous pouvez changer d'assurance à tout moment. 
                  Faites des devis régulièrement !
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <Card className="finance-card bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Calculez d'abord votre capacité d'emprunt
              </h2>
              <p className="text-muted-foreground mb-6">
                Avant de comparer les assurances, connaissez votre budget avec notre simulateur gratuit.
              </p>
              <Button onClick={scrollToCalculator} size="lg" className="btn-cta">
                <Calculator className="mr-2 h-5 w-5" />
                SIMULER MON PRÊT
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 mt-12">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Accueil</a>
              <a href="/faq" className="hover:text-foreground">FAQ</a>
              <a href="/mentions-legales" className="hover:text-foreground">Mentions légales</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Simulateur Prêt Immobilier
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
