import { Shield, Lock, Award, CheckCircle2 } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="bg-secondary/20 py-8">
      <div className="container">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* SSL Secure */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold">SSL Sécurisé</p>
              <p className="text-xs text-muted-foreground">Données cryptées</p>
            </div>
          </div>

          {/* RGPD Compliant */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Conforme RGPD</p>
              <p className="text-xs text-muted-foreground">Vos données protégées</p>
            </div>
          </div>

          {/* Certified */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Award className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold">Algorithmes Certifiés</p>
              <p className="text-xs text-muted-foreground">Normes HCSF 2026</p>
            </div>
          </div>

          {/* 100% Free */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">100% Gratuit</p>
              <p className="text-xs text-muted-foreground">Sans engagement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
