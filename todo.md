# Simulateur Prêt Immobilier - TODO

## Phase 1: Configuration initiale
- [x] Schéma base de données (leads, settings, analytics)
- [x] Configuration thème visuel épuré conversion-first
- [x] Structure des routes (/, /faq, /mentions-legales, /admin, /merci, /guide-premier-achat, /comparatif-assurances)

## Phase 2: Calculateur de prêt
- [x] Algorithme capacité d'emprunt (revenus * 0.35 - charges)
- [x] Calcul mensualités (formule actuarielle)
- [x] Tableau d'amortissement complet (capital, intérêts, assurance)
- [x] Règles endettement max 35%
- [x] Reste à vivre minimum 800€
- [x] Prise en compte assurance 0.30%, garantie 1%, frais dossier 1%
- [x] Slider interactif durée/taux avec feedback temps réel
- [x] Calculateur brut→net intégré

## Phase 3: Composants UI conversion
- [x] Formulaire lead une étape (email, téléphone, montant, RGPD)
- [x] Validation temps réel email/téléphone
- [x] Modal conversion avec trust signals
- [x] Compteur social ("1247 clients satisfaits")
- [x] Affichage résultat principal "Vous pouvez emprunter: XXX€"
- [x] Graphique répartition capital/intérêts (Recharts)
- [x] Tableau détaillé 5 premières années + total
- [x] Page de remerciement avec tracking UTM

## Phase 4: Dashboard admin
- [x] Route /admin protégée (authentification Manus OAuth)
- [x] Tableau de bord leads (nombre, qualité, conversion)
- [x] Export CSV automatique
- [x] Analytics intégré (sources trafic)
- [x] Page paramètres (modifier taux d'intérêt par défaut)
- [ ] Alertes email nouveaux leads (à configurer)

## Phase 5: SEO et conformité
- [x] Schema.org (FinancialProduct, MortgageLoan, FAQPage)
- [x] FAQ 10 questions (taux fixe vs variable, apport minimum, etc.)
- [x] Mentions légales complètes
- [x] Cookie banner conforme CNIL
- [x] Meta descriptions optimisées
- [x] Robots.txt
- [ ] Sitemap XML dynamique

## Phase 6: Analytics et affiliation
- [x] Tracking analytics interne (page views, events)
- [x] Architecture affiliation prête (table affiliates)
- [x] Tracking UTM redirections
- [ ] Google Analytics 4 (à configurer avec ID)
- [ ] Emplacements AdSense (à configurer avec ID)

## Phase 7: Pages additionnelles
- [x] /guide-premier-achat (placeholder)
- [x] /comparatif-assurances (placeholder)

## Phase 8: Performance et tests
- [x] Tests unitaires algorithmes financiers (32 tests passés)
- [x] Tests intégration formulaire lead
- [ ] Core Web Vitals optimization
- [ ] Lighthouse score > 90

## Phase 9: Optimisation conversion MAXIMAL
- [x] Formulaire lead ultra-visible (repositionner/redimensionner)
- [x] Trust signals agressifs (compteur social, logos, témoignages)
- [x] CTA principal hyper-visible (couleur, taille, position)
- [x] Calcul temps réel (suppression bouton "Calculer")
- [x] Sections confiance avec logos partenaires
- [x] Compteur "X simulations ce mois"
- [x] Témoignages clients

## Phase 10: Monétisation multi-canal
- [x] Google Analytics 4 (tracking events: simulation, lead)
- [x] Facebook Pixel (retargeting)
- [ ] Emplacements AdSense (header + après résultats)
- [x] Tracking UTM pour affiliation
- [x] Dashboard leads avec métriques de conversion
- [x] Export leads pour partenaires

## Phase 11: Suite de calculateurs
- [ ] Planifier: Calcul-indemnite-licenciement.fr
- [ ] Planifier: Calculer-impots.fr
- [ ] Planifier: Generer-cerfa.fr
- [ ] Template réutilisable pour nouveaux sites

## Phase 12: Crédibilité légale et transparence
- [x] Page Mentions Légales/Qui sommes-nous avec données société
- [x] Politique de Confidentialité complète
- [x] Textes d'aide dans le formulaire (revenus, apport, etc.)
- [x] Qualifier les leads (apport, zone géographique, type bien)
- [x] Footer avec liens légaux
- [x] Compteur dynamique qui s'incrémente réellement
- [x] Disclaimer indicatif au-dessus des résultats


## Phase 13: OPTIMISATIONS MAXIMALES (ZIP FINAL)
- [ ] Animations avancées (fade-in, slide-up, transitions smooth)
- [ ] Micro-interactions sur sliders (haptic feedback visuel)
- [ ] Loading states explicites avec skeletons
- [ ] Transitions entre onglets graphiques optimisées
- [ ] Optimisation images (WebP, lazy-load, compression)
- [ ] Minification CSS/JS automatique
- [ ] Core Web Vitals < 1.5s LCP, < 100ms FID, < 0.1 CLS
- [ ] Lighthouse score > 95

## Phase 14: MULTI-ANGLE
- [x] Page Espace Courtiers (landing page dédiée)
- [x] Version White-label pour agences immobilières
- [x] Iframe embed pour intégration externe
- [x] Liens UTM pour influenceurs
- [x] Pages SEO locales dynamiques (Paris, Lyon, Marseille, etc.)
- [x] Module Data B2B (anonymisation + insights)
- [ ] Documentation activation multi-angle

## Phase 15: DOCUMENTATION COMPLÈTE
- [ ] README.md détaillé (arborescence, prérequis, commandes)
- [ ] Guide de configuration (analytics, domaine, affiliation, taux)
- [ ] Guide admin (dashboard, leads, export, paramètres)
- [ ] Guide RGPD (mentions légales, politique, disclaimer, cookies)
- [ ] Guide SEO et performance (Schema.org, meta tags, optimisations)
- [ ] Guide multi-angle (activation courtiers, agences, influenceurs, SEO, data)
- [ ] Scripts de déploiement automatisés

## Phase 16: PACKAGE ZIP FINAL
- [ ] Vérification dépendances complètes
- [ ] Scripts build et deploy prêts
- [ ] Configuration environnement (.env.example)
- [ ] Tests finaux de tous les modules
- [ ] Création archive ZIP autonome
- [ ] Validation package prêt pour production
