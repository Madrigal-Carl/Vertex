import { Outlet } from "react-router-dom";
import Sidebar from "@/components/public/Sidebar";
// import Header from "@/components/public/Header";
import {
  HiOutlineViewGrid,
  HiOutlineShoppingCart,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineStar,
  HiOutlineArchive,
  HiOutlineHashtag,
  HiOutlineSwitchHorizontal,
  HiOutlineBriefcase,
  HiOutlineFolder,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineChat,
  HiOutlineCog,
} from "react-icons/hi";

const navSections = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        href: "/overview",
        icon: HiOutlineViewGrid,
      },
    ],
  },
  {
    label: "Orders",
    items: [
      {
        name: "All Orders",
        href: "/orders",
        icon: HiOutlineShoppingCart,
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        name: "Products",
        href: "/products",
        icon: HiOutlineCube,
      },
      {
        name: "Categories",
        href: "/products/categories",
        icon: HiOutlineTag,
      },
      {
        name: "Reviews",
        href: "/products/reviews",
        icon: HiOutlineStar,
      },
    ],
  },
  {
    label: "Inventory",
    items: [
      {
        name: "Stock",
        href: "/inventory",
        icon: HiOutlineArchive,
      },
      {
        name: "Serial Numbers",
        href: "/inventory/serial-numbers",
        icon: HiOutlineHashtag,
      },
      {
        name: "Movements",
        href: "/inventory/movements",
        icon: HiOutlineSwitchHorizontal,
      },
    ],
  },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        navSections={navSections}
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
