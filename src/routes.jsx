import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AdminLayout, GuestLayout } from "./components/layout";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_LOGOUT,
  ROUTE_PRICING_PAGE,
} from "./config/routes";
import { Home } from "./pages";
import {
  Dashboard,
  PricingCreatePage,
  PricingListPage,
  PricingUpdatePage,
} from "./pages/admin";
import Logout from "./pages/auth/Logout";
import { CancelPayment, SuccessPayment } from "./pages/payment";

function ProtectedRoutes() {
  const role = useSelector((state) => state.user.role);
  if (role === "admin") {
    return (
      <AdminLayout>
        <Routes>
          <Route path={ROUTE_ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTE_PRICING_PAGE} element={<PricingListPage />} />
          <Route
            path={`${ROUTE_PRICING_PAGE}/create`}
            element={<PricingCreatePage />}
          />
          <Route
            path={`${ROUTE_PRICING_PAGE}/:id/edit`}
            element={<PricingUpdatePage />}
          />
          <Route path={ROUTE_LOGOUT} element={<Logout />} />
        </Routes>
      </AdminLayout>
    );
  }
  return (
    <GuestLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cancel-payment" element={<CancelPayment />} />
        <Route path="/payment-success" element={<SuccessPayment />} />
      </Routes>
    </GuestLayout>
  );
}

export default ProtectedRoutes;
