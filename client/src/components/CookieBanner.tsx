import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie_consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);

    // Initialize analytics if accepted
    if (prefs.analytics) {
      // Google Analytics would be initialized here
      console.log("Analytics cookies accepted");
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur border-t border-border shadow-lg">
      <div className="container max-w-4xl">
        {!showSettings ? (
          // Main banner
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">
                  Nous utilisons des cookies
                </p>
                <p className="text-xs text-muted-foreground">
                  Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic. 
                  En continuant, vous acceptez notre{" "}
                  <a href="/mentions-legales#cookies" className="text-primary hover:underline">
                    politique de cookies
                  </a>.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="flex-1 sm:flex-none"
              >
                <Settings className="h-4 w-4 mr-1" />
                Personnaliser
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessary}
                className="flex-1 sm:flex-none"
              >
                Refuser
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="flex-1 sm:flex-none bg-accent hover:bg-accent/90"
              >
                Tout accepter
              </Button>
            </div>
          </div>
        ) : (
          // Settings panel
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Paramètres des cookies</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {/* Necessary cookies */}
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Cookies nécessaires</p>
                  <p className="text-xs text-muted-foreground">
                    Indispensables au fonctionnement du site
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">Toujours actifs</div>
              </div>

              {/* Analytics cookies */}
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Cookies analytiques</p>
                  <p className="text-xs text-muted-foreground">
                    Nous aident à comprendre comment vous utilisez le site
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>

              {/* Marketing cookies */}
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Cookies marketing</p>
                  <p className="text-xs text-muted-foreground">
                    Permettent d'afficher des publicités pertinentes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={acceptNecessary}>
                Refuser tout
              </Button>
              <Button size="sm" onClick={saveCustomPreferences} className="bg-accent hover:bg-accent/90">
                Enregistrer mes choix
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
