"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/stores/use-order-store";
import { formatCurrency, formatOrderDate } from "@/lib/order-utils";
import { 
  CheckCircle, 
  Package, 
  ArrowRight, 
  Copy, 
  Check,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
  Clock,
  ShoppingBag
} from "lucide-react";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { currentOrder } = useOrderStore();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if no current order (only after hydration)
  useEffect(() => {
    if (mounted && !currentOrder) {
      // Small delay to allow store to hydrate
      const timer = setTimeout(() => {
        if (!useOrderStore.getState().currentOrder) {
          router.push("/product");
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mounted, currentOrder, router]);

  const handleCopyOrderId = () => {
    if (currentOrder) {
      navigator.clipboard.writeText(currentOrder.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Show loading while hydrating or if no order yet
  if (!mounted || !currentOrder) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
            <Package className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <p className="text-muted-foreground">Loading your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Animation Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-400/30 animate-bounce-slow">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent">
                Order Placed Successfully!
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your order is confirmed.
            </p>
          </div>

          {/* Order ID Card - Prominent Display */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-2xl shadow-emerald-500/30 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-2xl" />
            
            <div className="relative p-6 sm:p-8">
              <div className="text-center">
                <p className="text-emerald-100 text-sm font-medium mb-2">Your Order ID</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <p className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">
                    {currentOrder.orderNumber}
                  </p>
                  <button
                    onClick={handleCopyOrderId}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-emerald-100 animate-fade-in-up">
                    ✓ Copied to clipboard!
                  </p>
                )}
                <p className="text-emerald-100 text-sm">
                  Save this ID to track your order anytime
                </p>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-full -mr-24 -mt-24 blur-2xl" />
            
            <div className="relative p-6 sm:p-8">
              {/* Product Section */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Product Details</h3>
                </div>
                
                <div className="flex gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-chart-2/5 border border-primary/10">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="/nuvica.jpeg" alt={currentOrder.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground text-lg">{currentOrder.product.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {currentOrder.product.quantity}</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent mt-1">
                      {formatCurrency(currentOrder.product.priceIncludingGst * currentOrder.product.quantity)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

              {/* Shipping Section */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Shipping Details</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-border/50">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium text-foreground">{currentOrder.userDetails.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-border/50">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Mobile</p>
                      <p className="font-medium text-foreground">{currentOrder.mobileNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-border/50">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{currentOrder.userDetails.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-border/50">
                    <Home className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground text-xs">
                        {currentOrder.userDetails.addressLine}, {currentOrder.userDetails.city}, {currentOrder.userDetails.state} - {currentOrder.userDetails.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

              {/* Payment Section */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Payment Summary</h3>
                </div>
                
                <div className="p-4 rounded-2xl bg-white/50 border border-border/50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Amount</span>
                    <span className="font-medium">{formatCurrency(currentOrder.baseAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST ({currentOrder.product.gstPercentage}%)</span>
                    <span className="font-medium">{formatCurrency(currentOrder.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-emerald-600">FREE</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total Paid</span>
                    <span className="text-xl font-bold text-emerald-600">{formatCurrency(currentOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Order Status & Date */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200">
                  <p className="text-xs text-emerald-600 mb-1">Order Status</p>
                  <p className="font-bold text-emerald-700 uppercase">{currentOrder.status}</p>
                </div>
                <div className="flex-1 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-chart-2/5 border border-primary/10">
                  <p className="text-xs text-muted-foreground mb-1">Ordered On</p>
                  <p className="font-bold text-foreground">{formatOrderDate(currentOrder.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20 p-5 mb-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-bold text-foreground text-lg">3-5 Business Days</p>
              </div>
              <div className="ml-auto">
                <Clock className="w-8 h-8 text-primary/50" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <button
              onClick={() => router.push("/track-order")}
              className="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-chart-2 text-white font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
            >
              <Package size={20} />
              Track Your Order
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button
              onClick={() => router.push("/product")}
              className="group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold transition-all hover:-translate-y-0.5"
            >
              <ShoppingBag size={20} />
              Continue Shopping
            </button>
          </div>

          {/* What's Next Info */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 border border-border p-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-bold text-foreground">What's Next?</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>You will receive an email confirmation shortly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Track your order anytime using the order ID above</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Estimated delivery within 3-5 business days</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

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
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
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
