import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import {
  CheckCircle,
  MapPin,
  Truck,
  Store,
  CreditCard,
  Banknote,
} from "lucide-react";

function formatPrice(p) {
  const value = Number(p ?? 0);
  return `₱${value.toLocaleString()}`;
}

const CATEGORY_COLORS = {
  Laptops: "from-blue-800 to-slate-900",
  Phones: "from-indigo-800 to-slate-800",
  Tablets: "from-violet-800 to-slate-900",
  Accessories: "from-teal-700 to-slate-800",
  Audio: "from-purple-800 to-slate-900",
};

const SAVED_ADDRESS = {
  label: "Home",
  street: "Unit 4B, 123 Rizal Avenue",
  barangay: "Barangay San Lorenzo",
  city: "Makati City",
  province: "Metro Manila",
  zip: "1229",
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [delivery, setDelivery] = useState("pickup");
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);

  console.log(items);
  const shipping = delivery === "delivery" ? 150 : 0;
  const orderNum = useState(() =>
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0"),
  )[0];

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <a
            href="/products"
            className="inline-block mt-4 px-6 py-3 bg-[#E63946] text-white rounded"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-[#F0F5FA] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div
            className="w-20 h-20 bg-[#0F2436] flex items-center justify-center mx-auto mb-6"
            style={{ borderRadius: "50%" }}
          >
            <CheckCircle size={36} className="text-[#E63946]" />
          </div>
          <h2 className="text-3xl font-display font-bold text-[#0F2436] mb-3">
            Order Placed!
          </h2>
          <p className="text-[#5E7386] font-sans mb-1">
            Your order{" "}
            <span className="text-[#0F2436] font-semibold">#VX-{orderNum}</span>{" "}
            has been received.
          </p>
          <p className="text-[#5E7386] font-sans mb-8">
            We'll notify you once it's{" "}
            <span className="text-[#0F2436] font-semibold">
              {delivery === "pickup" ? "ready for pickup" : "on its way"}
            </span>
            .
          </p>
          <a href="/">
            <button
              className="px-8 py-3 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors"
              style={{ borderRadius: "4px" }}
            >
              Back to Home
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="bg-[#0F2436] py-12 px-6 text-center">
        <h1 className="text-4xl font-display font-bold text-white">Checkout</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT — Order Summary (bigger) */}
          <div className="lg:col-span-3">
            <div
              className="bg-white border border-[#0F2436]/10 sticky top-24"
              style={{ borderRadius: "8px" }}
            >
              <div className="px-6 py-5 border-b border-[#F0F5FA] flex items-center justify-between">
                <div>
                  <h2 className="font-display font-bold text-[#0F2436] text-xl">
                    Order Summary
                  </h2>
                  <p className="text-xs text-[#5E7386] mt-0.5">
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="px-6 py-5 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${JSON.stringify(item.attributes)}`}
                    className="flex items-center gap-4 pb-4 border-b border-[#F0F5FA] last:border-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-[#0F2436] text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#5E7386] mt-0.5">
                        Qty: {item.quantity}
                        {item.attributes &&
                          Object.entries(item.attributes).map(
                            ([key, value]) => <span key={key}> · {value}</span>,
                          )}
                      </p>
                      <p className="text-xs text-[#5E7386]">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <span className="font-display font-bold text-[#0F2436] text-base flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="px-6 py-5 border-t border-[#F0F5FA] bg-[#F0F5FA]/50 space-y-2.5"
                style={{ borderRadius: "0 0 8px 8px" }}
              >
                <div className="flex justify-between text-sm font-sans text-[#5E7386]">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-sans text-[#5E7386]">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-semibold" : ""
                    }
                  >
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-display font-bold text-[#0F2436] text-2xl border-t border-[#0F2436]/10 pt-3 mt-1">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice + shipping)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Delivery & Payment (smaller) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Method */}
            <div
              className="bg-white border border-[#0F2436]/10"
              style={{ borderRadius: "8px" }}
            >
              <div className="px-5 py-4 border-b border-[#F0F5FA]">
                <h3 className="font-display font-bold text-[#0F2436] text-sm uppercase tracking-wide">
                  Delivery Method
                </h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  {
                    id: "pickup",
                    label: "In-Store Pickup",
                    sub: "Free — collect at our store",
                    icon: Store,
                  },
                  {
                    id: "delivery",
                    label: "Home Delivery",
                    sub: `+${formatPrice(150)} shipping fee`,
                    icon: Truck,
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    data-testid={`radio-${opt.id}`}
                    className={`flex items-center gap-3 p-3 border-2 cursor-pointer transition-all ${delivery === opt.id ? "border-[#0F2436] bg-[#F0F5FA]" : "border-[#0F2436]/10 hover:border-[#0F2436]/30"}`}
                    style={{ borderRadius: "6px" }}
                  >
                    <input
                      type="radio"
                      className="accent-[#0F2436]"
                      checked={delivery === opt.id}
                      onChange={() => setDelivery(opt.id)}
                    />
                    <opt.icon
                      size={14}
                      className={
                        delivery === opt.id
                          ? "text-[#0F2436]"
                          : "text-[#5E7386]"
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-display text-xs uppercase tracking-wide ${delivery === opt.id ? "text-[#0F2436]" : "text-[#5E7386]"}`}
                      >
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-[#5E7386] mt-0.5">
                        {opt.sub}
                      </p>
                    </div>
                  </label>
                ))}

                {delivery === "delivery" && (
                  <div
                    className="border border-[#0F2436]/10 p-3 bg-[#F0F5FA]"
                    style={{ borderRadius: "6px" }}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin size={12} className="text-[#E63946]" />
                      <span className="text-[10px] font-display tracking-widest text-[#5E7386] uppercase">
                        Delivery To
                      </span>
                      <span
                        className="ml-auto text-[9px] bg-[#0F2436] text-white px-1.5 py-0.5 font-display tracking-wider uppercase"
                        style={{ borderRadius: "2px" }}
                      >
                        {SAVED_ADDRESS.label}
                      </span>
                    </div>
                    <p className="text-xs font-display text-[#0F2436]">
                      {SAVED_ADDRESS.street}
                    </p>
                    <p className="text-xs text-[#5E7386]">
                      {SAVED_ADDRESS.barangay}
                    </p>
                    <p className="text-xs text-[#5E7386]">
                      {SAVED_ADDRESS.city}, {SAVED_ADDRESS.province}{" "}
                      {SAVED_ADDRESS.zip}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div
              className="bg-white border border-[#0F2436]/10"
              style={{ borderRadius: "8px" }}
            >
              <div className="px-5 py-4 border-b border-[#F0F5FA]">
                <h3 className="font-display font-bold text-[#0F2436] text-sm uppercase tracking-wide">
                  Payment Method
                </h3>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  {
                    id: "cod",
                    label: "Cash on Delivery",
                    sub: "Pay when you receive.",
                    icon: Banknote,
                  },
                  {
                    id: "gcash",
                    label: "GCash (E-Wallet)",
                    sub: "Pay via GCash. Quick & secure.",
                    icon: CreditCard,
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    data-testid={`radio-${opt.id}`}
                    className={`flex items-center gap-3 p-3 border-2 cursor-pointer transition-all ${payment === opt.id ? "border-[#0F2436] bg-[#F0F5FA]" : "border-[#0F2436]/10 hover:border-[#0F2436]/30"}`}
                    style={{ borderRadius: "6px" }}
                  >
                    <input
                      type="radio"
                      className="accent-[#0F2436]"
                      checked={payment === opt.id}
                      onChange={() => setPayment(opt.id)}
                    />
                    <opt.icon
                      size={14}
                      className={
                        payment === opt.id ? "text-[#0F2436]" : "text-[#5E7386]"
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-display text-xs uppercase tracking-wide ${payment === opt.id ? "text-[#0F2436]" : "text-[#5E7386]"}`}
                      >
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-[#5E7386] mt-0.5">
                        {opt.sub}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Place Order */}
            <button
              onClick={() => setPlaced(true)}
              className="w-full py-4 bg-[#E63946] text-white font-display tracking-widest text-sm uppercase hover:bg-[#cc2f3b] transition-colors active:scale-95"
              style={{ borderRadius: "6px" }}
            >
              Place Order — {formatPrice(totalPrice + shipping)}
            </button>
            <p className="text-center text-[10px] text-[#5E7386] font-sans">
              By placing this order you agree to our Terms of Service and Refund
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
