import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EspaceCourtiers from "./pages/EspaceCourtiers";
import Merci from "./pages/Merci";
import FAQ from "./pages/FAQ";
import MentionsLegales from "./pages/MentionsLegales";
import Admin from "./pages/Admin";
import GuidePremierAchat from "./pages/GuidePremierAchat";
import ComparatifAssurances from "./pages/ComparatifAssurances";
import LegalNotice from "./pages/LegalNotice";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/merci" component={Merci} />
      <Route path="/faq" component={FAQ} />
      <Route path="/mentions-legales" component={MentionsLegales} />
      <Route path="/contact" component={Contact} />
      <Route path="/legal" component={LegalNotice} />
      <Route path="/admin" component={Admin} />
      <Route path="/guide-premier-achat" component={GuidePremierAchat} />
      <Route path="/comparatif-assurances" component={ComparatifAssurances} />
      <Route path="/courtiers" component={EspaceCourtiers} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
          </div>
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
