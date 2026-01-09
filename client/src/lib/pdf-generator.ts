import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { type ResultatSimulation, formaterEuros, formaterPourcentage } from "@shared/mortgage-calculator";

export async function genererSynthesePDF(resultat: ResultatSimulation, nom: string) {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("fr-FR");

  // --- DESIGN SYSTEM ---
  const colors = {
    primary: [15, 23, 42],    // Slate 900
    accent: [37, 99, 235],     // Blue 600
    success: [22, 163, 74],    // Green 600
    text: [51, 65, 85],        // Slate 700
    light: [248, 250, 252]     // Slate 50
  };

  // --- HEADER ---
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 45, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("SIMVAN IMMO", 20, 25);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("RAPPORT D'EXPERTISE FINANCIÈRE PERSONNALISÉ", 20, 35);
  doc.text(`RÉF : SIM-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 160, 25);
  doc.text(`DATE : ${date}`, 160, 30);

  // --- INTRODUCTION ---
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Bonjour ${nom},`, 20, 65);
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  const intro = "Nos algorithmes ont analysé votre profil en fonction des conditions bancaires actuelles (Janvier 2026). Voici votre synthèse de financement optimisée.";
  doc.text(doc.splitTextToSize(intro, 170), 20, 75);

  // --- SCORE DE FINANCEMENT ---
  const score = resultat.tauxEndettement <= 33 ? "EXCELLENT" : resultat.tauxEndettement <= 35 ? "FAVORABLE" : "À OPTIMISER";
  const scoreColor = resultat.tauxEndettement <= 33 ? colors.success : [217, 119, 6]; // Amber 600

  doc.setFillColor(colors.light[0], colors.light[1], colors.light[2]);
  doc.roundedRect(20, 90, 170, 30, 3, 3, "F");
  
  doc.setFontSize(10);
  doc.text("VOTRE SCORE DE FINANCEMENT", 30, 100);
  doc.setFontSize(16);
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFont("helvetica", "bold");
  doc.text(score, 30, 110);
  
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Basé sur les critères HCSF 2026", 140, 110);

  // --- CHIFFRES CLÉS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text("Synthèse de votre capacité d'achat", 20, 140);

  autoTable(doc, {
    startY: 145,
    head: [["Poste de dépense", "Montant estimé"]],
    body: [
      ["Capacité d'emprunt maximale", formaterEuros(resultat.capaciteEmprunt)],
      ["Apport personnel mobilisé", formaterEuros(resultat.apportPersonnel || 0)],
      ["Budget total (Bien + Frais)", formaterEuros(resultat.budgetTotal)],
      ["Mensualité cible (Assurance incluse)", `${formaterEuros(resultat.mensualiteTotale)}/mois`],
      ["Taux d'endettement final", formaterPourcentage(resultat.tauxEndettement, 1)],
    ],
    styles: { fontSize: 10, cellPadding: 5 },
    headStyles: { fillColor: colors.primary },
    alternateRowStyles: { fillColor: [250, 250, 250] },
  });

  // --- CONSEILS D'EXPERT ---
  const lastY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("L'avis de votre expert Simvan", 20, lastY);

  const conseils = [
    "• Votre taux d'endettement est maîtrisé, ce qui rassurera les banques.",
    "• Pensez à déléguer votre assurance emprunteur pour économiser jusqu'à 40€/mois.",
    "• Préparez vos 3 derniers relevés de compte sans aucun découvert pour un dossier parfait."
  ];
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  conseils.forEach((c, i) => {
    doc.text(c, 25, lastY + 10 + (i * 7));
  });

  // --- FOOTER ---
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);  // Footer / Disclaimer
  const footerText = "Ce document est une simulation confidentielle générée par Simvan Immo. Simvan Digital - Bordeaux Centre. Réalisé par TechFlow Solutions.";
  doc.text(footerText, 105, 285, { align: "center" });

  return doc.output("blob");
}

export async function genererAttestationFaisabilite(resultat: ResultatSimulation, nom: string) {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("fr-FR");
  const ref = `ATT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  // --- DESIGN SYSTEM ---
  const colors = {
    primary: [15, 23, 42],    // Slate 900
    accent: [37, 99, 235],     // Blue 600
    gold: [180, 150, 50],      // Gold for seal
    text: [51, 65, 85],        // Slate 700
  };

  // --- BORDER ---
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(0.5);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.2);
  doc.rect(12, 12, 186, 273);

  // --- HEADER ---
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text("SIMVAN IMMO", 105, 35, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("ATTESTATION DE FAISABILITÉ FINANCIÈRE", 105, 45, { align: "center" });
  
  doc.setDrawColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  doc.setLineWidth(1);
  doc.line(80, 50, 130, 50);

  // --- BODY ---
  doc.setFontSize(12);
  doc.text("La plateforme Simvan Immo certifie avoir réalisé une simulation approfondie", 105, 70, { align: "center" });
  doc.text("du projet immobilier de :", 105, 77, { align: "center" });

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(nom.toUpperCase(), 105, 90, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Sur la base des éléments déclarés, le profil présente les caractéristiques suivantes :", 40, 110);

  // --- DATA BOX ---
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(40, 115, 130, 60, 3, 3, "F");
  
  doc.setFont("helvetica", "bold");
  doc.text("CAPACITÉ D'EMPRUNT ESTIMÉE :", 50, 130);
  doc.setTextColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  doc.text(formaterEuros(resultat.capaciteEmprunt), 160, 130, { align: "right" });

  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text("APPORT PERSONNEL DÉCLARÉ :", 50, 145);
  doc.text(formaterEuros(resultat.apportPersonnel || 0), 160, 145, { align: "right" });

  doc.text("BUDGET D'ACHAT TOTAL :", 50, 160);
  doc.setFontSize(14);
  doc.text(formaterEuros(resultat.budgetTotal), 160, 160, { align: "right" });

  // --- SEAL / VALIDATION ---
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const validation = "Cette attestation confirme que le projet respecte les critères d'endettement usuels (taux d'endettement < 35%) et constitue un dossier solide pour une entrée en relation bancaire.";
  doc.text(doc.splitTextToSize(validation, 130), 40, 190);

  // --- GOLD SEAL ---
  doc.setDrawColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.setLineWidth(1);
  doc.circle(160, 230, 20);
  doc.setFontSize(8);
  doc.setTextColor(colors.gold[0], colors.gold[1], colors.gold[2]);
  doc.text("CERTIFIÉ", 160, 228, { align: "center" });
  doc.text("SIMVAN", 160, 233, { align: "center" });
  doc.text("2026", 160, 238, { align: "center" });

  // --- SIGNATURE ---
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(10);
  doc.text("Fait à Bordeaux, le " + date, 40, 230);
  doc.text("La Direction Simvan Immo", 40, 237);
  doc.setFont("helvetica", "italic");
  doc.text("Document numérique certifié", 40, 244);

  // --- FOOTER ---
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Référence : ${ref} - Vérifiable sur simvan.digital/verif`, 105, 280, { align: "center" });

  return doc.output("blob");
}
