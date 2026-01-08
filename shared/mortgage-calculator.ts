/**
 * Simulateur de Prêt Immobilier - Algorithmes Bancaires Français
 * 
 * Ces algorithmes reproduisent les calculs utilisés par les banques françaises
 * pour évaluer la capacité d'emprunt et calculer les mensualités.
 * 
 * Règles appliquées:
 * - Taux d'endettement maximum: 35% (norme HCSF depuis janvier 2022)
 * - Reste à vivre minimum: 800€ (variable selon composition familiale)
 * - Durée maximale: 25 ans (27 ans pour achat dans le neuf avec différé)
 * - Assurance emprunteur: ~0.30% du capital emprunté/an
 * - Garantie (caution/hypothèque): ~1% du montant emprunté
 * - Frais de dossier: ~1% du montant emprunté (plafonnés)
 */

// Types pour le calculateur
export interface DonneesEmprunteur {
  revenusNetsMensuels: number;      // Revenus nets mensuels en euros
  chargesFixes: number;             // Charges fixes mensuelles (crédits en cours, pensions)
  apportPersonnel: number;          // Apport personnel en euros
  dureeAns: number;                 // Durée souhaitée en années
  tauxAnnuel: number;               // Taux d'intérêt annuel en % (ex: 3.5)
  tauxAssurance?: number;           // Taux assurance annuel en % (défaut: 0.30)
  nombrePersonnesFoyer?: number;    // Pour calcul reste à vivre
}

export interface ResultatSimulation {
  capaciteEmprunt: number;          // Montant maximum empruntable
  mensualiteMax: number;            // Mensualité maximale selon endettement
  mensualiteHorsAssurance: number;  // Mensualité crédit seule
  mensualiteAssurance: number;      // Coût mensuel assurance
  mensualiteTotale: number;         // Mensualité totale (crédit + assurance)
  coutTotalCredit: number;          // Coût total du crédit (intérêts + assurance)
  coutInterets: number;             // Total des intérêts
  coutAssurance: number;            // Total de l'assurance
  tauxEndettement: number;          // Taux d'endettement en %
  resteAVivre: number;              // Reste à vivre après mensualité
  fraisDossier: number;             // Frais de dossier estimés
  fraisGarantie: number;            // Frais de garantie estimés
  fraisNotaire: number;             // Frais de notaire estimés (pour info)
  budgetTotal: number;              // Budget total possible (emprunt + apport)
  tableauAmortissement: LigneAmortissement[];
  alertes: string[];                // Alertes et recommandations
  eligible: boolean;                // Éligibilité au prêt
}

export interface LigneAmortissement {
  mois: number;
  annee: number;
  mensualiteHorsAssurance: number;
  capitalRembourse: number;
  interets: number;
  assurance: number;
  mensualiteTotale: number;
  capitalRestantDu: number;
  capitalRembourseTotal: number;
  interetsPayesTotal: number;
  assurancePayeeTotal: number;
}

// Constantes réglementaires françaises
export const CONSTANTES = {
  TAUX_ENDETTEMENT_MAX: 0.35,           // 35% maximum (HCSF)
  RESTE_A_VIVRE_MIN_SOLO: 800,          // 800€ minimum pour une personne
  RESTE_A_VIVRE_MIN_COUPLE: 1200,       // 1200€ pour un couple
  RESTE_A_VIVRE_PAR_ENFANT: 300,        // +300€ par enfant
  DUREE_MAX_ANS: 25,                    // 25 ans maximum
  DUREE_MAX_NEUF_ANS: 27,               // 27 ans pour le neuf
  TAUX_ASSURANCE_DEFAUT: 0.30,          // 0.30% du capital/an
  TAUX_GARANTIE: 0.01,                  // 1% du montant
  TAUX_FRAIS_DOSSIER: 0.01,             // 1% du montant
  FRAIS_DOSSIER_MAX: 1500,              // Plafond frais de dossier
  TAUX_FRAIS_NOTAIRE_ANCIEN: 0.08,      // 8% pour l'ancien
  TAUX_FRAIS_NOTAIRE_NEUF: 0.03,        // 3% pour le neuf
};

// Taux d'intérêt par défaut selon la durée (mis à jour régulièrement)
export const TAUX_PAR_DUREE: Record<number, number> = {
  10: 3.15,
  15: 3.35,
  20: 3.50,
  25: 3.65,
};

