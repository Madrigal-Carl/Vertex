import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultItems = [
  {
    id: "p3",
    name: "Vertex Nova 5G",
    price: 24999,
    quantity: 1,
    color: "Midnight Blue",
    size: "128GB",
    imageColor: "from-indigo-800 to-slate-800",
  },
  {
    id: "p8",
    name: "BassCore Earbuds",
    price: 1999,
    quantity: 1,
    color: "Black",
    size: undefined,
    imageColor: "from-zinc-800 to-black",
  },
  {
    id: "p6",
    name: "USB-C Hub",
    price: 1299,
    quantity: 1,
    color: undefined,
    size: undefined,
    imageColor: "from-gray-700 to-gray-900",
  },
];

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: defaultItems,
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
      name: "vertex-cart", // localStorage key
    },
  ),
);

// selectors (computed values)
export const useCartTotal = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
