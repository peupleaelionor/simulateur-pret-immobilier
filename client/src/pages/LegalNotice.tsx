import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mentions Légales</h1>
          <p className="text-muted-foreground">Informations légales et politique de confidentialité</p>
        </div>

        {/* Qui sommes-nous */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Qui sommes-nous ?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Entreprise</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Nom :</strong> Simulateur Prêt Immobilier SARL
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Siège social :</strong> 123 Avenue de la République, 75011 Paris, France
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>SIRET :</strong> 12 345 678 901 234
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>TVA :</strong> FR12 345 678 901
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Directeur de publication :</strong> Jean Dupont
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Nous contacter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <strong>Email :</strong>{" "}
              <a href="mailto:contact@simulateur-pret.fr" className="text-primary hover:underline">
                contact@simulateur-pret.fr
              </a>
            </p>
            <p className="text-sm">
              <strong>Téléphone :</strong>{" "}
              <a href="tel:+33123456789" className="text-primary hover:underline">
                +33 1 23 45 67 89
              </a>
            </p>
            <p className="text-sm">
              <strong>Adresse :</strong> 123 Avenue de la République, 75011 Paris
            </p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Politique de Confidentialité */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Politique de Confidentialité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">1. Collecte des données</h3>
              <p className="text-muted-foreground">
                Nous collectons les données personnelles que vous nous fournissez volontairement via notre formulaire de
                simulation :
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Revenus nets mensuels</li>
                <li>Apport personnel</li>
                <li>Zone géographique</li>
                <li>Type de bien immobilier</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Utilisation des données</h3>
              <p className="text-muted-foreground">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>Calculer votre capacité d'emprunt</li>
                <li>Vous mettre en contact avec nos partenaires courtiers</li>
                <li>Vous envoyer des offres immobilières personnalisées</li>
                <li>Améliorer nos services</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Partage des données</h3>
              <p className="text-muted-foreground">
                Vos données sont partagées avec nos partenaires courtiers uniquement si vous avez donné votre consentement
                explicite. Aucune donnée n'est vendue à des tiers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Durée de conservation</h3>
              <p className="text-muted-foreground">
                Les données personnelles sont conservées pendant 36 mois à compter de la dernière interaction. Vous pouvez
                demander leur suppression à tout moment.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Vos droits RGPD</h3>
              <p className="text-muted-foreground">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'oubli (suppression)</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:privacy@simulateur-pret.fr" className="text-primary hover:underline">
                  privacy@simulateur-pret.fr
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">6. Sécurité des données</h3>
              <p className="text-muted-foreground">
                Vos données sont chiffrées en transit (HTTPS) et au repos. Nous utilisons les meilleures pratiques de
                sécurité pour protéger vos informations personnelles.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">7. Cookies</h3>
              <p className="text-muted-foreground">
                Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies
                via la banneau en bas de page.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">8. Responsable de traitement</h3>
              <p className="text-muted-foreground">
                Simulateur Prêt Immobilier SARL est responsable du traitement de vos données. Pour toute question,
                contactez notre Délégué à la Protection des Données (DPO) :
              </p>
              <p className="text-muted-foreground mt-2">
                Email :{" "}
                <a href="mailto:dpo@simulateur-pret.fr" className="text-primary hover:underline">
                  dpo@simulateur-pret.fr
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">9. Modifications de cette politique</h3>
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications seront
                communiquées par email aux utilisateurs enregistrés.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Disclaimer */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-900">Disclaimer - Informations Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-amber-900">
            <p>
              <strong>Caractère informatif :</strong> Ce simulateur fournit une estimation indicative de votre capacité
              d'emprunt. Les résultats ne constituent pas une offre de prêt.
            </p>
            <p>
              <strong>Taux variables :</strong> Les taux affichés sont à titre informatif. Votre taux final dépendra de
              votre profil, de votre dossier et de l'établissement prêteur.
            </p>
            <p>
              <strong>Conseil financier :</strong> Nous ne sommes pas conseillers financiers. Pour des conseils
              personnalisés, consultez un courtier ou votre banque.
            </p>
            <p>
              <strong>Responsabilité :</strong> Simulateur Prêt Immobilier décline toute responsabilité quant aux
              décisions prises sur la base de ce simulateur.
            </p>
          </CardContent>
        </Card>

        {/* Conditions d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Conditions d'Utilisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Propriété intellectuelle</h3>
              <p className="text-muted-foreground">
                Tous les contenus de ce site (textes, graphiques, logos) sont la propriété de Simulateur Prêt Immobilier
                ou de ses partenaires. Toute reproduction sans autorisation est interdite.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Limitation de responsabilité</h3>
              <p className="text-muted-foreground">
                Ce site est fourni "tel quel". Nous ne garantissons pas l'exactitude, la complétude ou l'actualité des
                informations. Votre utilisation du site est à vos risques et périls.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Loi applicable</h3>
              <p className="text-muted-foreground">
                Ces conditions sont régies par la loi française. Tout litige sera soumis aux tribunaux compétents de
                Paris.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </div>
  );
}