/**
 * Calcule la mensualité d'un prêt selon la formule actuarielle
 * M = C × (t / (1 - (1 + t)^(-n)))
 * où C = capital, t = taux mensuel, n = nombre de mois
 */
export function calculerMensualite(
  capital: number,
  tauxAnnuel: number,
  dureeAns: number
): number {
  if (capital <= 0 || tauxAnnuel <= 0 || dureeAns <= 0) return 0;
  
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nombreMois = dureeAns * 12;
  
  // Formule actuarielle
  const mensualite = capital * (tauxMensuel / (1 - Math.pow(1 + tauxMensuel, -nombreMois)));
  
  return Math.round(mensualite * 100) / 100;
}

/**
 * Calcule la capacité d'emprunt maximale selon les revenus
 * Inverse de la formule de mensualité
 */
export function calculerCapaciteEmprunt(
  mensualiteMax: number,
  tauxAnnuel: number,
  dureeAns: number
): number {
  if (mensualiteMax <= 0 || tauxAnnuel <= 0 || dureeAns <= 0) return 0;
  
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nombreMois = dureeAns * 12;
  
  // Formule inverse
  const capital = mensualiteMax * (1 - Math.pow(1 + tauxMensuel, -nombreMois)) / tauxMensuel;
  
  return Math.floor(capital); // Arrondi inférieur pour sécurité
}

/**
 * Calcule le reste à vivre minimum selon la composition du foyer
 */
export function calculerResteAVivreMin(nombrePersonnes: number = 1): number {
  if (nombrePersonnes <= 1) {
    return CONSTANTES.RESTE_A_VIVRE_MIN_SOLO;
  } else if (nombrePersonnes === 2) {
    return CONSTANTES.RESTE_A_VIVRE_MIN_COUPLE;
  } else {
    // Couple + enfants
    return CONSTANTES.RESTE_A_VIVRE_MIN_COUPLE + 
           (nombrePersonnes - 2) * CONSTANTES.RESTE_A_VIVRE_PAR_ENFANT;
  }
}

/**
 * Génère le tableau d'amortissement complet
 */
export function genererTableauAmortissement(
  capital: number,
  tauxAnnuel: number,
  dureeAns: number,
  tauxAssurance: number = CONSTANTES.TAUX_ASSURANCE_DEFAUT
): LigneAmortissement[] {
  const tableau: LigneAmortissement[] = [];
  const tauxMensuel = tauxAnnuel / 100 / 12;
  const nombreMois = dureeAns * 12;
  const mensualiteHorsAssurance = calculerMensualite(capital, tauxAnnuel, dureeAns);
  const assuranceMensuelle = (capital * tauxAssurance / 100) / 12;
  
  let capitalRestant = capital;
  let capitalRembourseTotal = 0;
  let interetsPayesTotal = 0;
  let assurancePayeeTotal = 0;
  
  for (let mois = 1; mois <= nombreMois; mois++) {
    const interets = capitalRestant * tauxMensuel;
    const capitalRembourse = mensualiteHorsAssurance - interets;
    
    capitalRestant -= capitalRembourse;
    capitalRembourseTotal += capitalRembourse;
    interetsPayesTotal += interets;
    assurancePayeeTotal += assuranceMensuelle;
    
    tableau.push({
      mois,
      annee: Math.ceil(mois / 12),
      mensualiteHorsAssurance: Math.round(mensualiteHorsAssurance * 100) / 100,
      capitalRembourse: Math.round(capitalRembourse * 100) / 100,
      interets: Math.round(interets * 100) / 100,
      assurance: Math.round(assuranceMensuelle * 100) / 100,
      mensualiteTotale: Math.round((mensualiteHorsAssurance + assuranceMensuelle) * 100) / 100,
      capitalRestantDu: Math.max(0, Math.round(capitalRestant * 100) / 100),
      capitalRembourseTotal: Math.round(capitalRembourseTotal * 100) / 100,
      interetsPayesTotal: Math.round(interetsPayesTotal * 100) / 100,
      assurancePayeeTotal: Math.round(assurancePayeeTotal * 100) / 100,
    });
  }
  
  return tableau;
}

/**
 * Résume le tableau d'amortissement par année
 */
