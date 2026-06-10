import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { Pagination } from "@/components/admin/Pagination";
import { FilterPanel } from "@/components/admin/FilterPanel";
import {
  LuPlus as Plus,
  LuEye as Eye,
  LuX as X,
  LuCheck as Check,
  LuUser as User,
  LuBriefcase as Briefcase,
  LuCalendar as Calendar,
  LuCreditCard as CreditCard,
  LuClock as Clock,
  LuWrench as Wrench,
  LuPhone as Phone,
  LuMonitor as Monitor,
  LuBatteryFull as Battery,
  LuSettings as Settings,
  LuSmartphone as Smartphone,
  LuMessageSquare as MessageSquare,
  LuEllipsis as MoreHorizontal,
  LuPencil as Edit,
} from "react-icons/lu";

const cn = (...c) => c.filter(Boolean).join(" ");

const bookingsList = [
  {
    id: "BKG-001",
    customer: "Maria Santos",
    phone: "+63 912 111 2233",
    service: "Device Repair",
    price: 850.0,
    paymentMethod: "Cash",
    date: "2023-10-25 10:00 AM",
    technician: "Juan dela Cruz",
    status: "Confirmed",
    notes: "iPhone 13 — cracked screen",
  },
  {
    id: "BKG-002",
    customer: "Jose Reyes",
    phone: "+63 917 223 4455",
    service: "Screen Replacement",
    price: 1200.0,
    paymentMethod: "GCash",
    date: "2023-10-25 02:00 PM",
    technician: "Maria Santos",
    status: "Pending",
    notes: "",
  },
  {
    id: "BKG-003",
    customer: "Ana Cruz",
    phone: "+63 999 334 5566",
    service: "Battery Replacement",
    price: 650.0,
    paymentMethod: "Card",
    date: "2023-10-26 09:00 AM",
    technician: "Juan dela Cruz",
    status: "Completed",
    notes: "Samsung S21 battery swollen",
  },
  {
    id: "BKG-004",
    customer: "Pedro Lim",
    phone: "+63 905 445 6677",
    service: "Software Setup",
    price: 350.0,
    paymentMethod: "Bank Transfer",
    date: "2023-10-26 11:00 AM",
    technician: "Maria Santos",
    status: "Cancelled",
    notes: "Windows 11 fresh install",
  },
  {
    id: "BKG-005",
    customer: "Rosa Dela Cruz",
    phone: "+63 910 556 7788",
    service: "Device Repair",
    price: 900.0,
    paymentMethod: "GCash",
    date: "2023-10-27 03:00 PM",
    technician: "Juan dela Cruz",
    status: "Pending",
    notes: "",
  },
  {
    id: "BKG-006",
    customer: "Carlos Bautista",
    phone: "+63 926 667 8899",
    service: "Screen Replacement",
    price: 1100.0,
    paymentMethod: "Cash",
    date: "2023-10-27 10:00 AM",
    technician: "Maria Santos",
    status: "Confirmed",
    notes: "iPad Air 4 LCD replacement",
  },
];

const BOOKING_TIMELINE_STEPS = [
  "Booked",
  "Confirmed",
  "In Service",
  "Completed",
];
const BOOKING_STEP = {
  Pending: 0,
  Confirmed: 1,
  Processing: 2,
  Completed: 3,
  Cancelled: -1,
};

