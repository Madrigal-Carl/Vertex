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

const adminBreadcrumbMap = {
  "/admin/overview": { section: "Dashboard", page: "Overview" },
  "/admin/orders": { section: "Orders", page: "All Orders" },
  "/admin/products": { section: "Products", page: "All Products" },
  "/admin/products/categories": { section: "Products", page: "Categories" },
  "/admin/products/reviews": { section: "Products", page: "Reviews" },
  "/admin/inventory": { section: "Inventory", page: "Stock" },
  "/admin/inventory/serial-numbers": {
    section: "Inventory",
    page: "Serial Numbers",
  },
  "/admin/inventory/movements": { section: "Inventory", page: "Movements" },
  "/admin/services": { section: "Services", page: "All Services" },
  "/admin/services/categories": { section: "Services", page: "Categories" },
  "/admin/services/bookings": { section: "Services", page: "Bookings" },
  "/admin/services/reviews": { section: "Services", page: "Reviews" },
  "/admin/sales": { section: "Sales", page: "Overview" },
  "/admin/sales/transactions": { section: "Sales", page: "Transactions" },
  "/admin/staff/users": { section: "Staff", page: "Users" },
  "/admin/website/reviews": { section: "Website", page: "Reviews" },
  "/admin/settings": { section: "Settings", page: "Settings" },
};

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar navSections={adminNavSections} />
      <div className="flex-1 flex flex-col md:pl-[240px] transition-all duration-300">
        <Header breadcrumbMap={adminBreadcrumbMap} />
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
