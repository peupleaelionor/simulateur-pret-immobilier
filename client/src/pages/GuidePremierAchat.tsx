import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, BookOpen, Calculator, CheckCircle, ArrowRight } from "lucide-react";

export default function GuidePremierAchat() {
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
            <span className="font-semibold text-lg hidden sm:inline">Simvan Digital</span>
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
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Guide du premier achat immobilier
          </h1>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir pour réussir votre premier achat immobilier en France
          </p>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Step 1 */}
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Évaluez votre budget</h2>
                  <p className="text-muted-foreground mb-4">
                    Avant de commencer vos recherches, il est essentiel de connaître votre capacité d'emprunt. 
                    Prenez en compte vos revenus, vos charges, et votre apport personnel.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Calculez votre taux d'endettement (max 35%)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Prévoyez les frais annexes (notaire, garantie, dossier)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Constituez un apport d'au moins 10%
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Définissez vos critères</h2>
                  <p className="text-muted-foreground mb-4">
                    Listez vos critères essentiels et ceux sur lesquels vous pouvez faire des compromis.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Localisation et transports
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Surface et nombre de pièces
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Neuf ou ancien, avec ou sans travaux
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Obtenez votre financement</h2>
                  <p className="text-muted-foreground mb-4">
                    Comparez les offres de plusieurs banques ou faites appel à un courtier pour obtenir 
                    les meilleures conditions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Obtenez un accord de principe
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Comparez les taux et les conditions
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      N'oubliez pas l'assurance emprunteur
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Visitez et négociez</h2>
                  <p className="text-muted-foreground mb-4">
                    Visitez plusieurs biens, posez les bonnes questions, et n'hésitez pas à négocier le prix.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Vérifiez l'état général du bien
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Demandez les diagnostics obligatoires
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Renseignez-vous sur les charges de copropriété
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card className="finance-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">5</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Signez et emménagez</h2>
                  <p className="text-muted-foreground mb-4">
                    Une fois le bien trouvé, signez le compromis de vente, finalisez votre prêt, 
                    et préparez votre emménagement.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Signez le compromis de vente
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Obtenez votre offre de prêt définitive
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Signez l'acte authentique chez le notaire
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <Card className="finance-card bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Calculez votre capacité d'emprunt en quelques secondes avec notre simulateur gratuit.
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
              © {new Date().getFullYear()} Simvan Digital
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
