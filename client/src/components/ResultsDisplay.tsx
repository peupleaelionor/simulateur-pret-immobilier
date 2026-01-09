import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, PieChart as PieChartIcon, TableIcon, Info } from "lucide-react";
import {
  resumerParAnnee,
  formaterEuros,
  formaterPourcentage,
  type ResultatSimulation,
} from "@shared/mortgage-calculator";
import ActionPlan from "./ActionPlan";
import { genererAttestationFaisabilite } from "@/lib/pdf-generator";

interface ResultsDisplayProps {
  result: ResultatSimulation;
}

const COLORS = {
  capital: "oklch(0.45 0.15 260)",
  interets: "oklch(0.55 0.18 155)",
  assurance: "oklch(0.65 0.12 45)",
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  // Prepare data for charts
  const chartData = useMemo(() => {
    const parAnnee = resumerParAnnee(result.tableauAmortissement);
    
    // Cumulative data for area chart
    let cumulCapital = 0;
    let cumulInterets = 0;
    let cumulAssurance = 0;
    
    return parAnnee.map((annee) => {
      cumulCapital += annee.capitalRembourse;
      cumulInterets += annee.interets;
      cumulAssurance += annee.assurance;
      
      return {
        annee: `Année ${annee.annee}`,
        anneeNum: annee.annee,
        capital: Math.round(cumulCapital),
        interets: Math.round(cumulInterets),
        assurance: Math.round(cumulAssurance),
        capitalRestant: Math.round(annee.capitalRestantDu),
      };
    });
  }, [result.tableauAmortissement]);

  // Pie chart data
  const pieData = useMemo(() => [
    { name: "Capital emprunté", value: result.capaciteEmprunt, color: COLORS.capital },
    { name: "Intérêts", value: result.coutInterets, color: COLORS.interets },
    { name: "Assurance", value: result.coutAssurance, color: COLORS.assurance },
  ], [result]);

  // First 5 years detailed table
  const tableData = useMemo(() => {
    const parAnnee = resumerParAnnee(result.tableauAmortissement);
    return parAnnee.slice(0, 5);
  }, [result.tableauAmortissement]);

  // Total row
  const totalRow = useMemo(() => {
    const parAnnee = resumerParAnnee(result.tableauAmortissement);
    return {
      capitalRembourse: parAnnee.reduce((sum, a) => sum + a.capitalRembourse, 0),
      interets: parAnnee.reduce((sum, a) => sum + a.interets, 0),
      assurance: parAnnee.reduce((sum, a) => sum + a.assurance, 0),
      totalPaye: parAnnee.reduce((sum, a) => sum + a.totalPaye, 0),
    };
  }, [result.tableauAmortissement]);

  const handleDownloadAttestation = async () => {
    try {
      const nom = prompt("Veuillez saisir votre nom complet pour l'attestation :") || "Client Simvan";
      const pdfBlob = await genererAttestationFaisabilite(result, nom);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Attestation_Faisabilite_Simvan_${nom.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur génération attestation:", err);
    }
  };

  const handleContactExpert = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-900 font-semibold">
          ⚠️ <strong>Simulation indicative.</strong> Votre taux final dépendra de votre dossier et de l'établissement prêteur.
        </p>
      </div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="finance-card border-2 border-primary bg-primary/5">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Capacité d'emprunt</p>
            <p className="text-2xl font-bold text-primary">{formaterEuros(result.capaciteEmprunt)}</p>
            <p className="text-xs text-accent font-semibold mt-2">✅ Vous êtes éligible !</p>
          </CardContent>
        </Card>
        <Card className="finance-card">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Mensualité totale</p>
            <p className="text-xl font-bold">{formaterEuros(result.mensualiteTotale)}</p>
          </CardContent>
        </Card>
        <Card className="finance-card">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Coût total du crédit</p>
            <p className="text-xl font-bold text-destructive">{formaterEuros(result.coutTotalCredit)}</p>
          </CardContent>
        </Card>
        <Card className="finance-card">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Reste à vivre</p>
            <p className={`text-xl font-bold ${result.resteAVivre < 1000 ? "text-amber-500" : "text-accent"}`}>
              {formaterEuros(result.resteAVivre)}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed breakdown */}
      <Card className="finance-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Détail de votre mensualité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Remboursement crédit</span>
              <span className="font-medium">{formaterEuros(result.mensualiteHorsAssurance)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-muted-foreground">Assurance emprunteur</span>
              <span className="font-medium">{formaterEuros(result.mensualiteAssurance)}</span>
            </div>
            <div className="flex justify-between items-center py-2 font-semibold text-lg">
              <span>Total mensuel</span>
              <span className="text-primary">{formaterEuros(result.mensualiteTotale)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Table Tabs */}
      <Tabs defaultValue="evolution" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="evolution" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Évolution</span>
          </TabsTrigger>
          <TabsTrigger value="repartition" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Répartition</span>
          </TabsTrigger>
          <TabsTrigger value="tableau" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Tableau</span>
          </TabsTrigger>
        </TabsList>

        {/* Evolution Chart */}
        <TabsContent value="evolution" asChild>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
          <Card className="finance-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Évolution du remboursement</CardTitle>
              <p className="text-sm text-muted-foreground">
                Répartition capital / intérêts / assurance sur la durée
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="anneeNum" 
                      tickFormatter={(value) => `${value}`}
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${Math.round(value / 1000)}k€`}
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        formaterEuros(value),
                        name === "capital" ? "Capital remboursé" :
                        name === "interets" ? "Intérêts payés" : "Assurance payée"
                      ]}
                      labelFormatter={(label) => `Année ${label}`}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="capital"
                      stackId="1"
                      stroke={COLORS.capital}
                      fill={COLORS.capital}
                      fillOpacity={0.8}
                      name="capital"
                    />
                    <Area
                      type="monotone"
                      dataKey="interets"
                      stackId="1"
                      stroke={COLORS.interets}
                      fill={COLORS.interets}
                      fillOpacity={0.8}
                      name="interets"
                    />
                    <Area
                      type="monotone"
                      dataKey="assurance"
                      stackId="1"
                      stroke={COLORS.assurance}
                      fill={COLORS.assurance}
                      fillOpacity={0.8}
                      name="assurance"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.capital }} />
                  <span className="text-sm text-muted-foreground">Capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.interets }} />
                  <span className="text-sm text-muted-foreground">Intérêts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.assurance }} />
                  <span className="text-sm text-muted-foreground">Assurance</span>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </TabsContent>

        {/* Pie Chart */}
        <TabsContent value="repartition">
          <Card className="finance-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Répartition du coût total</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ce que vous payez réellement sur toute la durée
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formaterEuros(value)}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom"
                      formatter={(value) => <span className="text-sm">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                <p className="text-center text-sm">
                  <span className="font-semibold">Coût total du crédit : </span>
                  <span className="text-destructive font-bold">
                    {formaterEuros(result.coutTotalCredit)}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}({formaterPourcentage((result.coutTotalCredit / result.capaciteEmprunt) * 100, 1)} du capital)
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Amortization Table */}
        <TabsContent value="tableau">
          <Card className="finance-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tableau d'amortissement</CardTitle>
              <p className="text-sm text-muted-foreground">
                Détail des 5 premières années
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Année</TableHead>
                      <TableHead className="text-right">Capital</TableHead>
                      <TableHead className="text-right">Intérêts</TableHead>
                      <TableHead className="text-right">Assurance</TableHead>
                      <TableHead className="text-right">Total payé</TableHead>
                      <TableHead className="text-right">Restant dû</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.annee}>
                        <TableCell className="font-medium">{row.annee}</TableCell>
                        <TableCell className="text-right">{formaterEuros(row.capitalRembourse)}</TableCell>
                        <TableCell className="text-right">{formaterEuros(row.interets)}</TableCell>
                        <TableCell className="text-right">{formaterEuros(row.assurance)}</TableCell>
                        <TableCell className="text-right">{formaterEuros(row.totalPaye)}</TableCell>
                        <TableCell className="text-right">{formaterEuros(row.capitalRestantDu)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-secondary/30 font-semibold">
                      <TableCell>TOTAL</TableCell>
                      <TableCell className="text-right">{formaterEuros(totalRow.capitalRembourse)}</TableCell>
                      <TableCell className="text-right">{formaterEuros(totalRow.interets)}</TableCell>
                      <TableCell className="text-right">{formaterEuros(totalRow.assurance)}</TableCell>
                      <TableCell className="text-right">{formaterEuros(totalRow.totalPaye)}</TableCell>
                      <TableCell className="text-right">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional costs info */}
      <Card className="finance-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Frais annexes estimés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-secondary/30 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Frais de dossier</p>
              <p className="font-semibold">{formaterEuros(result.fraisDossier)}</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Garantie (caution)</p>
              <p className="font-semibold">{formaterEuros(result.fraisGarantie)}</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Frais de notaire (estimés)</p>
              <p className="font-semibold">{formaterEuros(result.fraisNotaire)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Ces frais sont des estimations. Les frais de notaire varient selon le type de bien (neuf/ancien).
          </p>
        </CardContent>
      </Card>

      {/* Action Plan Section */}
      <ActionPlan 
        result={result} 
        onDownloadAttestation={handleDownloadAttestation}
        onContactExpert={handleContactExpert}
      />
    </div>
  );
}
