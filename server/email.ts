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

  return nodemailer.createTransporter({
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
    return true;
  } catch (error) {
    console.error("[Email] Failed to send lead email:", error);
    return false;
  }
}
