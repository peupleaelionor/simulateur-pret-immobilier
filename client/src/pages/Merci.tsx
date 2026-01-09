import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Star, Shield, Zap, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const PARTENAIRES = [
  {
    name: "Meilleurtaux",
    description: "Le leader du courtage en France. Comparez +100 banques en 2 minutes.",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Logo_Meilleurtaux.com.svg/1200px-Logo_Meilleurtaux.com.svg.png",
    url: "https://www.meilleurtaux.com/credit-immobilier/simulation-pret-immobilier.html",
    highlight: "N°1 en France",
    rating: 4.8
  },
];

const ASSURANCES = [
  {
    name: "Assurland",
    description: "Économisez jusqu'à 50% sur votre assurance emprunteur en comparant les offres.",
    url: "https://www.assurland.com/assurance-emprunteur.html",
    highlight: "Économie Max",
  },
  {
    name: "Luko",
    description: "L'assurance de prêt 100% digitale, simple et sans frais cachés.",
    url: "https://www.luko.eu/fr/assurance-emprunteur",
    highlight: "100% Digital",
  }
];
  {
    name: "Pretto",
    description: "Le courtier 100% en ligne. Obtenez votre attestation de financement immédiatement.",
    logo: "https://www.pretto.fr/static/images/logos/pretto-logo-blue.svg",
    url: "https://www.pretto.fr/",
    highlight: "100% Digital",
    rating: 4.9
  },
  {
    name: "Empruntis",
    description: "Des experts à votre service pour négocier le meilleur taux pour votre projet.",
    logo: "https://www.empruntis.com/images/logo_empruntis.png",
    url: "https://www.empruntis.com/credit-immobilier/simulation-pret-immobilier.php",
    highlight: "Expertise locale",
    rating: 4.7
  }
];

export default function Merci() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Merci ! - Simvan Immo" description="Votre demande a été prise en compte. Découvrez les meilleures offres de nos partenaires." />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Espace Client Privé : Analyse en cours
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Votre rapport d'expertise est prêt. Nos algorithmes ont sélectionné les 3 meilleures options pour votre profil spécifique.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 mb-8 flex items-center gap-4">
            <div className="bg-accent text-white p-2 rounded-lg">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Sélection Premium</h2>
              <p className="text-sm text-muted-foreground">Offres exclusives négociées pour les clients Simvan Immo</p>
            </div>
          </div>
          
          {PARTENAIRES.map((p, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                {p.highlight}
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-12 flex items-center justify-center bg-white p-2 rounded border border-gray-100">
                  <span className="font-bold text-primary">{p.name}</span>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(p.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    ))}
                    <span className="text-sm font-medium ml-1">{p.rating}/5</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                  <p className="text-muted-foreground text-sm">{p.description}</p>
                </div>
                
                <div className="w-full md:w-auto">
                  <Button asChild className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8">
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      VOIR MON OFFRE <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <h2 className="text-2xl font-bold flex items-center gap-2 mt-8 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            Économisez sur votre assurance emprunteur
          </h2>
          <p className="text-muted-foreground mb-4">
            L'assurance peut représenter jusqu'à 30% du coût de votre crédit. Comparez pour réduire vos mensualités.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSURANCES.map((a, i) => (
              <div key={i} className="bg-primary/5 border border-primary/10 rounded-xl p-5 hover:bg-primary/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-lg">{a.name}</span>
                  <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {a.highlight}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{a.description}</p>
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  <a href={a.url} target="_blank" rel="noopener noreferrer">
                    Comparer les tarifs
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Garantie Simvan Immo</h3>
          <p className="text-muted-foreground mb-6">
            Vos données sont sécurisées. En cliquant sur les offres de nos partenaires, vous bénéficiez d'un traitement prioritaire et des meilleurs taux négociés pour la communauté Simvan.
          </p>
          <Link href="/">
            <Button variant="outline">Retourner au simulateur</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
