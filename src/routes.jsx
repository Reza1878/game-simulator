import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AdminLayout, GuestLayout } from "./components/layout";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_BAN_AMOUNT_PAGE,
  ROUTE_HEROES,
  ROUTE_HEROES_ROLE,
  ROUTE_LOGOUT,
  ROUTE_PRICING_PAGE,
  ROUTE_TEAM_PAGE,
} from "./config/routes";
import { Home } from "./pages";
import {
  BanAmountCreatePage,
  BanAmountListPage,
  BanAmountUpdatePage,
  Dashboard,
  HeroesCreatePage,
  HeroesDetailPage,
  HeroesListPage,
  HeroesUpdatePage,
  PricingCreatePage,
  PricingListPage,
  PricingUpdatePage,
  TeamCreatePage,
  TeamListPage,
  TeamUpdatePage,
} from "./pages/admin";
import {
  HeroesRoleCreatePage,
  HeroesRoleListPage,
  HeroesRoleUpdatePage,
} from "./pages/admin/heroes-role";
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
          <Route path={ROUTE_BAN_AMOUNT_PAGE} element={<BanAmountListPage />} />
          <Route
            path={`${ROUTE_BAN_AMOUNT_PAGE}/create`}
            element={<BanAmountCreatePage />}
          />
          <Route
            path={`${ROUTE_BAN_AMOUNT_PAGE}/:id/edit`}
            element={<BanAmountUpdatePage />}
          />
          <Route path={ROUTE_TEAM_PAGE} element={<TeamListPage />} />
          <Route
            path={`${ROUTE_TEAM_PAGE}/create`}
            element={<TeamCreatePage />}
          />
          <Route
            path={`${ROUTE_TEAM_PAGE}/:id/edit`}
            element={<TeamUpdatePage />}
          />
          <Route path={ROUTE_HEROES_ROLE} element={<HeroesRoleListPage />} />
          <Route
            path={`${ROUTE_HEROES_ROLE}/create`}
            element={<HeroesRoleCreatePage />}
          />
          <Route
            path={`${ROUTE_HEROES_ROLE}/:id/edit`}
            element={<HeroesRoleUpdatePage />}
          />
          <Route path={ROUTE_HEROES} element={<HeroesListPage />} />
          <Route
            path={`${ROUTE_HEROES}/create`}
            element={<HeroesCreatePage />}
          />
          <Route
            path={`${ROUTE_HEROES}/:id/edit`}
            element={<HeroesUpdatePage />}
          />
          <Route path={`${ROUTE_HEROES}/:id`} element={<HeroesDetailPage />} />
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
