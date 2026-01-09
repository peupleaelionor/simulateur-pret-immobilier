import nodemailer from "nodemailer";

// Email configuration
const EMAIL_FROM = "simvan.immo@outlook.com";
const EMAIL_TO = "simvan.immo@outlook.com";

// Create transporter
const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_PASSWORD) {
    console.warn("[Email] EMAIL_PASSWORD not configured. Emails will be logged to console only.");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send a contact form submission email
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<boolean> {
  const transporter = createTransporter();

  // Log to console if transporter not configured
  if (!transporter) {
    console.log("[Email] Contact form submission (not sent):", {
      to: EMAIL_TO,
      from: data.email,
      name: data.name,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    });
    return true; // Return success to not block the user
  }

  try {
    await transporter.sendMail({
      from: `"Simvan Immo Contact" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: data.email,
      subject: `[Contact] ${data.subject || "Nouveau message"}`,
      text: `
Nouveau message de contact reçu sur Simvan Immo

Nom: ${data.name}
Email: ${data.email}
Téléphone: ${data.phone || "Non renseigné"}
Sujet: ${data.subject || "Non renseigné"}

Message:
${data.message}

---
Envoyé le ${new Date().toLocaleString("fr-FR")}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0066cc; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #0066cc; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📧 Nouveau message de contact</h2>
      <p>Simvan Immo</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Nom:</span> ${data.name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
      </div>
      <div class="field">
        <span class="label">Téléphone:</span> ${data.phone || "Non renseigné"}
      </div>
      <div class="field">
        <span class="label">Sujet:</span> ${data.subject || "Non renseigné"}
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <p style="white-space: pre-wrap; background: white; padding: 15px; border-left: 3px solid #0066cc;">${data.message}</p>
      </div>
    </div>
    <div class="footer">
      Envoyé le ${new Date().toLocaleString("fr-FR")} depuis https://simvan.digital/contact
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    console.log("[Email] Contact email sent successfully to", EMAIL_TO);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send contact email:", error);
    return false;
  }
}

/**
 * Send a lead capture notification email
 */
export async function sendLeadEmail(data: {
  email: string;
  phone: string;
  montantEmprunte: number;
  dureeAns: number;
  revenusNets: number;
  apport?: number;
  mensualite?: number;
  zoneGeographique?: string;
  typeBien?: string;
}): Promise<boolean> {
  const transporter = createTransporter();

  // Log to console if transporter not configured
  if (!transporter) {
    console.log("[Email] Lead captured (not sent):", {
      to: EMAIL_TO,
      email: data.email,
      phone: data.phone,
      montantEmprunte: data.montantEmprunte,
      timestamp: new Date().toISOString(),
    });
    return true; // Return success to not block the user
  }

  try {
    await transporter.sendMail({
      from: `"Simvan Immo Leads" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      replyTo: data.email,
      subject: `[Lead] Nouveau prospect - ${data.montantEmprunte.toLocaleString("fr-FR")}€`,
      text: `
🎯 Nouveau lead capturé sur Simvan Immo !

COORDONNÉES
Email: ${data.email}
Téléphone: ${data.phone}

PROJET IMMOBILIER
Montant emprunté: ${data.montantEmprunte.toLocaleString("fr-FR")} €
Durée: ${data.dureeAns} ans
Apport: ${data.apport ? data.apport.toLocaleString("fr-FR") + " €" : "Non renseigné"}
Mensualité estimée: ${data.mensualite ? data.mensualite.toLocaleString("fr-FR") + " €/mois" : "Non calculée"}

PROFIL
Revenus nets mensuels: ${data.revenusNets.toLocaleString("fr-FR")} €
Zone géographique: ${data.zoneGeographique || "Non renseignée"}
Type de bien: ${data.typeBien || "Non renseigné"}

---
Envoyé le ${new Date().toLocaleString("fr-FR")}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 18px; font-weight: bold; color: #10b981; margin-bottom: 10px; }
    .field { margin-bottom: 10px; }
    .label { font-weight: bold; color: #666; }
    .value { color: #333; }
    .highlight { background: #10b981; color: white; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 Nouveau Lead Capturé !</h2>
      <p>Simvan Immo</p>
    </div>
    <div class="highlight">
      ${data.montantEmprunte.toLocaleString("fr-FR")} €
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">📞 Coordonnées</div>
        <div class="field">
          <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
        </div>
        <div class="field">
          <span class="label">Téléphone:</span> <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🏠 Projet Immobilier</div>
        <div class="field">
          <span class="label">Montant emprunté:</span> <span class="value">${data.montantEmprunte.toLocaleString("fr-FR")} €</span>
        </div>
        <div class="field">
          <span class="label">Durée:</span> <span class="value">${data.dureeAns} ans</span>
        </div>
        <div class="field">
          <span class="label">Apport:</span> <span class="value">${data.apport ? data.apport.toLocaleString("fr-FR") + " €" : "Non renseigné"}</span>
        </div>
        <div class="field">
          <span class="label">Mensualité estimée:</span> <span class="value">${data.mensualite ? data.mensualite.toLocaleString("fr-FR") + " €/mois" : "Non calculée"}</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">👤 Profil</div>
        <div class="field">
          <span class="label">Revenus nets mensuels:</span> <span class="value">${data.revenusNets.toLocaleString("fr-FR")} €</span>
        </div>
        <div class="field">
          <span class="label">Zone géographique:</span> <span class="value">${data.zoneGeographique || "Non renseignée"}</span>
        </div>
        <div class="field">
          <span class="label">Type de bien:</span> <span class="value">${data.typeBien || "Non renseigné"}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      Lead capturé le ${new Date().toLocaleString("fr-FR")} sur https://simvan.digital
    </div>
  </div>
</body>
</html>
      `.trim(),
    });

    console.log("[Email] Lead email sent successfully to", EMAIL_TO);

    // Envoyer l'email de confirmation à l'utilisateur
    try {
      await transporter.sendMail({
        from: `"Simvan Immo" <${EMAIL_FROM}>`,
        to: data.email,
        subject: `Votre simulation de prêt immobilier - Simvan Immo`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; }
    .header { background: #0066cc; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { padding: 20px; }
    .highlight { background: #f0f7ff; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .button { display: inline-block; padding: 12px 24px; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Simvan Immo</h1>
      <p>Votre projet immobilier commence ici</p>
    </div>
    <div class="content">
      <p>Bonjour,</p>
      <p>Merci d'avoir utilisé <strong>Simvan Immo</strong> pour votre simulation de prêt immobilier. Nous avons bien reçu votre demande et nos partenaires courtiers analysent actuellement votre dossier pour vous proposer les meilleures offres.</p>
      
      <div class="highlight">
        <h3>Récapitulatif de votre projet :</h3>
        <ul>
          <li><strong>Montant emprunté :</strong> ${data.montantEmprunte.toLocaleString("fr-FR")} €</li>
          <li><strong>Durée :</strong> ${data.dureeAns} ans</li>
          <li><strong>Mensualité estimée :</strong> ${data.mensualite ? data.mensualite.toLocaleString("fr-FR") + " €/mois" : "À confirmer"}</li>
        </ul>
      </div>

      <p><strong>Quelle est la suite ?</strong></p>
      <p>Un expert en financement immobilier vous contactera par téléphone ou par email sous 24h ouvrées pour affiner votre projet et vous présenter 3 offres personnalisées.</p>
      
      <p>En attendant, vous pouvez retrouver tous nos conseils sur notre site.</p>
      
      <div style="text-align: center;">
        <a href="https://simvan.digital" class="button">Retourner sur le site</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; 2026 Simvan Digital - Bordeaux Centre, Centre-ville, Bordeaux<br>
      Cet email vous a été envoyé suite à votre simulation sur simvan.digital</p>
    </div>
  </div>
</body>
</html>
        `.trim(),
      });
      console.log("[Email] Confirmation email sent to user:", data.email);
    } catch (confirmError) {
      console.error("[Email] Failed to send confirmation email to user:", confirmError);
    }

    return true;
  } catch (error) {
    console.error("[Email] Failed to send lead email:", error);
    return false;
  }
}
