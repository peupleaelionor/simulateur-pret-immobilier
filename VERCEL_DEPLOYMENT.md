# 🚀 Déploiement Vercel - Simulateur de Prêt Immobilier

## ✅ Étape 1 : Dépôt GitHub créé
Le code source a été poussé sur GitHub :
**https://github.com/peupleaelionor/simulateur-pret-immobilier**

## 📋 Étape 2 : Importer le projet sur Vercel

### Option A : Via l'interface web Vercel (Recommandé)

1. **Accéder à Vercel**
   - Allez sur https://vercel.com
   - Connectez-vous avec votre compte

2. **Créer un nouveau projet**
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez "Import Git Repository"
   - Choisissez le dépôt : `peupleaelionor/simulateur-pret-immobilier`

3. **Configurer le projet**
   - **Framework Preset** : Vite
   - **Root Directory** : `./`
   - **Build Command** : `pnpm build`
   - **Output Directory** : `dist/public`
   - **Install Command** : `pnpm install`

4. **Ajouter les variables d'environnement**
   Cliquez sur "Environment Variables" et ajoutez :
   
   ```
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-enough
   VITE_GA4_ID=G-XXXXXXXXXX
   VITE_FB_PIXEL_ID=XXXXXXXXXX
   VITE_APP_URL=https://votre-domaine.vercel.app
   VITE_API_URL=https://votre-domaine.vercel.app/api
   ADMIN_PASSWORD=admin123
   NODE_ENV=production
   ```

5. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes
   - Votre site sera en ligne !

### Option B : Via la CLI Vercel

Si vous préférez utiliser la ligne de commande :

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer
cd /home/ubuntu/simulateur-pret-immobilier
vercel --prod
```

## ⚙️ Configuration Base de Données

**Important** : Ce projet nécessite une base de données MySQL/TiDB.

### Options recommandées :

1. **TiDB Cloud** (Gratuit jusqu'à 5GB)
   - Allez sur https://tidbcloud.com
   - Créez un cluster gratuit
   - Copiez la chaîne de connexion
   - Ajoutez-la comme variable `DATABASE_URL` sur Vercel

2. **PlanetScale** (Gratuit jusqu'à 5GB)
   - Allez sur https://planetscale.com
   - Créez une base de données
   - Copiez la chaîne de connexion
   - Ajoutez-la comme variable `DATABASE_URL` sur Vercel

3. **Railway** (Gratuit avec limite)
   - Allez sur https://railway.app
   - Créez un service MySQL
   - Copiez la chaîne de connexion
   - Ajoutez-la comme variable `DATABASE_URL` sur Vercel

### Initialiser la base de données

Une fois la base de données configurée :

```bash
# Installer les dépendances
pnpm install

# Créer les tables
pnpm db:push
```

## 🔧 Configuration Post-Déploiement

### 1. Mettre à jour les URLs
Une fois déployé, mettez à jour les variables d'environnement avec l'URL réelle :
- `VITE_APP_URL` : https://votre-domaine.vercel.app
- `VITE_API_URL` : https://votre-domaine.vercel.app/api

### 2. Configurer Analytics
- Remplacez `G-XXXXXXXXXX` par votre ID Google Analytics 4
- Remplacez `XXXXXXXXXX` par votre ID Facebook Pixel

### 3. Accéder au Dashboard Admin
- URL : https://votre-domaine.vercel.app/admin
- Mot de passe : celui défini dans `ADMIN_PASSWORD`

### 4. Domaine personnalisé (Optionnel)
Pour ajouter un domaine personnalisé :
1. Allez dans Settings → Domains sur Vercel
2. Ajoutez votre domaine (ex: simulateur-pret.fr)
3. Configurez les DNS selon les instructions

## 📊 Vérifications Post-Déploiement

- [ ] Site accessible via HTTPS
- [ ] Calculateur de prêt fonctionne
- [ ] Formulaire de lead fonctionne
- [ ] Dashboard admin accessible
- [ ] Base de données connectée
- [ ] Analytics trackent correctement

## 🆘 Dépannage

### Erreur de build
- Vérifiez que toutes les dépendances sont installées
- Vérifiez les logs de build sur Vercel

### Erreur de base de données
- Vérifiez que `DATABASE_URL` est correctement configuré
- Vérifiez que les tables sont créées avec `pnpm db:push`

### Erreur 500
- Vérifiez les logs de fonction sur Vercel
- Vérifiez que toutes les variables d'environnement sont définies

## 📞 Support

Pour toute question :
- Documentation : https://vercel.com/docs
- GitHub : https://github.com/peupleaelionor/simulateur-pret-immobilier
