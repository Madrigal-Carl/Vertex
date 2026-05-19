import { X, Check, Package, Truck, MapPin, Clock } from "lucide-react";

const CATEGORY_COLORS = {
  Laptops: "from-blue-800 to-slate-900",
  Phones: "from-indigo-800 to-slate-800",
  Tablets: "from-violet-800 to-slate-900",
  Accessories: "from-teal-700 to-slate-800",
  Audio: "from-purple-800 to-slate-900",
};

const SHIPPING_FEE = 150;

const DELIVERY_STEPS = ["Pending", "Confirmed", "To Ship", "Received"];
const PICKUP_STEPS = ["Pending", "Confirmed", "Ready for Pickup"];

function formatPrice(p) {
  const value = Number(p ?? 0);
  return `₱${value.toLocaleString()}`;
}

export default function OrderDetailModal({ order, onClose }) {
  const steps = order.deliveryType === "pickup" ? PICKUP_STEPS : DELIVERY_STEPS;
  const currentStep = steps.indexOf(order.status);

  const stepIcons = [
    Clock,
    Check,
    order.deliveryType === "pickup" ? MapPin : Truck,
    Package,
  ];

  const shipping = order.deliveryType === "delivery" ? SHIPPING_FEE : 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: "8px" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 bg-[#0F2436]"
          style={{ borderRadius: "8px 8px 0 0" }}
        >
          <div>
            <h3 className="font-display font-bold text-white">
              Order #{order.id}
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              {order.date} ·{" "}
              {order.deliveryType === "pickup" ? "Pickup" : "Delivery"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="mb-8">
            <p className="text-xs font-display tracking-widest text-[#5E7386] uppercase mb-4">
              Order Status
            </p>

            <div className="relative">
              <div className="absolute top-4 left-4 right-4 h-px bg-[#F0F5FA]" />

              <div
                className="absolute top-4 left-4 h-px bg-[#0F2436] transition-all"
                style={{
                  width:
                    currentStep > 0
                      ? `${(currentStep / (steps.length - 1)) * 88}%`
                      : "0%",
                }}
              />

              <div className="relative flex justify-between">
                {steps.map((s, i) => {
                  const done = i <= currentStep;
                  const StepIcon = stepIcons[i] || Check;

                  return (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center z-10 transition-colors ${
                          done
                            ? "bg-[#0F2436] text-white"
                            : "bg-[#F0F5FA] text-[#5E7386]"
                        }`}
                        style={{ borderRadius: "50%" }}
                      >
                        <StepIcon size={14} />
                      </div>

                      <p
                        className={`text-[10px] font-display tracking-wide text-center max-w-[64px] ${
                          done ? "text-[#0F2436]" : "text-[#5E7386]"
                        }`}
                      >
                        {s}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-xs font-display tracking-widest text-[#5E7386] uppercase mb-3">
            Items
          </p>

          <div className="space-y-3 mb-5">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 pb-3 border-b border-[#F0F5FA] last:border-0 last:pb-0"
              >
                <div
                  className={`w-12 h-12 rounded bg-gradient-to-br ${
                    CATEGORY_COLORS[item.category] ||
                    "from-slate-700 to-slate-900"
                  } flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white/60 font-display text-[9px] font-bold">
                    {item.category?.slice(0, 3).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-display text-[#0F2436] text-sm">
                    {item.name}
                  </p>

                  <p className="text-xs text-[#5E7386]">
                    x{item.qty}
                    {item.color ? ` · ${item.color}` : ""}
                    {item.size ? ` · ${item.size}` : ""}
                  </p>
                </div>

                <span className="font-display text-[#0F2436] font-bold text-sm">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div
            className="bg-[#F0F5FA] p-4 space-y-2 mb-5"
            style={{ borderRadius: "6px" }}
          >
            <div className="flex justify-between text-sm font-sans text-[#5E7386]">
              <span>Subtotal</span>
              <span>{formatPrice(order.total)}</span>
            </div>

            {order.deliveryType === "delivery" && (
              <div className="flex justify-between text-sm font-sans text-[#5E7386]">
                <span>Shipping Fee</span>
                <span>{formatPrice(SHIPPING_FEE)}</span>
              </div>
            )}

            <div className="flex justify-between font-display font-bold text-[#0F2436] text-lg border-t border-[#0F2436]/10 pt-2">
              <span>Total</span>
              <span>{formatPrice(order.total + shipping)}</span>
            </div>
          </div>

          {order.status === "Pending" && (
            <button
              className="w-full py-3 border-2 border-[#E63946] text-[#E63946] font-display tracking-widest text-sm uppercase hover:bg-[#E63946] hover:text-white transition-all"
              style={{ borderRadius: "4px" }}
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