export function resumerParAnnee(tableau: LigneAmortissement[]): {
  annee: number;
  capitalRembourse: number;
  interets: number;
  assurance: number;
  totalPaye: number;
  capitalRestantDu: number;
}[] {
  const parAnnee: Map<number, {
    capitalRembourse: number;
    interets: number;
    assurance: number;
    capitalRestantDu: number;
  }> = new Map();
  
  for (const ligne of tableau) {
    const annee = ligne.annee;
    const existant = parAnnee.get(annee) || {
      capitalRembourse: 0,
      interets: 0,
      assurance: 0,
      capitalRestantDu: 0,
    };
    
    existant.capitalRembourse += ligne.capitalRembourse;
    existant.interets += ligne.interets;
    existant.assurance += ligne.assurance;
    existant.capitalRestantDu = ligne.capitalRestantDu;
    
    parAnnee.set(annee, existant);
  }
  
  return Array.from(parAnnee.entries()).map(([annee, data]) => ({
    annee,
    capitalRembourse: Math.round(data.capitalRembourse * 100) / 100,
    interets: Math.round(data.interets * 100) / 100,
    assurance: Math.round(data.assurance * 100) / 100,
    totalPaye: Math.round((data.capitalRembourse + data.interets + data.assurance) * 100) / 100,
    capitalRestantDu: Math.round(data.capitalRestantDu * 100) / 100,
  }));
}

/**
 * Simulation complète de prêt immobilier
 * Prend en compte toutes les règles bancaires françaises
 */
export function simulerPret(donnees: DonneesEmprunteur): ResultatSimulation {
  const {
    revenusNetsMensuels,
    chargesFixes,
    apportPersonnel,
    dureeAns,
    tauxAnnuel,
    tauxAssurance = CONSTANTES.TAUX_ASSURANCE_DEFAUT,
    nombrePersonnesFoyer = 1,
  } = donnees;
  
  const alertes: string[] = [];
  let eligible = true;
  
  // Validation des entrées
  if (dureeAns > CONSTANTES.DUREE_MAX_ANS) {
    alertes.push(`La durée maximale recommandée est de ${CONSTANTES.DUREE_MAX_ANS} ans.`);
  }
  
  // Calcul de la mensualité maximale selon le taux d'endettement
  const revenusDisponibles = revenusNetsMensuels - chargesFixes;
  const mensualiteMaxEndettement = revenusDisponibles * CONSTANTES.TAUX_ENDETTEMENT_MAX;
  
  // Calcul du reste à vivre minimum
  const resteAVivreMin = calculerResteAVivreMin(nombrePersonnesFoyer);
  const mensualiteMaxResteAVivre = revenusNetsMensuels - chargesFixes - resteAVivreMin;
  
  // La mensualité max est le minimum des deux contraintes
  const mensualiteMax = Math.min(mensualiteMaxEndettement, mensualiteMaxResteAVivre);
  
  if (mensualiteMax <= 0) {
    eligible = false;
    alertes.push("Vos revenus ne permettent pas d'emprunter avec les contraintes actuelles.");
    return {
      capaciteEmprunt: 0,
      mensualiteMax: 0,
      mensualiteHorsAssurance: 0,
      mensualiteAssurance: 0,
      mensualiteTotale: 0,
      coutTotalCredit: 0,
      coutInterets: 0,
      coutAssurance: 0,
      tauxEndettement: 0,
      resteAVivre: revenusNetsMensuels - chargesFixes,
      fraisDossier: 0,
      fraisGarantie: 0,
      fraisNotaire: 0,
      budgetTotal: apportPersonnel,
      tableauAmortissement: [],
      alertes,
      eligible,
    };
  }
  
  // Calcul de la capacité d'emprunt (hors assurance dans la mensualité)
  // On doit itérer car l'assurance dépend du capital
  let capaciteEmprunt = calculerCapaciteEmprunt(mensualiteMax, tauxAnnuel, dureeAns);
  
  // Ajustement pour l'assurance (itération simple)
  for (let i = 0; i < 5; i++) {
    const assuranceMensuelle = (capaciteEmprunt * tauxAssurance / 100) / 12;
    const mensualiteDisponibleCredit = mensualiteMax - assuranceMensuelle;
    capaciteEmprunt = calculerCapaciteEmprunt(mensualiteDisponibleCredit, tauxAnnuel, dureeAns);
  }
  
  // Calculs finaux
  const mensualiteHorsAssurance = calculerMensualite(capaciteEmprunt, tauxAnnuel, dureeAns);
  const mensualiteAssurance = (capaciteEmprunt * tauxAssurance / 100) / 12;
  const mensualiteTotale = mensualiteHorsAssurance + mensualiteAssurance;
  
  // Frais annexes
  const fraisDossier = Math.min(
    capaciteEmprunt * CONSTANTES.TAUX_FRAIS_DOSSIER,
    CONSTANTES.FRAIS_DOSSIER_MAX
  );
  const fraisGarantie = capaciteEmprunt * CONSTANTES.TAUX_GARANTIE;
  const budgetTotal = capaciteEmprunt + apportPersonnel;
  const fraisNotaire = budgetTotal * CONSTANTES.TAUX_FRAIS_NOTAIRE_ANCIEN;
  
  // Coûts totaux
  const nombreMois = dureeAns * 12;
  const coutInterets = (mensualiteHorsAssurance * nombreMois) - capaciteEmprunt;
  const coutAssurance = mensualiteAssurance * nombreMois;
  const coutTotalCredit = coutInterets + coutAssurance;
  
  // Taux d'endettement réel
  const tauxEndettement = ((mensualiteTotale + chargesFixes) / revenusNetsMensuels) * 100;
  const resteAVivre = revenusNetsMensuels - chargesFixes - mensualiteTotale;
  
  // Alertes et recommandations
  if (tauxEndettement > 33) {
    alertes.push(`Votre taux d'endettement (${tauxEndettement.toFixed(1)}%) est élevé. Certaines banques pourraient refuser.`);
  }
  
  if (resteAVivre < resteAVivreMin * 1.2) {
    alertes.push(`Votre reste à vivre (${Math.round(resteAVivre)}€) est proche du minimum. Prévoyez une marge de sécurité.`);
  }
  
  if (apportPersonnel < capaciteEmprunt * 0.1) {
    alertes.push("Un apport d'au moins 10% du montant emprunté est recommandé pour obtenir de meilleures conditions.");
  }
  
  // Génération du tableau d'amortissement
  const tableauAmortissement = genererTableauAmortissement(
    capaciteEmprunt,
    tauxAnnuel,
    dureeAns,
    tauxAssurance
  );
  
  return {
    capaciteEmprunt: Math.round(capaciteEmprunt),
    mensualiteMax: Math.round(mensualiteMax * 100) / 100,
    mensualiteHorsAssurance: Math.round(mensualiteHorsAssurance * 100) / 100,
    mensualiteAssurance: Math.round(mensualiteAssurance * 100) / 100,
    mensualiteTotale: Math.round(mensualiteTotale * 100) / 100,
    coutTotalCredit: Math.round(coutTotalCredit),
    coutInterets: Math.round(coutInterets),
    coutAssurance: Math.round(coutAssurance),
    tauxEndettement: Math.round(tauxEndettement * 10) / 10,
    resteAVivre: Math.round(resteAVivre),
    fraisDossier: Math.round(fraisDossier),
    fraisGarantie: Math.round(fraisGarantie),
    fraisNotaire: Math.round(fraisNotaire),
    budgetTotal: Math.round(capaciteEmprunt + apportPersonnel),
    tableauAmortissement,
    alertes,
    eligible,
  };
}

