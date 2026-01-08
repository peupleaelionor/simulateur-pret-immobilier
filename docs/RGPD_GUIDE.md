# 🔐 Guide RGPD & Conformité

Ce guide explique comment le simulateur prêt immobilier est conforme au RGPD et aux régulations françaises.

## 📋 Table des Matières

1. [Vue d'Ensemble RGPD](#vue-densemble-rgpd)
2. [Données Collectées](#données-collectées)
3. [Base Légale](#base-légale)
4. [Droits des Utilisateurs](#droits-des-utilisateurs)
5. [Sécurité des Données](#sécurité-des-données)
6. [Cookie Banner](#cookie-banner)
7. [Mentions Légales](#mentions-légales)
8. [Politique de Confidentialité](#politique-de-confidentialité)

---

## Vue d'Ensemble RGPD

Le **Règlement Général sur la Protection des Données** (RGPD) est une régulation européenne qui protège les données personnelles des citoyens.

### Principes Clés

1. **Licéité**: Traitement basé sur une base légale
2. **Transparence**: Informer clairement les utilisateurs
3. **Minimisation**: Collecter uniquement les données nécessaires
4. **Exactitude**: Maintenir les données à jour
5. **Limitation**: Conserver les données uniquement le temps nécessaire
6. **Intégrité**: Sécuriser les données
7. **Responsabilité**: Démontrer la conformité

---

## Données Collectées

### Données Personnelles

Le simulateur collecte les données suivantes :

| Donnée | Obligatoire | Finalité | Durée Conservation |
|---|---|---|---|
| **Email** | Oui | Contact, envoi offres | 36 mois |
| **Téléphone** | Oui | Contact courtiers | 36 mois |
| **Revenus** | Non | Calcul capacité | Anonymisé après 7 jours |
| **Apport** | Non | Calcul capacité | Anonymisé après 7 jours |
| **Zone géographique** | Non | Qualification lead | 36 mois |
| **Type de bien** | Non | Qualification lead | 36 mois |

### Données de Navigation

| Donnée | Source | Finalité | Durée Conservation |
|---|---|---|---|
| **Adresse IP** | Serveur | Sécurité, analytics | 13 mois |
| **Cookies** | Navigateur | Préférences, analytics | 13 mois |
| **User Agent** | Navigateur | Compatibilité | 13 mois |
| **Referrer** | Navigateur | Analytics, attribution | 13 mois |
| **UTM** | URL | Tracking campagnes | 36 mois |

### Données Sensibles

**Aucune donnée sensible n'est collectée** :
- ❌ Origine raciale ou ethnique
- ❌ Opinions politiques
- ❌ Convictions religieuses
- ❌ Appartenance syndicale
- ❌ Données génétiques
- ❌ Données biométriques
- ❌ Données de santé
- ❌ Vie sexuelle

---

## Base Légale

### Consentement

Le traitement des données personnelles est basé sur le **consentement explicite** de l'utilisateur.

#### Formulaire de Consentement

```
☐ J'accepte de recevoir des offres de nos partenaires courtiers
☐ J'accepte la Politique de Confidentialité
☐ J'accepte d'être contacté par email et téléphone

[VALIDER]
```

#### Caractéristiques du Consentement

- ✅ **Libre**: L'utilisateur peut refuser
- ✅ **Spécifique**: Pour chaque finalité
- ✅ **Éclairé**: Informations claires
- ✅ **Univoque**: Action positive (case à cocher)

### Intérêt Légitime

Certains traitements sont basés sur l'**intérêt légitime** :
- Analytics (amélioration du service)
- Sécurité (prévention fraude)
- Marketing direct (si opt-out disponible)

---

## Droits des Utilisateurs

Les utilisateurs disposent des droits suivants :

### 1. Droit d'Accès

L'utilisateur peut demander une copie de ses données.

**Procédure**:
1. Email à `privacy@simulateur-pret.fr`
2. Objet: "Demande d'accès - Article 15 RGPD"
3. Réponse sous 30 jours

**Contenu de la Réponse**:
- Données collectées
- Finalités du traitement
- Destinataires des données
- Durée de conservation
- Droits disponibles

### 2. Droit de Rectification

L'utilisateur peut corriger ses données inexactes.

**Procédure**:
1. Email à `privacy@simulateur-pret.fr`
2. Objet: "Demande de rectification - Article 16 RGPD"
3. Préciser les données à corriger
4. Réponse sous 30 jours

### 3. Droit à l'Effacement ("Droit à l'Oubli")

L'utilisateur peut demander la suppression de ses données.

**Procédure**:
1. Email à `privacy@simulateur-pret.fr`
2. Objet: "Demande d'effacement - Article 17 RGPD"
3. Réponse sous 30 jours

**Exceptions**:
- Obligation légale de conservation
- Exercice de droits en justice

### 4. Droit à la Limitation

L'utilisateur peut demander le gel de ses données.

**Cas d'Application**:
- Contestation de l'exactitude
- Traitement illicite
- Opposition au traitement

### 5. Droit à la Portabilité

L'utilisateur peut récupérer ses données dans un format structuré.

**Format Fourni**:
- JSON
- CSV
- XML

### 6. Droit d'Opposition

L'utilisateur peut s'opposer au traitement de ses données.

**Procédure**:
1. Email à `privacy@simulateur-pret.fr`
2. Objet: "Droit d'opposition - Article 21 RGPD"
3. Préciser le traitement concerné
4. Réponse sous 30 jours

### 7. Droit de Retirer son Consentement

L'utilisateur peut retirer son consentement à tout moment.

**Procédure**:
- Cliquer sur le lien de désinscription dans les emails
- Ou email à `privacy@simulateur-pret.fr`

---

## Sécurité des Données

### Mesures Techniques

| Mesure | Description |
|---|---|
| **HTTPS** | Toutes les communications chiffrées (TLS 1.3) |
| **Chiffrement BDD** | Données sensibles chiffrées (AES-256) |
| **Hashing** | Mots de passe hashés (bcrypt) |
| **Firewall** | Protection contre les attaques |
| **WAF** | Web Application Firewall |
| **Rate Limiting** | Protection contre le brute force |

### Mesures Organisationnelles

| Mesure | Description |
|---|---|
| **Accès restreint** | Seuls les administrateurs autorisés |
| **Logs d'accès** | Traçabilité des accès |
| **Sauvegarde** | Backup quotidien chiffré |
| **Politique de mot de passe** | Minimum 12 caractères, complexité |
| **Formation** | Sensibilisation RGPD de l'équipe |

### Sous-Traitants

| Sous-Traitant | Service | Localisation | DPA |
|---|---|---|---|
| **Manus** | Hébergement | UE | ✅ |
| **Google** | Analytics | UE/US | ✅ |
| **Facebook** | Pixel | UE/US | ✅ |

Tous les sous-traitants ont signé un **Data Processing Agreement** (DPA).

---

## Cookie Banner

### Implémentation

Le cookie banner est conforme CNIL :

```
🍪 Ce site utilise des cookies

Nous utilisons des cookies pour améliorer votre expérience,
analyser le trafic et afficher des publicités personnalisées.

[TOUT ACCEPTER]  [TOUT REFUSER]  [PERSONNALISER]
```

### Catégories de Cookies

#### 1. Cookies Essentiels (Toujours Actifs)

| Cookie | Durée | Finalité |
|---|---|---|
| `session` | Session | Maintien de la session |
| `csrf_token` | Session | Protection CSRF |
| `cookie_consent` | 13 mois | Mémorisation du consentement |

#### 2. Cookies Analytics (Optionnels)

| Cookie | Durée | Finalité |
|---|---|---|
| `_ga` | 13 mois | Google Analytics |
| `_gid` | 24 heures | Google Analytics |
| `_gat` | 1 minute | Google Analytics |

#### 3. Cookies Publicitaires (Optionnels)

| Cookie | Durée | Finalité |
|---|---|---|
| `_fbp` | 3 mois | Facebook Pixel |
| `fr` | 3 mois | Facebook Ads |

### Gestion du Consentement

Le consentement est stocké dans `localStorage` :

```javascript
{
  "essential": true,      // Toujours true
  "analytics": true,      // Choix utilisateur
  "advertising": false,   // Choix utilisateur
  "timestamp": 1705334400 // Date du consentement
}
```

---

## Mentions Légales

### Contenu Obligatoire

La page `/legal` contient :

#### 1. Éditeur du Site

```
Nom: [NOM DE LA SOCIÉTÉ]
Forme juridique: [SARL / SAS / etc.]
Capital social: [MONTANT]€
Siège social: [ADRESSE COMPLÈTE]
SIRET: [NUMÉRO SIRET]
TVA intracommunautaire: [NUMÉRO TVA]
Email: contact@simulateur-pret.fr
Téléphone: [NUMÉRO]
```

#### 2. Directeur de Publication

```
Nom: [NOM DU DIRECTEUR]
Email: [EMAIL]
```

#### 3. Hébergeur

```
Nom: Manus
Adresse: [ADRESSE MANUS]
Téléphone: [TÉLÉPHONE MANUS]
```

#### 4. Propriété Intellectuelle

```
Le contenu du site (textes, images, graphiques, logo, etc.)
est la propriété exclusive de [NOM DE LA SOCIÉTÉ].
Toute reproduction est interdite sans autorisation préalable.
```

---

## Politique de Confidentialité

### Contenu Obligatoire

La page `/legal` contient également la politique de confidentialité :

#### 1. Identité du Responsable de Traitement

```
Responsable de traitement: [NOM DE LA SOCIÉTÉ]
Adresse: [ADRESSE]
Email: privacy@simulateur-pret.fr
DPO: [NOM DU DPO] (si applicable)
```

#### 2. Données Collectées

Liste exhaustive des données collectées (voir section "Données Collectées").

#### 3. Finalités du Traitement

```
• Fourniture du service de simulation
• Envoi d'offres de courtiers partenaires
• Amélioration du service (analytics)
• Respect des obligations légales
```

#### 4. Base Légale

```
• Consentement (Article 6.1.a RGPD)
• Intérêt légitime (Article 6.1.f RGPD)
```

#### 5. Destinataires des Données

```
• Courtiers partenaires (Empruntis, Meilleurtaux, Vousfinancer)
• Sous-traitants techniques (Manus, Google, Facebook)
• Autorités légales (si obligation légale)
```

#### 6. Durée de Conservation

```
• Données de simulation: 7 jours (puis anonymisées)
• Données de contact: 36 mois
• Cookies: 13 mois
```

#### 7. Droits des Utilisateurs

Liste exhaustive des droits (voir section "Droits des Utilisateurs").

#### 8. Réclamation

```
Vous pouvez introduire une réclamation auprès de la CNIL :
• Site web: https://www.cnil.fr
• Adresse: 3 Place de Fontenoy, 75007 Paris
• Téléphone: 01 53 73 22 22
```

---

## Checklist Conformité

### Avant Lancement

- [ ] Mentions légales complètes
- [ ] Politique de confidentialité complète
- [ ] Cookie banner fonctionnel
- [ ] Formulaire de consentement clair
- [ ] HTTPS activé
- [ ] DPA signés avec sous-traitants
- [ ] Registre des traitements créé
- [ ] Procédures droits utilisateurs définies

### Maintenance Continue

- [ ] Mise à jour mentions légales (si changement)
- [ ] Mise à jour politique confidentialité (si changement)
- [ ] Réponse demandes utilisateurs < 30 jours
- [ ] Audit sécurité annuel
- [ ] Formation équipe RGPD annuelle
- [ ] Revue sous-traitants annuelle

---

## Registre des Traitements

### Traitement 1: Simulation de Prêt

| Champ | Valeur |
|---|---|
| **Nom** | Simulation de prêt immobilier |
| **Finalité** | Calcul capacité d'emprunt |
| **Base légale** | Intérêt légitime |
| **Données** | Revenus, apport, durée, taux |
| **Durée** | 7 jours (puis anonymisées) |
| **Destinataires** | Utilisateur uniquement |

### Traitement 2: Collecte de Leads

| Champ | Valeur |
|---|---|
| **Nom** | Collecte de leads pour courtiers |
| **Finalité** | Mise en relation avec courtiers |
| **Base légale** | Consentement |
| **Données** | Email, téléphone, projet immobilier |
| **Durée** | 36 mois |
| **Destinataires** | Courtiers partenaires |

### Traitement 3: Analytics

| Champ | Valeur |
|---|---|
| **Nom** | Analyse du trafic |
| **Finalité** | Amélioration du service |
| **Base légale** | Consentement |
| **Données** | IP, cookies, navigation |
| **Durée** | 13 mois |
| **Destinataires** | Google Analytics |

---

## Support

Pour toute question sur la conformité RGPD :
- **Email**: privacy@simulateur-pret.fr
- **CNIL**: https://www.cnil.fr
