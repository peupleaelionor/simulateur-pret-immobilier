/**
 * SEO Local Module
 * 
 * Génération de pages SEO locales dynamiques pour cibler différentes villes
 * Ex: /simulateur-pret-paris, /simulateur-pret-lyon, etc.
 */

export interface LocalSEOData {
  city: string;
  slug: string;
  region: string;
  population: number;
  averagePropertyPrice: number;
  averageRate: number;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  content: string;
}

/**
 * Liste des principales villes françaises pour SEO local
 */
export const FRENCH_CITIES: LocalSEOData[] = [
  {
    city: "Paris",
    slug: "paris",
    region: "Île-de-France",
    population: 2161000,
    averagePropertyPrice: 10500,
    averageRate: 3.50,
    metaTitle: "Simulateur Prêt Immobilier Paris 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Paris. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 10 500€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Paris",
    content: "Paris, capitale française, affiche un prix moyen au m² de 10 500€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Paris.",
  },
  {
    city: "Lyon",
    slug: "lyon",
    region: "Auvergne-Rhône-Alpes",
    population: 516092,
    averagePropertyPrice: 5200,
    averageRate: 3.45,
    metaTitle: "Simulateur Prêt Immobilier Lyon 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Lyon. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 5 200€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Lyon",
    content: "Lyon, deuxième ville de France, affiche un prix moyen au m² de 5 200€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Lyon.",
  },
  {
    city: "Marseille",
    slug: "marseille",
    region: "Provence-Alpes-Côte d'Azur",
    population: 869815,
    averagePropertyPrice: 3800,
    averageRate: 3.40,
    metaTitle: "Simulateur Prêt Immobilier Marseille 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Marseille. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 3 800€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Marseille",
    content: "Marseille, ville méditerranéenne, affiche un prix moyen au m² de 3 800€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Marseille.",
  },
  {
    city: "Toulouse",
    slug: "toulouse",
    region: "Occitanie",
    population: 471941,
    averagePropertyPrice: 3500,
    averageRate: 3.45,
    metaTitle: "Simulateur Prêt Immobilier Toulouse 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Toulouse. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 3 500€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Toulouse",
    content: "Toulouse, ville rose du Sud-Ouest, affiche un prix moyen au m² de 3 500€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Toulouse.",
  },
  {
    city: "Nice",
    slug: "nice",
    region: "Provence-Alpes-Côte d'Azur",
    population: 340017,
    averagePropertyPrice: 5500,
    averageRate: 3.50,
    metaTitle: "Simulateur Prêt Immobilier Nice 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Nice. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 5 500€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Nice",
    content: "Nice, perle de la Côte d'Azur, affiche un prix moyen au m² de 5 500€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Nice.",
  },
  {
    city: "Nantes",
    slug: "nantes",
    region: "Pays de la Loire",
    population: 303382,
    averagePropertyPrice: 3900,
    averageRate: 3.40,
    metaTitle: "Simulateur Prêt Immobilier Nantes 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Nantes. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 3 900€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Nantes",
    content: "Nantes, ville dynamique de l'Ouest, affiche un prix moyen au m² de 3 900€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Nantes.",
  },
  {
    city: "Bordeaux",
    slug: "bordeaux",
    region: "Nouvelle-Aquitaine",
    population: 249712,
    averagePropertyPrice: 4800,
    averageRate: 3.45,
    metaTitle: "Simulateur Prêt Immobilier Bordeaux 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Bordeaux. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 4 800€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Bordeaux",
    content: "Bordeaux, capitale mondiale du vin, affiche un prix moyen au m² de 4 800€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Bordeaux.",
  },
  {
    city: "Lille",
    slug: "lille",
    region: "Hauts-de-France",
    population: 232741,
    averagePropertyPrice: 3300,
    averageRate: 3.40,
    metaTitle: "Simulateur Prêt Immobilier Lille 2026 - Calcul Gratuit",
    metaDescription: "Simulez votre prêt immobilier à Lille. Calculez votre capacité d'emprunt avec les taux actuels. Prix moyen: 3 300€/m². Gratuit et sans engagement.",
    h1: "Simulateur Prêt Immobilier Lille",
    content: "Lille, métropole du Nord, affiche un prix moyen au m² de 3 300€. Notre simulateur vous aide à calculer votre capacité d'emprunt pour un achat immobilier à Lille.",
  },
];

/**
 * Get local SEO data by city slug
 */
export function getLocalSEOData(slug: string): LocalSEOData | undefined {
  return FRENCH_CITIES.find((city) => city.slug === slug);
}

/**
 * Generate local SEO content
 */
export function generateLocalContent(city: LocalSEOData): string {
  return `
## Simulateur de Prêt Immobilier à ${city.city}

${city.content}

### Prix de l'Immobilier à ${city.city}

Le marché immobilier à ${city.city} affiche un prix moyen de **${city.averagePropertyPrice.toLocaleString('fr-FR')}€/m²**. 
Cette ville de la région **${city.region}** compte environ **${city.population.toLocaleString('fr-FR')} habitants**.

### Taux d'Intérêt à ${city.city}

Le taux moyen actuel pour un prêt immobilier à ${city.city} est de **${city.averageRate}%** sur 20 ans. 
Utilisez notre simulateur pour calculer votre mensualité et votre capacité d'emprunt.

### Pourquoi Utiliser Notre Simulateur ?

- **Calcul instantané** : Obtenez votre capacité d'emprunt en 30 secondes
- **Algorithmes réalistes** : Conformes aux règles HCSF 2026
- **100% gratuit** : Aucun frais, aucun engagement
- **Données locales** : Taux et prix spécifiques à ${city.city}

### Questions Fréquentes à ${city.city}

**Quel apport pour acheter à ${city.city} ?**
Avec un prix moyen de ${city.averagePropertyPrice.toLocaleString('fr-FR')}€/m², un apport de 10% minimum est recommandé.

**Quel salaire pour emprunter à ${city.city} ?**
Utilisez notre simulateur pour calculer votre capacité d'emprunt en fonction de vos revenus.

**Quels sont les meilleurs quartiers à ${city.city} ?**
Consultez notre guide complet sur l'immobilier à ${city.city}.
  `.trim();
}

/**
 * Generate Schema.org LocalBusiness markup
 */
export function generateLocalBusinessSchema(city: LocalSEOData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Simulateur Prêt Immobilier ${city.city}`,
    "description": city.metaDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.city,
      "addressRegion": city.region,
      "addressCountry": "FR",
    },
    "areaServed": {
      "@type": "City",
      "name": city.city,
    },
    "priceRange": "€€",
  };
}

/**
 * Generate all local SEO pages slugs
 */
export function getAllLocalSlugs(): string[] {
  return FRENCH_CITIES.map((city) => city.slug);
}
