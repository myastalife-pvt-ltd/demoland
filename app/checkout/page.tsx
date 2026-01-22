"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/stores/use-checkout-store";
import { useCartStore } from "@/stores/use-cart-store";
import { StepIndicator } from "@/components/checkout/step-indicator";
import { MobileVerification } from "@/components/checkout/mobile-verification";
import { UserDetailsForm } from "@/components/checkout/user-details-form";
import { PaymentSummary } from "@/components/checkout/payment-summary";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep } = useCheckoutStore();
  const { cartItem } = useCartStore();

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItem) {
      router.push("/product");
    }
  }, [cartItem, router]);

  if (!cartItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

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
              onClick={() => router.push("/product")}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium hidden sm:inline">Back to Product</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-foreground">Secure </span>
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-gradient">
                Checkout
              </span>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Complete your order in 3 simple steps
            </p>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          {/* Step Content */}
          <div className="mt-8">
            {currentStep === "mobile" && (
              <MobileVerification onContinue={nextStep} />
            )}

            {currentStep === "details" && (
              <UserDetailsForm onContinue={nextStep} onBack={prevStep} />
            )}

            {currentStep === "payment" && <PaymentSummary onBack={prevStep} />}
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
