import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  cartItem: CartItem | null;
  totalPrice: number;
  gstAmount: number;
  basePrice: number;

  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: () => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItem: null,
      totalPrice: 0,
      gstAmount: 0,
      basePrice: 0,

      addToCart: (item: CartItem) => {
        set({
          cartItem: item,
          totalPrice: item.priceIncludingGst * item.quantity,
          gstAmount: item.gstAmount * item.quantity,
          basePrice: item.basePrice * item.quantity,
        });
      },

      removeFromCart: () => {
        set({
          cartItem: null,
          totalPrice: 0,
          gstAmount: 0,
          basePrice: 0,
        });
      },

      clearCart: () => {
        set({
          cartItem: null,
          totalPrice: 0,
          gstAmount: 0,
          basePrice: 0,
        });
      },

      getCartItemCount: () => {
        const { cartItem } = get();
        return cartItem ? cartItem.quantity : 0;
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
