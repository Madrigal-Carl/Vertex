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

import AdminDashboard from "@/pages/admin/AdminDashboard";
import TechnicianDashboard from "@/pages/technician/TechnicianDashboard";
import CashierDashboard from "@/pages/cashier/CashierDashboard";

import UnauthorizedPage from "@/pages/shared/UnauthorizedPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRedirect from "./RoleRedirect";
import FallbackRedirect from "./FallbackRedirect";
import PublicOnlyRoute from "./PublicOnlyRoute";

import { ROLES } from "@/constants/roles";

import ScrollToTop from "@/components/public/ScrollToTop";

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>

        {/* ROLE REDIRECT */}
        <Route path="/redirect" element={<RoleRedirect />} />

        {/* GUEST ONLY */}
        <Route element={<PublicOnlyRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Route>

        {/* CUSTOMER ONLY */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route element={<PublicLayout />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile/history" element={<HistoryPage />} />
            <Route path="/profile/address" element={<CheckoutPage />} />
            <Route path="/profile/settings" element={<CheckoutPage />} />
          </Route>
        </Route>

        {/* ADMIN ONLY */}
        <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
