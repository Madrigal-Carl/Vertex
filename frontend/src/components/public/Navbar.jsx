import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  User,
  LogOut,
  MapPin,
  Settings,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import useAuth from "@/hooks/useAuth";

function VertexLogo() {
  return (
    <Link to="/">
      <div className="flex items-center gap-3 cursor-pointer group">
        <div
          className="w-10 h-10 bg-[#E63946] flex items-center justify-center relative"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 65%, 65% 100%, 0 100%)",
          }}
        >
          <span
            className="font-display font-bold text-white text-xl leading-none"
            style={{ marginTop: "-2px" }}
          >
            V
          </span>
        </div>
        <span className="font-display font-bold text-white tracking-[0.12em] text-xl uppercase group-hover:text-white/90 transition-colors">
          Vertex
        </span>
      </div>
    </Link>
  );
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
];

export default function Navbar() {
  const count = useCartStore((state) => state.items).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const openDrawer = useCartStore((state) => state.openDrawer);
  const { user, isAuthenticated: isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-[#0F2436] border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <VertexLogo />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <span
                data-testid={`nav-${link.label.toLowerCase()}`}
                className={`font-display tracking-widest text-xs uppercase transition-colors cursor-pointer ${
                  location.pathname === link.to
                    ? "text-[#E63946]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            data-testid="btn-cart"
            onClick={openDrawer}
            className="relative w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 bg-[#E63946] text-white text-xs font-display flex items-center justify-center"
                style={{ borderRadius: "2px" }}
              >
                {count}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                data-testid="btn-profile"
                onClick={() => setProfileOpen((o) => !o)}
                className="w-9 h-9 rounded-full bg-[#E63946] flex items-center justify-center text-white font-display font-bold text-sm hover:bg-[#cc2f3b] transition-colors"
              >
                {user?.fullname?.charAt(0).toUpperCase() || "U"}
              </button>
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-12 w-52 bg-card border border-border shadow-xl z-20"
                    style={{ borderRadius: "4px" }}
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-display text-[#0F2436] text-sm">
                        {user?.fullname}
                      </p>
                      <p className="text-xs text-[#5E7386] truncate">
                        {user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      {[
                        {
                          to: "/profile/history",
                          label: "History",
                          icon: Clock,
                        },
                        {
                          to: "/profile/address",
                          label: "Address",
                          icon: MapPin,
                        },
                        {
                          to: "/profile/settings",
                          label: "Settings",
                          icon: Settings,
                        },
                      ].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setProfileOpen(false)}
                        >
                          <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F5FA] cursor-pointer transition-colors">
                            <item.icon size={14} className="text-[#5E7386]" />
                            <span className="font-display tracking-wide text-xs text-[#0F2436] uppercase">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      ))}
                      <button
                        data-testid="btn-logout"
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F0F5FA] cursor-pointer transition-colors border-t border-border"
                      >
                        <LogOut size={14} className="text-[#E63946]" />
                        <span className="font-display tracking-wide text-xs text-[#E63946] uppercase">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/auth">
              <button
                data-testid="btn-login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#E63946] text-white font-display tracking-widest text-xs uppercase hover:bg-[#cc2f3b] transition-colors active:scale-95"
                style={{ borderRadius: "4px" }}
              >
                <User size={14} />
                Login
              </button>
            </Link>
          )}

          <button
            data-testid="btn-mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden text-white/80 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a1c2e] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
            >
              <div
                className={`py-3 border-b border-white/10 font-display tracking-widest text-xs uppercase cursor-pointer ${location === link.to ? "text-[#E63946]" : "text-white/80"}`}
              >
                {link.label}
              </div>
            </Link>
          ))}
          {!isLoggedIn && (
            <Link to="/auth" onClick={() => setMobileOpen(false)}>
              <div className="pt-3 font-display tracking-widest text-xs uppercase text-[#E63946] cursor-pointer">
                Login
              </div>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
