import type { UserDetails, ValidationError } from "@/types";

/**
 * Validates Indian mobile number
 * Must start with 6-9 and be exactly 10 digits
 */
export const validateMobileNumber = (mobile: string): boolean => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

/**
 * Validates email address
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates Indian pincode (6 digits)
 */
export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};

/**
 * Validates full name (at least 2 characters, letters and spaces only)
 */
export const validateFullName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name.trim());
};

/**
 * Validates user details form
 * Returns array of validation errors
 */
export const validateUserDetails = (
  details: Partial<UserDetails>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Full Name validation
  if (!details.fullName || !details.fullName.trim()) {
    errors.push({
      field: "fullName",
      message: "Full name is required",
    });
  } else if (!validateFullName(details.fullName)) {
    errors.push({
      field: "fullName",
      message: "Please enter a valid name (letters only, minimum 2 characters)",
    });
  }

  // Email validation
  if (!details.email || !details.email.trim()) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (!validateEmail(details.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // State validation
  if (!details.state || !details.state.trim()) {
    errors.push({
      field: "state",
      message: "Please select a state",
    });
  }

  // City validation
  if (!details.city || !details.city.trim()) {
    errors.push({
      field: "city",
      message: "Please select a city",
    });
  }

  // Address validation
  if (!details.addressLine || !details.addressLine.trim()) {
    errors.push({
      field: "addressLine",
      message: "Address is required",
    });
  } else if (details.addressLine.trim().length < 10) {
    errors.push({
      field: "addressLine",
      message: "Please enter a detailed address (minimum 10 characters)",
    });
  }

  // Pincode validation
  if (!details.pincode || !details.pincode.trim()) {
    errors.push({
      field: "pincode",
      message: "Pincode is required",
    });
  } else if (!validatePincode(details.pincode)) {
    errors.push({
      field: "pincode",
      message: "Please enter a valid 6-digit pincode",
    });
  }

  return errors;
};

/**
 * Get error message for a specific field
 */
export const getFieldError = (
  errors: ValidationError[],
  fieldName: string
): string | undefined => {
  const error = errors.find((err) => err.field === fieldName);
  return error?.message;
};
