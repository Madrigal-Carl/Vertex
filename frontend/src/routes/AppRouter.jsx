import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "@/pages/public/HomePage";
import AboutPage from "@/pages/public/AboutPage";
import ProductPage from "@/pages/public/ProductPage";
import ServicePage from "@/pages/public/ServicePage";
import ProductDetailPage from "@/pages/public/ProductDetailPage";
import AuthPage from "@/pages/public/AuthPage";

import CheckoutPage from "@/pages/customer/CheckoutPage";
import HistoryPage from "@/pages/customer/HistoryPage";
import AddressPage from "@/pages/customer/AddressPage";
import SettingPage from "@/pages/customer/SettingPage";

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";

import TechnicianDashboard from "@/pages/technician/TechnicianDashboard";
import CashierDashboard from "@/pages/cashier/CashierDashboard";

import UnauthorizedPage from "@/pages/shared/UnauthorizedPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRedirect from "./RoleRedirect";
import FallbackRedirect from "./FallbackRedirect";
import PublicOnlyRoute from "./PublicOnlyRoute";
import AuthRedirectRoute from "./AuthRedirectRoute";

import { ROLES } from "@/constants/roles";

import ScrollToTop from "@/components/public/ScrollToTop";

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC & CUSTOMER */}
        <Route element={<AuthRedirectRoute />}>
          <Route element={<PublicLayout />}>
            {/* PUBLIC */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* CUSTOMER ONLY */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile/history" element={<HistoryPage />} />
              <Route path="/profile/address" element={<AddressPage />} />
              <Route path="/profile/settings" element={<SettingPage />} />
            </Route>
          </Route>
        </Route>

        {/* ROLE REDIRECT */}
        <Route path="/redirect" element={<RoleRedirect />} />

        {/* GUEST ONLY */}
        <Route element={<PublicOnlyRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Route>

        {/* ADMIN ONLY */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/overview" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminDashboard />} />
            <Route
              path="/admin/products/categories"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/products/reviews"
              element={<AdminDashboard />}
            />
            <Route path="/admin/inventory" element={<AdminDashboard />} />
            <Route
              path="/admin/inventory/serial-numbers"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/inventory/movements"
              element={<AdminDashboard />}
            />
            <Route path="/admin/services" element={<AdminDashboard />} />
            <Route
              path="/admin/services/categories"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/services/bookings"
              element={<AdminDashboard />}
            />
            <Route
              path="/admin/services/reviews"
              element={<AdminDashboard />}
            />
            <Route path="/admin/sales" element={<AdminDashboard />} />
            <Route
              path="/admin/sales/transactions"
              element={<AdminDashboard />}
            />
            <Route path="/admin/staff/users" element={<AdminDashboard />} />
            <Route path="/admin/website/reviews" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* TECHNICIAN ONLY */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.TECHNICIAN]} />}>
          <Route
            path="/technician/dashboard"
            element={<TechnicianDashboard />}
          />
        </Route>

        {/* CASHIER ONLY */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.CASHIER]} />}>
          <Route path="/cashier/dashboard" element={<CashierDashboard />} />
        </Route>

        {/* MULTIPLE ROLES */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.CASHIER]} />
          }
        >
          <Route path="/reports" element={<div>Reports Page</div>} />
        </Route>

        {/* UNAUTHORIZED */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* FALLBACK */}
        <Route path="*" element={<FallbackRedirect />} />
      </Routes>
    </>
  );
}
