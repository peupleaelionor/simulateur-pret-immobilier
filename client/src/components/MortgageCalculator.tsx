import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Calculator, TrendingUp, Euro, Clock, Percent } from "lucide-react";
import {
  simulerPret,
  brutVersNet,
  getTauxParDefaut,
  formaterEuros,
  formaterPourcentage,
  CONSTANTES,
  type DonneesEmprunteur,
  type ResultatSimulation,
} from "@shared/mortgage-calculator";

interface MortgageCalculatorProps {
  onResultChange?: (result: ResultatSimulation | null) => void;
  onSimulationComplete?: (data: DonneesEmprunteur & { result: ResultatSimulation }) => void;
}

export default function MortgageCalculator({ 
  onResultChange, 
  onSimulationComplete 
}: MortgageCalculatorProps) {
  // Form state
  const [revenusType, setRevenusType] = useState<"net" | "brut">("net");
  const [revenus, setRevenus] = useState<string>("3500");
  const [chargesFixes, setChargesFixes] = useState<string>("0");
  const [apport, setApport] = useState<string>("20000");
  const [dureeAns, setDureeAns] = useState<number>(20);
  const [tauxManuel, setTauxManuel] = useState<string>("");
  const [useManualRate, setUseManualRate] = useState(false);
  const [statut, setStatut] = useState<"cadre" | "non-cadre">("non-cadre");

  // Derived values
  const revenusNetsMensuels = useMemo(() => {
    const montant = parseFloat(revenus) || 0;
    if (revenusType === "brut") {
      return brutVersNet(montant * 12, statut);
    }
    return montant;
  }, [revenus, revenusType, statut]);

  const tauxAnnuel = useMemo(() => {
    if (useManualRate && tauxManuel) {
      return parseFloat(tauxManuel) || getTauxParDefaut(dureeAns);
    }
    return getTauxParDefaut(dureeAns);
  }, [useManualRate, tauxManuel, dureeAns]);

  // Simulation result
  const resultat = useMemo<ResultatSimulation | null>(() => {
    if (revenusNetsMensuels <= 0) return null;

    const donnees: DonneesEmprunteur = {
      revenusNetsMensuels,
      chargesFixes: parseFloat(chargesFixes) || 0,
      apportPersonnel: parseFloat(apport) || 0,
      dureeAns,
      tauxAnnuel,
    };

    return simulerPret(donnees);
  }, [revenusNetsMensuels, chargesFixes, apport, dureeAns, tauxAnnuel]);

  // Notify parent of result changes
  useEffect(() => {
    onResultChange?.(resultat);
  }, [resultat, onResultChange]);

  // Handle CTA click
  const handleSimulationComplete = useCallback(() => {
    if (!resultat) return;

    const donnees: DonneesEmprunteur = {
      revenusNetsMensuels,
      chargesFixes: parseFloat(chargesFixes) || 0,
      apportPersonnel: parseFloat(apport) || 0,
      dureeAns,
      tauxAnnuel,
    };

    onSimulationComplete?.({ ...donnees, result: resultat });
  }, [resultat, revenusNetsMensuels, chargesFixes, apport, dureeAns, tauxAnnuel, onSimulationComplete]);

  // Format input value for display
  const formatInputValue = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("fr-FR");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="finance-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Calculator className="h-6 w-6 text-primary" />
            Calculez votre capacité d'emprunt
          </CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Algorithmes bancaires français - Résultats en temps réel
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Revenus Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Euro className="h-4 w-4 text-primary" />
                Revenu net mensuel
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Indiquez votre salaire net après impôts et avant prélèvement à la source.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${revenusType === "net" ? "font-medium" : "text-muted-foreground"}`}>
                  Net
                </span>
                <Switch
                  checked={revenusType === "brut"}
                  onCheckedChange={(checked) => setRevenusType(checked ? "brut" : "net")}
                />
                <span className={`text-sm ${revenusType === "brut" ? "font-medium" : "text-muted-foreground"}`}>
                  Brut
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="number"
                    value={revenus}
                    onChange={(e) => setRevenus(e.target.value)}
                    className="pr-12 text-lg h-12"
                    placeholder="3500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    €/{revenusType === "brut" ? "brut" : "net"}
                  </span>
                </div>
                {revenusType === "brut" && (
                  <p className="text-xs text-muted-foreground">
                    ≈ {formaterEuros(revenusNetsMensuels)} net/mois ({statut})
                  </p>
                )}
              </div>

              {revenusType === "brut" && (
                <div className="space-y-2">
                  <Label className="text-sm">Statut</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={statut === "non-cadre" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatut("non-cadre")}
                      className="flex-1"
                    >
                      Non-cadre
                    </Button>
                    <Button
                      type="button"
                      variant={statut === "cadre" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatut("cadre")}
                      className="flex-1"
                    >
                      Cadre
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Charges Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium flex items-center gap-2">
              Charges mensuelles
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Crédits en cours, pensions alimentaires, loyers (si conservés après achat)</p>
                </TooltipContent>
              </Tooltip>
            </Label>
            <div className="relative">
              <Input
                type="number"
                value={chargesFixes}
                onChange={(e) => setChargesFixes(e.target.value)}
                className="pr-8 h-12"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            </div>
          </div>

          {/* Apport Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Apport personnel
            </Label>
            <div className="relative">
              <Input
                type="number"
                value={apport}
                onChange={(e) => setApport(e.target.value)}
                className="pr-8 h-12"
                placeholder="20000"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
            </div>
          </div>

          {/* Durée Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Durée du prêt
              </Label>
              <span className="text-2xl font-bold text-primary">{dureeAns} ans</span>
            </div>
            <Slider
              value={[dureeAns]}
              onValueChange={([value]) => setDureeAns(value)}
              min={5}
              max={25}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 ans</span>
              <span>15 ans</span>
              <span>25 ans</span>
            </div>
          </div>

          {/* Taux Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex items-center gap-2">
                <Percent className="h-4 w-4 text-primary" />
                Taux d'intérêt
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Personnaliser</span>
                <Switch
                  checked={useManualRate}
                  onCheckedChange={setUseManualRate}
                />
              </div>
            </div>

            {useManualRate ? (
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  value={tauxManuel}
                  onChange={(e) => setTauxManuel(e.target.value)}
                  className="pr-8 h-12"
                  placeholder={getTauxParDefaut(dureeAns).toString()}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            ) : (
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Taux moyen {dureeAns} ans (janvier 2026)</span>
                  <span className="text-lg font-semibold text-primary">
                    {formaterPourcentage(tauxAnnuel)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Results Preview */}
          {resultat && resultat.eligible && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Vous pouvez emprunter jusqu'à</p>
                <p className="result-amount">{formaterEuros(resultat.capaciteEmprunt)}</p>
                <p className="text-sm text-muted-foreground">
                  soit un budget total de{" "}
                  <span className="font-semibold text-foreground">
                    {formaterEuros(resultat.budgetTotal)}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-secondary/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Mensualité</p>
                  <p className="text-lg font-semibold">{formaterEuros(resultat.mensualiteTotale)}/mois</p>
                </div>
                <div className="bg-secondary/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Taux d'endettement</p>
                  <p className={`text-lg font-semibold ${
                    resultat.tauxEndettement > 33 ? "text-destructive" : "text-accent"
                  }`}>
                    {formaterPourcentage(resultat.tauxEndettement, 1)}
                  </p>
                </div>
              </div>

              {/* CTA Button - MEGA VISIBLE */}
              <div className="mt-8 p-6 bg-gradient-to-r from-accent to-primary rounded-xl shadow-lg">
                <Button
                  onClick={handleSimulationComplete}
                  className="w-full h-16 text-xl font-bold bg-white text-accent hover:bg-gray-50 shadow-md"
                  size="lg"
                >
                  🚀 OBTENIR MES 3 OFFRES PERSONNALISÉES
                </Button>
                <p className="text-center text-white text-sm mt-3 font-medium">Réponse sous 24h • Sans engagement • Gratuit</p>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <span className="trust-badge">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% gratuit
                </span>
                <span className="trust-badge">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Données sécurisées
                </span>
                <span className="trust-badge">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Sans engagement
                </span>
              </div>
            </div>
          )}

          {/* Alerts */}
          {resultat && resultat.alertes.length > 0 && (
            <div className="mt-4 space-y-2">
              {resultat.alertes.map((alerte, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800"
                >
                  <svg className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {alerte}
                </div>
              ))}
            </div>
          )}

          {/* Not eligible message */}
          {resultat && !resultat.eligible && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
              <p className="text-destructive font-medium">
                Vos revenus actuels ne permettent pas d'emprunter avec les contraintes bancaires en vigueur.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Essayez d'augmenter la durée ou de réduire vos charges.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
