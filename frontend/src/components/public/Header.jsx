import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import useAuth from "@/hooks/useAuth";

export default function Header({ breadcrumbMap }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const crumb = breadcrumbMap[pathname];
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();

      setUserMenuOpen(false);

      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <nav
        className="flex items-center gap-1.5 text-sm ml-10 md:ml-0"
        aria-label="Breadcrumb"
      >
        <span className="text-muted-foreground/50 font-medium select-none hidden md:inline">
          Vertex
        </span>
        {crumb && (
          <>
            <LuChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0 hidden md:inline" />
            <span className="text-muted-foreground/70 font-medium">
              {crumb.section}
            </span>
            <LuChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0" />
            <span className="text-foreground font-semibold">{crumb.page}</span>
          </>
        )}
      </nav>
      <div className="relative">
        <button
          className="rounded-full bg-[#E60000]/10 text-[#E60000] h-8 w-8 font-bold text-xs flex items-center justify-center hover:bg-[#E60000]/20 cursor-pointer border-0"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          data-testid="button-user-menu"
        >
          {user.role.charAt(0).toUpperCase()}
        </button>
        {userMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setUserMenuOpen(false)}
            />
            <div className="absolute right-0 z-20 mt-1 w-52 rounded-[6px] border border-border bg-card shadow-md overflow-hidden">
              <div className="px-3 py-2 border-b border-border">
                <p className="font-semibold text-sm capitalize">{user.role}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="py-1">
                <button
                  className="flex items-center w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                  data-testid="menu-profile"
                >
                  Profile
                </button>
                <button
                  className="flex items-center w-full px-3 py-1.5 text-sm hover:bg-secondary text-left cursor-pointer"
                  data-testid="menu-settings"
                >
                  Settings
                </button>
              </div>
              <div className="border-t border-border py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-1.5 text-sm text-[#E60000] hover:bg-red-50 text-left cursor-pointer"
                  data-testid="menu-logout"
                >
                  Log out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
