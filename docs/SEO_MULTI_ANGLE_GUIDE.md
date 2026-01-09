# 🚀 Guide SEO & Multi-Angle

Ce guide explique comment optimiser le référencement et activer tous les angles d'exploitation du simulateur.

## 📋 Table des Matières

### Partie 1: SEO
1. [Optimisation On-Page](#optimisation-on-page)
2. [Schema.org](#schemaorg)
3. [SEO Local](#seo-local)
4. [Stratégie de Contenu](#stratégie-de-contenu)

### Partie 2: Multi-Angle
5. [Angle Particuliers](#angle-particuliers)
6. [Angle Courtiers](#angle-courtiers)
7. [Angle Agences](#angle-agences)
8. [Angle Influenceurs](#angle-influenceurs)
9. [Angle Data B2B](#angle-data-b2b)

---

# PARTIE 1: SEO

## Optimisation On-Page

### Balises Titres

#### H1 (Unique par Page)

```html
<!-- Page d'accueil -->
<h1>Simvan Digital 2026 - Calcul Gratuit</h1>

<!-- Page FAQ -->
<h1>Questions Fréquentes - Simvan Digital</h1>

<!-- Page locale (Paris) -->
<h1>Simvan Digital Paris - Calcul Gratuit</h1>
```

#### H2 (Sections Principales)

```html
<h2>Comment fonctionne le calculateur ?</h2>
<h2>Résultats de votre simulation</h2>
<h2>Obtenez vos offres réelles</h2>
<h2>Questions fréquentes</h2>
```

### Meta Tags

#### Title (55-60 caractères)

```html
<title>Simvan Digital 2026 | Calcul Gratuit</title>
```

#### Description (150-160 caractères)

```html
<meta name="description" content="Calculez votre capacité d'emprunt immobilier en 30s. Algorithmes HCSF 2026. Obtenez 3 offres de courtiers. 100% gratuit et sans engagement.">
```

#### Open Graph (Facebook)

```html
<meta property="og:title" content="Simvan Digital 2026">
<meta property="og:description" content="Calculez votre capacité d'emprunt en 30s">
<meta property="og:image" content="https://simulateur-pret.fr/og-image.jpg">
<meta property="og:url" content="https://simulateur-pret.fr">
<meta property="og:type" content="website">
```

#### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Simvan Digital 2026">
<meta name="twitter:description" content="Calculez votre capacité d'emprunt en 30s">
<meta name="twitter:image" content="https://simulateur-pret.fr/twitter-card.jpg">
```

### URLs Propres

| Page | URL |
|---|---|
| Accueil | `/` |
| Simulateur | `/simulateur-credit-immobilier` |
| FAQ | `/faq` |
| Mentions légales | `/mentions-legales` |
| Espace courtiers | `/courtiers` |
| SEO local Paris | `/simulateur-pret-paris` |

### Robots.txt

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://simulateur-pret.fr/sitemap.xml
```

### Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://simulateur-pret.fr/</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://simulateur-pret.fr/faq</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- ... autres pages -->
</urlset>
```

---

## Schema.org

### FinancialProduct

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Simvan Digital",
  "description": "Calculateur de capacité d'emprunt immobilier",
  "provider": {
    "@type": "Organization",
    "name": "[NOM DE LA SOCIÉTÉ]"
  },
  "category": "MortgageLoan",
  "feesAndCommissionsSpecification": "Gratuit, sans engagement"
}
```

### MortgageLoan

```json
{
  "@context": "https://schema.org",
  "@type": "MortgageLoan",
  "name": "Prêt Immobilier",
  "loanType": "Mortgage",
  "currency": "EUR",
  "interestRate": {
    "@type": "QuantitativeValue",
    "value": 3.50,
    "unitText": "P1Y"
  },
  "loanTerm": {
    "@type": "QuantitativeValue",
    "value": 20,
    "unitText": "ANN"
  }
}
```

### FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel apport minimum pour un prêt immobilier ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un apport de 10% minimum est recommandé..."
      }
    }
  ]
}
```

---

## SEO Local

### Pages Locales Disponibles

Le simulateur inclut des pages SEO pour 8 grandes villes :

1. **Paris** - `/simulateur-pret-paris`
2. **Lyon** - `/simulateur-pret-lyon`
3. **Marseille** - `/simulateur-pret-marseille`
4. **Toulouse** - `/simulateur-pret-toulouse`
5. **Nice** - `/simulateur-pret-nice`
6. **Nantes** - `/simulateur-pret-nantes`
7. **Bordeaux** - `/simulateur-pret-bordeaux`
8. **Lille** - `/simulateur-pret-lille`

### Activation

Les pages locales sont générées automatiquement à partir du module `shared/seo-local.ts`.

#### Ajouter une Nouvelle Ville

1. Ouvrez `shared/seo-local.ts`
2. Ajoutez une entrée dans `FRENCH_CITIES` :

```typescript
{
  city: "Strasbourg",
  slug: "strasbourg",
  region: "Grand Est",
  population: 280966,
  averagePropertyPrice: 3200,
  averageRate: 3.45,
  metaTitle: "Simvan Digital Strasbourg 2026 - Calcul Gratuit",
  metaDescription: "Simulez votre prêt immobilier à Strasbourg...",
  h1: "Simvan Digital Strasbourg",
  content: "Strasbourg, capitale européenne...",
}
```

3. La page sera automatiquement générée à `/simulateur-pret-strasbourg`

### Optimisation Google My Business

Pour chaque ville, créez une fiche Google My Business :

1. Allez sur https://business.google.com
2. Créez une fiche "Service Area Business"
3. Catégorie: "Courtier en prêts immobiliers"
4. Zone de service: Ville ciblée
5. Ajoutez le lien vers la page locale

---

## Stratégie de Contenu

### Mots-Clés Principaux

| Mot-Clé | Volume | Difficulté | Priorité |
|---|---|---|---|
| simulateur prêt immobilier | 12K/mois | Moyenne | ⭐⭐⭐⭐⭐ |
| calcul capacité emprunt | 8K/mois | Faible | ⭐⭐⭐⭐⭐ |
| calculette prêt immobilier | 5K/mois | Faible | ⭐⭐⭐⭐ |
| simulation crédit immobilier | 4K/mois | Moyenne | ⭐⭐⭐⭐ |
| combien puis-je emprunter | 3K/mois | Faible | ⭐⭐⭐ |

### Mots-Clés Longue Traîne

- "simulateur prêt immobilier avec apport"
- "calcul mensualité prêt immobilier 200 000 euros"
- "capacité d'emprunt avec 3000 euros de revenus"
- "simulateur prêt immobilier 2026 taux"

### Stratégie de Contenu

#### Phase 1 (Mois 1-2)

- ✅ Page d'accueil optimisée
- ✅ FAQ complète (10 questions)
- ✅ Mentions légales
- ✅ 8 pages locales

#### Phase 2 (Mois 3-4)

- 🔄 Blog: "Guide du premier achat immobilier"
- 🔄 Blog: "Comparatif assurances prêt"
- 🔄 Blog: "Taux immobilier 2026: évolution"
- 🔄 Blog: "Apport minimum: combien faut-il ?"

#### Phase 3 (Mois 5-6)

- 🔄 20 pages locales supplémentaires
- 🔄 Glossaire immobilier
- 🔄 Calculateurs complémentaires (frais de notaire, etc.)

### Backlinks

#### Stratégie d'Acquisition

1. **Partenariats courtiers**: Liens depuis sites partenaires
2. **Guest posting**: Articles sur blogs immobiliers
3. **Annuaires**: Inscription annuaires immobiliers
4. **Réseaux sociaux**: Partages sur Facebook, LinkedIn
5. **Forums**: Participation forums immobiliers

#### Objectif

- Mois 1-3: 10 backlinks
- Mois 4-6: 30 backlinks
- Mois 7-12: 100 backlinks

---

# PARTIE 2: MULTI-ANGLE

## Angle Particuliers

### Page d'Accueil

La page d'accueil (`/`) est optimisée pour les particuliers :

- **CTA principal**: "CALCULER MAINTENANT"
- **Trust signals**: Compteur social, satisfaction 98%
- **Formulaire lead**: Email, téléphone, projet

### Parcours Utilisateur

```
1. Arrivée sur la page d'accueil
   ↓
2. Remplissage du calculateur
   ↓
3. Affichage des résultats
   ↓
4. Clic sur "OBTENIR MES 3 OFFRES"
   ↓
5. Formulaire lead (email, téléphone, projet)
   ↓
6. Page de remerciement
   ↓
7. Redirection vers courtiers partenaires
```

### Optimisation Conversion

- **A/B Testing**: Tester différents CTA
- **Heatmaps**: Analyser le comportement
- **Feedback**: Sondage post-conversion

---

## Angle Courtiers

### Page Dédiée

URL: `/courtiers`

#### Contenu

```
🤝 Espace Courtiers

Générez des Leads Qualifiés avec Notre Simulateur

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Performance
• 10 000 visiteurs/mois
• 500 leads qualifiés/mois
• Taux de conversion: 5%

💰 Commission
• 100-500€ par lead converti
• Paiement mensuel
• Tracking en temps réel

🎯 Leads Qualifiés
• Email + téléphone vérifiés
• Projet immobilier détaillé
• Capacité d'emprunt calculée

[DEVENIR PARTENAIRE]
```

#### Formulaire Partenariat

```
Nom du courtier: ___________
Email: ___________
Téléphone: ___________
Site web: ___________
Zone géographique: ___________

[ENVOYER]
```

### API pour Courtiers

Documentation API disponible pour les courtiers partenaires :

#### Endpoint: Récupérer les Leads

```http
GET /api/courtiers/leads
Authorization: Bearer {API_KEY}
```

**Réponse**:

```json
{
  "leads": [
    {
      "id": "12345",
      "date": "2026-01-15T14:32:00Z",
      "email": "jean.dupont@example.com",
      "phone": "+33612345678",
      "loanAmount": 250000,
      "duration": 20,
      "deposit": 50000,
      "location": "Paris",
      "propertyType": "appartement"
    }
  ]
}
```

---

## Angle Agences

### White-Label Embed

Les agences immobilières peuvent intégrer le simulateur sur leur site via iframe.

#### Code d'Intégration

```html
<iframe 
  src="https://simulateur-pret.fr/embed?agency=AGENCY_ID"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

#### Personnalisation

Paramètres disponibles :

| Paramètre | Description | Exemple |
|---|---|---|
| `agency` | ID de l'agence | `AGENCY_ID` |
| `color` | Couleur primaire | `#10B981` |
| `logo` | URL du logo | `https://agency.com/logo.png` |
| `redirect` | URL de redirection | `https://agency.com/contact` |

#### Exemple Complet

```html
<iframe 
  src="https://simulateur-pret.fr/embed?agency=ABC123&color=%2310B981&logo=https://agency.com/logo.png&redirect=https://agency.com/contact"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>
```

### Tracking

Les leads générés via l'embed sont automatiquement attribués à l'agence.

---

## Angle Influenceurs

### Liens UTM

Les influenceurs peuvent promouvoir le simulateur avec des liens trackés.

#### Génération de Lien

```
https://simulateur-pret.fr/?utm_source=influencer&utm_medium=instagram&utm_campaign=INFLUENCER_NAME
```

#### Paramètres UTM

| Paramètre | Description | Exemple |
|---|---|---|
| `utm_source` | Source du trafic | `influencer` |
| `utm_medium` | Canal de diffusion | `instagram`, `youtube`, `tiktok` |
| `utm_campaign` | Nom de l'influenceur | `marie_immobilier` |
| `utm_content` | Type de contenu | `story`, `post`, `video` |

#### Dashboard Influenceur

Les influenceurs ont accès à un dashboard dédié :

URL: `/influenceurs?key=INFLUENCER_KEY`

**Métriques**:
- Clics sur le lien
- Simulations effectuées
- Leads générés
- Commission gagnée

#### Commission

- **Modèle CPA**: 50€ par lead converti
- **Paiement**: Mensuel (minimum 100€)
- **Tracking**: 30 jours

---

## Angle Data B2B

### Insights Marché

Le simulateur peut générer des insights anonymisés pour clients B2B (banques, courtiers, analystes).

#### Module Data B2B

Fichier: `shared/data-b2b.ts`

#### Fonctionnalités

1. **Anonymisation**: Suppression données personnelles
2. **Agrégation**: Statistiques par période/zone
3. **Export**: JSON, CSV, Markdown

#### Exemple d'Insights

```json
{
  "period": "2026-01",
  "totalSimulations": 2947,
  "averageLoanAmount": 245000,
  "averageDuration": 21,
  "averageRate": 3.52,
  "conversionRate": 5.0,
  "topCities": [
    { "city": "Paris", "count": 450 },
    { "city": "Lyon", "count": 180 }
  ]
}
```

#### API B2B

```http
GET /api/b2b/insights?period=2026-01
Authorization: Bearer {B2B_API_KEY}
```

#### Tarification

- **Rapport mensuel**: 500€/mois
- **Rapport annuel**: 5000€/an
- **API temps réel**: 1000€/mois

---

## Activation Multi-Angle

### Checklist

#### Particuliers
- [x] Page d'accueil optimisée
- [x] Calculateur fonctionnel
- [x] Formulaire lead
- [x] Page de remerciement

#### Courtiers
- [x] Page `/courtiers` créée
- [ ] API courtiers activée
- [ ] Dashboard courtiers configuré
- [ ] Contrats partenaires signés

#### Agences
- [x] Composant White-label créé
- [ ] Code d'intégration documenté
- [ ] Tracking agences configuré
- [ ] Tarification définie

#### Influenceurs
- [x] Module UTM tracking créé
- [ ] Dashboard influenceurs activé
- [ ] Programme d'affiliation lancé
- [ ] Contrats influenceurs signés

#### Data B2B
- [x] Module anonymisation créé
- [ ] API B2B activée
- [ ] Rapports automatisés
- [ ] Clients B2B signés

---

## Support

Pour toute question sur le SEO ou le multi-angle :
- **Documentation**: `docs/`
- **Email**: support@simulateur-pret.fr
