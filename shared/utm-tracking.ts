/**
 * UTM Tracking Module
 * 
 * Gestion complète du tracking UTM pour influenceurs et affiliés
 * Permet de tracker les conversions et calculer les commissions
 */

export interface UTMParams {
  utm_source?: string;      // Ex: "influencer_name", "facebook", "google"
  utm_medium?: string;       // Ex: "social", "cpc", "email", "affiliate"
  utm_campaign?: string;     // Ex: "summer2026", "launch", "promo"
  utm_term?: string;         // Ex: "pret immobilier", "credit maison"
  utm_content?: string;      // Ex: "banner_blue", "link_bio", "story"
}

export interface AffiliateClick {
  id: number;
  affiliateId: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
  converted: boolean;
  leadId?: number;
}

/**
 * Extract UTM parameters from URL
 */
export function extractUTMParams(url: string): UTMParams {
  const urlObj = new URL(url);
  const params: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  utmKeys.forEach((key) => {
    const value = urlObj.searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });

  return params;
}

/**
 * Store UTM parameters in sessionStorage
 */
export function storeUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined') return;
  
  sessionStorage.setItem('utm_params', JSON.stringify(params));
  sessionStorage.setItem('utm_timestamp', new Date().toISOString());
}

/**
 * Retrieve stored UTM parameters
 */
export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;
  
  const stored = sessionStorage.getItem('utm_params');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Generate affiliate link with UTM parameters
 */
export function generateAffiliateLink(
  baseUrl: string,
  affiliateId: string,
  campaign?: string
): string {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', affiliateId);
  url.searchParams.set('utm_medium', 'affiliate');
  
  if (campaign) {
    url.searchParams.set('utm_campaign', campaign);
  }

  return url.toString();
}

/**
 * Track affiliate click
 */
export async function trackAffiliateClick(
  params: UTMParams,
  metadata?: {
    referrer?: string;
    userAgent?: string;
    ipAddress?: string;
  }
): Promise<void> {
  // This would call your backend API to store the click
  const clickData = {
    ...params,
    ...metadata,
    timestamp: new Date().toISOString(),
  };

  console.log('Tracking affiliate click:', clickData);
  
  // Store in sessionStorage for later conversion tracking
  storeUTMParams(params);
}

/**
 * Track conversion (when lead is submitted)
 */
export async function trackConversion(leadId: number): Promise<void> {
  const utmParams = getStoredUTMParams();
  
  if (!utmParams) {
    console.log('No UTM params found for conversion tracking');
    return;
  }

  const conversionData = {
    leadId,
    ...utmParams,
    timestamp: new Date().toISOString(),
  };

  console.log('Tracking conversion:', conversionData);
  
  // This would call your backend API to mark the conversion
  // and calculate commission for the affiliate
}

/**
 * Calculate commission based on lead quality
 */
export function calculateCommission(
  loanAmount: number,
  duration: number
): number {
  // Commission tiers based on loan amount
  if (loanAmount >= 300000) {
    return 500; // High-value lead
  } else if (loanAmount >= 200000) {
    return 350; // Medium-value lead
  } else if (loanAmount >= 100000) {
    return 200; // Standard lead
  } else {
    return 100; // Low-value lead
  }
}

/**
 * Generate influencer dashboard URL with tracking
 */
export function generateInfluencerDashboard(influencerId: string): string {
  return `https://simulateur-pret.fr/influencer/${influencerId}/dashboard`;
}

/**
 * Validate UTM parameters
 */
export function validateUTMParams(params: UTMParams): boolean {
  // At minimum, we need utm_source and utm_medium
  return !!(params.utm_source && params.utm_medium);
}

/**
 * Clean UTM parameters (remove invalid characters)
 */
export function cleanUTMParams(params: UTMParams): UTMParams {
  const cleaned: UTMParams = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      // Remove special characters and spaces
      cleaned[key as keyof UTMParams] = value
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '_')
        .substring(0, 50); // Max 50 chars
    }
  });

  return cleaned;
}
