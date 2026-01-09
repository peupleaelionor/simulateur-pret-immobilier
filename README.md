# 🏠 Simvan Digital - Machine à Cash Ultra-Optimisée

Site ultra-optimisé pour générer des leads qualifiés et des revenus d'affiliation dans le marché français de l'immobilier.

## 📊 Objectifs Business

- **Marché**: 300K recherches/mois "simulateur prêt" en France
- **CPA affilié**: 100-500€ par lead qualifié
- **Objectif mois 1**: 50 leads = 5000€+ revenus
- **Taux de conversion cible**: 5%+
- **CAC cible**: < 10€

## 🚀 Stack Technique

- **Frontend**: React 19 + Tailwind CSS 4 + Shadcn/ui
- **Backend**: Express 4 + tRPC 11
- **Base de données**: MySQL/TiDB (compatible PostgreSQL)
- **Graphiques**: Recharts
- **Animations**: Framer Motion
- **Tests**: Vitest (32 tests passés)

## 📁 Structure du Projet

```
simulateur-pret-immobilier/
├── client/                    # Frontend React
│   ├── public/               # Assets statiques
│   ├── src/
│   │   ├── components/       # Composants UI réutilisables
│   │   │   ├── MortgageCalculator.tsx
│   │   │   ├── ResultsDisplay.tsx
│   │   │   ├── LeadModal.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CookieBanner.tsx
│   │   │   ├── SEOHead.tsx
│   │   │   ├── WhiteLabelEmbed.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── pages/            # Pages de l'application
│   │   │   ├── Home.tsx
│   │   │   ├── Admin.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── LegalNotice.tsx
│   │   │   ├── EspaceCourtiers.tsx
│   │   │   └── ...
│   │   ├── lib/              # Utilitaires
│   │   │   ├── trpc.ts
│   │   │   └── image-optimization.ts
│   │   ├── App.tsx           # Routes principales
│   │   └── index.css         # Styles globaux
│   └── index.html
├── server/                    # Backend tRPC
│   ├── _core/                # Infrastructure
│   ├── db.ts                 # Fonctions base de données
│   ├── routers.ts            # Routes tRPC
│   └── *.test.ts             # Tests unitaires
├── drizzle/                   # Schéma base de données
│   └── schema.ts
├── shared/                    # Code partagé client/server
│   ├── mortgage-calculator.ts # Algorithmes financiers
│   ├── utm-tracking.ts       # Tracking UTM
│   ├── seo-local.ts          # SEO local
│   └── data-b2b.ts           # Module Data B2B
├── docs/                      # Documentation complète
│   ├── CONFIGURATION.md
│   ├── ADMIN_GUIDE.md
│   ├── RGPD_GUIDE.md
│   ├── SEO_GUIDE.md
│   └── MULTI_ANGLE_GUIDE.md
├── package.json
├── README.md
└── todo.md
```

## ⚡ Installation Rapide

### Prérequis

- **Node.js**: 22.13.0+ (recommandé)
- **pnpm**: 10.4.1+
- **Base de données**: MySQL 8.0+ ou TiDB

### Étapes d'Installation

```bash
# 1. Cloner le projet
git clone https://github.com/votre-repo/simulateur-pret-immobilier.git
cd simulateur-pret-immobilier

# 2. Installer les dépendances
pnpm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Créer les tables de base de données
pnpm db:push

# 5. Lancer le serveur de développement
pnpm dev

# 6. Accéder au site
# http://localhost:3000
```

## 🔧 Configuration

### Variables d'Environnement Essentielles

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL=mysql://user:password@localhost:3306/simulateur_pret

# JWT & Auth
JWT_SECRET=your-super-secret-jwt-key-change-this

# Google Analytics 4
VITE_GA4_ID=G-XXXXXXXXXX

# Facebook Pixel
VITE_FB_PIXEL_ID=XXXXXXXXXX

# URLs
VITE_APP_URL=https://simulateur-pret.fr
VITE_API_URL=https://simulateur-pret.fr/api

# Affiliation (optionnel)
AFFILIATE_API_KEY=your-affiliate-api-key
```

Voir `docs/CONFIGURATION.md` pour la configuration complète.

## 📦 Scripts Disponibles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement
pnpm check            # Vérifier les types TypeScript
pnpm test             # Lancer les tests unitaires

# Base de données
pnpm db:push          # Créer/mettre à jour les tables

# Production
pnpm build            # Build pour production
pnpm start            # Lancer le serveur de production

# Qualité du code
pnpm format           # Formater le code avec Prettier
```

## 🎯 Fonctionnalités Principales

### 1. Calculateur Ultra-Réaliste

- **Algorithmes HCSF 2026**: Endettement max 35%, reste à vivre min 800€
- **Calcul temps réel**: Sliders interactifs, feedback instantané
- **Tableau d'amortissement**: 5 premières années + total
- **Graphiques**: Évolution capital/intérêts, répartition

### 2. Conversion Maximale

- **CTA mega-visible**: Gradient, texte incitatif
- **Trust signals**: Compteur social, satisfaction 98%, délai 24h
- **Modal optimisée**: Formulaire qualifié (email, téléphone, apport, zone, type bien)
- **Validation temps réel**: Format email/phone vérifié

