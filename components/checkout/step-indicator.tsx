"use client";

import type { CheckoutStep } from "@/types";
import { Check, Smartphone, User, CreditCard } from "lucide-react";

interface StepIndicatorProps {
  currentStep: CheckoutStep;
}

const steps = [
  { id: "mobile" as CheckoutStep, label: "Verification", number: 1, icon: Smartphone },
  { id: "details" as CheckoutStep, label: "Details", number: 2, icon: User },
  { id: "payment" as CheckoutStep, label: "Payment", number: 3, icon: CreditCard },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full py-4 sm:py-6">
      <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
        {/* Progress Line Background */}
        <div className="absolute top-5 sm:top-6 left-[calc(16.67%)] right-[calc(16.67%)] h-0.5 bg-gradient-to-r from-secondary via-secondary to-secondary z-0">
          {/* Animated Progress */}
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-chart-2 transition-all duration-500 ease-out"
            style={{ 
              width: `${currentStepIndex === 0 ? 0 : currentStepIndex === 1 ? 50 : 100}%` 
            }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div className="relative group">
                {/* Glow Effect */}
                {(isCurrent || isCompleted) && (
                  <div className={`absolute inset-0 rounded-full blur-md transition-all ${
                    isCompleted 
                      ? 'bg-emerald-400/50' 
                      : 'bg-primary/50 animate-pulse'
                  }`} />
                )}

                <div
                  className={`
                    relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                    border-2 transition-all duration-500 transform
                    ${
                      isCompleted
                        ? "bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-400/30 scale-100"
                        : isCurrent
                          ? "bg-gradient-to-br from-primary to-chart-2 border-primary text-white shadow-lg shadow-primary/30 scale-110"
                          : "bg-white/80 backdrop-blur-sm border-border text-muted-foreground hover:border-primary/50 scale-100"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 animate-scale-in" />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
              </div>

              {/* Label */}
              <span
                className={`
                  mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-center transition-all
                  ${
                    isCurrent 
                      ? "bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent" 
                      : isCompleted 
                        ? "text-emerald-600" 
                        : "text-muted-foreground"
                  }
                `}
              >
                {step.label}
              </span>

              {/* Step Number Badge - Mobile */}
              <span
                className={`
                  mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full
                  ${
                    isCurrent 
                      ? "bg-primary/10 text-primary" 
                      : isCompleted 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "bg-secondary text-muted-foreground"
                  }
                `}
              >
                Step {step.number}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
