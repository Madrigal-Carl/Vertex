import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { LuMenu } from "react-icons/lu";

export default function Sidebar({ navSections }) {
  const { user } = useAuth();
  const location = useLocation();

  const normalizedLocation =
    location.pathname === "/" ? "/overview" : location.pathname;

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block w-[240px] h-screen fixed inset-y-0 left-0 z-50">
        <div className="flex flex-col h-full bg-[#FAFAFA] border-r border-border">
          {/* Logo */}
          <div className="px-5 h-14 flex items-center border-b border-border">
            <Link to="/" className="flex items-center justify-center gap-2.5">
              <div
                className="w-6 h-6 bg-[#E63946] flex items-center justify-center relative"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 65%, 65% 100%, 0 100%)",
                }}
              >
                <span
                  className="font-display font-bold text-white text-xs leading-none"
                  style={{ marginTop: "-2px" }}
                >
                  V
                </span>
              </div>

              <h1 className="font-bold text-base tracking-wider text-foreground">
                VERTEX
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
            {navSections.map((section) => (
              <div key={section.label}>
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase mb-1.5 px-2">
                  {section.label}
                </div>

                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                      normalizedLocation === item.href ||
                      normalizedLocation.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] text-sm transition-colors ${
                          isActive
                            ? "bg-red-50 text-[#E60000] font-semibold border-l-2 border-l-[#E60000] !rounded-l-none pl-[6px]"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground font-medium"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? "text-[#E60000]" : ""
                          }`}
                        />

                        <span className="truncate">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-[4px] bg-secondary">
              <div className="w-7 h-7 rounded-full bg-[#E60000] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {user.role.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate capitalize">
                  {user.role}
                </p>

                <p className="text-[10px] text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button
          className="inline-flex items-center justify-center h-9 w-9 rounded-[4px] border border-border bg-transparent cursor-pointer hover:bg-secondary"
          onClick={() => setMobileOpen(true)}
        >
          <LuMenu className="w-5 h-5" />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />

          <div
            className="relative z-50 w-[260px] h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent navSections={navSections} />
          </div>
        </div>
      )}
    </>
  );
}
