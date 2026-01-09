# 🔧 Guide de Configuration

Ce guide détaille toutes les configurations nécessaires pour déployer et exploiter le simulateur prêt immobilier.

## 📋 Table des Matières

1. [Variables d'Environnement](#variables-denvironnement)
2. [Configuration Analytics](#configuration-analytics)
3. [Configuration Domaine](#configuration-domaine)
4. [Configuration Affiliation](#configuration-affiliation)
5. [Configuration Taux d'Intérêt](#configuration-taux-dintérêt)
6. [Configuration Base de Données](#configuration-base-de-données)

---

## Variables d'Environnement

### Fichier `.env`

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# ===== BASE DE DONNÉES =====
DATABASE_URL=mysql://user:password@host:port/database
# Format: mysql://[user]:[password]@[host]:[port]/[database]
# Exemple: mysql://root:password@localhost:3306/simulateur_pret

# ===== AUTHENTIFICATION =====
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
# Générer avec: openssl rand -base64 32

# ===== ANALYTICS =====
VITE_GA4_ID=G-XXXXXXXXXX
# Google Analytics 4 Measurement ID
# Obtenir sur: https://analytics.google.com

VITE_FB_PIXEL_ID=XXXXXXXXXX
# Facebook Pixel ID
# Obtenir sur: https://business.facebook.com

# ===== URLS =====
VITE_APP_URL=https://simulateur-pret.fr
# URL publique du site (sans trailing slash)

VITE_API_URL=https://simulateur-pret.fr/api
# URL de l'API (généralement APP_URL + /api)

# ===== AFFILIATION (Optionnel) =====
AFFILIATE_API_KEY=your-affiliate-api-key
# Clé API pour les partenaires affiliés

EMPRUNTIS_PARTNER_ID=your-empruntis-id
MEILLEURTAUX_PARTNER_ID=your-meilleurtaux-id
VOUSFINANCER_PARTNER_ID=your-vousfinancer-id

# ===== EMAIL (Optionnel) =====
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
# Pour les alertes email nouveaux leads

# ===== SÉCURITÉ =====
ADMIN_PASSWORD=your-secure-admin-password
# Mot de passe pour accéder au dashboard admin
# Générer avec: openssl rand -base64 16

# ===== PRODUCTION =====
NODE_ENV=production
# development | production
```

### Fichier `.env.example`

Un fichier `.env.example` est fourni avec des valeurs par défaut. Copiez-le :

```bash
cp .env.example .env
```

---

## Configuration Analytics

### Google Analytics 4

#### 1. Créer une Propriété GA4

1. Allez sur https://analytics.google.com
2. Cliquez sur **Admin** (roue dentée en bas à gauche)
3. Cliquez sur **Créer une propriété**
4. Nom: "Simvan Digital"
5. Fuseau horaire: Europe/Paris
6. Devise: EUR
7. Cliquez sur **Suivant**

#### 2. Configurer le Flux de Données

1. Sélectionnez **Web**
2. URL du site web: `https://simulateur-pret.fr`
3. Nom du flux: "Site Principal"
4. Cliquez sur **Créer un flux**

#### 3. Récupérer l'ID de Mesure

1. Dans le flux créé, copiez l'**ID de mesure** (format: `G-XXXXXXXXXX`)
2. Ajoutez-le dans `.env` :
   ```env
   VITE_GA4_ID=G-XXXXXXXXXX
   ```

#### 4. Configurer les Événements

Les événements suivants sont automatiquement trackés :

| Événement | Description | Paramètres |
|---|---|---|
| `simulation_start` | Utilisateur commence une simulation | - |
| `simulation_complete` | Simulation terminée | `loan_amount`, `duration`, `rate` |
| `lead_submit` | Formulaire lead soumis | `loan_amount`, `location` |
| `cta_click` | Clic sur CTA principal | `cta_text` |
| `page_view` | Vue de page | `page_path`, `page_title` |

#### 5. Créer des Conversions

1. Dans GA4, allez dans **Événements**
2. Cliquez sur **Marquer comme conversion** pour :
   - `lead_submit`
   - `simulation_complete`

### Facebook Pixel

#### 1. Créer un Pixel

1. Allez sur https://business.facebook.com
2. Cliquez sur **Events Manager**
3. Cliquez sur **Connecter des sources de données**
4. Sélectionnez **Web**
5. Cliquez sur **Connecter**
6. Nom: "Simvan Digital"
7. URL: `https://simulateur-pret.fr`
8. Cliquez sur **Continuer**

#### 2. Récupérer le Pixel ID

1. Dans Events Manager, cliquez sur votre Pixel
2. Copiez le **Pixel ID** (format: `XXXXXXXXXX`)
3. Ajoutez-le dans `.env` :
   ```env
   VITE_FB_PIXEL_ID=XXXXXXXXXX
   ```

#### 3. Événements Trackés

| Événement | Description |
|---|---|
| `PageView` | Vue de page |
| `Lead` | Formulaire lead soumis |
| `CompleteRegistration` | Simulation complétée |
| `ViewContent` | Vue des résultats |

#### 4. Vérifier l'Installation

1. Installez l'extension Chrome **Facebook Pixel Helper**
2. Accédez à votre site
3. Vérifiez que le Pixel est détecté

---

## Configuration Domaine

### Option 1: Domaine Manus

1. Allez dans **Settings → Domains**
2. Cliquez sur **Purchase a domain**
3. Recherchez `simulateur-pret.fr`
4. Achetez le domaine
5. La configuration DNS se fait automatiquement

### Option 2: Domaine Externe

#### A. Acheter un Domaine

Recommandations :
- **OVH**: https://www.ovh.com/fr/
- **Gandi**: https://www.gandi.net/fr
- **Namecheap**: https://www.namecheap.com/

Prix: 10-15€/an pour un `.fr`

#### B. Configurer les DNS

Ajoutez les enregistrements DNS suivants :

| Type | Nom | Valeur | TTL |
|---|---|---|---|
| A | @ | `IP_DU_SERVEUR` | 3600 |
| A | www | `IP_DU_SERVEUR` | 3600 |
| CNAME | www | `simulateur-pret.fr` | 3600 |

#### C. Configurer SSL (Let's Encrypt)

```bash
# Installer Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtenir un certificat
sudo certbot --nginx -d simulateur-pret.fr -d www.simulateur-pret.fr

# Renouvellement automatique
sudo certbot renew --dry-run
```

---

## Configuration Affiliation

### Courtiers Partenaires

#### 1. Empruntis

1. Créez un compte partenaire sur https://www.empruntis.com/partenaires
2. Récupérez votre **Partner ID**
3. Ajoutez-le dans `.env` :
   ```env
   EMPRUNTIS_PARTNER_ID=your-empruntis-id
   ```
4. Dans le dashboard admin (`/admin`), allez dans **Paramètres → Affiliés**
5. Ajoutez Empruntis :
   - Nom: Empruntis
   - URL: `https://www.empruntis.com/pret-immobilier?partner={{PARTNER_ID}}&utm_source={{UTM_SOURCE}}`
   - Commission: 250€

#### 2. Meilleurtaux

1. Créez un compte partenaire sur https://www.meilleurtaux.com/partenaires
2. Récupérez votre **Partner ID**
3. Ajoutez-le dans `.env` :
   ```env
   MEILLEURTAUX_PARTNER_ID=your-meilleurtaux-id
   ```
4. Dans le dashboard admin, ajoutez Meilleurtaux :
   - Nom: Meilleurtaux
   - URL: `https://www.meilleurtaux.com/credit-immobilier/simulation.html?partenaire={{PARTNER_ID}}`
   - Commission: 300€

#### 3. Vousfinancer

1. Créez un compte partenaire sur https://www.vousfinancer.com/partenaires
2. Récupérez votre **Partner ID**
3. Ajoutez-le dans `.env` :
   ```env
   VOUSFINANCER_PARTNER_ID=your-vousfinancer-id
   ```
4. Dans le dashboard admin, ajoutez Vousfinancer :
   - Nom: Vousfinancer
   - URL: `https://www.vousfinancer.com/credit-immobilier?pid={{PARTNER_ID}}`
   - Commission: 200€

### Tracking UTM

Les paramètres UTM sont automatiquement ajoutés aux redirections :

```
utm_source=simulateur-pret
utm_medium=affiliate
utm_campaign=lead-{LEAD_ID}
utm_content={LOAN_AMOUNT}
```

---

## Configuration Taux d'Intérêt

### Dashboard Admin

1. Allez sur `/admin`
2. Cliquez sur **Paramètres**
3. Modifiez les taux par défaut :

| Durée | Taux | Assurance |
|---|---|---|
| 10 ans | 3.20% | 0.30% |
| 15 ans | 3.35% | 0.30% |
| 20 ans | 3.50% | 0.30% |
| 25 ans | 3.65% | 0.30% |

4. Cliquez sur **Enregistrer**

### Base de Données

Vous pouvez aussi modifier les taux directement en base :

```sql
UPDATE settings SET value = '3.50' WHERE key = 'default_rate_20';
UPDATE settings SET value = '0.30' WHERE key = 'insurance_rate';
```

---

## Configuration Base de Données

### MySQL Local

```bash
# Installer MySQL
sudo apt-get install mysql-server

# Créer la base de données
mysql -u root -p
CREATE DATABASE simulateur_pret CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'simulateur'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON simulateur_pret.* TO 'simulateur'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Ajouter dans .env
DATABASE_URL=mysql://simulateur:password@localhost:3306/simulateur_pret
```

### TiDB Cloud (Recommandé pour Production)

1. Créez un compte sur https://tidbcloud.com
2. Créez un cluster (gratuit jusqu'à 5GB)
3. Récupérez la chaîne de connexion
4. Ajoutez-la dans `.env` :
   ```env
   DATABASE_URL=mysql://user:password@gateway.tidbcloud.com:4000/simulateur_pret?ssl={"rejectUnauthorized":true}
   ```

### Migrations

```bash
# Créer les tables
pnpm db:push

# Vérifier les tables créées
mysql -u simulateur -p simulateur_pret
SHOW TABLES;
```

---

## Vérification de la Configuration

### Checklist

- [ ] `.env` créé et rempli
- [ ] Base de données créée et accessible
- [ ] Google Analytics 4 configuré
- [ ] Facebook Pixel configuré
- [ ] Domaine configuré et SSL actif
- [ ] Courtiers partenaires ajoutés
- [ ] Taux d'intérêt configurés
- [ ] Tests de connexion réussis

### Tests

```bash
# Test de connexion base de données
pnpm db:push

# Test de build
pnpm build

# Test des analytics (en dev)
pnpm dev
# Ouvrir http://localhost:3000 et vérifier les événements dans GA4

# Test de production
pnpm start
```

---

## Support

Pour toute question sur la configuration :
- **Documentation**: `docs/`
- **Email**: support@simulateur-pret.fr
