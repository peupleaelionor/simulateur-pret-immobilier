import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ThankYou() {
  // Get affiliate partners for display
  const { data: partners } = trpc.affiliates.list.useQuery();
  const trackClick = trpc.affiliates.trackClick.useMutation();

  // Track thank you page view
  const trackEvent = trpc.analytics.track.useMutation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    trackEvent.mutate({
      eventName: "page_view",
      eventData: JSON.stringify({ page: "thank_you" }),
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      pageUrl: window.location.href,
    });
  }, []);

  // Handle affiliate click
  const handlePartnerClick = (partnerId: number, redirectUrl: string) => {
    trackClick.mutate({
      partnerId,
      sessionId: sessionStorage.getItem("session_id") || undefined,
    });
    
    // Add UTM params to redirect URL
    const url = new URL(redirectUrl);
    url.searchParams.set("utm_source", "simulateur-pret");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", "lead-redirect");
    
    window.open(url.toString(), "_blank");
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
        </div>
      </header>

      <main className="container py-12 sm:py-16">
        {/* Success Message */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Votre demande a été envoyée !
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Nos partenaires courtiers vont analyser votre dossier et vous contacter 
            dans les <strong className="text-foreground">24 heures</strong> avec leurs meilleures offres.
          </p>

          {/* What happens next */}
          <Card className="finance-card text-left">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Que se passe-t-il maintenant ?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Analyse de votre dossier</p>
                    <p className="text-sm text-muted-foreground">
                      Nos partenaires étudient votre profil et votre capacité d'emprunt
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Contact personnalisé</p>
                    <p className="text-sm text-muted-foreground">
                      Un conseiller vous appelle pour affiner votre projet
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Propositions sur mesure</p>
                    <p className="text-sm text-muted-foreground">
                      Recevez plusieurs offres de prêt adaptées à votre situation
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact info */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="finance-card bg-secondary/30">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm">Vous serez contacté par téléphone</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm">Confirmation envoyée par email</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">Sous 24h ouvrées</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partner offers - if available */}
        {partners && partners.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              En attendant, découvrez nos partenaires
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Comparez dès maintenant les offres de nos courtiers partenaires
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partners.slice(0, 3).map((partner) => (
                <Card key={partner.id} className="finance-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    {partner.logoUrl ? (
                      <img 
                        src={partner.logoUrl} 
                        alt={partner.name}
                        className="h-12 mx-auto mb-4 object-contain"
                      />
                    ) : (
                      <div className="h-12 flex items-center justify-center mb-4">
                        <span className="text-xl font-bold text-primary">{partner.name}</span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mb-4">
                      {partner.description || "Courtier en prêt immobilier"}
                    </p>
                    <Button
                      onClick={() => handlePartnerClick(partner.id, partner.redirectUrl)}
                      className="w-full"
                      variant="outline"
                    >
                      Voir les offres
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back to home */}
        <div className="text-center mt-12">
          <Button asChild variant="ghost">
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </a>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Simvan Digital. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
