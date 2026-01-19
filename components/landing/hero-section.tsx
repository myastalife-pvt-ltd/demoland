// components/hero-section.tsx
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Advanced Formulation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              NuWica{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AGE 400™
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-muted-foreground">
              Smooth Today, <span className="font-semibold text-foreground">Strong Tomorrow</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl">
              Advanced anti-aging formula designed to support joint health, skin elasticity, 
              and overall vitality. Experience renewed energy and flexibility with our 
              scientifically-backed formulation.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">20 Tablets per Pack</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">2000mg Potency</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#order"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Order Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="#benefits"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-background rounded-3xl p-8 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-primary/30 to-purple-300/30 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl font-bold text-primary/30 mb-4">N</div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">NuWica</div>
                    <div className="text-2xl font-bold text-primary">AGE 400™</div>
                    <div className="text-lg text-muted-foreground">20 x 2000 mg</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-background border border-border rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Net Weight</div>
                  <div className="text-xl font-bold text-primary">20 x 2000 mg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}