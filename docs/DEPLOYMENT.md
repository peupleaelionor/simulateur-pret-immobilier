# 🚀 Guide de Déploiement

Ce guide explique comment déployer le simulateur prêt immobilier en production.

## 📋 Options de Déploiement

1. **Manus** (Recommandé) - Le plus simple
2. **Vercel** - Gratuit jusqu'à 100GB bandwidth
3. **VPS** (Ubuntu) - Contrôle total

---

## Option 1: Manus (Recommandé)

### Avantages
- ✅ Déploiement en 1 clic
- ✅ SSL automatique
- ✅ Base de données incluse
- ✅ Domaine personnalisé facile

### Étapes

1. **Publier le site**
   - Cliquez sur "Publish" dans le Management UI
   - Attendez 2-3 minutes

2. **Configurer le domaine**
   - Allez dans Settings → Domains
   - Achetez `simulateur-pret.fr` ou connectez un domaine existant
   - La configuration DNS se fait automatiquement

3. **Configurer les variables d'environnement**
   - Remplacez les IDs analytics dans `client/index.html`
   - Configurez les courtiers partenaires dans le dashboard admin

4. **Tester**
   - Accédez à votre domaine
   - Testez le calculateur et le formulaire de lead
   - Vérifiez les leads dans `/admin`

---

## Option 2: Vercel

### Prérequis
- Compte Vercel (gratuit)
- Compte GitHub
- Base de données MySQL/TiDB

### Étapes

1. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/votre-repo/simulateur-pret-immobilier.git
   git push -u origin main
   ```

2. **Connecter à Vercel**
   - Allez sur https://vercel.com
   - Cliquez sur "New Project"
   - Importez votre repo GitHub
   - Framework Preset: Vite
   - Root Directory: `./`

3. **Configurer les variables d'environnement**
   ```bash
   # Dans Vercel Dashboard → Settings → Environment Variables
   DATABASE_URL=mysql://...
   JWT_SECRET=...
   VITE_GA4_ID=G-XXXXXXXXXX
   VITE_FB_PIXEL_ID=XXXXXXXXXX
   # ... autres variables
   ```

4. **Déployer**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes
   - Votre site est en ligne !

5. **Configurer le domaine**
   - Allez dans Settings → Domains
   - Ajoutez `simulateur-pret.fr`
   - Configurez les DNS selon les instructions

---

## Option 3: VPS (Ubuntu)

### Prérequis
- VPS Ubuntu 22.04+ (2GB RAM minimum)
- Accès SSH
- Nom de domaine

### Étapes

1. **Installer Node.js et pnpm**
   ```bash
   # Se connecter au VPS
   ssh root@votre-ip

   # Installer Node.js 22
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Installer pnpm
   npm install -g pnpm

   # Vérifier
   node -v  # v22.x.x
   pnpm -v  # 10.x.x
   ```

2. **Installer MySQL**
   ```bash
   sudo apt-get install mysql-server
   sudo mysql_secure_installation

   # Créer la base de données
   sudo mysql
   CREATE DATABASE simulateur_pret CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'simulateur'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON simulateur_pret.* TO 'simulateur'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Cloner et installer le projet**
   ```bash
   cd /var/www
   git clone https://github.com/votre-repo/simulateur-pret-immobilier.git
   cd simulateur-pret-immobilier
   pnpm install
   ```

4. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   nano .env
   # Remplir les valeurs
   ```

5. **Créer les tables**
   ```bash
   pnpm db:push
   ```

6. **Build**
   ```bash
   pnpm build
   ```

7. **Installer PM2**
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name simulateur-pret
   pm2 save
   pm2 startup
   ```

8. **Installer Nginx**
   ```bash
   sudo apt-get install nginx

   # Créer la configuration
   sudo nano /etc/nginx/sites-available/simulateur-pret
   ```

   Contenu du fichier :
   ```nginx
   server {
       listen 80;
       server_name simulateur-pret.fr www.simulateur-pret.fr;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Activer le site :
   ```bash
   sudo ln -s /etc/nginx/sites-available/simulateur-pret /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Installer SSL (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d simulateur-pret.fr -d www.simulateur-pret.fr
   ```

10. **Configurer le renouvellement automatique**
    ```bash
    sudo certbot renew --dry-run
    ```

---

## Post-Déploiement

### 1. Vérifier le Site

- [ ] Site accessible via HTTPS
- [ ] Calculateur fonctionne
- [ ] Formulaire lead fonctionne
- [ ] Dashboard admin accessible
- [ ] Analytics trackent
- [ ] Cookie banner s'affiche

### 2. Configurer les Analytics

- [ ] Remplacer `G-XXXXXXXXXX` par votre ID GA4
- [ ] Remplacer `XXXXXXXXXX` par votre ID Facebook Pixel
- [ ] Vérifier les événements dans GA4
- [ ] Vérifier le Pixel avec Facebook Pixel Helper

### 3. Ajouter les Courtiers Partenaires

- [ ] Aller dans `/admin` → Paramètres → Affiliés
- [ ] Ajouter Empruntis
- [ ] Ajouter Meilleurtaux
- [ ] Ajouter Vousfinancer

### 4. Tester la Conversion

- [ ] Remplir le calculateur
- [ ] Cliquer sur "OBTENIR MES 3 OFFRES"
- [ ] Soumettre le formulaire
- [ ] Vérifier le lead dans `/admin`
- [ ] Vérifier l'événement dans GA4

---

## Maintenance

### Sauvegardes

#### Base de Données (Quotidien)

```bash
# Créer un backup
mysqldump -u simulateur -p simulateur_pret > backup_$(date +%Y%m%d).sql

# Restaurer un backup
mysql -u simulateur -p simulateur_pret < backup_20260115.sql
```

#### Code (Avant chaque mise à jour)

```bash
# Créer une branche de backup
git checkout -b backup-$(date +%Y%m%d)
git push origin backup-$(date +%Y%m%d)
```

### Mises à Jour

```bash
# Pull les dernières modifications
git pull origin main

# Installer les nouvelles dépendances
pnpm install

# Mettre à jour la base de données
pnpm db:push

# Rebuild
pnpm build

# Redémarrer PM2
pm2 restart simulateur-pret
```

### Monitoring

#### Logs

```bash
# Logs PM2
pm2 logs simulateur-pret

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

#### Performance

```bash
# Vérifier l'utilisation CPU/RAM
pm2 monit

# Vérifier l'espace disque
df -h

# Vérifier la base de données
mysql -u simulateur -p
SHOW PROCESSLIST;
```

---

## Troubleshooting

### Problème: Site inaccessible

**Solutions**:
1. Vérifier que PM2 tourne : `pm2 status`
2. Vérifier Nginx : `sudo systemctl status nginx`
3. Vérifier les logs : `pm2 logs simulateur-pret`

### Problème: Base de données inaccessible

**Solutions**:
1. Vérifier MySQL : `sudo systemctl status mysql`
2. Vérifier la connexion : `mysql -u simulateur -p`
3. Vérifier DATABASE_URL dans `.env`

### Problème: SSL expiré

**Solutions**:
```bash
sudo certbot renew
sudo systemctl restart nginx
```

---

## Support

Pour toute question sur le déploiement :
- **Documentation**: `docs/`
- **Email**: support@simulateur-pret.fr
