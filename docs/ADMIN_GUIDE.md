# 📊 Guide Dashboard Admin

Ce guide explique comment utiliser le dashboard admin pour gérer les leads, configurer les paramètres, et suivre les conversions.

## 🔐 Accès au Dashboard

### URL

```
https://simulateur-pret.fr/admin
```

### Authentification

Le dashboard est protégé par Manus OAuth. Seul le propriétaire du projet peut y accéder.

---

## 📋 Vue d'Ensemble

Le dashboard admin contient 4 onglets principaux :

1. **Leads**: Gestion des leads collectés
2. **Paramètres**: Configuration des taux et affiliés
3. **Analytics**: Statistiques et conversions
4. **Export**: Export CSV des données

---

## 👥 Gestion des Leads

### Tableau des Leads

Le tableau affiche tous les leads collectés avec les informations suivantes :

| Colonne | Description |
|---|---|
| **ID** | Identifiant unique du lead |
| **Date** | Date de soumission |
| **Email** | Email du lead |
| **Téléphone** | Numéro de téléphone |
| **Montant** | Montant emprunté |
| **Durée** | Durée du prêt (années) |
| **Apport** | Apport personnel |
| **Zone** | Zone géographique |
| **Type Bien** | Type de bien (appartement, maison, etc.) |
| **Statut** | Nouveau / Contacté / Converti |

### Filtres

Utilisez les filtres pour affiner la recherche :

- **Par date**: Aujourd'hui, Cette semaine, Ce mois, Personnalisé
- **Par statut**: Tous, Nouveau, Contacté, Converti
- **Par montant**: < 100K, 100-200K, 200-300K, > 300K
- **Par zone**: Paris, Lyon, Marseille, etc.

### Recherche

Recherchez un lead par :
- Email
- Téléphone
- ID

### Actions

Pour chaque lead, vous pouvez :

#### 1. Voir les Détails

Cliquez sur un lead pour voir tous les détails :

```
Lead #12345
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Informations Contact
• Email: jean.dupont@example.com
• Téléphone: 06 12 34 56 78
• Date: 15/01/2026 14:32

Projet Immobilier
• Montant emprunté: 250 000€
• Durée: 20 ans
• Taux: 3.50%
• Mensualité: 1 450€
• Apport: 50 000€
• Zone: Paris (75)
• Type de bien: Appartement

Simulation
• Capacité d'emprunt: 250 000€
• Coût total crédit: 98 000€
• Reste à vivre: 1 200€
• Taux d'endettement: 33%

Tracking
• Source UTM: google
• Medium UTM: cpc
• Campaign UTM: janvier2026
• Referrer: https://www.google.com

Statut
• Actuel: Nouveau
• Converti: Non
```

#### 2. Changer le Statut

Cliquez sur le menu déroulant **Statut** et sélectionnez :
- **Nouveau**: Lead non traité
- **Contacté**: Lead contacté par un courtier
- **Converti**: Lead devenu client

#### 3. Exporter

Cliquez sur **Exporter** pour télécharger les détails du lead en PDF.

### Export CSV

Cliquez sur **Exporter CSV** en haut à droite pour télécharger tous les leads filtrés.

Format CSV :

```csv
ID,Date,Email,Téléphone,Montant,Durée,Taux,Mensualité,Apport,Zone,Type Bien,Statut,UTM Source,UTM Medium,UTM Campaign
12345,2026-01-15,jean.dupont@example.com,0612345678,250000,20,3.50,1450,50000,Paris,Appartement,Nouveau,google,cpc,janvier2026
```

---

## ⚙️ Paramètres

### Taux d'Intérêt

Configurez les taux par défaut utilisés dans le calculateur :

#### Taux par Durée

| Durée | Taux Actuel | Modifier |
|---|---|---|
| 10 ans | 3.20% | ✏️ |
| 15 ans | 3.35% | ✏️ |
| 20 ans | 3.50% | ✏️ |
| 25 ans | 3.65% | ✏️ |

Cliquez sur ✏️ pour modifier un taux.

#### Autres Paramètres

| Paramètre | Valeur | Description |
|---|---|---|
| **Taux assurance** | 0.30% | Taux d'assurance emprunteur |
| **Frais de garantie** | 1.00% | Frais de garantie (hypothèque) |
| **Frais de dossier** | 1.00% | Frais de dossier bancaire |
| **Taux endettement max** | 35% | Taux d'endettement maximum (HCSF) |
| **Reste à vivre min** | 800€ | Reste à vivre minimum |

### Affiliés

Gérez vos partenaires courtiers :

#### Liste des Affiliés

| Nom | URL | Commission | Actif |
|---|---|---|---|
| Empruntis | https://www.empruntis.com/... | 250€ | ✅ |
| Meilleurtaux | https://www.meilleurtaux.com/... | 300€ | ✅ |
| Vousfinancer | https://www.vousfinancer.com/... | 200€ | ✅ |

#### Ajouter un Affilié

1. Cliquez sur **Ajouter un affilié**
2. Remplissez le formulaire :
   ```
   Nom: Nom du courtier
   URL: https://www.courtier.com/pret?partner={{PARTNER_ID}}
   Commission: 250
   Actif: ✅
   ```
