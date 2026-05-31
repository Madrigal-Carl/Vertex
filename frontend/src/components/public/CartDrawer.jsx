import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

function formatPrice(p) {
  const value = Number(p ?? 0);
  return `₱${value.toLocaleString()}`;
}

export default function CartDrawer() {
  const {
    items,
    drawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      navigate("/auth");
      closeDrawer();
      return;
    }

    if (user.role !== "customer") {
      return;
    }

    navigate("/checkout");
    closeDrawer();
  };

  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-[#0F2436]">
          <div>
            <h2 className="font-display text-white tracking-widest uppercase text-lg">
              Your Cart
            </h2>
            <p className="text-xs text-white/50 font-sans mt-0.5">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            data-testid="btn-close-cart"
            onClick={closeDrawer}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div
                className="w-16 h-16 bg-[#F0F5FA] flex items-center justify-center mb-4"
                style={{ borderRadius: "8px" }}
              >
                <span className="font-display text-[#5E7386] text-2xl">0</span>
              </div>
              <p className="font-display text-[#0F2436] tracking-wide">
                Your cart is empty
              </p>
              <p className="text-sm text-[#5E7386] mt-1">
                Add some products to get started
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                data-testid={`cart-item-${item.id}`}
                className="flex gap-4 py-4 border-b border-border last:border-0"
              >
                <div
                  className={`w-16 h-16 flex-shrink-0 bg-gradient-to-br ${item.imageColor} flex items-center justify-center`}
                  style={{ borderRadius: "4px" }}
                >
                  <span className="text-white/40 text-xs font-display">
                    IMG
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[#0F2436] text-sm truncate">
                    {item.name}
                  </p>
                  {(item.color || item.size) && (
                    <p className="text-xs text-[#5E7386] mt-0.5">
                      {[item.color, item.size].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="font-display font-bold text-[#0F2436] text-sm mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div
                      className="flex items-center border border-border"
                      style={{ borderRadius: "2px" }}
                    >
                      <button
                        data-testid={`btn-minus-${item.id}`}
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.size, -1)
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#F0F5FA] transition-colors text-[#0F2436]"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-display text-[#0F2436]">
                        {item.quantity}
                      </span>
                      <button
                        data-testid={`btn-plus-${item.id}`}
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.size, 1)
                        }
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#F0F5FA] transition-colors text-[#0F2436]"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      data-testid={`btn-remove-${item.id}`}
                      onClick={() => removeItem(item.id, item.color, item.size)}
                      className="text-[#5E7386] hover:text-[#E63946] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border bg-[#F0F5FA]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-sans text-[#5E7386]">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm font-sans text-[#5E7386]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-display font-bold text-[#0F2436] text-lg pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <Link to="/checkout" onClick={handleCheckout}>
              <button
                data-testid="btn-checkout"
                className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors active:scale-95"
                style={{ borderRadius: "4px" }}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
