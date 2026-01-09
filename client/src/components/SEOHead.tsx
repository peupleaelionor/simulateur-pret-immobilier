import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article" | "faq";
  image?: string;
  noindex?: boolean;
}

// Schema.org structured data for the mortgage calculator
const mortgageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Simvan Digital",
  "description": "Calculez votre capacité d'emprunt immobilier avec notre simulateur gratuit. Algorithmes bancaires français réels, règles HCSF 2026.",
  "provider": {
    "@type": "Organization",
    "name": "Simvan Digital",
    "url": "https://simvan.digital"
  },
  "category": "Mortgage Loan",
  "feesAndCommissionsSpecification": "Service gratuit, sans engagement",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  }
};

const mortgageLoanSchema = {
  "@context": "https://schema.org",
  "@type": "MortgageLoan",
  "name": "Prêt Immobilier France",
  "description": "Simulation de prêt immobilier selon les règles bancaires françaises (HCSF 2026)",
  "loanType": "Fixed Rate",
  "currency": "EUR",
  "gracePeriod": "P0M",
  "loanTerm": "P25Y",
  "requiredCollateral": "Real Estate"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Simvan Digital",
  "url": "https://simvan.digital",
  "logo": "https://simvan.digital/logo.png",
  "description": "Simulateur de prêt immobilier gratuit avec algorithmes bancaires français réels",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "French"
  },
  "sameAs": []
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quelle est la différence entre un taux fixe et un taux variable ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un taux fixe reste identique pendant toute la durée du prêt. Vos mensualités sont constantes et prévisibles. Un taux variable évolue en fonction d'un indice de référence (généralement l'Euribor). En période de taux bas, privilégiez le taux fixe pour sécuriser votre emprunt."
      }
    },
    {
      "@type": "Question",
      "name": "Quel apport minimum faut-il pour obtenir un prêt immobilier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Il n'y a pas de minimum légal, mais les banques demandent généralement 10% du prix du bien pour couvrir les frais de notaire et de garantie. Un apport de 20% ou plus vous permettra d'obtenir de meilleures conditions de taux."
      }
    },
    {
      "@type": "Question",
      "name": "Comment est calculé le taux d'endettement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le taux d'endettement = (Total des charges de crédit / Revenus nets) × 100. Depuis les recommandations du HCSF, le taux d'endettement maximum est de 35% des revenus nets, assurance emprunteur incluse."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce que le reste à vivre et pourquoi est-il important ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le reste à vivre est la somme qui vous reste après paiement de toutes vos charges fixes (crédit, loyer, etc.). Les banques exigent un minimum de 800€ à 1000€ par personne pour s'assurer que vous pouvez vivre décemment."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle durée de prêt choisir ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La durée maximale recommandée par le HCSF est de 25 ans (27 ans pour le neuf avec différé). Plus la durée est longue, plus le coût total du crédit augmente, mais les mensualités sont plus faibles. Trouvez l'équilibre entre mensualité supportable et coût total."
      }
    },
    {
      "@type": "Question",
      "name": "L'assurance emprunteur est-elle obligatoire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Légalement non, mais dans la pratique, aucune banque n'accordera de prêt sans assurance. Depuis la loi Lemoine (2022), vous pouvez changer d'assurance à tout moment sans frais, ce qui peut vous faire économiser des milliers d'euros."
      }
    },
    {
      "@type": "Question",
      "name": "Quels sont les frais annexes à prévoir ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comptez environ 7-8% du prix dans l'ancien et 2-3% dans le neuf pour les frais de notaire. Ajoutez les frais de dossier bancaire (500-1500€), les frais de garantie (caution ou hypothèque, 1-2% du montant emprunté), et éventuellement les frais de courtier."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je emprunter si je suis en CDD ou intérimaire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "C'est plus difficile mais pas impossible. Les banques privilégient les CDI, mais certaines acceptent les CDD de longue durée ou l'intérim régulier. Un apport conséquent et un co-emprunteur en CDI peuvent faciliter l'obtention du prêt."
      }
    },
    {
      "@type": "Question",
      "name": "Comment améliorer mon dossier de prêt ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Soldez vos crédits à la consommation, évitez les découverts bancaires les 3 mois précédant la demande, constituez un apport personnel, stabilisez votre situation professionnelle, et présentez un projet immobilier cohérent avec vos revenus."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'un courtier et dois-je en utiliser un ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un courtier est un intermédiaire qui négocie votre prêt auprès de plusieurs banques. Il peut vous faire gagner du temps et obtenir de meilleures conditions. Ses honoraires (0-1% du montant emprunté) sont souvent compensés par les économies réalisées."
      }
    }
  ]
};

export default function SEOHead({
  title = "Simvan Digital 2026 - Calculez votre capacité d'emprunt gratuitement",
  description = "Simulez votre prêt immobilier en 30 secondes. Algorithmes bancaires français réels, règles HCSF 2026, tableau d'amortissement complet. 100% gratuit, sans engagement.",
  canonical = "https://simvan.digital",
  type = "website",
  image = "https://simvan.digital/og-image.png",
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMeta("description", description);
    updateMeta("robots", noindex ? "noindex, nofollow" : "index, follow");

    // Open Graph tags
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", type, true);
    updateMeta("og:url", canonical, true);
    updateMeta("og:image", image, true);
    updateMeta("og:locale", "fr_FR", true);
    updateMeta("og:site_name", "Simvan Digital", true);

    // Twitter Card tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);

    // Add structured data
    const addStructuredData = (id: string, data: object) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    // Add all schema.org structured data
    addStructuredData("schema-organization", organizationSchema);
    addStructuredData("schema-financial-product", mortgageCalculatorSchema);
    addStructuredData("schema-mortgage-loan", mortgageLoanSchema);
    
    if (type === "faq") {
      addStructuredData("schema-faq", faqSchema);
    }

  }, [title, description, canonical, type, image, noindex]);

  return null;
}

// Export schemas for use in specific pages
export { faqSchema, mortgageCalculatorSchema, mortgageLoanSchema, organizationSchema };