3. Cliquez sur **Enregistrer**

#### Modifier un Affilié

1. Cliquez sur ✏️ à côté de l'affilié
2. Modifiez les champs
3. Cliquez sur **Enregistrer**

#### Désactiver un Affilié

Décochez la case **Actif** pour désactiver temporairement un affilié.

### Notifications

Configurez les alertes email pour les nouveaux leads :

```
Email de notification: admin@simulateur-pret.fr
Fréquence: Immédiate / Quotidienne / Hebdomadaire
Format: Email / SMS / Webhook
```

---

## 📈 Analytics

### Vue d'Ensemble

Tableau de bord avec les métriques clés :

```
┌─────────────────────────────────────────────────┐
│  Aujourd'hui                                    │
├─────────────────────────────────────────────────┤
│  👥 Visiteurs: 245                              │
│  📊 Simulations: 87                             │
│  ✅ Leads: 4                                    │
│  💰 Taux conversion: 4.6%                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Ce mois                                        │
├─────────────────────────────────────────────────┤
│  👥 Visiteurs: 8,234                            │
│  📊 Simulations: 2,947                          │
│  ✅ Leads: 147                                  │
│  💰 Taux conversion: 5.0%                       │
│  💵 Revenus estimés: 36,750€                    │
└─────────────────────────────────────────────────┘
```

### Graphiques

#### 1. Évolution du Trafic

Graphique linéaire montrant :
- Visiteurs uniques
- Simulations
- Leads

Par jour / semaine / mois

#### 2. Sources de Trafic

Graphique camembert :
- Google (45%)
- Facebook (25%)
- Direct (15%)
- Autres (15%)

#### 3. Taux de Conversion

Graphique en barres :
- Par source
- Par landing page
- Par campagne

#### 4. Revenus

Graphique en aires :
- Revenus affiliation
- Revenus AdSense
- Revenus Data B2B

### Rapports

#### Rapport Mensuel

Téléchargez le rapport mensuel en PDF :

```
Rapport Mensuel - Janvier 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Performance
• Visiteurs: 8,234 (+15% vs déc.)
• Simulations: 2,947 (+12% vs déc.)
• Leads: 147 (+18% vs déc.)
• Taux conversion: 5.0% (+0.3% vs déc.)

Revenus
• Affiliation: 36,750€
• AdSense: 1,200€
• Total: 37,950€

Top Sources
1. Google: 3,705 visiteurs (45%)
2. Facebook: 2,058 visiteurs (25%)
3. Direct: 1,235 visiteurs (15%)

Top Villes
1. Paris: 45 leads
2. Lyon: 18 leads
3. Marseille: 12 leads
```

#### Rapport Annuel

Téléchargez le rapport annuel en PDF avec :
- Évolution mensuelle
- Comparaison année précédente
- Prévisions année suivante

---

## 🔄 Workflows Recommandés

### Workflow 1: Traitement Quotidien des Leads

1. **Matin (9h)**
   - Accédez au dashboard admin
   - Filtrez par "Aujourd'hui" + "Nouveau"
   - Exportez la liste en CSV
   - Envoyez aux courtiers partenaires

2. **Midi (12h)**
   - Vérifiez les conversions
   - Mettez à jour les statuts (Contacté)

3. **Soir (18h)**
   - Vérifiez les analytics
   - Notez les anomalies

### Workflow 2: Optimisation Hebdomadaire

1. **Lundi**
   - Analysez les performances de la semaine précédente
   - Identifiez les sources à faible conversion
   - Ajustez les campagnes pub

2. **Mercredi**
   - Vérifiez les taux d'intérêt (mettre à jour si nécessaire)
   - Testez le calculateur
   - Vérifiez les liens affiliés

3. **Vendredi**
   - Exportez le rapport hebdomadaire
   - Planifiez les actions pour la semaine suivante

### Workflow 3: Reporting Mensuel

1. **1er du mois**
   - Téléchargez le rapport mensuel
   - Calculez les commissions affiliés
   - Facturez les courtiers partenaires

2. **5 du mois**
   - Analysez les tendances
   - Ajustez la stratégie SEO
   - Planifiez les campagnes du mois

---

## 🛠️ Dépannage

### Problème: Leads ne s'affichent pas

**Solution**:
1. Vérifiez la connexion à la base de données
2. Vérifiez les logs serveur :
   ```bash
   pm2 logs simulateur-pret
   ```
3. Vérifiez que les tables existent :
   ```sql
   SHOW TABLES;
   SELECT * FROM leads LIMIT 10;
   ```

### Problème: Export CSV vide

**Solution**:
1. Vérifiez les filtres appliqués
2. Vérifiez qu'il y a des leads dans la période sélectionnée
3. Essayez sans filtre

### Problème: Analytics ne se mettent pas à jour

**Solution**:
1. Vérifiez que Google Analytics est configuré
2. Attendez 24-48h pour les premières données
3. Vérifiez le code de tracking dans `client/index.html`

---

## 📞 Support

Pour toute question sur le dashboard admin :
- **Documentation**: `docs/`
- **Email**: support@simulateur-pret.fr
