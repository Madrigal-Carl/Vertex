import { Outlet } from "react-router-dom";
import Sidebar from "@/components/public/Sidebar";
// import Header from "@/components/public/Header";
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
} from "react-icons/lu";

export const adminNavSections = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        href: "/admin/overview",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Orders",
    items: [
      {
        name: "All Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        name: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        name: "Categories",
        href: "/admin/products/categories",
        icon: Tags,
      },
      {
        name: "Reviews",
        href: "/admin/products/reviews",
        icon: Star,
      },
    ],
  },
  {
    label: "Inventory",
    items: [
      {
        name: "Stock",
        href: "/admin/inventory",
        icon: Archive,
      },
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
      {
        name: "Services",
        href: "/admin/services",
        icon: Briefcase,
      },
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
      {
        name: "Reviews",
        href: "/admin/services/reviews",
        icon: Star,
      },
    ],
  },
  {
    label: "Sales",
    items: [
      {
        name: "Overview",
        href: "/admin/sales",
        icon: BarChart3,
      },
      {
        name: "Transactions",
        href: "/admin/sales/transactions",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "Staff",
    items: [
      {
        name: "Users",
        href: "/admin/staff/users",
        icon: Users,
      },
    ],
  },
  {
    label: "Website",
    items: [
      {
        name: "Reviews",
        href: "/admin/website/reviews",
        icon: MessageSquare,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        name: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        navSections={adminNavSections}
        user={{
          initial: "A",
          name: "Admin User",
          email: "admin@vertex.com",
        }}
      />
      <div className="flex-1 flex flex-col md:pl-[240px] transition-all duration-300">
        {/* <Header /> */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
