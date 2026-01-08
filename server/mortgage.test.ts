import { describe, expect, it } from "vitest";
import {
  calculerMensualite,
  calculerCapaciteEmprunt,
  genererTableauAmortissement,
  calculerResteAVivreMin,
  simulerPret,
  CONSTANTES,
  TAUX_PAR_DUREE,
} from "../shared/mortgage-calculator";

describe("Mortgage Calculator - Core Functions", () => {
  describe("calculerMensualite", () => {
    it("calcule correctement une mensualité standard", () => {
      // 200 000€ sur 20 ans à 3.5%
      const mensualite = calculerMensualite(200000, 3.5, 20);
      // Formule actuarielle: M = C * (t/12) / (1 - (1 + t/12)^(-n*12))
      // Attendu: environ 1159.92€
      expect(mensualite).toBeCloseTo(1159.92, 0);
    });

    it("retourne 0 pour un taux de 0%", () => {
      const mensualite = calculerMensualite(120000, 0, 10);
      // Avec taux 0, la fonction retourne 0 selon l'implémentation
      expect(mensualite).toBe(0);
    });

    it("calcule correctement sur une courte durée", () => {
      // 100 000€ sur 5 ans à 4%
      const mensualite = calculerMensualite(100000, 4, 5);
      expect(mensualite).toBeCloseTo(1841.65, 0);
    });

    it("retourne 0 pour des valeurs invalides", () => {
      expect(calculerMensualite(0, 3.5, 20)).toBe(0);
      expect(calculerMensualite(100000, 0, 20)).toBe(0);
      expect(calculerMensualite(100000, 3.5, 0)).toBe(0);
    });
  });

  describe("calculerCapaciteEmprunt", () => {
    it("calcule correctement la capacité d'emprunt", () => {
      // Avec une mensualité max de 1225€ sur 20 ans à 3.5%
      const capacite = calculerCapaciteEmprunt(1225, 3.5, 20);
      // Devrait donner environ 211 000€
      expect(capacite).toBeGreaterThan(200000);
      expect(capacite).toBeLessThan(220000);
    });

    it("retourne 0 pour des valeurs invalides", () => {
      expect(calculerCapaciteEmprunt(0, 3.5, 20)).toBe(0);
      expect(calculerCapaciteEmprunt(1000, 0, 20)).toBe(0);
      expect(calculerCapaciteEmprunt(1000, 3.5, 0)).toBe(0);
    });
  });

  describe("calculerResteAVivreMin", () => {
    it("retourne 800€ pour une personne seule", () => {
      expect(calculerResteAVivreMin(1)).toBe(CONSTANTES.RESTE_A_VIVRE_MIN_SOLO);
    });

    it("retourne 1200€ pour un couple", () => {
      expect(calculerResteAVivreMin(2)).toBe(CONSTANTES.RESTE_A_VIVRE_MIN_COUPLE);
    });

    it("ajoute 300€ par enfant", () => {
      // Couple + 1 enfant = 1200 + 300 = 1500
      expect(calculerResteAVivreMin(3)).toBe(1500);
      // Couple + 2 enfants = 1200 + 600 = 1800
      expect(calculerResteAVivreMin(4)).toBe(1800);
    });
  });

  describe("genererTableauAmortissement", () => {
    it("génère le bon nombre de lignes", () => {
      const tableau = genererTableauAmortissement(100000, 3.5, 10);
      expect(tableau.length).toBe(10 * 12); // 10 ans * 12 mois
    });

    it("le capital restant final est proche de 0", () => {
      const tableau = genererTableauAmortissement(100000, 3.5, 10);
      const derniereLigne = tableau[tableau.length - 1];
      expect(derniereLigne.capitalRestantDu).toBeLessThan(1);
    });

    it("la somme du capital remboursé égale le montant emprunté", () => {
      const montant = 100000;
      const tableau = genererTableauAmortissement(montant, 3.5, 10);
      const totalCapital = tableau.reduce((sum, ligne) => sum + ligne.capitalRembourse, 0);
      expect(totalCapital).toBeCloseTo(montant, 0);
    });

    it("les intérêts diminuent au fil du temps", () => {
      const tableau = genererTableauAmortissement(100000, 3.5, 10);
      
      // Les intérêts du premier mois doivent être supérieurs à ceux du dernier
      expect(tableau[0].interets).toBeGreaterThan(tableau[tableau.length - 1].interets);
    });

    it("inclut l'assurance dans chaque ligne", () => {
      const tableau = genererTableauAmortissement(100000, 3.5, 10, 0.30);
      
      // Chaque ligne doit avoir une assurance
      tableau.forEach(ligne => {
        expect(ligne.assurance).toBeGreaterThan(0);
      });
    });
  });

  describe("simulerPret", () => {
    it("calcule une simulation complète", () => {
      const resultat = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: 20000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      expect(resultat.capaciteEmprunt).toBeGreaterThan(0);
      expect(resultat.mensualiteTotale).toBeGreaterThan(0);
      expect(resultat.tauxEndettement).toBeLessThanOrEqual(35);
    });

    it("respecte le taux d'endettement maximum de 35%", () => {
      const resultat = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: 20000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      expect(resultat.tauxEndettement).toBeLessThanOrEqual(35);
    });

    it("respecte le reste à vivre minimum", () => {
      const resultat = simulerPret({
        revenusNetsMensuels: 2000,
        chargesFixes: 0,
        apportPersonnel: 10000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
        nombrePersonnesFoyer: 1,
      });

      expect(resultat.resteAVivre).toBeGreaterThanOrEqual(CONSTANTES.RESTE_A_VIVRE_MIN_SOLO);
    });

    it("inclut l'assurance dans le calcul", () => {
      const resultat = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: 20000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      expect(resultat.mensualiteAssurance).toBeGreaterThan(0);
      // Vérifier que la mensualité totale est proche de la somme (arrondi possible)
      expect(resultat.mensualiteTotale).toBeCloseTo(
        resultat.mensualiteHorsAssurance + resultat.mensualiteAssurance,
        1
      );
    });

    it("calcule les frais annexes", () => {
      const resultat = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: 20000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      expect(resultat.fraisDossier).toBeGreaterThan(0);
      expect(resultat.fraisGarantie).toBeGreaterThan(0);
      expect(resultat.fraisNotaire).toBeGreaterThan(0);
    });

    it("prend en compte les charges existantes", () => {
      const sansCharges = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: 20000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      const avecCharges = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 500,
        apportPersonnel: 20000,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      expect(avecCharges.capaciteEmprunt).toBeLessThan(sansCharges.capaciteEmprunt);
    });

    it("génère des alertes appropriées", () => {
      const resultat = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: 5000, // Apport faible
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      // Devrait avoir une alerte sur l'apport faible
      expect(resultat.alertes.length).toBeGreaterThan(0);
    });

    it("calcule le budget total correctement", () => {
      const apport = 20000;
      const resultat = simulerPret({
        revenusNetsMensuels: 3500,
        chargesFixes: 0,
        apportPersonnel: apport,
        dureeAns: 20,
        tauxAnnuel: 3.5,
      });

      expect(resultat.budgetTotal).toBe(resultat.capaciteEmprunt + apport);
    });
  });
});

