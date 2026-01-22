"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/use-cart-store";
import { useCheckoutStore } from "@/stores/use-checkout-store";
import { useOrderStore } from "@/stores/use-order-store";
import { formatCurrency } from "@/lib/order-utils";
import { generateOrderNumber } from "@/lib/order-utils";
import type { Order } from "@/types";
import { 
  CreditCard, 
  ArrowLeft, 
  CheckCircle, 
  Shield, 
  Truck, 
  Package, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Lock
} from "lucide-react";

interface PaymentSummaryProps {
  onBack: () => void;
}

export function PaymentSummary({ onBack }: PaymentSummaryProps) {
  const router = useRouter();
  const { cartItem, totalPrice, gstAmount, basePrice, clearCart } =
    useCartStore();
  const { mobileNumber, userDetails, resetCheckout } = useCheckoutStore();
  const { createOrder } = useOrderStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = () => {
    if (!cartItem) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order: Order = {
        orderNumber: generateOrderNumber(),
        product: cartItem,
        userDetails: {
          fullName: userDetails.fullName || "",
          email: userDetails.email || "",
          state: userDetails.state || "",
          city: userDetails.city || "",
          addressLine: userDetails.addressLine || "",
          pincode: userDetails.pincode || "",
        },
        mobileNumber,
        totalAmount: totalPrice,
        gstAmount,
        baseAmount: basePrice,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };

      // Create order first (this sets currentOrder in the store)
      createOrder(order);
      
      // Clear cart and checkout after order is created
      clearCart();
      resetCheckout();
      
      // Small delay to ensure state is persisted before navigation
      setTimeout(() => {
        router.push("/order-confirmation");
      }, 100);
    }, 2000);
  };

  if (!cartItem) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
          <Package className="w-10 h-10 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <button 
          onClick={() => router.push("/product")}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-chart-2 text-white font-semibold hover:shadow-lg transition-all"
        >
          Go to Product
        </button>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto animate-fade-in-up">
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-full -mr-24 -mt-24 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-chart-2/10 to-primary/10 rounded-full -ml-20 -mb-20 blur-2xl" />

        <div className="relative p-6 sm:p-10">
          {/* Icon Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-purple-600/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-xl animate-float">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Order Summary
            </h2>
            <p className="mt-2 text-muted-foreground text-center text-sm sm:text-base">
              Review your order and proceed to payment
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/20 p-5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-12 -mt-12" />
              
              <div className="relative flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img src="/nuvica.jpeg" alt={cartItem.name} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{cartItem.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {cartItem.quantity}</p>
                  <p className="mt-2 text-lg font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {formatCurrency(cartItem.priceIncludingGst * cartItem.quantity)}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Info Card */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-border p-5 space-y-3">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Shipping Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4 text-primary/70" />
                  <span className="font-medium text-foreground">{userDetails.fullName}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary/70" />
                  <span className="font-medium text-foreground">{mobileNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground sm:col-span-2">
                  <Mail className="w-4 h-4 text-primary/70" />
                  <span className="font-medium text-foreground">{userDetails.email}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  {userDetails.addressLine}, {userDetails.city}, {userDetails.state} - {userDetails.pincode}
                </p>
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-border p-5">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-primary" />
                Payment Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Price:</span>
                  <span className="font-medium text-foreground">{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST ({cartItem.gstPercentage}%):</span>
                  <span className="font-medium text-foreground">{formatCurrency(gstAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-medium text-emerald-600">FREE</span>
                </div>
                
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-foreground">Total Payable:</span>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Mock Payment Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-foreground/80">
                <p className="font-semibold text-foreground mb-1">Mock Payment Mode</p>
                <p>This is a demonstration. No actual payment will be processed.</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
              {[
                { icon: <Lock size={14} />, text: "Secure" },
                { icon: <Shield size={14} />, text: "Protected" },
                { icon: <Truck size={14} />, text: "Fast Shipping" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="text-primary">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onBack}
                disabled={isProcessing}
                className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="flex-1 group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-chart-2 py-4 text-white font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Place Order
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
