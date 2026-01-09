import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import MortgageCalculator from "@/components/MortgageCalculator";
import ResultsDisplay from "@/components/ResultsDisplay";
import LeadModal from "@/components/LeadModal";
import { trpc } from "@/lib/trpc";
import {
  type ResultatSimulation,
  type DonneesEmprunteur,
} from "@shared/mortgage-calculator";
import { 
  Home as HomeIcon, 
  Calculator, 
  Shield, 
  TrendingUp, 
  Users,
  ChevronDown,
  Star,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const [result, setResult] = useState<ResultatSimulation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [simulationData, setSimulationData] = useState<{
    montantEmprunte: number;
    dureeAns: number;
    revenusNets: number;
    apport: number;
    mensualite: number;
    tauxUtilise: number;
  } | null>(null);

  // Track page view
  const trackEvent = trpc.analytics.track.useMutation();

  useEffect(() => {
    // Track page view on mount
    const params = new URLSearchParams(window.location.search);
    trackEvent.mutate({
      eventName: "page_view",
      eventData: JSON.stringify({ page: "home" }),
      sessionId: getSessionId(),
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      pageUrl: window.location.href,
      referrer: document.referrer || undefined,
    });
  }, []);

  // Get or create session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  };

  // Handle simulation complete - open modal
  const handleSimulationComplete = useCallback((data: DonneesEmprunteur & { result: ResultatSimulation }) => {
    setSimulationData({
      montantEmprunte: data.result.capaciteEmprunt,
      dureeAns: data.dureeAns,
      revenusNets: Math.round(data.revenusNetsMensuels),
      apport: Math.round(data.apportPersonnel),
      mensualite: Math.round(data.result.mensualiteTotale),
      tauxUtilise: data.tauxAnnuel,
    });
    
    // Track simulation event
    trackEvent.mutate({
      eventName: "simulateur_utilise",
      eventData: JSON.stringify({
        montant: data.result.capaciteEmprunt,
        duree: data.dureeAns,
        taux: data.tauxAnnuel,
      }),
      sessionId: getSessionId(),
    });
    
    setModalOpen(true);
  }, [trackEvent]);

  // Handle successful lead submission
  const handleLeadSuccess = useCallback(() => {
    setModalOpen(false);
    navigate("/merci");
  }, [navigate]);

  // Scroll to calculator
  const scrollToCalculator = () => {
    document.getElementById("calculateur")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Simvan Digital 2026 - Calculez votre capacité d'emprunt"
        description="Simvan Immo • Simulez votre prêt immobilier en 2 minuteses. Algorithmes bancaires français réels, règles HCSF 2026, tableau d'amortissement complet. 100% gratuit."
        canonical="https://simulateur-pret-immobilier.fr"
      />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight hidden sm:inline">Simvan <span className="text-primary">Immo</span></span>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Algorithmes bancaires réels 2026
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-primary">Simvan Immo</span> • Simulez votre prêt immobilier en{" "}
              <span className="text-accent">30 secondes</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Calculez votre capacité d'emprunt avec les mêmes algorithmes que les courtiers professionnels. 
              <strong className="text-foreground"> 100% gratuit, sans engagement.</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Résultats instantanés</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Règles HCSF 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span>Tableau d'amortissement</span>
              </div>
            </div>

            <Button 
              onClick={scrollToCalculator} 
              size="lg" 
              className="btn-cta h-14 px-8 text-lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              CALCULER MAINTENANT
            </Button>

            <button 
              onClick={scrollToCalculator}
              className="flex items-center justify-center w-full mt-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculateur" className="section bg-secondary/30">
        <div className="container">
          <MortgageCalculator
            onResultChange={setResult}
            onSimulationComplete={handleSimulationComplete}
          />
        </div>
      </section>

      {/* Results Section */}
      {result && result.eligible && (
        <section className="section">
          <div className="container">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              Détail de votre simulation
            </h2>
            <ResultsDisplay result={result} />
            
            {/* Trust Signals Section */}
            <div className="mt-12 mb-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">1,247</div>
                  <p className="text-sm text-muted-foreground">Simulations ce mois</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <p className="text-sm text-muted-foreground">Satisfaction clients</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">24h</div>
                  <p className="text-sm text-muted-foreground">Reponse garantie</p>
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="mt-8 text-center">
              <Button 
                onClick={() => {
                  if (result) {
                    setSimulationData({
                      montantEmprunte: result.capaciteEmprunt,
                      dureeAns: result.tableauAmortissement.length / 12,
                      revenusNets: 0,
                      apport: 0,
                      mensualite: Math.round(result.mensualiteTotale),
                      tauxUtilise: 0,
                    });
                    setModalOpen(true);
                  }
                }}
                size="lg"
                className="btn-cta h-14 px-8 text-lg"
              >
                OBTENIR VOS OFFRES RÉELLES
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Trust Section */}
      <section className="section bg-primary/5">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Pourquoi nous faire confiance ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Algorithmes bancaires réels</h3>
              <p className="text-muted-foreground">
                Nos calculs respectent les règles HCSF : taux d'endettement max 35%, 
                reste à vivre minimum, durée 25 ans max.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% gratuit et sans engagement</h3>
              <p className="text-muted-foreground">
                Aucun frais, aucune obligation. Vos données sont protégées 
                conformément au RGPD.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Partenaires de confiance</h3>
              <p className="text-muted-foreground">
                Nous travaillons avec les meilleurs courtiers français pour vous 
                obtenir les meilleures conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">+1 247</p>
              <p className="text-muted-foreground">Simulations ce mois</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">24h</p>
              <p className="text-muted-foreground">Délai de réponse</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">0€</p>
              <p className="text-muted-foreground">Frais de service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Prêt à concrétiser votre projet immobilier ?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Obtenez une estimation précise de votre capacité d'emprunt et recevez 
            des offres personnalisées de nos partenaires courtiers.
          </p>
          <Button 
            onClick={scrollToCalculator}
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg font-semibold"
          >
            SIMULER MON PRÊT GRATUITEMENT
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HomeIcon className="h-6 w-6 text-primary" />
                <span className="font-semibold">Simulateur Prêt</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Simulateur de prêt immobilier gratuit avec algorithmes bancaires réels.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-muted-foreground hover:text-foreground">Accueil</a></li>
                <li><a href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
                <li><a href="/guide-premier-achat" className="text-muted-foreground hover:text-foreground">Guide premier achat</a></li>
                <li><a href="/comparatif-assurances" className="text-muted-foreground hover:text-foreground">Comparatif assurances</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/mentions-legales" className="text-muted-foreground hover:text-foreground">Mentions légales</a></li>
                <li><a href="/mentions-legales#rgpd" className="text-muted-foreground hover:text-foreground">Politique de confidentialité</a></li>
                <li><a href="/mentions-legales#cookies" className="text-muted-foreground hover:text-foreground">Gestion des cookies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">
                Une question ? Consultez notre FAQ ou contactez-nous via le formulaire.
              </p>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Simvan Digital. Tous droits réservés.</p>
            <p className="mt-2">
              Les simulations sont fournies à titre indicatif et ne constituent pas une offre de prêt.
            </p>
          </div>
        </div>
      </footer>

      {/* Lead Modal */}
      <LeadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        simulationData={simulationData}
        onSuccess={handleLeadSuccess}
      />
    </div>
  );
}
