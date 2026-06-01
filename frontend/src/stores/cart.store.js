import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      drawerOpen: false,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.id === item.id &&
              i.color === item.color &&
              i.size === item.size,
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id &&
                i.color === item.color &&
                i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        });
      },

      removeItem: (id, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.color === color && i.size === size),
          ),
        }));
      },

      updateQuantity: (id, color, size, delta) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === id && i.color === color && i.size === size) {
              const newQty = i.quantity + delta;
              if (newQty <= 0) return i;
              return { ...i, quantity: newQty };
            }
            return i;
          }),
        }));
      },
    }),
    {
      name: "vertex-cart",
    },
  ),
);
