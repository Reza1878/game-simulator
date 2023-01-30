import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AdminLayout, GuestLayout } from "./components/layout";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADS,
  ROUTE_BAN_AMOUNT_PAGE,
  ROUTE_DISCLAIMER,
  ROUTE_EULA,
  ROUTE_HEROES,
  ROUTE_HEROES_ROLE,
  ROUTE_ICONS,
  ROUTE_LOGOUT,
  ROUTE_MAP,
  ROUTE_PRICING_PAGE,
  ROUTE_PRIVACY,
  ROUTE_REFUND_POLICY,
  ROUTE_SETTINGS,
  ROUTE_TEAM_PAGE,
  ROUTE_TERMS_AND_SERVICE,
  ROUTE_USER,
  ROUTE_USER_TIER,
} from "./config/routes";
import { Home, Pricing, Suggestions } from "./pages";
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
  UserListPage,
  UserTierCreatePage,
  UserTierListPage,
  UserTierUpdatePage,
  IconsCreatePage,
  IconsDetailPage,
  IconsListPage,
  IconsUpdatePage,
  AdsCreatePage,
  AdsDetailPage,
  AdsListPage,
  AdsUpdatePage,
  SettingsItemPage,
  SettingUpdatePage,
} from "./pages/admin";
import {
  HeroesRoleCreatePage,
  HeroesRoleListPage,
  HeroesRoleUpdatePage,
} from "./pages/admin/heroes-role";
import { ResetPassword } from "./pages/auth";
import Logout from "./pages/auth/Logout";
import { CancelPayment, SuccessPayment } from "./pages/payment";
import { Simulator, SimulatorPortal } from "./pages/simulator";
import { MapDetailPage, MapUpdatePage } from "./pages/admin/map";
import NotFound from "./pages/NotFound";
import { MapDrawing } from "./pages/map-drawing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import Eula from "./pages/Eula";
import TermsService from "./pages/TermsService";
import RefundPolicy from "./pages/RefundPolicy";

function ProtectedRoutes() {
  const role = useSelector((state) => state.user.role);
  const accessToken = useSelector((state) => state.auth.accessToken);

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
          <Route path={ROUTE_USER_TIER} element={<UserTierListPage />} />
          <Route
            path={`${ROUTE_USER_TIER}/create`}
            element={<UserTierCreatePage />}
          />
          <Route
            path={`${ROUTE_USER_TIER}/:id/edit`}
            element={<UserTierUpdatePage />}
          />
          <Route path={ROUTE_MAP} element={<MapDetailPage />} />
          <Route path={`${ROUTE_MAP}/edit`} element={<MapUpdatePage />} />
          <Route path={`${ROUTE_USER}`} element={<UserListPage />} />

          <Route path={ROUTE_ADS} element={<AdsListPage />} />
          <Route path={`${ROUTE_ADS}/create`} element={<AdsCreatePage />} />
          <Route path={`${ROUTE_ADS}/:id`} element={<AdsDetailPage />} />
          <Route path={`${ROUTE_ADS}/:id/edit`} element={<AdsUpdatePage />} />

          <Route path={ROUTE_ICONS} element={<IconsListPage />} />
          <Route path={`${ROUTE_ICONS}/create`} element={<IconsCreatePage />} />
          <Route path={`${ROUTE_ICONS}/:id`} element={<IconsDetailPage />} />
          <Route
            path={`${ROUTE_ICONS}/:id/edit`}
            element={<IconsUpdatePage />}
          />
          <Route path={ROUTE_SETTINGS} element={<SettingsItemPage />} />
          <Route
            path={`${ROUTE_SETTINGS}/edit`}
            element={<SettingUpdatePage />}
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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/cancel-payment" element={<CancelPayment />} />
        <Route path="/payment-success" element={<SuccessPayment />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/simulator" element={<SimulatorPortal />} />
        <Route path="/simulator/start" element={<Simulator />} />
        {accessToken && (
          <>
            <Route path="/map-drawing" element={<MapDrawing />} />
            <Route path="/suggestions" element={<Suggestions />} />
          </>
        )}
        <Route path={ROUTE_PRIVACY} element={<PrivacyPolicy />} />
        <Route path={ROUTE_DISCLAIMER} element={<Disclaimer />} />
        <Route path={ROUTE_EULA} element={<Eula />} />
        <Route path={ROUTE_TERMS_AND_SERVICE} element={<TermsService />} />
        <Route path={ROUTE_REFUND_POLICY} element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GuestLayout>
  );
}

export default ProtectedRoutes;
