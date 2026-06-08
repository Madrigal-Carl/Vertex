import { Outlet } from "react-router-dom";
import Sidebar from "@/components/public/Sidebar";
import Header from "@/components/public/Header";
import {
  LuLayoutDashboard,
  LuShoppingCart,
  LuPackage,
  LuTags,
  LuStar,
  LuArchive,
  LuHash,
  LuArrowLeftRight,
  LuBriefcase,
  LuFolderOpen,
  LuCalendarCheck,
  LuChartBar,
  LuCreditCard,
  LuUsers,
  LuMessageSquare,
  LuSettings,
} from "react-icons/lu";

const adminNavSections = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        href: "/admin/overview",
        icon: LuLayoutDashboard,
      },
    ],
  },
  {
    label: "Orders",
    items: [
      {
        name: "All Orders",
        href: "/admin/orders",
        icon: LuShoppingCart,
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        name: "Products",
        href: "/admin/products",
        icon: LuPackage,
      },
      {
        name: "Categories",
        href: "/admin/products/categories",
        icon: LuTags,
      },
      {
        name: "Reviews",
        href: "/admin/products/reviews",
        icon: LuStar,
      },
    ],
  },
  {
    label: "Inventory",
    items: [
      {
        name: "Stock",
        href: "/admin/inventory",
        icon: LuArchive,
      },
      {
        name: "Serial Numbers",
        href: "/admin/inventory/serial-numbers",
        icon: LuHash,
      },
      {
        name: "Movements",
        href: "/admin/inventory/movements",
        icon: LuArrowLeftRight,
      },
    ],
  },
  {
    label: "Services",
    items: [
      {
        name: "Services",
        href: "/admin/services",
        icon: LuBriefcase,
      },
      {
        name: "Categories",
        href: "/admin/services/categories",
        icon: LuFolderOpen,
      },
      {
        name: "Bookings",
        href: "/admin/services/bookings",
        icon: LuCalendarCheck,
      },
      {
        name: "Reviews",
        href: "/admin/services/reviews",
        icon: LuStar,
      },
    ],
  },
  {
    label: "Sales",
    items: [
      {
        name: "Overview",
        href: "/admin/sales",
        icon: LuChartBar,
      },
      {
        name: "Transactions",
        href: "/admin/sales/transactions",
        icon: LuCreditCard,
      },
    ],
  },
  {
    label: "Staff",
    items: [
      {
        name: "Users",
        href: "/admin/staff/users",
        icon: LuUsers,
      },
    ],
  },
  {
    label: "Website",
    items: [
      {
        name: "Reviews",
        href: "/admin/website/reviews",
        icon: LuMessageSquare,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        name: "Settings",
        href: "/admin/settings",
        icon: LuSettings,
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
        <Header />
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
