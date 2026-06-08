import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard as LayoutDashboard,
  LuShoppingCart as ShoppingCart,
  LuPackage as Package,
  LuTags as Tags,
  LuStar as Star,
  LuArchive as Archive,
  LuHash as Hash,
  LuArrowLeftRight as ArrowLeftRight,
  LuBriefcase as Briefcase,
  LuFolderOpen as FolderOpen,
  LuCalendarCheck as CalendarCheck,
  LuChartBar as BarChart3,
  LuCreditCard as CreditCard,
  LuUsers as Users,
  LuMessageSquare as MessageSquare,
  LuSettings as Settings,
  LuMenu as Menu,
} from "react-icons/lu";
const NAV_SECTIONS = [
  {
    label: "Dashboard",
    items: [
      { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
    ],
  },
  {
    label: "Orders",
    items: [{ name: "All Orders", href: "/admin/orders", icon: ShoppingCart }],
  },
  {
    label: "Products",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/products/categories", icon: Tags },
      { name: "Reviews", href: "/admin/products/reviews", icon: Star },
    ],
  },
  {
    label: "Inventory",
    items: [
      { name: "Stock", href: "/admin/inventory", icon: Archive },
      {
        name: "Serial Numbers",
        href: "/admin/inventory/serial-numbers",
        icon: Hash,
      },
      {
        name: "Movements",
        href: "/admin/inventory/movements",
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    label: "Services",
    items: [
      { name: "Services", href: "/admin/services", icon: Briefcase },
      {
        name: "Categories",
        href: "/admin/services/categories",
        icon: FolderOpen,
      },
      {
        name: "Bookings",
        href: "/admin/services/bookings",
        icon: CalendarCheck,
      },
      { name: "Reviews", href: "/admin/services/reviews", icon: Star },
    ],
  },
  {
    label: "Sales",
    items: [
      { name: "Overview", href: "/admin/sales", icon: BarChart3 },
      {
        name: "Transactions",
        href: "/admin/sales/transactions",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "Staff",
    items: [{ name: "Users", href: "/admin/staff/users", icon: Users }],
  },
  {
    label: "Website",
    items: [
      { name: "Reviews", href: "/admin/website/reviews", icon: MessageSquare },
    ],
  },
  {
    label: "Settings",
    items: [{ name: "Settings", href: "/admin/settings", icon: Settings }],
  },
];
function SidebarContent() {
  const location = useLocation();
  const normalizedLocation =
    location.pathname === "/" ? "/overview" : location.pathname;
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] border-r border-border">
      <div className="px-5 h-14 flex items-center border-b border-border">
        <Link
          to="/admin/overview"
          className="flex items-center justify-center gap-2.5"
        >
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
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase mb-1.5 px-2">
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = normalizedLocation === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-[4px] text-sm transition-colors${isActive ? " bg-red-50 text-[#E60000] font-semibold border-l-2 border-l-[#E60000] !rounded-l-none pl-[6px]" : " text-muted-foreground hover:bg-secondary hover:text-foreground font-medium"}`}
                    data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0${isActive ? " text-[#E60000]" : ""}`}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-[4px] bg-secondary">
          <div className="w-7 h-7 rounded-full bg-[#E60000] flex items-center justify-center text-white text-xs font-bold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Admin User</p>
            <p className="text-[10px] text-muted-foreground truncate">
              admin@vertex.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <div className="hidden md:block w-[240px] h-screen fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </div>
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button
          className="inline-flex items-center justify-center h-9 w-9 rounded-[4px] border border-border bg-transparent cursor-pointer hover:bg-secondary"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
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
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
