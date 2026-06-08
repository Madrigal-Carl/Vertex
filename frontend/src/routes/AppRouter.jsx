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
import Overview from "@/pages/admin/Overview";
import Products from "@/pages/admin/Products";
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
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="overview" element={<Overview />} />
            <Route path="orders" element={<AdminDashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/categories" element={<AdminDashboard />} />
            <Route path="products/reviews" element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminDashboard />} />
            <Route
              path="inventory/serial-numbers"
              element={<AdminDashboard />}
            />
            <Route path="inventory/movements" element={<AdminDashboard />} />
            <Route path="services" element={<AdminDashboard />} />
            <Route path="services/categories" element={<AdminDashboard />} />
            <Route path="services/bookings" element={<AdminDashboard />} />
            <Route path="services/reviews" element={<AdminDashboard />} />
            <Route path="sales" element={<AdminDashboard />} />
            <Route path="sales/transactions" element={<AdminDashboard />} />
            <Route path="staff/users" element={<AdminDashboard />} />
            <Route path="website/reviews" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
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
