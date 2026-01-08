/**
 * Data B2B Module
 * 
 * Anonymisation des données et génération d'insights pour clients B2B
 * (banques, courtiers, analystes immobiliers)
 */

export interface AnonymizedLead {
  id: string; // UUID anonyme
  createdAt: Date;
  loanAmount: number;
  duration: number;
  rate: number;
  monthlyPayment: number;
  income: number;
  deposit: number;
  propertyType: "appartement" | "maison" | "terrain" | "autre";
  location: string; // Ville ou région (pas d'adresse précise)
  ageRange: "18-25" | "26-35" | "36-45" | "46-55" | "56+";
  converted: boolean;
}

export interface MarketInsights {
  period: string; // Ex: "2026-01"
  totalSimulations: number;
  averageLoanAmount: number;
  averageDuration: number;
  averageRate: number;
  averageIncome: number;
  conversionRate: number;
  topCities: Array<{ city: string; count: number }>;
  propertyTypeDistribution: Record<string, number>;
  ageDistribution: Record<string, number>;
}

/**
 * Anonymize a lead for B2B data export
 */
export function anonymizeLead(lead: any): AnonymizedLead {
  return {
    id: generateAnonymousId(),
    createdAt: lead.createdAt,
    loanAmount: Math.round(lead.loanAmount / 10000) * 10000, // Round to nearest 10k
    duration: lead.duration,
    rate: lead.rate,
    monthlyPayment: Math.round(lead.monthlyPayment / 100) * 100, // Round to nearest 100
    income: Math.round(lead.income / 5000) * 5000, // Round to nearest 5k
    deposit: Math.round(lead.deposit / 5000) * 5000,
    propertyType: lead.propertyType || "autre",
    location: extractRegion(lead.location), // Only region, not precise city
    ageRange: calculateAgeRange(lead.birthYear),
    converted: lead.converted || false,
  };
}

/**
 * Generate anonymous ID (UUID v4)
 */
function generateAnonymousId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Extract region from location (remove precise city)
 */
function extractRegion(location: string): string {
  const regionMap: Record<string, string> = {
    "Paris": "Île-de-France",
    "Lyon": "Auvergne-Rhône-Alpes",
    "Marseille": "Provence-Alpes-Côte d'Azur",
    "Toulouse": "Occitanie",
    "Nice": "Provence-Alpes-Côte d'Azur",
    "Nantes": "Pays de la Loire",
    "Bordeaux": "Nouvelle-Aquitaine",
    "Lille": "Hauts-de-France",
  };

  return regionMap[location] || "Autre";
}

/**
 * Calculate age range from birth year
 */
function calculateAgeRange(birthYear?: number): AnonymizedLead["ageRange"] {
  if (!birthYear) return "36-45"; // Default

  const age = new Date().getFullYear() - birthYear;

  if (age < 26) return "18-25";
  if (age < 36) return "26-35";
  if (age < 46) return "36-45";
  if (age < 56) return "46-55";
  return "56+";
}

/**
 * Generate market insights from anonymized leads
 */
export function generateMarketInsights(
  leads: AnonymizedLead[],
  period: string
): MarketInsights {
  const totalSimulations = leads.length;

  const averageLoanAmount =
    leads.reduce((sum, lead) => sum + lead.loanAmount, 0) / totalSimulations;

  const averageDuration =
    leads.reduce((sum, lead) => sum + lead.duration, 0) / totalSimulations;

  const averageRate =
    leads.reduce((sum, lead) => sum + lead.rate, 0) / totalSimulations;

  const averageIncome =
    leads.reduce((sum, lead) => sum + lead.income, 0) / totalSimulations;

  const convertedCount = leads.filter((lead) => lead.converted).length;
  const conversionRate = (convertedCount / totalSimulations) * 100;

  // Top cities
  const cityCount: Record<string, number> = {};
  leads.forEach((lead) => {
    cityCount[lead.location] = (cityCount[lead.location] || 0) + 1;
  });
  const topCities = Object.entries(cityCount)
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Property type distribution
  const propertyTypeDistribution: Record<string, number> = {};
  leads.forEach((lead) => {
    propertyTypeDistribution[lead.propertyType] =
      (propertyTypeDistribution[lead.propertyType] || 0) + 1;
  });

  // Age distribution
  const ageDistribution: Record<string, number> = {};
  leads.forEach((lead) => {
    ageDistribution[lead.ageRange] =
      (ageDistribution[lead.ageRange] || 0) + 1;
  });

  return {
    period,
    totalSimulations,
    averageLoanAmount: Math.round(averageLoanAmount),
    averageDuration: Math.round(averageDuration),
    averageRate: Math.round(averageRate * 100) / 100,
    averageIncome: Math.round(averageIncome),
    conversionRate: Math.round(conversionRate * 100) / 100,
    topCities,
    propertyTypeDistribution,
    ageDistribution,
  };
}

/**
 * Export anonymized data to CSV
 */
export function exportAnonymizedDataToCSV(leads: AnonymizedLead[]): string {
  const headers = [
    "ID",
    "Date",
    "Montant Emprunt",
    "Durée",
    "Taux",
    "Mensualité",
    "Revenus",
    "Apport",
    "Type Bien",
    "Région",
    "Tranche Âge",
    "Converti",
  ];

  const rows = leads.map((lead) => [
    lead.id,
    lead.createdAt.toISOString().split("T")[0],
    lead.loanAmount,
    lead.duration,
    lead.rate,
    lead.monthlyPayment,
    lead.income,
    lead.deposit,
    lead.propertyType,
    lead.location,
    lead.ageRange,
    lead.converted ? "Oui" : "Non",
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

  return csv;
}

/**
 * Generate insights report (Markdown format)
 */
export function generateInsightsReport(insights: MarketInsights): string {
  return `
# Rapport d'Insights Marché - ${insights.period}

## Vue d'ensemble

- **Total simulations**: ${insights.totalSimulations.toLocaleString('fr-FR')}
- **Taux de conversion**: ${insights.conversionRate}%
- **Montant moyen emprunté**: ${insights.averageLoanAmount.toLocaleString('fr-FR')}€
- **Durée moyenne**: ${insights.averageDuration} ans
- **Taux moyen**: ${insights.averageRate}%
- **Revenus moyens**: ${insights.averageIncome.toLocaleString('fr-FR')}€/an

## Top 10 Régions

${insights.topCities
  .map((city, i) => `${i + 1}. **${city.city}**: ${city.count} simulations`)
  .join('\n')}

## Distribution par Type de Bien

${Object.entries(insights.propertyTypeDistribution)
  .map(([type, count]) => `- **${type}**: ${count} (${((count / insights.totalSimulations) * 100).toFixed(1)}%)`)
  .join('\n')}

## Distribution par Tranche d'Âge

${Object.entries(insights.ageDistribution)
  .map(([age, count]) => `- **${age}**: ${count} (${((count / insights.totalSimulations) * 100).toFixed(1)}%)`)
  .join('\n')}

---

*Rapport généré le ${new Date().toLocaleDateString('fr-FR')}*
*Toutes les données sont anonymisées conformément au RGPD*
  `.trim();
}

/**
 * B2B API endpoint types
 */
export interface B2BAPIRequest {
  apiKey: string;
  period: string; // Format: "YYYY-MM"
  format: "json" | "csv" | "markdown";
}

export interface B2BAPIResponse {
  success: boolean;
  data?: MarketInsights | string;
  error?: string;
}
