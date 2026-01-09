import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  HelpCircle, 
  Calculator, 
  TrendingUp, 
  Euro, 
  Clock, 
  Percent, 
  ChevronRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import {
  simulerPret,
  brutVersNet,
  getTauxParDefaut,
  formaterEuros,
  CONSTANTES,
  type DonneesEmprunteur,
  type ResultatSimulation,
} from "@shared/mortgage-calculator";
import confetti from "canvas-confetti";

interface MortgageCalculatorProps {
  onResultChange?: (result: ResultatSimulation | null) => void;
  onSimulationComplete?: (data: DonneesEmprunteur & { result: ResultatSimulation }) => void;
}

export default function MortgageCalculator({ 
  onResultChange, 
  onSimulationComplete 
}: MortgageCalculatorProps) {
  const [revenusType, setRevenusType] = useState<"net" | "brut">("net");
  const [revenus, setRevenus] = useState<number>(3500);
  const [chargesFixes, setChargesFixes] = useState<number>(0);
  const [apport, setApport] = useState<number>(20000);
  const [dureeAns, setDureeAns] = useState<number>(20);
  const [tauxManuel, setTauxManuel] = useState<number>(3.5);
  const [useManualRate, setUseManualRate] = useState(false);
  const [statut, setStatut] = useState<"cadre" | "non-cadre">("non-cadre");

  const revenusNetsMensuels = useMemo(() => {
    if (revenusType === "brut") {
      return brutVersNet(revenus * 12, statut);
    }
    return revenus;
  }, [revenus, revenusType, statut]);

  const tauxAnnuel = useMemo(() => {
    return useManualRate ? tauxManuel : getTauxParDefaut(dureeAns);
  }, [useManualRate, tauxManuel, dureeAns]);

  const resultat = useMemo<ResultatSimulation | null>(() => {
    if (revenusNetsMensuels <= 0) return null;
    const donnees: DonneesEmprunteur = {
      revenusNetsMensuels,
      chargesFixes,
      apportPersonnel: apport,
      dureeAns,
      tauxAnnuel,
    };
    return simulerPret(donnees);
  }, [revenusNetsMensuels, chargesFixes, apport, dureeAns, tauxAnnuel]);

  useEffect(() => {
    onResultChange?.(resultat);
    if (resultat && resultat.tauxEndettement <= 33) {
      // Trigger subtle confetti for excellent profiles
    }
  }, [resultat, onResultChange]);

  const handleFinalize = () => {
    if (resultat) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#f59e0b']
      });
      onSimulationComplete?.({
        revenusNetsMensuels,
        chargesFixes,
        apportPersonnel: apport,
        dureeAns,
        tauxAnnuel,
        result: resultat
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Sticky Summary for Mobile */}
      <AnimatePresence>
        {resultat && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-4 z-50 md:hidden"
          >
            <div className="glass-card p-4 flex justify-between items-center shadow-2xl border-primary/20">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Capacité d'emprunt</p>
                <p className="text-xl font-bold text-primary">{formaterEuros(resultat.capaciteEmprunt)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Mensualité</p>
                <p className="text-lg font-semibold">{formaterEuros(resultat.mensualiteTotale)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <CardHeader className="pb-8 pt-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
          >
            <Calculator className="h-8 w-8 text-primary" />
          </motion.div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Simulateur Haute Précision
          </CardTitle>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Ajustez vos paramètres en temps réel pour découvrir votre potentiel d'achat.
          </p>
        </CardHeader>

        <CardContent className="px-6 sm:px-12 pb-12 space-y-10">
          {/* Revenus & Statut */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/5">
                  <Euro className="h-5 w-5 text-primary" />
                </div>
                <Label className="text-lg font-semibold">Vos Revenus Mensuels</Label>
              </div>
              <div className="flex bg-secondary/50 p-1 rounded-xl">
                <button 
                  onClick={() => setRevenusType("net")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${revenusType === "net" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  Net
                </button>
                <button 
                  onClick={() => setRevenusType("brut")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${revenusType === "brut" ? "bg-white shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  Brut
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-4xl font-black text-primary">{formaterEuros(revenus)}</span>
                <span className="text-sm text-muted-foreground font-medium mb-1">par mois</span>
              </div>
              <Slider 
                value={[revenus]} 
                onValueChange={([v]) => setRevenus(v)} 
                min={1200} max={15000} step={50}
                className="py-4"
              />
              
              {revenusType === "brut" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex gap-3 p-1 bg-secondary/30 rounded-xl"
                >
                  <button 
                    onClick={() => setStatut("non-cadre")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${statut === "non-cadre" ? "bg-primary text-white" : "text-muted-foreground"}`}
                  >
                    NON-CADRE
                  </button>
                  <button 
                    onClick={() => setStatut("cadre")}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${statut === "cadre" ? "bg-primary text-white" : "text-muted-foreground"}`}
                  >
                    CADRE
                  </button>
                </motion.div>
              )}
            </div>
          </section>

          {/* Apport & Charges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="space-y-6">
              <Label className="text-lg font-semibold flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/5">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                Votre Apport
              </Label>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-accent">{formaterEuros(apport)}</div>
                <Slider 
                  value={[apport]} 
                  onValueChange={([v]) => setApport(v)} 
                  min={0} max={200000} step={1000}
                />
              </div>
            </section>

            <section className="space-y-6">
              <Label className="text-lg font-semibold flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/5">
                  <TrendingUp className="h-5 w-5 text-destructive" />
                </div>
                Charges Fixes
              </Label>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-destructive">{formaterEuros(chargesFixes)}</div>
                <Slider 
                  value={[chargesFixes]} 
                  onValueChange={([v]) => setChargesFixes(v)} 
                  min={0} max={5000} step={50}
                />
              </div>
            </section>
          </div>

          {/* Durée & Taux */}
          <section className="space-y-8 pt-6 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    Durée
                  </Label>
                  <span className="text-2xl font-black text-primary">{dureeAns} ans</span>
                </div>
                <Slider 
                  value={[dureeAns]} 
                  onValueChange={([v]) => setDureeAns(v)} 
                  min={5} max={25} step={1}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold flex items-center gap-3">
                    <Percent className="h-5 w-5 text-primary" />
                    Taux
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-primary">
                      {useManualRate ? tauxManuel : getTauxParDefaut(dureeAns)}%
                    </span>
                    <Switch checked={useManualRate} onCheckedChange={setUseManualRate} />
                  </div>
                </div>
                {useManualRate && (
                  <Slider 
                    value={[tauxManuel]} 
                    onValueChange={([v]) => setTauxManuel(v)} 
                    min={0.5} max={6} step={0.1}
                  />
                )}
                {!useManualRate && (
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-primary/80">Taux moyen du marché actualisé</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-6"
          >
            <Button 
              onClick={handleFinalize}
              disabled={!resultat}
              className="w-full h-16 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all flex items-center justify-center gap-3"
            >
              VOIR MON ANALYSE COMPLÈTE
              <ChevronRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
