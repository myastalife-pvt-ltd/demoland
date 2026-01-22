import { create } from "zustand";
import type { UserDetails, CheckoutStep, ValidationError } from "@/types";
import { validateMobileNumber, validateUserDetails } from "@/lib/validators";

interface CheckoutStore {
  // State
  currentStep: CheckoutStep;
  mobileNumber: string;
  isMobileVerified: boolean;
  userDetails: Partial<UserDetails>;
  validationErrors: ValidationError[];

  // Actions
  setMobileNumber: (mobile: string) => void;
  verifyMobile: () => boolean;
  setUserDetails: (details: Partial<UserDetails>) => void;
  validateForm: () => boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: CheckoutStep) => void;
  resetCheckout: () => void;
}

const initialUserDetails: Partial<UserDetails> = {
  fullName: "",
  email: "",
  state: "",
  city: "",
  addressLine: "",
  pincode: "",
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  // Initial State
  currentStep: "mobile",
  mobileNumber: "",
  isMobileVerified: false,
  userDetails: initialUserDetails,
  validationErrors: [],

  // Set mobile number
  setMobileNumber: (mobile: string) => {
    set({ mobileNumber: mobile });
  },

  // Verify mobile number
  verifyMobile: () => {
    const { mobileNumber } = get();
    const isValid = validateMobileNumber(mobileNumber);

    if (isValid) {
      set({ isMobileVerified: true });
      return true;
    }

    set({
      isMobileVerified: false,
      validationErrors: [
        {
          field: "mobileNumber",
          message: "Please enter a valid 10-digit Indian mobile number",
        },
      ],
    });
    return false;
  },

  // Set user details
  setUserDetails: (details: Partial<UserDetails>) => {
    set((state) => ({
      userDetails: { ...state.userDetails, ...details },
    }));
  },

  // Validate user details form
  validateForm: () => {
    const { userDetails } = get();
    const errors = validateUserDetails(userDetails);

    set({ validationErrors: errors });
    return errors.length === 0;
  },

  // Navigate to next step
  nextStep: () => {
    const { currentStep, isMobileVerified } = get();

    if (currentStep === "mobile" && isMobileVerified) {
      set({ currentStep: "details" });
    } else if (currentStep === "details") {
      set({ currentStep: "payment" });
    }
  },

  // Navigate to previous step
  prevStep: () => {
    const { currentStep } = get();

    if (currentStep === "payment") {
      set({ currentStep: "details" });
    } else if (currentStep === "details") {
      set({ currentStep: "mobile" });
    }
  },

  // Go to specific step
  goToStep: (step: CheckoutStep) => {
    set({ currentStep: step });
  },

  // Reset checkout
  resetCheckout: () => {
    set({
      currentStep: "mobile",
      mobileNumber: "",
      isMobileVerified: false,
      userDetails: initialUserDetails,
      validationErrors: [],
    });
  },
}));
