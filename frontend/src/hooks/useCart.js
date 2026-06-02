import { useCartStore } from "@/stores/cart.store";

const selectItems = (state) => state.items;
const selectDrawer = (state) => state.drawerOpen;

export const useCart = () => {
  const items = useCartStore(selectItems);
  const drawerOpen = useCartStore(selectDrawer);

  const openDrawer = useCartStore((state) => state.openDrawer);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // ================= COMPUTED VALUES =================
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    drawerOpen,
    totalPrice,
    totalItems,
    openDrawer,
    closeDrawer,
    addItem,
    removeItem,
    updateQuantity,
  };
};
