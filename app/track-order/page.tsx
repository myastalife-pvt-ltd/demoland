"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/stores/use-order-store";
import { formatCurrency, formatOrderDate } from "@/lib/order-utils";
import type { Order } from "@/types";
import {
  Search,
  Package,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Truck,
  MapPin,
  Box,
  Clock,
  Sparkles,
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
} from "lucide-react";

// Delivery status steps
const deliverySteps = [
  { id: "confirmed", label: "Order Confirmed", icon: CheckCircle, description: "Your order has been placed successfully" },
  { id: "processing", label: "Processing", icon: Box, description: "We're preparing your order" },
  { id: "shipped", label: "Shipped", icon: Package, description: "Your order is on its way" },
  { id: "out_for_delivery", label: "Out for Delivery", icon: Truck, description: "Your order is out for delivery" },
  { id: "delivered", label: "Delivered", icon: MapPin, description: "Order delivered successfully" },
];

// Map order status to delivery step index
const getDeliveryStepIndex = (status: string): number => {
  switch (status) {
    case "pending":
      return 0;
    case "confirmed":
      return 1;
    case "shipped":
      return 2;
    case "delivered":
      return 4;
    default:
      return 1; // Default to confirmed
  }
};

export default function TrackOrderPage() {
  const router = useRouter();
  const { getOrderByNumber } = useOrderStore();

  const [orderNumber, setOrderNumber] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
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
  }, [searchedOrder]);

  const handleSearch = () => {
    if (!orderNumber.trim()) return;

    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      const order = getOrderByNumber(orderNumber.trim());

      if (order) {
        setSearchedOrder(order);
        setNotFound(false);
      } else {
        setSearchedOrder(null);
        setNotFound(true);
      }

      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const currentStepIndex = searchedOrder ? getDeliveryStepIndex(searchedOrder.status) : 0;

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

            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-foreground">Track Your </span>
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-gradient">
                Order
              </span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Enter your order number to see the current status
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          </div>

          {/* Search Card */}
          <div className="relative max-w-xl mx-auto mb-8 animate-fade-in-up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-full -mr-20 -mt-20 blur-2xl" />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Search Order</h2>
                    <p className="text-sm text-muted-foreground">Enter your order ID below</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-semibold text-foreground mb-2">
                      Order Number
                    </label>
                    
                    <div className={`relative rounded-xl transition-all duration-300 ${
                      isFocused ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20' : ''
                    }`}>
                      <input
                        id="orderNumber"
                        type="text"
                        placeholder="e.g., ORD1737558123456789"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full px-4 py-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-border transition-all text-foreground font-mono tracking-wider placeholder:text-muted-foreground/50 placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <p className="mt-2 text-xs text-muted-foreground">
                      You can find your order number in the confirmation email
                    </p>
                  </div>

                  <button
                    onClick={handleSearch}
                    disabled={isSearching || !orderNumber.trim()}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-chart-2 py-4 text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSearching ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search size={20} />
                          Track Order
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Not Found Message */}
          {notFound && (
            <div className="max-w-xl mx-auto mb-8 animate-fade-in-up">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-bold text-destructive mb-1">Order Not Found</h3>
                    <p className="text-sm text-destructive/80">
                      We couldn't find an order with number "<span className="font-mono">{orderNumber}</span>". 
                      Please check the order number and try again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          {searchedOrder && (
            <div className="space-y-6">
              {/* Order Found Success */}
              <div 
                id="order-found"
                data-animate
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-2xl ${
                  isVisible['order-found'] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-400/10 to-emerald-600/10 rounded-full -mr-24 -mt-24 blur-2xl" />
                
                <div className="relative p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md animate-pulse" />
                      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Order Found!</h2>
                      <p className="text-sm text-muted-foreground font-mono">{searchedOrder.orderNumber}</p>
                    </div>
                  </div>

                  {/* Order Status Badge */}
                  <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Order Status</p>
                        <p className="text-lg font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent uppercase">
                          {searchedOrder.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Ordered on</p>
                        <p className="font-semibold text-foreground">{formatOrderDate(searchedOrder.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Timeline */}
                  <div className="mb-8">
                    <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Delivery Status
                    </h3>
                    
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
                      <div 
                        className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-emerald-400 to-primary transition-all duration-1000"
                        style={{ height: `${Math.min(currentStepIndex / (deliverySteps.length - 1) * 100, 100)}%` }}
                      />
                      
                      <div className="space-y-6">
                        {deliverySteps.map((step, index) => {
                          const isCompleted = index <= currentStepIndex;
                          const isCurrent = index === currentStepIndex;
                          const Icon = step.icon;
                          
                          return (
                            <div 
                              key={step.id}
                              className={`relative flex items-start gap-4 transition-all ${
                                isCompleted ? 'opacity-100' : 'opacity-40'
                              }`}
                            >
                              {/* Step Circle */}
                              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                isCompleted 
                                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-400/30' 
                                  : 'bg-secondary border-2 border-border'
                              } ${isCurrent ? 'ring-4 ring-emerald-400/30 scale-110' : ''}`}>
                                <Icon className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                              </div>
                              
                              {/* Step Content */}
                              <div className="flex-1 pt-1">
                                <p className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                  {step.label}
                                </p>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                {isCurrent && (
                                  <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-600">
                                    <Clock className="w-3 h-3" />
                                    Current Status
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                        <p className="font-bold text-foreground">3-5 Business Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Details */}
                <div 
                  id="product-details"
                  data-animate
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-xl p-6 ${
                    isVisible['product-details'] ? 'animate-fade-in-left' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '100ms' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground">Product</h3>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src="/nuvica.jpeg" alt={searchedOrder.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{searchedOrder.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {searchedOrder.product.quantity}</p>
                      <p className="text-lg font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                        {formatCurrency(searchedOrder.product.priceIncludingGst)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div 
                  id="payment-summary"
                  data-animate
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-xl p-6 ${
                    isVisible['payment-summary'] ? 'animate-fade-in-right' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '100ms' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground">Payment</h3>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Amount</span>
                      <span className="font-medium">{formatCurrency(searchedOrder.baseAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST ({searchedOrder.product.gstPercentage}%)</span>
                      <span className="font-medium">{formatCurrency(searchedOrder.gstAmount)}</span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between text-base">
                      <span className="font-bold">Total Paid</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(searchedOrder.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div 
                id="shipping-details"
                data-animate
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-xl p-6 ${
                  isVisible['shipping-details'] ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: '200ms' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground">Shipping Details</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium text-foreground">{searchedOrder.userDetails.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Mobile</p>
                      <p className="font-medium text-foreground">{searchedOrder.mobileNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{searchedOrder.userDetails.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">
                        {searchedOrder.userDetails.addressLine}, {searchedOrder.userDetails.city}, {searchedOrder.userDetails.state} - {searchedOrder.userDetails.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Back to Home Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/product")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold transition-all hover:-translate-y-0.5"
            >
              <Package size={18} />
              Continue Shopping
            </button>
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
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
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
