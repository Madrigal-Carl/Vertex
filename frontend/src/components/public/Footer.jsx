import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0F2436] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 bg-[#E63946] flex items-center justify-center"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 65%, 65% 100%, 0 100%)",
              }}
            >
              <span className="font-display font-bold text-white text-xl leading-none">
                V
              </span>
            </div>
            <span className="font-display font-bold tracking-[0.12em] text-xl uppercase">
              Vertex
            </span>
          </div>
          <p className="text-white/60 text-sm font-sans leading-relaxed mb-6">
            Your trusted destination for premium tech products. Quality gadgets,
            fast delivery, unmatched support.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <MapPin size={14} className="text-[#E63946] flex-shrink-0" />
              <span>123 Tech Avenue, Makati City, Metro Manila 1200</span>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <Mail size={14} className="text-[#E63946] flex-shrink-0" />
              <span>support@vertexstore.ph</span>
            </div>
            <div className="flex items-center gap-3 text-white/60 text-sm">
              <Phone size={14} className="text-[#E63946] flex-shrink-0" />
              <span>+63 2 8888 1234</span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            {[Mail, Mail, Mail, Mail].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-colors"
                style={{ borderRadius: "4px" }}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display tracking-widest text-xs uppercase text-[#E63946] mb-5">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Products", to: "/products" },
              { label: "Services", to: "/services" },
              { label: "Cart", to: "/cart" },
              { label: "Sign In", to: "/auth" },
            ].map((link) => (
              <Link key={link.to} to={link.to}>
                <span className="text-white/60 hover:text-white text-sm font-sans cursor-pointer transition-colors block py-1">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display tracking-widest text-xs uppercase text-[#E63946] mb-5">
            Store Hours
          </h4>
          <div className="space-y-3 mb-6">
            {[
              { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
              { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
              { day: "Sunday", hours: "11:00 AM – 5:00 PM" },
            ].map((s) => (
              <div
                key={s.day}
                className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0"
              >
                <span className="text-white/60 text-sm font-sans">{s.day}</span>
                <span className="text-white text-sm font-display tracking-wide">
                  {s.hours}
                </span>
              </div>
            ))}
          </div>
          <div
            className="bg-white/5 border border-white/10 px-4 py-3"
            style={{ borderRadius: "4px" }}
          >
            <p className="text-xs text-[#E63946] font-display tracking-widest uppercase mb-1">
              Holiday Notice
            </p>
            <p className="text-xs text-white/50 font-sans leading-relaxed">
              Store hours may vary on public holidays. Follow us on social media
              for updates.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-white/40 text-xs font-sans">
          © 2025 Vertex Store. All rights reserved.
        </p>
        <div className="flex gap-5">
          <span className="text-white/40 text-xs font-sans hover:text-white/60 cursor-pointer transition-colors">
            Privacy Policy
          </span>
          <span className="text-white/40 text-xs font-sans hover:text-white/60 cursor-pointer transition-colors">
            Terms of Service
          </span>
          <span className="text-white/40 text-xs font-sans hover:text-white/60 cursor-pointer transition-colors">
            Refund Policy
          </span>
        </div>
      </div>
    </footer>
  );
}
