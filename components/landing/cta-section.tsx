// components/cta-section.tsx
import { Shield, Truck, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section id="order" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Your Health Journey Today
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience the AGE 400™ difference with our risk-free offer
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">Made in FDA-registered facilities</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $50</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg">30-Day Return</h3>
                <p className="text-sm text-muted-foreground">Satisfaction guaranteed</p>
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="text-3xl font-bold">AGE 400™</div>
                  <div className="text-2xl font-bold text-primary">20 x 2000 mg</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$39.99</span>
                    <span className="text-lg text-muted-foreground line-through">$49.99</span>
                    <span className="bg-red-500/10 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                      20% OFF
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Link
                    href="#"
                    className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart - $39.99
                  </Link>
                  <p className="text-sm text-center text-muted-foreground">
                    Free shipping • 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                ⚕️ These statements have not been evaluated by the Food and Drug Administration. 
                This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}