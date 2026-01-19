// components/product-details-section.tsx
import { Package, Thermometer, Leaf, Clock } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Premium Packaging",
    description: "Blister-packed for freshness and convenience",
  },
  {
    icon: Thermometer,
    title: "Temperature Stable",
    description: "Maintains potency in various conditions",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Sourced from premium quality natural extracts",
  },
  {
    icon: Clock,
    title: "Long-lasting Effect",
    description: "Designed for sustained release throughout the day",
  },
];

export default function ProductDetailsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Advanced Formulation Technology
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our AGE 400™ formula combines cutting-edge science with natural ingredients 
                  to deliver optimal results. Each tablet contains 2000mg of our proprietary blend.
                </p>
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl p-6">
                <h4 className="font-semibold text-lg mb-2">Recommended Use</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Take one tablet daily with water
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Best taken with a meal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Consult healthcare professional if pregnant or nursing
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-background rounded-3xl p-8 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-purple-300/10 rounded-2xl flex flex-col items-center justify-center p-8">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary">NuWica</div>
                    <div className="text-4xl font-bold">AGE 400™</div>
                  </div>
                  
                  <div className="border-t border-border pt-6">
                    <div className="text-2xl font-bold text-primary mb-2">20 x 2000 mg</div>
                    <div className="text-sm text-muted-foreground">Net Weight</div>
                  </div>
                  
                  <div className="text-lg text-center text-muted-foreground">
                    Smooth Today, Strong Tomorrow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}