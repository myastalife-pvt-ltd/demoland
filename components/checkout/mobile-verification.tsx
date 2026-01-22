"use client";

import { useState } from "react";
import { useCheckoutStore } from "@/stores/use-checkout-store";
import { getFieldError } from "@/lib/validators";
import { Smartphone, ArrowRight, Shield, CheckCircle } from "lucide-react";

interface MobileVerificationProps {
  onContinue: () => void;
}

export function MobileVerification({ onContinue }: MobileVerificationProps) {
  const {
    mobileNumber,
    setMobileNumber,
    verifyMobile,
    validationErrors,
  } = useCheckoutStore();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    setIsVerifying(true);

    setTimeout(() => {
      const isValid = verifyMobile();

      if (isValid) {
        onContinue();
      }

      setIsVerifying(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  const errorMessage = getFieldError(validationErrors, "mobileNumber");

  return (
    <div className="relative max-w-md mx-auto animate-fade-in-up">
      {/* Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-secondary/50 backdrop-blur-xl border border-border shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-full -mr-20 -mt-20 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-chart-2/10 to-primary/10 rounded-full -ml-16 -mb-16 blur-2xl" />

        <div className="relative p-8 sm:p-10">
          {/* Icon Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-chart-2/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-xl animate-float">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Mobile Verification
            </h2>
            <p className="mt-2 text-muted-foreground text-center text-sm sm:text-base">
              Enter your mobile number to continue
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="relative">
              <label 
                htmlFor="mobile" 
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Mobile Number
              </label>
              
              <div className={`relative rounded-xl transition-all duration-300 ${
                isFocused ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/20' : ''
              }`}>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-chart-2 opacity-0 transition-opacity ${
                  isFocused && !errorMessage ? 'opacity-100' : ''
                }`} style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-white rounded-[10px]" />
                </div>
                
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-muted-foreground font-medium">+91</span>
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={mobileNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                      setMobileNumber(value);
                    }}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    maxLength={10}
                    className={`
                      w-full pl-14 pr-4 py-4 rounded-xl bg-white/80 backdrop-blur-sm
                      border-2 transition-all text-lg font-medium tracking-wider
                      placeholder:text-muted-foreground/50 placeholder:font-normal placeholder:tracking-normal
                      focus:outline-none
                      ${errorMessage 
                        ? 'border-destructive focus:border-destructive' 
                        : 'border-border focus:border-transparent'
                      }
                    `}
                  />
                </div>
              </div>
              
              {errorMessage && (
                <p className="mt-2 text-sm text-destructive flex items-center gap-1 animate-fade-in-up">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                  {errorMessage}
                </p>
              )}
              
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                Must start with 6, 7, 8, or 9
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={isVerifying || mobileNumber.length !== 10}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-chart-2 py-4 text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-foreground/80">
                <p className="font-semibold text-foreground mb-1">Mock Verification</p>
                <p>This is a demonstration. Any valid Indian mobile number will work.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
