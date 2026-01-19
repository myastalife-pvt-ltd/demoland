// components/navigation.tsx
import { Menu, ShoppingCart, Phone } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="font-bold text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                NuWica
              </div>
              <span className="font-semibold text-primary">AGE 400™</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
                Benefits
              </Link>
              <Link href="#ingredients" className="text-sm font-medium hover:text-primary transition-colors">
                Ingredients
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Reviews
              </Link>
              <Link href="#order" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="tel:+18005551234"
              className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>1-800-555-1234</span>
            </Link>
            
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            
            <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}