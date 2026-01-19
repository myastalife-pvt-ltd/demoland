// components/benefits-section.tsx
import { Heart, Brain, Shield, Activity, Zap, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Heart Health Support",
    description: "Promotes cardiovascular function and circulation",
    color: "text-red-400",
  },
  {
    icon: Brain,
    title: "Cognitive Function",
    description: "Supports brain health and mental clarity",
    color: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Antioxidant Protection",
    description: "Fights free radicals and oxidative stress",
    color: "text-green-400",
  },
  {
    icon: Activity,
    title: "Joint Mobility",
    description: "Enhances flexibility and reduces stiffness",
    color: "text-purple-400",
  },
  {
    icon: Zap,
    title: "Energy Boost",
    description: "Increases vitality and reduces fatigue",
    color: "text-yellow-400",
  },
  {
    icon: Sparkles,
    title: "Skin Health",
    description: "Improves elasticity and reduces aging signs",
    color: "text-pink-400",
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Health Benefits
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AGE 400™ is formulated to support multiple aspects of your health and well-being
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-primary/10 ${benefit.color}`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary">20</div>
              <div className="text-lg font-medium">Tablets</div>
              <div className="text-sm text-muted-foreground">Per Package</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">2000mg</div>
              <div className="text-lg font-medium">Potency</div>
              <div className="text-sm text-muted-foreground">Advanced Formula</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">24h</div>
              <div className="text-lg font-medium">Protection</div>
              <div className="text-sm text-muted-foreground">Sustained Release</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}