import { Outlet } from "react-router-dom";
import Navbar from "components/public/Navbar";
import Footer from "components/public/Footer";
import CartDrawer from "components/public/CartDrawer";
import Toast from "components/public/Toast";
import { CartProvider } from "@/providers/CartContext";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <CartProvider>
        <Navbar />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

        <Toast />

        <CartDrawer />
      </CartProvider>
    </div>
  );
}
