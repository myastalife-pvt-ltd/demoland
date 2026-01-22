import type { Product, StateCity } from "@/types";

// GST Configuration
export const GST_PERCENTAGE = 5;

// Product Data
export const PRODUCT: Product = {
  id: "prod-001",
  name: "Premium Product",
  description: "High-quality premium product with excellent features and benefits.",
  priceIncludingGst: 5000,
  gstPercentage: GST_PERCENTAGE,
  basePrice: 4761.9, // Calculated: 5000 / 1.05
  gstAmount: 238.1, // Calculated: 5000 - 4761.9
  quantity: 1,
  image: "/product-image.jpg", // You can add actual image path
};

// State and City Data
export const STATE_CITY_DATA: StateCity[] = [
  {
    state: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur"],
  },
  {
    state: "Karnataka",
    cities: ["Bangalore", "Mysore", "Mangalore"],
  },
];

// Helper to get cities by state
export const getCitiesByState = (state: string): string[] => {
  const stateData = STATE_CITY_DATA.find((item) => item.state === state);
  return stateData ? stateData.cities : [];
};

// Helper to get all states
export const getAllStates = (): string[] => {
  return STATE_CITY_DATA.map((item) => item.state);
};
