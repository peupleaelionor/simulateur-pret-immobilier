import { useEffect, useState } from "react";
import MortgageCalculator from "./MortgageCalculator";

/**
 * White-label Embed Component
 * 
 * Permet aux agences immobilières d'intégrer le calculateur sur leur site
 * via iframe ou script embed.
 * 
 * Usage:
 * <iframe src="https://simulateur-pret.fr/embed?partner=AGENCY_ID" />
 * 
 * Paramètres URL:
 * - partner: ID du partenaire (obligatoire)
 * - theme: light|dark (optionnel)
 * - hideFooter: true|false (optionnel)
 * - utm_source, utm_medium, utm_campaign: tracking UTM
 */

interface WhiteLabelConfig {
  partnerId: string;
  theme?: "light" | "dark";
  hideFooter?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export default function WhiteLabelEmbed() {
  const [config, setConfig] = useState<WhiteLabelConfig | null>(null);

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    
    const partnerId = params.get("partner");
    if (!partnerId) {
      console.error("White-label embed: partner ID is required");
      return;
    }

    setConfig({
      partnerId,
      theme: (params.get("theme") as "light" | "dark") || "light",
      hideFooter: params.get("hideFooter") === "true",
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    });

    // Send message to parent window when ready
    window.parent.postMessage({ type: "embed-ready", partnerId }, "*");
  }, []);

  useEffect(() => {
    if (!config) return;

    // Apply theme
    document.documentElement.classList.toggle("dark", config.theme === "dark");

    // Track embed load
    if (config.utmSource) {
      // Analytics tracking here
      console.log("White-label embed loaded:", config);
    }
  }, [config]);

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <MortgageCalculator />
      
      {!config.hideFooter && (
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Propulsé par{" "}
            <a
              href={`https://simulateur-pret.fr?utm_source=${config.partnerId}&utm_medium=embed&utm_campaign=whitelabel`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Simvan Digital
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Generate embed code for partners
 */
export function generateEmbedCode(partnerId: string, options?: {
  theme?: "light" | "dark";
  hideFooter?: boolean;
  width?: string;
  height?: string;
}): string {
  const params = new URLSearchParams({
    partner: partnerId,
    ...(options?.theme && { theme: options.theme }),
    ...(options?.hideFooter && { hideFooter: "true" }),
  });

  const iframeCode = `<iframe
  src="https://simulateur-pret.fr/embed?${params.toString()}"
  width="${options?.width || "100%"}"
  height="${options?.height || "800px"}"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="Simvan Digital"
></iframe>`;

  return iframeCode;
}

/**
 * Generate script embed code (alternative to iframe)
 */
export function generateScriptEmbed(partnerId: string): string {
  return `<div id="simulateur-pret-embed"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://simulateur-pret.fr/embed.js';
    script.dataset.partner = '${partnerId}';
    document.body.appendChild(script);
  })();
</script>`;
}
