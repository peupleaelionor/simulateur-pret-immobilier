import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  title?: string;
  text?: string;
  url?: string;
}

export default function SocialShare({ 
  title = "Simvan Immo - Simulateur de Prêt Immobilier",
  text = "Simulez votre prêt immobilier gratuitement avec Simvan Immo !",
  url = typeof window !== 'undefined' ? window.location.href : ""
}: SocialShareProps) {
  
  const handleShare = async () => {
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or error:', error);
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Lien copié dans le presse-papiers !");
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Share2 className="h-4 w-4" />
      Partager
    </Button>
  );
}