/**
 * Convertit un salaire brut en net (approximation française)
 * Taux de cotisations salariales moyennes: ~22-25%
 */
export function brutVersNet(salaireBrutAnnuel: number, statut: 'cadre' | 'non-cadre' = 'non-cadre'): number {
  const tauxCotisations = statut === 'cadre' ? 0.25 : 0.22;
  const salaireNetAnnuel = salaireBrutAnnuel * (1 - tauxCotisations);
  return Math.round(salaireNetAnnuel / 12);
}

/**
 * Obtient le taux d'intérêt par défaut selon la durée
 */
export function getTauxParDefaut(dureeAns: number): number {
  // Trouve la durée la plus proche
  const durees = Object.keys(TAUX_PAR_DUREE).map(Number).sort((a, b) => a - b);
  
  for (let i = durees.length - 1; i >= 0; i--) {
    if (dureeAns >= durees[i]) {
      return TAUX_PAR_DUREE[durees[i]];
    }
  }
  
  return TAUX_PAR_DUREE[durees[0]];
}

/**
 * Formate un montant en euros
 */
export function formaterEuros(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(montant);
}

/**
 * Formate un pourcentage
 */
export function formaterPourcentage(valeur: number, decimales: number = 2): string {
  return `${valeur.toFixed(decimales)}%`;
}
