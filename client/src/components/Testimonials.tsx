import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Primo-accédante",
    location: "Paris",
    rating: 5,
    text: "Grâce à Simvan Immo, j'ai pu simuler mon prêt en quelques minutes et obtenir 3 offres de courtiers. J'ai économisé 15 000€ sur mon assurance emprunteur !",
    avatar: "SM",
    date: "Décembre 2025"
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Investisseur immobilier",
    location: "Lyon",
    rating: 5,
    text: "L'outil le plus précis que j'ai testé. Les calculs respectent vraiment les règles HCSF 2026. Je recommande à tous mes clients investisseurs.",
    avatar: "TD",
    date: "Novembre 2025"
  },
  {
    id: 3,
    name: "Marie Lefebvre",
    role: "Acheteuse",
    location: "Bordeaux",
    rating: 5,
    text: "Interface claire, résultats instantanés et surtout 100% gratuit. J'ai pu comparer plusieurs scénarios avant de me lancer. Parfait !",
    avatar: "ML",
    date: "Janvier 2026"
  }
];

export default function Testimonials() {
  return (
    <section className="section bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-accent" />
            4.9/5 sur 2 847 avis
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ils ont concrétisé leur projet avec <span className="text-primary">Simvan Immo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rejoignez les milliers de Français qui ont utilisé notre simulateur pour obtenir leur prêt immobilier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="finance-card p-6 hover:shadow-lg transition-shadow relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/10">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span><strong className="text-foreground">12 500+</strong> simulations ce mois</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span><strong className="text-foreground">98%</strong> de satisfaction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span><strong className="text-foreground">100%</strong> gratuit</span>
          </div>
        </div>
      </div>
    </section>
  );
}
