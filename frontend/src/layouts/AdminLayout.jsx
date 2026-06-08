import { Outlet } from "react-router-dom";
import Sidebar from "@/components/public/Sidebar";
import Header from "@/components/public/Header";
import { adminNavSections, adminBreadcrumbs } from "@/constants/navigation";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar navSections={adminNavSections} />
      <div className="flex-1 flex flex-col md:pl-[240px] transition-all duration-300">
        <Header breadcrumbMap={adminBreadcrumbs} />
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
