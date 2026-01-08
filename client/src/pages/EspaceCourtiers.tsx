import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, BarChart3, Zap } from "lucide-react";
import { Link } from "wouter";

/**
 * Page Espace Courtiers - Landing page dédiée aux courtiers immobiliers
 * 
 * Objectif : Convertir les courtiers en partenaires affiliés
 * Angle : B2B - Génération de leads qualifiés pour courtiers
 */
export default function EspaceCourtiers() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">Simulateur Prêt Immobilier</a>
          </Link>
          <Button>Devenir Partenaire</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Espace <span className="text-primary">Courtiers</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Recevez des leads qualifiés de particuliers recherchant un prêt immobilier. 
          Intégration simple, tracking UTM, et commission attractive.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="text-lg">
            <Zap className="mr-2 h-5 w-5" />
            Devenir Partenaire
          </Button>
          <Button size="lg" variant="outline" className="text-lg">
            Documentation API
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-sm text-muted-foreground">Simulations/mois</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-accent mx-auto mb-2" />
              <p className="text-3xl font-bold">5%</p>
              <p className="text-sm text-muted-foreground">Taux de conversion</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-10 w-10 text-green-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">250€</p>
              <p className="text-sm text-muted-foreground">Commission moyenne</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-blue-500 mx-auto mb-2" />
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm text-muted-foreground">Leads qualifiés</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi devenir partenaire ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                Leads qualifiés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recevez uniquement des leads de particuliers ayant complété une simulation 
                complète avec leurs coordonnées et projet immobilier détaillé.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-accent" />
                Intégration rapide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                API REST simple, tracking UTM automatique, webhook en temps réel. 
                Intégration en moins de 30 minutes avec notre documentation complète.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-green-500" />
                Dashboard analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Suivez vos conversions, sources de trafic, et ROI en temps réel. 
                Export CSV, rapports mensuels, et alertes personnalisées.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tarification simple et transparente
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Commission par lead</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-5xl font-bold text-primary mb-4">100-500€</p>
              <p className="text-muted-foreground mb-6">
                Commission variable selon la qualité du lead et le montant du prêt
              </p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Pas de frais d'installation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Pas d'abonnement mensuel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Paiement à la performance uniquement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Support technique inclus</span>
                </li>
              </ul>
              <Button size="lg" className="w-full">
                Commencer maintenant
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Prêt à recevoir des leads qualifiés ?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Rejoignez nos courtiers partenaires et commencez à recevoir des leads dès aujourd'hui.
        </p>
        <Button size="lg" className="text-lg">
          Devenir Partenaire
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Simulateur Prêt Immobilier. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
