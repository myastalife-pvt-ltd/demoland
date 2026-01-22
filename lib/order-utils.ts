/**
 * Generates a unique order number
 * Format: ORD + timestamp + random 4-digit number
 * Example: ORD1737558123456789
 */
export const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD${timestamp}${random}`;
};

/**
 * Calculates GST amount from total price including GST
 * Formula: GST Amount = Total Price - (Total Price / (1 + GST%/100))
 */
export const calculateGSTAmount = (
  priceIncludingGst: number,
  gstPercentage: number
): number => {
  const basePrice = priceIncludingGst / (1 + gstPercentage / 100);
  const gstAmount = priceIncludingGst - basePrice;
  return Number.parseFloat(gstAmount.toFixed(2));
};

/**
 * Calculates base price from total price including GST
 * Formula: Base Price = Total Price / (1 + GST%/100)
 */
export const calculateBasePrice = (
  priceIncludingGst: number,
  gstPercentage: number
): number => {
  const basePrice = priceIncludingGst / (1 + gstPercentage / 100);
  return Number.parseFloat(basePrice.toFixed(2));
};

/**
 * Formats currency in Indian Rupees
 * Example: 5000 -> ₹5,000
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats date to readable string
 * Example: 2025-01-22T10:30:00 -> "22 Jan 2025, 10:30 AM"
 */
export const formatOrderDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

/**
 * Generates a short order ID for display
 * Example: ORD1737558123456789 -> ORD...6789
 */
export const getShortOrderId = (orderId: string): string => {
  if (orderId.length <= 10) return orderId;
  return `${orderId.slice(0, 6)}...${orderId.slice(-4)}`;
};
