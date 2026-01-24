"use client";

import { useState, useEffect } from "react";
import { useCheckoutStore } from "@/stores/use-checkout-store";
import { getAllStates, getCitiesByState } from "@/lib/constants";
import { getFieldError } from "@/lib/validators";
import { getPincodeDetails } from "@/lib/pincode-api";
import { User, ArrowLeft, ArrowRight, MapPin, Mail, Home, Hash, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface UserDetailsFormProps {
  onContinue: () => void;
  onBack: () => void;
}

export function UserDetailsForm({ onContinue, onBack }: UserDetailsFormProps) {
  const {
    userDetails,
    setUserDetails,
    validateForm,
    validationErrors,
  } = useCheckoutStore();

  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "success" | "error">("idle");
  const [pincodeMessage, setPincodeMessage] = useState("");

  const states = getAllStates();

  useEffect(() => {
    if (userDetails.state) {
      const stateCities = getCitiesByState(userDetails.state);
      setCities(stateCities);

      if (userDetails.city && !stateCities.includes(userDetails.city)) {
        // Don't reset city if it was set by pincode API
        if (stateCities.length > 0) {
          // Keep the city if it's manually entered
        }
      }
    } else {
      setCities([]);
    }
  }, [userDetails.state]);

  // Handle pincode change and auto-fetch location
  const handlePincodeChange = async (value: string) => {
    const pincode = value.replace(/\D/g, "").slice(0, 6);
    setUserDetails({ pincode });
    
    // Reset status when typing
    if (pincode.length < 6) {
      setPincodeStatus("idle");
      setPincodeMessage("");
      return;
    }

    // Fetch location when 6 digits are entered
    if (pincode.length === 6) {
      setIsFetchingPincode(true);
      setPincodeStatus("idle");
      
      const result = await getPincodeDetails(pincode);
      
      setIsFetchingPincode(false);
      
      if (result.success && result.data) {
        // Auto-fill state and city
        setUserDetails({
          state: result.data.state,
          city: result.data.city || result.data.district,
        });
        setPincodeStatus("success");
        setPincodeMessage(`${result.data.city || result.data.district}, ${result.data.state}`);
      } else {
        // Clear state and city on error
        setUserDetails({
          state: "",
          city: "",
        });
        setPincodeStatus("error");
        setPincodeMessage(result.error || "Invalid pincode. Please enter a valid 6-digit Indian pincode.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const isValid = validateForm();

      if (isValid) {
        onContinue();
      }

      setIsSubmitting(false);
    }, 300);
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm
    border-2 transition-all text-foreground font-medium
    placeholder:text-muted-foreground/50 placeholder:font-normal
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
    ${getFieldError(validationErrors, fieldName) 
      ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
      : 'border-border hover:border-primary/30'
    }
  `;

  const selectClasses = (fieldName: string) => `
    w-full px-4 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm
    border-2 transition-all text-foreground font-medium appearance-none cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
    ${getFieldError(validationErrors, fieldName)
      ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
      : 'border-border hover:border-primary/30'
    }
  `;

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
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl animate-float">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Your Details
            </h2>
            <p className="mt-2 text-muted-foreground text-center text-sm sm:text-base">
              Please fill in your shipping information
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <User className="w-4 h-4 text-primary" />
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={userDetails.fullName || ""}
                onChange={(e) => setUserDetails({ fullName: e.target.value })}
                className={inputClasses("fullName")}
              />
              {getFieldError(validationErrors, "fullName") && (
                <p className="mt-2 text-sm text-destructive animate-fade-in-up">
                  {getFieldError(validationErrors, "fullName")}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={userDetails.email || ""}
                onChange={(e) => setUserDetails({ email: e.target.value })}
                className={inputClasses("email")}
              />
              {getFieldError(validationErrors, "email") && (
                <p className="mt-2 text-sm text-destructive animate-fade-in-up">
                  {getFieldError(validationErrors, "email")}
                </p>
              )}
            </div>

            {/* Pincode - Now with auto-fetch */}
            <div>
              <label htmlFor="pincode" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Hash className="w-4 h-4 text-primary" />
                Pincode <span className="text-destructive">*</span>
                <span className="text-xs text-muted-foreground font-normal ml-auto">
                  Auto-fills State & City
                </span>
              </label>
              <div className="relative">
                <input
                  id="pincode"
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={userDetails.pincode || ""}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  maxLength={6}
                  className={`${inputClasses("pincode")} tracking-widest pr-12`}
                />
                {/* Loading/Status indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {isFetchingPincode && (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )}
                  {!isFetchingPincode && pincodeStatus === "success" && (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                  {!isFetchingPincode && pincodeStatus === "error" && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </div>
              {/* Pincode fetch status message */}
              {pincodeMessage && (
                <p className={`mt-2 text-sm animate-fade-in-up flex items-center gap-1.5 ${
                  pincodeStatus === "success" ? "text-emerald-600" : "text-destructive"
                }`}>
                  {pincodeStatus === "success" ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Found: {pincodeMessage}
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      {pincodeMessage}
                    </>
                  )}
                </p>
              )}
              {getFieldError(validationErrors, "pincode") && (
                <p className="mt-2 text-sm text-destructive animate-fade-in-up">
                  {getFieldError(validationErrors, "pincode")}
                </p>
              )}
            </div>

            {/* State & City - Two Column on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  State <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    id="state"
                    type="text"
                    placeholder="Auto-filled from pincode"
                    value={userDetails.state || ""}
                    readOnly
                    className={`${inputClasses("state")} ${pincodeStatus === "success" ? "bg-emerald-50/50" : "bg-muted/30"} cursor-not-allowed`}
                  />
                </div>
                {getFieldError(validationErrors, "state") && (
                  <p className="mt-2 text-sm text-destructive animate-fade-in-up">
                    {getFieldError(validationErrors, "state")}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  City <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    id="city"
                    type="text"
                    placeholder="Auto-filled from pincode"
                    value={userDetails.city || ""}
                    readOnly
                    className={`${inputClasses("city")} ${pincodeStatus === "success" ? "bg-emerald-50/50" : "bg-muted/30"} cursor-not-allowed`}
                  />
                </div>
                {getFieldError(validationErrors, "city") && (
                  <p className="mt-2 text-sm text-destructive animate-fade-in-up">
                    {getFieldError(validationErrors, "city")}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <Home className="w-4 h-4 text-primary" />
                Address <span className="text-destructive">*</span>
              </label>
              <textarea
                id="address"
                placeholder="Enter your complete address"
                value={userDetails.addressLine || ""}
                onChange={(e) => setUserDetails({ addressLine: e.target.value })}
                rows={3}
                className={`${inputClasses("addressLine")} resize-none`}
              />
              {getFieldError(validationErrors, "addressLine") && (
                <p className="mt-2 text-sm text-destructive animate-fade-in-up">
                  {getFieldError(validationErrors, "addressLine")}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 group flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold transition-all hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              
              {/* Continue button - disabled when pincode is not verified */}
              <button
                type="submit"
                disabled={isSubmitting || pincodeStatus !== "success"}
                className="flex-1 group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-chart-2 py-4 text-white font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
