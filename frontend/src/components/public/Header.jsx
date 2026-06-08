import { useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const BREADCRUMB_MAP: Record<string, { section: string; page: string }> = {
  "/": { section: "Dashboard", page: "Overview" },
  "/overview": { section: "Dashboard", page: "Overview" },
  "/orders": { section: "Orders", page: "All Orders" },
  "/products": { section: "Products", page: "All Products" },
  "/products/categories": { section: "Products", page: "Categories" },
  "/products/reviews": { section: "Products", page: "Reviews" },
  "/inventory": { section: "Inventory", page: "Stock" },
  "/inventory/serial-numbers": { section: "Inventory", page: "Serial Numbers" },
  "/inventory/movements": { section: "Inventory", page: "Movements" },
  "/services": { section: "Services", page: "All Services" },
  "/services/categories": { section: "Services", page: "Categories" },
  "/services/bookings": { section: "Services", page: "Bookings" },
  "/services/reviews": { section: "Services", page: "Reviews" },
  "/sales": { section: "Sales", page: "Overview" },
  "/sales/transactions": { section: "Sales", page: "Transactions" },
  "/staff/users": { section: "Staff", page: "Users" },
  "/website/reviews": { section: "Website", page: "Reviews" },
  "/settings": { section: "Settings", page: "Settings" },
};

export function Header() {
  const [location] = useLocation();
  const crumb = BREADCRUMB_MAP[location] ?? null;

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm ml-10 md:ml-0" aria-label="Breadcrumb">
        <span className="text-muted-foreground/50 font-medium select-none">Vertex</span>
        {crumb && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0" />
            <span className="text-muted-foreground/70 font-medium">{crumb.section}</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0" />
            <span className="text-foreground font-semibold">{crumb.page}</span>
          </>
        )}
      </nav>

      {/* User menu only */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full bg-[#E60000]/10 text-[#E60000] h-8 w-8 font-bold text-xs hover:bg-[#E60000]/20 p-0"
            data-testid="button-user-menu"
          >
            A
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 rounded-[6px]">
          <DropdownMenuLabel className="font-normal">
            <p className="font-semibold text-sm">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@vertex.com</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem data-testid="menu-profile">Profile</DropdownMenuItem>
          <DropdownMenuItem data-testid="menu-settings">Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-[#E60000] focus:text-[#E60000] focus:bg-red-50" data-testid="menu-logout">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
