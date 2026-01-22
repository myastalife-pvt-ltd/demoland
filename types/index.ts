export interface Product {
  id: string;
  name: string;
  description: string;
  priceIncludingGst: number;
  gstPercentage: number;
  basePrice: number;
  gstAmount: number;
  quantity: number;
  image?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  priceIncludingGst: number;
  gstPercentage: number;
  quantity: number;
  basePrice: number;
  gstAmount: number;
}

export interface UserDetails {
  fullName: string;
  email: string;
  state: string;
  city: string;
  addressLine: string;
  pincode: string;
}

export interface Order {
  orderNumber: string;
  product: CartItem;
  userDetails: UserDetails;
  mobileNumber: string;
  totalAmount: number;
  gstAmount: number;
  baseAmount: number;
  createdAt: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}

export interface StateCity {
  state: string;
  cities: string[];
}

export type CheckoutStep = "mobile" | "details" | "payment";

export interface ValidationError {
  field: string;
  message: string;
}
