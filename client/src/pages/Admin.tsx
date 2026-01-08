import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  Settings,
  Download,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  LogOut,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  MousePointerClick,
} from "lucide-react";
import { formaterEuros } from "@shared/mortgage-calculator";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  qualified: "bg-purple-100 text-purple-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  new: "Nouveau",
  contacted: "Contacté",
  qualified: "Qualifié",
  converted: "Converti",
  lost: "Perdu",
};

export default function Admin() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Fetch leads
  const { data: leadsData, refetch: refetchLeads, isLoading: leadsLoading } = trpc.leads.list.useQuery(
    {
      page,
      limit: 20,
      status: statusFilter !== "all" ? statusFilter as any : undefined,
      search: search || undefined,
    },
    { enabled: isAdmin }
  );

  // Fetch stats
  const { data: stats, isLoading: statsLoading } = trpc.leads.stats.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  // Fetch analytics
  const { data: analytics } = trpc.analytics.stats.useQuery(
    {},
    { enabled: isAdmin }
  );

  // Fetch affiliate stats
  const { data: affiliateStats } = trpc.affiliates.stats.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  // Update lead status mutation
  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Statut mis à jour");
      refetchLeads();
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour");
    },
  });

  // Export CSV mutation
  const { data: exportData, refetch: exportCsv } = trpc.leads.export.useQuery(
    { status: statusFilter !== "all" ? statusFilter as any : undefined },
    { enabled: false }
  );

  // Handle export
  const handleExport = async () => {
    const result = await exportCsv();
    if (result.data?.csv) {
      const blob = new Blob([result.data.csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success(`${result.data.count} leads exportés`);
    }
  };

  // Handle status change
  const handleStatusChange = (leadId: number, newStatus: string) => {
    updateStatus.mutate({ id: leadId, status: newStatus as any });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Administration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Connectez-vous pour accéder au tableau de bord administrateur.
            </p>
            <Button asChild className="w-full">
              <a href={getLoginUrl()}>Se connecter</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="/">Retour à l'accueil</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Accès refusé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Vous n'avez pas les droits d'accès à cette page.
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="/">Retour à l'accueil</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Admin</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.name || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Leads</p>
                      <p className="text-3xl font-bold">{stats?.total || 0}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary opacity-50" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">{stats?.last7Days || 0}</span>
                    <span className="text-muted-foreground ml-1">cette semaine</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Taux conversion</p>
                      <p className="text-3xl font-bold">{stats?.conversionRate?.toFixed(1) || 0}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-accent opacity-50" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {stats?.byStatus?.converted || 0} convertis
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Simulations</p>
                      <p className="text-3xl font-bold">{analytics?.eventsByName?.simulateur_utilise || 0}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary opacity-50" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {analytics?.uniqueSessions || 0} sessions uniques
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Clics affiliés</p>
                      <p className="text-3xl font-bold">{affiliateStats?.totalClicks || 0}</p>
                    </div>
                    <MousePointerClick className="h-8 w-8 text-accent opacity-50" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {affiliateStats?.last7Days || 0} cette semaine
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition par statut</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(statusLabels).map(([status, label]) => (
                    <div key={status} className="text-center p-4 bg-secondary/30 rounded-lg">
                      <Badge className={statusColors[status]}>{label}</Badge>
                      <p className="text-2xl font-bold mt-2">
                        {stats?.byStatus?.[status] || 0}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sources de trafic (Leads)</CardTitle>
                </CardHeader>
                <CardContent>
                  {stats?.bySource && Object.keys(stats.bySource).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(stats.bySource).map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between">
                          <span className="text-sm">{source || "Direct"}</span>
                          <span className="font-medium">{count as number}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Aucune donnée disponible</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sources de trafic (Analytics)</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics?.eventsBySource && Object.keys(analytics.eventsBySource).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(analytics.eventsBySource).map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between">
                          <span className="text-sm">{source || "Direct"}</span>
                          <span className="font-medium">{count as number}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Aucune donnée disponible</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher par email ou téléphone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => refetchLeads()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                  </Button>
                  <Button onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Exporter CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Durée</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leadsLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                          </TableCell>
                        </TableRow>
                      ) : leadsData?.leads.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            Aucun lead trouvé
                          </TableCell>
                        </TableRow>
                      ) : (
                        leadsData?.leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell className="whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                            </TableCell>
                            <TableCell>{lead.email}</TableCell>
                            <TableCell>{lead.phone}</TableCell>
                            <TableCell>{formaterEuros(lead.montantEmprunte)}</TableCell>
                            <TableCell>{lead.dureeAns} ans</TableCell>
                            <TableCell>{lead.utmSource || "-"}</TableCell>
                            <TableCell>
                              <Select
                                value={lead.status}
                                onValueChange={(value) => handleStatusChange(lead.id, value)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <Badge className={statusColors[lead.status]}>
                                    {statusLabels[lead.status]}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusLabels).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>{label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {leadsData && leadsData.total > 20 && (
                  <div className="flex items-center justify-between p-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Page {page} sur {Math.ceil(leadsData.total / 20)}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= Math.ceil(leadsData.total / 20)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Settings Panel Component
function SettingsPanel() {
  const { data: settings, refetch } = trpc.settings.list.useQuery();
  const updateSetting = trpc.settings.update.useMutation({
    onSuccess: () => {
      toast.success("Paramètre mis à jour");
      refetch();
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour");
    },
  });

  const [rates, setRates] = useState({
    taux_10ans: "3.15",
    taux_15ans: "3.35",
    taux_20ans: "3.50",
    taux_25ans: "3.65",
  });

  // Initialize rates from settings
  useState(() => {
    if (settings) {
      const newRates = { ...rates };
      settings.forEach(s => {
        if (s.key in newRates) {
          (newRates as any)[s.key] = s.value;
        }
      });
      setRates(newRates);
    }
  });

  const handleSaveRates = () => {
    Object.entries(rates).forEach(([key, value]) => {
      updateSetting.mutate({
        key,
        value,
        description: `Taux d'intérêt par défaut pour ${key.replace("taux_", "").replace("ans", " ans")}`,
      });
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Taux d'intérêt par défaut</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Ces taux sont utilisés par défaut dans le simulateur. Mettez-les à jour régulièrement 
            pour refléter les conditions du marché.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Taux 10 ans (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={rates.taux_10ans}
                onChange={(e) => setRates({ ...rates, taux_10ans: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Taux 15 ans (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={rates.taux_15ans}
                onChange={(e) => setRates({ ...rates, taux_15ans: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Taux 20 ans (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={rates.taux_20ans}
                onChange={(e) => setRates({ ...rates, taux_20ans: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Taux 25 ans (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={rates.taux_25ans}
                onChange={(e) => setRates({ ...rates, taux_25ans: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleSaveRates} disabled={updateSetting.isPending}>
            {updateSetting.isPending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer les taux"
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dernière mise à jour</span>
              <span>{new Date().toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
