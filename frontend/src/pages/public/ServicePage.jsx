import { useState } from "react";
import useProtectedAction from "@/hooks/useProtectedAction";
import BookingModal from "@/components/modals/BookingModal";
import {
  Wrench,
  Cpu,
  Wifi,
  Monitor,
  HardDrive,
  MessageCircle,
  CheckCircle,
  X,
  CalendarCheck,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Device Repair",
    desc: "From cracked screens to hardware failures, our certified technicians diagnose and fix all major brands. We offer same-day repair for common issues.",
    priceRange: "From ₱500",
    features: [
      "Screen Replacement",
      "Battery Replacement",
      "Water Damage Repair",
      "Keyboard Repair",
    ],
  },
  {
    icon: Monitor,
    title: "Software Setup",
    desc: "Fresh OS installation, driver updates, software configuration, and antivirus setup. Get your device running at peak performance.",
    priceRange: "From ₱800",
    features: [
      "OS Installation",
      "Driver Updates",
      "Software Configuration",
      "Antivirus Setup",
    ],
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    desc: "Lost important files? Our specialists use advanced tools to recover data from damaged drives, formatted storage, and corrupted systems.",
    priceRange: "From ₱1,500",
    features: [
      "HDD/SSD Recovery",
      "USB/SD Recovery",
      "Corrupted File Repair",
      "Cloud Backup Setup",
    ],
  },
  {
    icon: Wifi,
    title: "Network Setup",
    desc: "Complete home and office network installation, router configuration, Wi-Fi range extension, and security hardening.",
    priceRange: "From ₱1,200",
    features: [
      "Router Configuration",
      "Wi-Fi Optimization",
      "LAN Cabling",
      "Network Security",
    ],
  },
  {
    icon: Cpu,
    title: "Custom PC Build",
    desc: "Tell us your workload and budget — we'll design, source, and assemble your perfect custom PC with full testing before delivery.",
    priceRange: "From ₱3,000",
    features: [
      "Workload Analysis",
      "Component Sourcing",
      "Full Assembly",
      "Performance Testing",
    ],
  },
  {
    icon: MessageCircle,
    title: "Tech Consultation",
    desc: "Not sure what to buy or how to set it up? Book a 1-on-1 session with a Vertex expert for personalized guidance.",
    priceRange: "₱500/hour",
    features: [
      "Product Advice",
      "Setup Guidance",
      "Performance Optimization",
      "Remote Support",
    ],
  },
];

export default function Services() {
  const [bookingService, setBookingService] = useState(null);
  const protectedAction = useProtectedAction();

  const handleBookNow = (serviceTitle) => {
    protectedAction({
      allowedRole: "customer",
      action: () => {
        setBookingService(serviceTitle);
      },
    });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#0F2436] py-20 px-6 md:px-12 text-center">
        <p className="text-xs font-display tracking-[0.2em] text-[#E63946] uppercase mb-3">
          Expert Support
        </p>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
          Our Services
        </h1>
        <p className="text-white/60 text-base font-sans max-w-xl mx-auto leading-relaxed">
          More than just products — we offer expert tech services to keep your
          devices running at their best.
        </p>
      </div>

      <div className="bg-[#F0F5FA] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-[#0F2436]/10 p-6 flex flex-col hover:shadow-md transition-shadow group"
              style={{ borderRadius: "8px" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 bg-[#0F2436] flex items-center justify-center group-hover:bg-[#E63946] transition-colors"
                  style={{ borderRadius: "4px" }}
                >
                  <s.icon size={20} className="text-white" />
                </div>
                <span
                  className="font-display text-xs tracking-widest text-[#E63946] uppercase bg-[#E63946]/10 px-2 py-1"
                  style={{ borderRadius: "2px" }}
                >
                  {s.priceRange}
                </span>
              </div>
              <h3 className="font-display font-bold text-[#0F2436] text-xl mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-[#5E7386] leading-relaxed mb-5 flex-1">
                {s.desc}
              </p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-[#5E7386]"
                  >
                    <CheckCircle
                      size={13}
                      className="text-[#0F2436] flex-shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                data-testid={`btn-book-${s.title.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => handleBookNow(s.title)}
                className="w-full py-3 bg-[#E63946] text-white font-display tracking-widest text-xs uppercase hover:bg-[#cc2f3b] transition-colors active:scale-95"
                style={{ borderRadius: "4px" }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0F2436] py-12 px-6 md:px-12 text-center">
        <h3 className="font-display font-bold text-white text-2xl mb-3">
          Need a Custom Solution?
        </h3>
        <p className="text-white/60 text-sm mb-6 font-sans">
          Contact us and we'll put together a service package tailored to your
          needs.
        </p>
        <button
          data-testid="btn-contact-us"
          className="px-8 py-3 border border-[#E63946] text-[#E63946] font-display tracking-widest text-sm uppercase hover:bg-[#E63946] hover:text-white transition-all"
          style={{ borderRadius: "4px" }}
        >
          Contact Us
        </button>
      </div>

      {bookingService && (
        <BookingModal
          service={bookingService}
          onClose={() => setBookingService(null)}
        />
      )}
    </div>
  );
}