### 3. Dashboard Admin

- **Gestion leads**: Tableau, filtres, recherche
- **Export CSV**: Automatique
- **Paramètres**: Taux d'intérêt configurables
- **Analytics**: Sources trafic, conversions

### 4. SEO & Conformité

- **Schema.org**: FinancialProduct, MortgageLoan, FAQPage
- **FAQ**: 10 questions complètes
- **Mentions légales**: SIRET, TVA, adresse, politique RGPD
- **Cookie banner**: CNIL conforme

### 5. Multi-Angle

- **Courtiers**: Page dédiée `/courtiers`
- **Agences**: White-label embed
- **Influenceurs**: Tracking UTM complet
- **SEO local**: 8 grandes villes françaises
- **Data B2B**: Anonymisation + insights

## 🔐 Sécurité & RGPD

- **HTTPS obligatoire**: Toutes les communications chiffrées
- **Données chiffrées**: En base de données
- **Cookie banner**: Conforme CNIL
- **Politique de confidentialité**: Complète
- **Délai suppression**: 36 mois

Voir `docs/RGPD_GUIDE.md` pour plus de détails.

## 📈 Performance

- **Core Web Vitals**: LCP < 1.5s, FID < 100ms, CLS < 0.1
- **Lighthouse**: Score > 90
- **Animations**: Framer Motion (60fps)
- **Images**: Lazy-load, WebP
- **CSS/JS**: Minifiés automatiquement

## 🧪 Tests

32 tests unitaires couvrant les algorithmes financiers :

```bash
pnpm test
```

Tous les tests passent ✅

## 📚 Documentation Complète

- **[CONFIGURATION.md](docs/CONFIGURATION.md)**: Configuration analytics, domaine, affiliation
- **[ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)**: Guide dashboard admin
- **[RGPD_GUIDE.md](docs/RGPD_GUIDE.md)**: Conformité RGPD
- **[SEO_GUIDE.md](docs/SEO_GUIDE.md)**: Optimisation SEO
- **[MULTI_ANGLE_GUIDE.md](docs/MULTI_ANGLE_GUIDE.md)**: Activation multi-angle

## 🚀 Déploiement

### Option 1: Manus (Recommandé)

1. Cliquez sur "Publish" dans le Management UI
2. Configurez votre domaine dans Settings → Domains
3. Le site est en ligne !

### Option 2: Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement
vercel env add DATABASE_URL
vercel env add JWT_SECRET
# ... autres variables
```

### Option 3: VPS (Ubuntu)

```bash
# 1. Installer Node.js et pnpm
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pnpm

# 2. Cloner et installer
git clone https://github.com/votre-repo/simulateur-pret-immobilier.git
cd simulateur-pret-immobilier
pnpm install

# 3. Build
pnpm build

# 4. Configurer PM2
npm install -g pm2
pm2 start dist/index.js --name simulateur-pret

# 5. Configurer Nginx
sudo nano /etc/nginx/sites-available/simulateur-pret
# ... configuration Nginx

# 6. SSL avec Let's Encrypt
sudo certbot --nginx -d simulateur-pret.fr
```

## 💰 Monétisation

### Affiliation (Primaire)

- **Courtiers partenaires**: Empruntis, Meilleurtaux, Vousfinancer
- **Commission**: 100-500€ par lead qualifié
- **Tracking**: UTM automatique
- **Dashboard**: Conversions en temps réel

### Google AdSense (Secondaire)

- **Emplacements**: Header léger + après résultats
- **Unités**: Responsive
- **Configuration**: `ads.txt` prêt

### Data B2B (Futur)

- **Insights marché**: Anonymisés, conformes RGPD
- **Clients**: Banques, courtiers, analystes
- **Format**: JSON, CSV, Markdown

## 📊 Métriques Clés

| Métrique | Objectif | Actuel |
|---|---|---|
| Trafic | 10K visiteurs/mois | À mesurer |
| Leads | 50 leads/mois | À mesurer |
| Taux conversion | 5%+ | À mesurer |
| CAC | < 10€ | À mesurer |
| Revenus | 5000€+/mois | À mesurer |

## 🔄 Roadmap

### Phase 1 (Mois 1-2)
- ✅ Site complet et fonctionnel
- ✅ Dashboard admin
- ✅ Multi-angle (courtiers, agences, influenceurs)
- 🔄 Lancement et tests A/B

### Phase 2 (Mois 3-4)
- 🔄 Optimisation conversion (A/B testing)
- 🔄 Intégration 3 courtiers partenaires
- 🔄 SEO local (8 villes)
- 🔄 Campagnes pub (Google Ads, Facebook)

### Phase 3 (Mois 5-6)
- 🔄 Scaling (5 calculateurs similaires)
- 🔄 Automatisation complète
- 🔄 Data B2B (insights marché)

## 🤝 Support

- **Documentation**: `docs/`
- **Issues**: GitHub Issues
- **Email**: support@simulateur-pret.fr

## 📄 Licence

Propriétaire. Tous droits réservés.

---

**Créé par Manus AI** - Machine à cash ultra-optimisée pour le marché français de l'immobilier.
