import { useState } from "react";
import OrderDetailModal from "@/components/modals/OrderDetailModal";
import BookingDetailModal from "@/components/modals/BookingDetailModal";
import {
  ChevronRight,
  X,
  Check,
  Package,
  Truck,
  MapPin,
  Clock,
  Wrench,
  CalendarCheck,
  ShoppingBag,
} from "lucide-react";

const CATEGORY_COLORS = {
  Laptops: "from-blue-800 to-slate-900",
  Phones: "from-indigo-800 to-slate-800",
  Tablets: "from-violet-800 to-slate-900",
  Accessories: "from-teal-700 to-slate-800",
  Audio: "from-purple-800 to-slate-900",
};

const SHIPPING_FEE = 150;

const ORDERS = [
  {
    id: "VX-0041",
    date: "May 15, 2025",
    status: "To Ship",
    deliveryType: "delivery",
    items: [
      {
        name: "Vertex Nova 5G",
        qty: 1,
        price: 24999,
        color: "Midnight Blue",
        size: "128GB",
        category: "Phones",
      },
      { name: "USB-C Hub", qty: 2, price: 1299, category: "Accessories" },
    ],
    total: 27597,
  },
  {
    id: "VX-0038",
    date: "May 10, 2025",
    status: "Ready for Pickup",
    deliveryType: "pickup",
    items: [
      {
        name: "BassCore Earbuds",
        qty: 1,
        price: 1999,
        color: "Black",
        category: "Audio",
      },
    ],
    total: 1999,
  },
  {
    id: "VX-0031",
    date: "May 1, 2025",
    status: "Pending",
    deliveryType: "delivery",
    items: [
      { name: "NoiseBlock Headset", qty: 1, price: 4999, category: "Audio" },
      { name: "Wireless Mouse", qty: 1, price: 699, category: "Accessories" },
      {
        name: "Mechanical Keyboard X1",
        qty: 1,
        price: 3499,
        category: "Accessories",
      },
    ],
    total: 9197,
  },
];

const BOOKINGS_INIT = [
  {
    id: "SV-0022",
    service: "Device Repair",
    date: "May 19, 2025",
    status: "Pending",
    price: null,
    notes: "Charging port not working on my laptop",
  },
  {
    id: "SV-0021",
    service: "Device Repair",
    date: "May 18, 2025",
    status: "In Progress",
    price: "From ₱500",
    notes: "Cracked screen on iPhone 14 Pro",
  },
  {
    id: "SV-0017",
    service: "Network Setup",
    date: "May 5, 2025",
    status: "Completed",
    price: "From ₱1,200",
    notes: "Office Wi-Fi installation, 3 rooms",
  },
  {
    id: "SV-0014",
    service: "Custom PC Build",
    date: "April 22, 2025",
    status: "Completed",
    price: "From ₱3,000",
    notes: "Gaming rig, budget ₱60,000",
  },
];

const DELIVERY_STEPS = ["Pending", "Confirmed", "To Ship", "Received"];
const PICKUP_STEPS = ["Pending", "Confirmed", "Ready for Pickup"];
const BOOKING_STEPS = ["Pending", "Confirmed", "In Progress", "Completed"];

const ORDER_STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-blue-100 text-blue-800",
  "To Ship": "bg-indigo-100 text-indigo-800",
  Received: "bg-green-100 text-green-800",
  "Ready for Pickup": "bg-teal-100 text-teal-800",
};

const BOOKING_STATUS_COLORS = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-blue-100 text-blue-800",
  "In Progress": "bg-indigo-100 text-indigo-800",
  Completed: "bg-green-100 text-green-800",
};

function formatPrice(p) {
  const value = Number(p ?? 0);
  return `₱${value.toLocaleString()}`;
}

export default function HistoryPage() {
  const [tab, setTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState(BOOKINGS_INIT);

  function handleCancelBooking(id) {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    setSelectedBooking(null);
  }

  return (
    <div className="min-h-screen bg-[#F0F5FA]">
      <div className="bg-[#0F2436] py-14 px-6 text-center">
        <h1 className="text-4xl font-display font-bold text-white">History</h1>
        <p className="text-white/50 text-sm font-sans mt-2">
          Your orders and service bookings
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-8">
        <div className="flex border-b border-[#0F2436]/20 mb-6">
          {[
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "services", label: "Services", icon: Wrench },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3 font-display tracking-widest text-xs uppercase border-b-2 transition-colors ${tab === t.id ? "border-[#E63946] text-[#E63946]" : "border-transparent text-[#5E7386] hover:text-[#0F2436]"}`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="space-y-4">
            {ORDERS.map((order) => {
              const shipping =
                order.deliveryType === "delivery" ? SHIPPING_FEE : 0;
              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#0F2436]/10 p-5"
                  style={{ borderRadius: "8px" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-display font-bold text-[#0F2436]">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-[#5E7386] mt-0.5">
                        {order.date} ·{" "}
                        {order.deliveryType === "pickup"
                          ? "Pickup"
                          : "Delivery"}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-display tracking-widest uppercase px-3 py-1 ${ORDER_STATUS_COLORS[order.status]}`}
                      style={{ borderRadius: "2px" }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex-shrink-0 flex flex-col items-center gap-1.5"
                      >
                        <div
                          className={`w-12 h-12 rounded bg-gradient-to-br ${CATEGORY_COLORS[item.category] || "from-slate-700 to-slate-900"} flex items-center justify-center`}
                        >
                          <span className="text-white/60 font-display text-[9px] font-bold">
                            {item.category?.slice(0, 3).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[9px] font-sans text-[#5E7386] text-center max-w-[52px] leading-tight line-clamp-2">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0F5FA]">
                    <div>
                      <span className="font-display font-bold text-[#0F2436]">
                        {formatPrice(order.total + shipping)}
                      </span>
                      {shipping > 0 && (
                        <span className="text-[10px] text-[#5E7386] ml-1.5 font-sans">
                          (incl. {formatPrice(shipping)} shipping)
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1.5 text-xs font-display tracking-widest text-[#0F2436] uppercase hover:text-[#E63946] transition-colors"
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "services" && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-[#0F2436]/10 p-5"
                style={{ borderRadius: "8px" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${booking.status === "Pending" ? "bg-amber-100" : "bg-[#0F2436]"}`}
                      style={{ borderRadius: "6px" }}
                    >
                      <Wrench
                        size={20}
                        className={
                          booking.status === "Pending"
                            ? "text-amber-700"
                            : "text-white"
                        }
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-[#0F2436]">
                        {booking.service}
                      </p>
                      <p className="text-xs text-[#5E7386] mt-0.5">
                        #{booking.id} · {booking.date}
                      </p>
                      <p className="text-xs text-[#5E7386] mt-1 italic line-clamp-1">
                        "{booking.notes}"
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-display tracking-widest uppercase px-3 py-1 flex-shrink-0 ${BOOKING_STATUS_COLORS[booking.status]}`}
                    style={{ borderRadius: "2px" }}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#F0F5FA]">
                  <span
                    className={`text-sm font-display font-bold ${booking.price ? "text-[#0F2436]" : "text-[#5E7386] italic font-normal"}`}
                  >
                    {booking.price ?? "Price TBD"}
                  </span>
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex items-center gap-1.5 text-xs font-display tracking-widest text-[#0F2436] uppercase hover:text-[#E63946] transition-colors"
                  >
                    View Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ORDER MODAL */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* BOOKING MODAL */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={() => handleCancelBooking(selectedBooking.id)}
        />
      )}
    </div>
  );
}