const SERVICE_CATALOG = [
  {
    id: "device-repair",
    label: "Device Repair",
    desc: "General hardware diagnostics & fix",
    basePrice: 850,
    icon: Wrench,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "screen-replacement",
    label: "Screen Replacement",
    desc: "LCD / OLED display replacement",
    basePrice: 1200,
    icon: Smartphone,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    id: "battery-replacement",
    label: "Battery Replacement",
    desc: "OEM battery swap & calibration",
    basePrice: 650,
    icon: Battery,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: "software-setup",
    label: "Software Setup",
    desc: "OS install, drivers & configuration",
    basePrice: 350,
    icon: Monitor,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "data-recovery",
    label: "Data Recovery",
    desc: "Retrieve files from damaged storage",
    basePrice: 1500,
    icon: Settings,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    id: "consultation",
    label: "Consultation",
    desc: "Tech advice & device assessment",
    basePrice: 200,
    icon: MessageSquare,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
];

export default function ServiceBookings() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editPickedService, setEditPickedService] = useState(null);
  const [editCustomPrice, setEditCustomPrice] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownRect, setDropdownRect] = useState(null);
  const dropdownButtonRefs = useRef({});
  const [pickedService, setPickedService] = useState(null);
  const [customPrice, setCustomPrice] = useState("");

  function handleDropdownToggle(id) {
    if (openDropdown === id) {
      setOpenDropdown(null);
      setDropdownRect(null);
    } else {
      const rect = dropdownButtonRefs.current[id]?.getBoundingClientRect();
      setDropdownRect(rect || null);
      setOpenDropdown(id);
    }
  }

  function openEditBooking(booking) {
    const svc =
      SERVICE_CATALOG.find((s) => s.label === booking.service) ?? null;
    setEditPickedService(svc);
    setEditCustomPrice(String(booking.price));
    setEditingBooking(booking);
    setOpenDropdown(null);
    setDropdownRect(null);
  }

  function closeEditBooking() {
    setEditingBooking(null);
    setEditPickedService(null);
    setEditCustomPrice("");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Service Bookings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {bookingsList.length} total bookings
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 py-2"
          onClick={() => setIsNewBookingOpen(true)}
          data-testid="button-new-booking"
        >
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      {/* ── NEW BOOKING MODAL — field-only ── */}
      {isNewBookingOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsNewBookingOpen(false);
            setPickedService(null);
            setCustomPrice("");
          }}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">New Service Booking</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Fill in the details to schedule a new service.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={() => {
                  setIsNewBookingOpen(false);
                  setPickedService(null);
                  setCustomPrice("");
                }}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Booking preview card */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-[8px] bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center shrink-0">
                  {pickedService ? (
                    (() => {
                      const Icon = pickedService.icon;
                      return (
                        <Icon className={cn("w-6 h-6", pickedService.color)} />
                      );
                    })()
                  ) : (
                    <Briefcase className="w-6 h-6 text-[#E60000]/40" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {pickedService?.label ?? "No service selected"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {pickedService
                      ? `from ₱${(Number(customPrice) || pickedService.basePrice).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`
                      : "Select a service below"}
                  </p>
                </div>
              </div>

              {/* Customer */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Customer
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Full Name</label>
                      <input
                        placeholder="e.g. Maria Santos"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                        data-testid="input-booking-customer-name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Phone{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        placeholder="+63 912 345 6789"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Schedule */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" /> Service & Schedule
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Service Type</label>
                    <select
                      value={pickedService?.id ?? ""}
                      onChange={(e) => {
                        const svc =
                          SERVICE_CATALOG.find(
                            (s) => s.id === e.target.value,
                          ) ?? null;
                        setPickedService(svc);
                        setCustomPrice("");
                      }}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                      data-testid="select-booking-service"
                    >
                      <option value="">Select a service</option>
                      {SERVICE_CATALOG.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.label} — from ₱{svc.basePrice.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none cursor-pointer"
                        data-testid="input-booking-datetime"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">
                        Assigned Technician
                      </label>
                      <select
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                        data-testid="select-booking-technician"
                      >
                        <option value="">Select technician</option>
                        <option value="tech-1">Juan dela Cruz</option>
                        <option value="tech-2">Maria Santos</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3 h-3" /> Payment
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">
                        Service Price (₱)
                      </label>
                      <input
                        type="number"
                        placeholder={
                          pickedService
                            ? String(pickedService.basePrice)
                            : "0.00"
                        }
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        min={0}
                        step="0.01"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                        data-testid="input-booking-price"
                      />
                      {pickedService && !customPrice && (
                        <p className="text-[11px] text-muted-foreground pl-0.5">
                          Base: ₱{pickedService.basePrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">
                        Payment Method
                      </label>
                      <select
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                        data-testid="select-booking-payment"
                      >
                        <option value="">Select method</option>
                        <option value="cash">Cash</option>
                        <option value="gcash">GCash</option>
                        <option value="card">Credit / Debit Card</option>
                        <option value="bank">Bank Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  Notes
                </p>
                <textarea
                  placeholder="Device model, issue description, special instructions..."
                  className="flex w-full rounded-[4px] border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30 min-h-[80px] resize-none"
                  data-testid="input-booking-notes"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => {
                  setIsNewBookingOpen(false);
                  setPickedService(null);
                  setCustomPrice("");
                }}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!pickedService}
                onClick={() => {
                  setIsNewBookingOpen(false);
                  setPickedService(null);
                  setCustomPrice("");
                }}
                data-testid="button-save-booking"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT BOOKING MODAL ── */}
      {editingBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeEditBooking}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 bg-card rounded-[8px] w-full max-w-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border">
              <div>
                <h2 className="text-lg font-bold">Edit Booking</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Update details for {editingBooking.id}.
                </p>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={closeEditBooking}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5 max-h-[72vh] overflow-y-auto">
              {/* Preview card */}
              <div className="flex items-center gap-4 p-4 bg-secondary/40 rounded-[8px] border border-border">
                <div className="w-14 h-14 rounded-[8px] bg-[#E60000]/10 border-2 border-[#E60000]/20 flex items-center justify-center shrink-0">
                  {editPickedService ? (
                    (() => {
                      const Icon = editPickedService.icon;
                      return (
                        <Icon
                          className={cn("w-6 h-6", editPickedService.color)}
                        />
                      );
                    })()
                  ) : (
                    <Briefcase className="w-6 h-6 text-[#E60000]/40" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {editPickedService?.label ?? editingBooking.service}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ₱
                    {(
                      Number(editCustomPrice) ||
                      editPickedService?.basePrice ||
                      editingBooking.price
                    ).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              {/* Customer */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Customer
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Full Name</label>
                      <input
                        defaultValue={editingBooking.customer}
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Phone
                      </label>
                      <input
                        defaultValue={editingBooking.phone}
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Service & Schedule */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" /> Service & Schedule
                </p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Service Type</label>
                    <select
                      value={editPickedService?.id ?? ""}
                      onChange={(e) => {
                        const svc =
                          SERVICE_CATALOG.find(
                            (s) => s.id === e.target.value,
                          ) ?? null;
                        setEditPickedService(svc);
                        setEditCustomPrice("");
                      }}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                    >
                      <option value="">Select a service</option>
                      {SERVICE_CATALOG.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.label} — from ₱{svc.basePrice.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">
                        Assigned Technician
                      </label>
                      <select
                        defaultValue={
                          editingBooking.technician === "Juan dela Cruz"
                            ? "tech-1"
                            : "tech-2"
                        }
                        className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                      >
                        <option value="tech-1">Juan dela Cruz</option>
                        <option value="tech-2">Maria Santos</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <CreditCard className="w-3 h-3" /> Payment
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">
                      Service Price (₱)
                    </label>
                    <input
                      type="number"
                      value={editCustomPrice}
                      onChange={(e) => setEditCustomPrice(e.target.value)}
                      min={0}
                      step="0.01"
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E60000]/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">
                      Payment Method
                    </label>
                    <select
                      defaultValue={editingBooking.paymentMethod
                        .toLowerCase()
                        .replace(" ", "")}
                      className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                    >
                      <option value="cash">Cash</option>
                      <option value="gcash">GCash</option>
                      <option value="card">Credit / Debit Card</option>
                      <option value="banktransfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Status */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Status
                </p>
                <select
                  defaultValue={editingBooking.status.toLowerCase()}
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-border bg-secondary/20">
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={closeEditBooking}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={closeEditBooking}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKING VIEW PANEL ── */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={() => setSelectedBooking(null)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-50 w-full sm:max-w-[440px] bg-card h-full overflow-y-auto flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  {selectedBooking.date}
                </p>
                <h2 className="text-lg font-bold">{selectedBooking.id}</h2>
                <div className="mt-1.5">
                  <StatusBadge status={selectedBooking.status} />
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] hover:bg-secondary cursor-pointer mt-0.5"
                onClick={() => setSelectedBooking(null)}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-6">
              {/* Timeline */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  Booking Timeline
                </p>
                {selectedBooking.status === "Cancelled" ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-[6px] bg-red-50 border border-red-100">
                    <X className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-sm font-medium text-red-700">
                      Booking was cancelled
                    </span>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-[13px] top-3 bottom-3 w-px bg-border" />
                    {BOOKING_TIMELINE_STEPS.map((stepLabel, idx) => {
                      const currentStep =
                        BOOKING_STEP[selectedBooking.status] ?? 0;
                      const done = idx < currentStep;
                      const active = idx === currentStep;
                      const future = idx > currentStep;
                      return (
                        <div
                          key={stepLabel}
                          className="flex items-center gap-3 relative py-2"
                        >
                          <div
                            className={cn(
                              "w-[26px] h-[26px] rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-card",
                              done
                                ? "border-[#E60000] bg-[#E60000]"
                                : active
                                  ? "border-[#E60000] bg-white"
                                  : "border-border bg-card",
                            )}
                          >
                            {done ? (
                              <Check className="w-3 h-3 text-white" />
                            ) : active ? (
                              <div className="w-2 h-2 rounded-full bg-[#E60000]" />
                            ) : null}
                          </div>
                          <div>
                            <p
                              className={cn(
                                "text-sm font-medium",
                                future
                                  ? "text-muted-foreground"
                                  : "text-foreground",
                              )}
                            >
                              {stepLabel}
                            </p>
                            {active && (
                              <p className="text-[10px] text-muted-foreground mt-0.5">
                                {selectedBooking.date}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Customer */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3 h-3" /> Customer
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E60000]/10 text-[#E60000] flex items-center justify-center text-xs font-bold shrink-0">
                      {selectedBooking.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {selectedBooking.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedBooking.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service info */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <Wrench className="w-3 h-3" /> Service
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">
                      {selectedBooking.service}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technician</span>
                    <span className="font-medium">
                      {selectedBooking.technician}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule</span>
                    <span className="font-medium">{selectedBooking.date}</span>
                  </div>
                  {selectedBooking.notes && (
                    <div className="pt-2 border-t border-dashed border-border">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Notes
                      </p>
                      <p className="text-xs text-foreground leading-relaxed">
                        {selectedBooking.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-[6px] border border-border overflow-hidden">
                <div className="px-4 py-2.5 bg-secondary/40 border-b border-border">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <CreditCard className="w-3 h-3" /> Payment
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Method</span>
                    <span className="font-medium text-foreground">
                      {selectedBooking.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-2 mt-1">
                    <span>Service Fee</span>
                    <span className="text-[#E60000]">
                      ₱
                      {selectedBooking.price.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Update status */}
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Update Status
                </p>
                <select
                  className="flex h-9 w-full rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
                  defaultValue={selectedBooking.status.toLowerCase()}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border shrink-0 flex gap-2">
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer border border-border bg-transparent rounded-[4px] min-h-9 px-4 hover:bg-secondary"
                onClick={() => setSelectedBooking(null)}
              >
                Close
              </button>
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium cursor-pointer bg-[#E60000] hover:bg-[#CC0000] text-white rounded-[4px] min-h-9 px-4"
                onClick={() => setSelectedBooking(null)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TABLE ── */}
      <div className="bg-card border border-border rounded-[6px] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <SearchBar
            placeholder="Search bookings..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-80"
          />
          <FilterPanel>
            <select
              defaultValue="all"
              className="flex h-9 w-[140px] rounded-[4px] border border-input bg-transparent px-3 py-1 text-sm cursor-pointer focus-visible:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </FilterPanel>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary/60 text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Booking ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookingsList.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-secondary/30 transition-colors"
                  data-testid={`row-booking-${booking.id}`}
                >
                  <td className="px-4 py-3 font-medium text-[#E60000]">
                    {booking.id}
                  </td>
                  <td className="px-4 py-3">{booking.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {booking.service}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {booking.date}
                  </td>
                  <td className="px-4 py-3 font-medium text-right">
                    ₱
                    {booking.price.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      ref={(el) =>
                        (dropdownButtonRefs.current[booking.id] = el)
                      }
                      className="inline-flex items-center justify-center h-8 w-8 rounded-[4px] border border-transparent bg-transparent hover:bg-secondary cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(booking.id);
                      }}
                      data-testid={`button-actions-${booking.id}`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={2}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── BOOKING DROPDOWN PORTAL ── */}
      {openDropdown &&
        dropdownRect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => {
                setOpenDropdown(null);
                setDropdownRect(null);
              }}
            />
            <div
              className="fixed z-[9999] rounded-[4px] border border-border bg-card shadow-md py-1 w-36"
              style={{
                top: dropdownRect.bottom + 4,
                left: dropdownRect.right - 144,
              }}
            >
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                onClick={() => {
                  const b = bookingsList.find((x) => x.id === openDropdown);
                  if (b) setSelectedBooking(b);
                  setOpenDropdown(null);
                  setDropdownRect(null);
                }}
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                onClick={() => {
                  const b = bookingsList.find((x) => x.id === openDropdown);
                  if (b) openEditBooking(b);
                }}
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}
