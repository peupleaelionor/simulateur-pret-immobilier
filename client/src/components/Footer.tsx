import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Footer() {
  const [simulationCount, setSimulationCount] = useState(1247);

  // Simulate counter increment (in real app, fetch from backend)
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000); // Increment every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-muted/50 border-t border-border mt-16">
      <div className="container py-12">
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-8 border-b border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {simulationCount.toLocaleString("fr-FR")}
            </div>
            <p className="text-sm text-muted-foreground">Simulations ce mois</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Satisfaction clients</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24h</div>
            <p className="text-sm text-muted-foreground">Réponse garantie</p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary transition">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@simvan.digital"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  Nous contacter
                </a>
              </li>
              <li>
                <a
                  href="tel:+33123456789"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary transition">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary transition">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produits</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition">
                  Simulateur prêt
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/guide-premier-achat" className="text-sm text-muted-foreground hover:text-primary transition">
                  Guide premier achat
                </Link>
              </li>
            </ul>
          </div>

          {/* Affiliates */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Partenaires</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                  Devenir partenaire
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                  Programme d'affiliation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition">
                  Courtiers partenaires
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2026 Simvan Digital. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition">
              Twitter
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition">
              LinkedIn
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition">
              Facebook
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-background rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Simvan Digital n'est pas un établissement de crédit. Les taux et conditions affichés sont à titre
            informatif. Consultez un courtier ou votre banque pour des offres réelles.
          </p>
        </div>
      </div>
    </footer>
  );
}
