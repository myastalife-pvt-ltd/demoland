"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT } from "@/lib/constants";
import { useCartStore } from "@/stores/use-cart-store";
import { formatCurrency } from "@/lib/order-utils";
import { 
  ShoppingCart, 
  ArrowRight, 
  Shield, 
  Leaf, 
  Award, 
  Zap, 
  Star, 
  Heart,
  CheckCircle,
  Truck,
  Lock,
  ArrowLeft,
  Plus,
  Minus
} from "lucide-react";

export default function ProductPage() {
  const router = useRouter();
  const { addToCart, cartItem } = useCartStore();
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    setTimeout(() => {
      addToCart({
        productId: PRODUCT.id,
        name: PRODUCT.name,
        priceIncludingGst: PRODUCT.priceIncludingGst,
        gstPercentage: PRODUCT.gstPercentage,
        quantity: quantity,
        basePrice: PRODUCT.basePrice,
        gstAmount: PRODUCT.gstAmount,
      });

      setIsAdding(false);
      router.push("/checkout");
    }, 800);
  };

  const isInCart = cartItem?.productId === PRODUCT.id;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-chart-3/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl shadow-lg border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-base sm:text-lg">N</span>
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Nuvica
              </span>
            </button>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push("/")}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline text-sm font-medium">Back to Home</span>
              </button>
              {cartItem && (
                <button 
                  onClick={() => router.push("/checkout")}
                  className="relative group overflow-hidden rounded-full bg-gradient-to-r from-primary to-chart-2 px-4 py-2 text-white font-semibold text-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ShoppingCart size={16} />
                    <span>Checkout</span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Product Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Product Image */}
            <div 
              id="product-image"
              data-animate
              className={`relative ${isVisible['product-image'] ? 'animate-fade-in-left' : 'opacity-0'}`}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-chart-2/20 to-chart-3/30 blur-3xl rounded-full transform scale-90" />
                
                <div className="relative w-full h-full animate-float">
                  <img 
                    src="/nuvica.jpeg" 
                    alt="Nuvica AGE 400" 
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                    <Star className="text-white" fill="white" size={24} />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow animation-delay-1000">
                    <Heart className="text-white" fill="white" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div 
              id="product-details"
              data-animate
              className={`space-y-6 ${isVisible['product-details'] ? 'animate-fade-in-right' : 'opacity-0'}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-chart-2/20 border border-primary/30 backdrop-blur-sm">
                <Award className="text-primary" size={16} />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Premium Quality
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block text-foreground">AGE</span>
                <span className="block bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-gradient">
                  400
                </span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {PRODUCT.description || "Premium cellular wellness supplement with 20 × 2000mg servings. Unlock the power of cellular longevity with our advanced formula featuring premium berry antioxidants and green apple extracts."}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Shield size={16} />, text: "100% Safe" },
                  { icon: <Leaf size={16} />, text: "Natural" },
                  { icon: <Award size={16} />, text: "Lab Tested" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-xs font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 border border-border p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                
                <div className="relative space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                      {formatCurrency(PRODUCT.priceIncludingGst)}
                    </span>
                    <span className="text-sm text-muted-foreground">(incl. GST)</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Base Price:</span>
                      <span>{formatCurrency(PRODUCT.basePrice)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>GST ({PRODUCT.gstPercentage}%):</span>
                      <span>{formatCurrency(PRODUCT.gstAmount)}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-lg p-3">
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">Free shipping included</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isInCart ? (
                  <button 
                    onClick={() => router.push("/checkout")}
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-primary to-chart-2 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Go to Checkout
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                ) : (
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-primary to-chart-2 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isAdding ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Adding to Cart...
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          Add to Cart
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div 
            id="features-header"
            data-animate
            className={`text-center mb-10 ${isVisible['features-header'] ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Why Choose <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">AGE 400</span>?
            </h2>
            <div className="mt-3 h-1 w-16 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Truck />, title: "Free Shipping", desc: "On all orders", gradient: "from-blue-500 to-cyan-500" },
              { icon: <Shield />, title: "Secure Checkout", desc: "100% safe payment", gradient: "from-purple-500 to-pink-500" },
              { icon: <Award />, title: "Quality Assured", desc: "Premium products", gradient: "from-emerald-500 to-teal-500" },
              { icon: <Zap />, title: "Fast Delivery", desc: "Quick dispatch", gradient: "from-orange-500 to-amber-500" }
            ].map((feature, i) => (
              <div 
                key={i}
                id={`feature-${i}`}
                data-animate
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 p-6 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible[`feature-${i}`] ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform" />
                
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Highlight */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div 
              id="ingredients-images"
              data-animate
              className={`grid grid-cols-2 gap-4 ${isVisible['ingredients-images'] ? 'animate-fade-in-left' : 'opacity-0'}`}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4 hover:scale-105 transition-transform shadow-lg overflow-hidden">
                <img src="/124.webp" alt="Berry Blend" className="w-full h-full object-contain" />
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4 mt-6 hover:scale-105 transition-transform shadow-lg overflow-hidden">
                <img src="/130.webp" alt="Green Apple" className="w-full h-full object-contain" />
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-4 -mt-6 hover:scale-105 transition-transform shadow-lg overflow-hidden">
                <img src="/125.png" alt="Antioxidants" className="w-full h-full object-contain" />
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center p-4 hover:scale-105 transition-transform shadow-lg overflow-hidden">
                <img src="/129.webp" alt="Botanicals" className="w-full h-full object-contain" />
              </div>
            </div>

            <div 
              id="ingredients-content"
              data-animate
              className={`space-y-6 ${isVisible['ingredients-content'] ? 'animate-fade-in-right' : 'opacity-0'}`}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Powered by <br/>
                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  Nature's Best
                </span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed">
                Our formula combines the DNA-supporting properties of curated berry polyphenols 
                with the crisp, vital energy of green apple enzymes.
              </p>

              <div className="space-y-3">
                {[
                  'Non-GMO Certified',
                  '100% Vegetarian',
                  'No Artificial Fillers',
                  'Third-Party Tested'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all">
                    <CheckCircle className="text-emerald-500" size={20} />
                    <span className="font-medium text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary via-chart-2 to-chart-3 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            Ready to Transform Your Wellness?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of satisfied customers today.
          </p>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAdding || isInCart}
            className="group relative overflow-hidden bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/30 hover:-translate-y-1 transition-all disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isInCart ? "Already in Cart" : "Order Now"}
              {!isInCart && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />}
            </span>
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: <Lock size={18} />, text: "Secure Checkout" },
              { icon: <Truck size={18} />, text: "Fast Shipping" },
              { icon: <Award size={18} />, text: "Quality Guaranteed" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-left {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-right {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
