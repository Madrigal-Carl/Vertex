import { create } from "zustand";
import { persist } from "zustand/middleware";

// helper: compare variants safely
const isSameVariant = (a, b) => {
  return (
    JSON.stringify(a.attributes || {}) === JSON.stringify(b.attributes || {})
  );
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      drawerOpen: false,

      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),

      // ================= ADD ITEM =================
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && isSameVariant(i, item),
          );

          if (existing) {
            const maxStock = item.stock ?? Infinity;

            return {
              items: state.items.map((i) =>
                i.id === item.id && isSameVariant(i, item)
                  ? {
                      ...i,
                      quantity: Math.min(i.quantity + item.quantity, maxStock),
                      stock: maxStock,
                    }
                  : i,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: Math.min(item.quantity, item.stock ?? Infinity),
              },
            ],
          };
        });
      },

      // ================= REMOVE ITEM =================
      removeItem: (id, attributes) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && isSameVariant(i, { attributes })),
          ),
        }));
      },

      // ================= UPDATE QUANTITY =================
      updateQuantity: (id, attributes, delta) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === id && isSameVariant(i, { attributes })) {
              const maxStock = i.stock ?? Infinity;

              const newQty = i.quantity + delta;

              if (newQty <= 0) return i;

              return {
                ...i,
                quantity: Math.min(newQty, maxStock),
              };
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
