import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order } from "@/types";

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;

  // Actions
  createOrder: (order: Order) => void;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  getAllOrders: () => Order[];
  setCurrentOrder: (order: Order | null) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      createOrder: (order: Order) => {
        set((state) => ({
          orders: [...state.orders, order],
          currentOrder: order,
        }));
      },

      getOrderByNumber: (orderNumber: string) => {
        const { orders } = get();
        return orders.find((order) => order.orderNumber === orderNumber);
      },

      getAllOrders: () => {
        return get().orders;
      },

      setCurrentOrder: (order: Order | null) => {
        set({ currentOrder: order });
      },

      clearOrders: () => {
        set({ orders: [], currentOrder: null });
      },
    }),
    {
      name: "order-storage", // localStorage key
    }
  )
);
