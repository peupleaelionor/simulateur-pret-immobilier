import { Button } from "@/components/ui/button";
import { Home, FileText } from "lucide-react";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight hidden sm:inline">Simvan <span className="text-primary">Immo</span></span>
          </a>
          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </a>
            <a href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main className="container py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Mentions légales
            </h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">1. Informations légales</h2>
              <p className="text-muted-foreground mb-4">
                Le site <strong className="text-foreground">simvan.digital</strong> est édité par :
              </p>
              <div className="bg-secondary/30 rounded-lg p-4 mb-4">
                <p className="mb-2"><strong>Éditeur du site :</strong> Simvan Digital</p>
                <p className="mb-2"><strong>Forme juridique :</strong> Auto-entrepreneur / Micro-entreprise</p>
                <p className="mb-2"><strong>SIRET :</strong> 945 068 260 00013</p>
                <p className="mb-2"><strong>Siège social :</strong> 27 Avenue du Chemin de la Vie, 33440 Ambarès-et-Lagrave, France</p>
                <p className="mb-2"><strong>Directeur de la publication :</strong> Simvan Digital</p>
                <p><strong>Contact :</strong> simvan.immo@outlook.com</p>
              </div>
              <p className="text-muted-foreground">
                <strong>Hébergeur :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
            </section>

            <section className="mb-12" id="rgpd">
              <h2 className="text-2xl font-bold mb-4">2. Politique de confidentialité (RGPD)</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Responsable du traitement</h3>
              <p className="text-muted-foreground mb-4">
                Le responsable du traitement des données personnelles est [À compléter], 
                joignable à l'adresse : simvan.immo@outlook.com
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Données collectées</h3>
              <p className="text-muted-foreground mb-4">
                Nous collectons les données suivantes lors de l'utilisation de notre simulateur :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li><strong className="text-foreground">Données de simulation :</strong> revenus, charges, apport, durée souhaitée (non nominatives)</li>
                <li><strong className="text-foreground">Données de contact :</strong> email, numéro de téléphone (uniquement si vous soumettez le formulaire)</li>
                <li><strong className="text-foreground">Données techniques :</strong> adresse IP, navigateur, pages visitées (via cookies)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Finalités du traitement</h3>
              <p className="text-muted-foreground mb-4">Vos données sont utilisées pour :</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Vous fournir une simulation de prêt immobilier</li>
                <li>Vous mettre en relation avec nos partenaires courtiers (avec votre consentement)</li>
                <li>Améliorer nos services et notre site web</li>
                <li>Respecter nos obligations légales</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Base légale</h3>
              <p className="text-muted-foreground mb-4">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li><strong className="text-foreground">Votre consentement</strong> pour la transmission de vos coordonnées à nos partenaires</li>
                <li><strong className="text-foreground">Notre intérêt légitime</strong> pour l'amélioration de nos services</li>
                <li><strong className="text-foreground">L'exécution d'un contrat</strong> pour la fourniture du service de simulation</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.5 Destinataires des données</h3>
              <p className="text-muted-foreground mb-4">
                Vos données peuvent être transmises à :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Nos partenaires courtiers en prêt immobilier (avec votre consentement explicite)</li>
                <li>Nos prestataires techniques (hébergement, analytics)</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.6 Durée de conservation</h3>
              <p className="text-muted-foreground mb-4">
                Vos données sont conservées pendant :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li><strong className="text-foreground">Données de simulation :</strong> 12 mois</li>
                <li><strong className="text-foreground">Données de contact (leads) :</strong> 36 mois maximum</li>
                <li><strong className="text-foreground">Données de navigation :</strong> 13 mois (cookies)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.7 Vos droits</h3>
              <p className="text-muted-foreground mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li><strong className="text-foreground">Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong className="text-foreground">Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong className="text-foreground">Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong className="text-foreground">Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong className="text-foreground">Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Pour exercer ces droits, contactez-nous à : <strong className="text-foreground">simvan.immo@outlook.com</strong>
              </p>
              <p className="text-muted-foreground">
                Vous pouvez également introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
              </p>
            </section>

            <section className="mb-12" id="cookies">
              <h2 className="text-2xl font-bold mb-4">3. Politique des cookies</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Qu'est-ce qu'un cookie ?</h3>
              <p className="text-muted-foreground mb-4">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                lors de la visite d'un site web. Il permet de stocker des informations relatives à votre navigation.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Cookies utilisés</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-secondary/30">
                      <th className="border border-border p-3 text-left">Nom</th>
                      <th className="border border-border p-3 text-left">Type</th>
                      <th className="border border-border p-3 text-left">Finalité</th>
                      <th className="border border-border p-3 text-left">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="border border-border p-3">session_id</td>
                      <td className="border border-border p-3">Technique</td>
                      <td className="border border-border p-3">Identification de session</td>
                      <td className="border border-border p-3">Session</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">cookie_consent</td>
                      <td className="border border-border p-3">Technique</td>
                      <td className="border border-border p-3">Mémorisation du choix cookies</td>
                      <td className="border border-border p-3">12 mois</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">_ga, _gid</td>
                      <td className="border border-border p-3">Analytics</td>
                      <td className="border border-border p-3">Google Analytics</td>
                      <td className="border border-border p-3">13 mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Gestion des cookies</h3>
              <p className="text-muted-foreground mb-4">
                Vous pouvez à tout moment modifier vos préférences en matière de cookies :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Via le bandeau de consentement affiché sur le site</li>
                <li>Via les paramètres de votre navigateur</li>
                <li>Via les outils de désactivation proposés par les éditeurs (ex: Google Analytics Opt-out)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">4. Conditions d'utilisation</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Nature du service</h3>
              <p className="text-muted-foreground mb-4">
                Le simulateur de prêt immobilier est un outil d'aide à la décision fourni à titre indicatif. 
                Les résultats obtenus ne constituent en aucun cas :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Une offre de prêt</li>
                <li>Un engagement de financement</li>
                <li>Un conseil financier personnalisé</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Limitation de responsabilité</h3>
              <p className="text-muted-foreground mb-4">
                Nous nous efforçons de fournir des informations exactes et à jour. Cependant, nous ne pouvons 
                garantir l'exactitude, l'exhaustivité ou l'actualité des informations présentées.
              </p>
              <p className="text-muted-foreground mb-4">
                L'utilisateur est seul responsable de l'utilisation qu'il fait des résultats de simulation. 
                Nous recommandons de consulter un professionnel (courtier, banquier) avant toute décision d'emprunt.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Propriété intellectuelle</h3>
              <p className="text-muted-foreground mb-4">
                L'ensemble des éléments du site (textes, images, logos, algorithmes) sont protégés par le droit 
                de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">5. Contact</h2>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant ces mentions légales ou l'exercice de vos droits, 
                vous pouvez nous contacter :
              </p>
              <div className="bg-secondary/30 rounded-lg p-4">
                <p className="mb-2"><strong>Email :</strong> simvan.immo@outlook.com</p>
                <p><strong>Adresse :</strong> 27 Avenue du Chemin de la Vie, 33440 Ambarès-et-Lagrave, France</p>
              </div>
            </section>
          </div>

          {/* Back to home */}
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </a>
            </Button>
          </div>
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