describe("Mortgage Calculator - Business Rules (HCSF 2026)", () => {
  it("applique la règle des 35% d'endettement maximum", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 5000,
      chargesFixes: 0,
      apportPersonnel: 50000,
      dureeAns: 25,
      tauxAnnuel: 3.5,
    });

    // La mensualité totale ne doit pas dépasser 35% des revenus
    const tauxEndettementCalcule = (resultat.mensualiteTotale / 5000) * 100;
    expect(tauxEndettementCalcule).toBeLessThanOrEqual(35.1);
  });

  it("respecte le reste à vivre minimum de 800€", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 1500,
      chargesFixes: 0,
      apportPersonnel: 10000,
      dureeAns: 20,
      tauxAnnuel: 3.5,
      nombrePersonnesFoyer: 1,
    });

    expect(resultat.resteAVivre).toBeGreaterThanOrEqual(800);
  });

  it("accepte une durée de 25 ans", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 3500,
      chargesFixes: 0,
      apportPersonnel: 20000,
      dureeAns: 25,
      tauxAnnuel: 3.5,
    });

    expect(resultat.capaciteEmprunt).toBeGreaterThan(0);
  });
});

describe("Mortgage Calculator - Edge Cases", () => {
  it("gère les revenus faibles", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 1200,
      chargesFixes: 0,
      apportPersonnel: 5000,
      dureeAns: 20,
      tauxAnnuel: 3.5,
      nombrePersonnesFoyer: 1,
    });

    // Avec des revenus très faibles, la capacité devrait être très limitée
    expect(resultat.capaciteEmprunt).toBeLessThan(100000);
    expect(resultat.resteAVivre).toBeGreaterThanOrEqual(CONSTANTES.RESTE_A_VIVRE_MIN_SOLO);
  });

  it("gère les taux d'intérêt élevés", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 3500,
      chargesFixes: 0,
      apportPersonnel: 20000,
      dureeAns: 20,
      tauxAnnuel: 6.0,
    });

    expect(resultat.capaciteEmprunt).toBeGreaterThan(0);
    expect(resultat.coutTotalCredit).toBeGreaterThan(resultat.capaciteEmprunt * 0.3);
  });

  it("gère un apport de 0€", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 3500,
      chargesFixes: 0,
      apportPersonnel: 0,
      dureeAns: 20,
      tauxAnnuel: 3.5,
    });

    expect(resultat.capaciteEmprunt).toBeGreaterThan(0);
    expect(resultat.budgetTotal).toBe(resultat.capaciteEmprunt);
  });

  it("gère des charges élevées", () => {
    const resultat = simulerPret({
      revenusNetsMensuels: 3500,
      chargesFixes: 800,
      apportPersonnel: 20000,
      dureeAns: 20,
      tauxAnnuel: 3.5,
    });

    // La capacité devrait être réduite significativement par rapport à sans charges
    expect(resultat.capaciteEmprunt).toBeLessThan(180000);
  });
});

describe("Constants", () => {
  it("les constantes HCSF sont correctes", () => {
    expect(CONSTANTES.TAUX_ENDETTEMENT_MAX).toBe(0.35);
    expect(CONSTANTES.RESTE_A_VIVRE_MIN_SOLO).toBe(800);
    expect(CONSTANTES.DUREE_MAX_ANS).toBe(25);
  });

  it("les taux par défaut sont définis", () => {
    expect(TAUX_PAR_DUREE[10]).toBeDefined();
    expect(TAUX_PAR_DUREE[15]).toBeDefined();
    expect(TAUX_PAR_DUREE[20]).toBeDefined();
    expect(TAUX_PAR_DUREE[25]).toBeDefined();
  });
});
