// components/footer.tsx
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="font-bold text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              NuWica
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced anti-aging formula for a healthier, more vibrant life.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#benefits" className="hover:text-primary transition-colors">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-primary transition-colors">
                  Ingredients
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#order" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@nuwica.com</li>
              <li>1-800-555-1234</li>
              <li>Mon-Fri: 9AM-6PM EST</li>
              <li>123 Health St, Wellness City</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} NuWica AGE 400™. All rights reserved. 
            These statements have not been evaluated by the Food and Drug Administration. 
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}