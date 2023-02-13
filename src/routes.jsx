import React, { Suspense } from "react";
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

const Home = React.lazy(() => import("./pages/Home"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Suggestions = React.lazy(() => import("./pages/Suggestions"));
const BanAmountCreatePage = React.lazy(() =>
  import("./pages/admin/ban-amount/BanAmountCreatePage")
);
const BanAmountListPage = React.lazy(() =>
  import("./pages/admin/ban-amount/BanAmountListPage")
);
const BanAmountUpdatePage = React.lazy(() =>
  import("./pages/admin/ban-amount/BanAmountUpdatePage")
);
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const HeroesCreatePage = React.lazy(() =>
  import("./pages/admin/heroes/HeroesCreatePage")
);
const HeroesDetailPage = React.lazy(() =>
  import("./pages/admin/heroes/HeroesDetailPage")
);
const HeroesUpdatePage = React.lazy(() =>
  import("./pages/admin/heroes/HeroesUpdatePage")
);
const HeroesListPage = React.lazy(() =>
  import("./pages/admin/heroes/HeroesListPage")
);
const PricingCreatePage = React.lazy(() =>
  import("./pages/admin/pricing/PricingCreatePage")
);
const PricingUpdatePage = React.lazy(() =>
  import("./pages/admin/pricing/PricingUpdatePage")
);
const PricingListPage = React.lazy(() =>
  import("./pages/admin/pricing/PricingListPage")
);
const TeamCreatePage = React.lazy(() =>
  import("./pages/admin/team/TeamCreatePage")
);
const TeamUpdatePage = React.lazy(() =>
  import("./pages/admin/team/TeamUpdatePage")
);
const TeamListPage = React.lazy(() =>
  import("./pages/admin/team/TeamListPage")
);
const UserListPage = React.lazy(() =>
  import("./pages/admin/user/UserListPage")
);
const UserTierCreatePage = React.lazy(() =>
  import("./pages/admin/user-tier/UserTierCreatePage")
);
const UserTierUpdatePage = React.lazy(() =>
  import("./pages/admin/user-tier/UserTierUpdatePage")
);
const UserTierListPage = React.lazy(() =>
  import("./pages/admin/user-tier/UserTierListPage")
);
const IconsCreatePage = React.lazy(() =>
  import("./pages/admin/icons/IconsCreatePage")
);
const IconsDetailPage = React.lazy(() =>
  import("./pages/admin/icons/IconsDetailPage")
);
const IconsUpdatePage = React.lazy(() =>
  import("./pages/admin/icons/IconsUpdatePage")
);
const IconsListPage = React.lazy(() =>
  import("./pages/admin/icons/IconsListPage")
);
const AdsCreatePage = React.lazy(() =>
  import("./pages/admin/ads/AdsCreatePage")
);
const AdsUpdatePage = React.lazy(() =>
  import("./pages/admin/ads/AdsUpdatePage")
);
const AdsDetailPage = React.lazy(() =>
  import("./pages/admin/ads/AdsDetailPage")
);
const AdsListPage = React.lazy(() => import("./pages/admin/ads/AdsListPage"));
const SettingsItemPage = React.lazy(() =>
  import("./pages/admin/settings/SettingsItemPage")
);
const SettingsUpdatePage = React.lazy(() =>
  import("./pages/admin/settings/SettingUpdatePage")
);
const HeroesRoleCreatePage = React.lazy(() =>
  import("./pages/admin/heroes-role/HeroesRoleCreatePage")
);
const HeroesRoleUpdatePage = React.lazy(() =>
  import("./pages/admin/heroes-role/HeroesRoleUpdatePage")
);
const HeroesRoleListPage = React.lazy(() =>
  import("./pages/admin/heroes-role/HeroesRoleListPage")
);
const ResetPassword = React.lazy(() => import("./pages/auth/ResetPassword"));
const Logout = React.lazy(() => import("./pages/auth/Logout"));
const CancelPayment = React.lazy(() => import("./pages/payment/CancelPayment"));
const SuccessPayment = React.lazy(() =>
  import("./pages/payment/SuccessPayment")
);
const Simulator = React.lazy(() => import("./pages/simulator/Simulator"));
const SimulatorPortal = React.lazy(() =>
  import("./pages/simulator/SimulatorPortal")
);
const MapDetailPage = React.lazy(() =>
  import("./pages/admin/map/MapDetailPage")
);
const MapUpdatePage = React.lazy(() =>
  import("./pages/admin/map/MapUpdatePage")
);
const NotFound = React.lazy(() => import("./pages/NotFound"));
const MapDrawing = React.lazy(() => import("./pages/map-drawing/MapDrawing"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const Disclaimer = React.lazy(() => import("./pages/Disclaimer"));
const Eula = React.lazy(() => import("./pages/Eula"));
const TermsService = React.lazy(() => import("./pages/TermsService"));
const RefundPolicy = React.lazy(() => import("./pages/RefundPolicy"));

function ProtectedRoutes() {
  const role = useSelector((state) => state.user.role);
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (role === "admin") {
    return (
      <AdminLayout>
        <Suspense>
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
            <Route
              path={ROUTE_BAN_AMOUNT_PAGE}
              element={<BanAmountListPage />}
            />
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
            <Route
              path={`${ROUTE_HEROES}/:id`}
              element={<HeroesDetailPage />}
            />
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
            <Route
              path={`${ROUTE_ICONS}/create`}
              element={<IconsCreatePage />}
            />
            <Route path={`${ROUTE_ICONS}/:id`} element={<IconsDetailPage />} />
            <Route
              path={`${ROUTE_ICONS}/:id/edit`}
              element={<IconsUpdatePage />}
            />
            <Route path={ROUTE_SETTINGS} element={<SettingsItemPage />} />
            <Route
              path={`${ROUTE_SETTINGS}/edit`}
              element={<SettingsUpdatePage />}
            />
            <Route path={ROUTE_LOGOUT} element={<Logout />} />
          </Routes>
        </Suspense>
      </AdminLayout>
    );
  }
  return (
    <GuestLayout>
      <Suspense>
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
      </Suspense>
    </GuestLayout>
  );
}

export default ProtectedRoutes;
