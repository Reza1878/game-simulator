import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADS,
  ROUTE_BAN_AMOUNT_PAGE,
  ROUTE_HEROES,
  ROUTE_HEROES_ROLE,
  ROUTE_ICONS,
  ROUTE_LOGOUT,
  ROUTE_MAP,
  ROUTE_PRICING_PAGE,
  ROUTE_SETTINGS,
  ROUTE_TEAM_PAGE,
  ROUTE_USER,
  ROUTE_USER_TIER,
} from "@/config/routes";
import React, { useMemo } from "react";
import {
  Award,
  Database,
  DollarSign,
  Home,
  Layers,
  LogOut,
  PlayCircle,
  Settings,
  User,
  Users,
  XCircle,
  Map,
  Server,
} from "react-feather";
import { useSelector } from "react-redux";
import { logo, mockAvatar } from "@/assets";
import NavItem from "@/components/navigation/NavItem";
import clsx from "clsx";
import { Text } from "../common";

function AdminSidebar({ open = false }) {
  const user = useSelector((state) => state.user);
  const routes = useMemo(() => {
    return [
      {
        title: "Dashboard",
        icon: <Home className="icon" />,
        href: ROUTE_ADMIN_DASHBOARD,
      },
      {
        title: "Pricings",
        icon: <DollarSign className="icon" />,
        href: ROUTE_PRICING_PAGE,
      },
      {
        title: "Ban Amount",
        icon: <XCircle className="icon" />,
        href: ROUTE_BAN_AMOUNT_PAGE,
      },
      {
        title: "Teams",
        icon: <Users className="icon" />,
        href: ROUTE_TEAM_PAGE,
      },
      {
        title: "Heroes Roles",
        icon: <Settings className="icon" />,
        href: ROUTE_HEROES_ROLE,
      },
      { title: "Heroes", icon: <Award className="icon" />, href: ROUTE_HEROES },
      {
        title: "User Tier",
        icon: <Layers className="icon" />,
        href: ROUTE_USER_TIER,
      },
      { title: "Users", icon: <User className="icon" />, href: ROUTE_USER },
      { title: "Map", icon: <Map className="icon" />, href: ROUTE_MAP },
      { title: "Ads", icon: <PlayCircle className="icon" />, href: ROUTE_ADS },
      {
        title: "Icons",
        icon: <Database className="icon" />,
        href: ROUTE_ICONS,
      },
      {
        title: "Settings",
        icon: <Server className="icon" />,
        href: ROUTE_SETTINGS,
      },
      {
        title: "Logout",
        icon: <LogOut className="icon" />,
        href: ROUTE_LOGOUT,
      },
    ];
  }, []);
  return (
    <aside
      className={clsx(
        "bg-white h-full w-72 visible fixed z-10 overflow-hidden transition-all duration-300 overflow-y-auto lg:translate-x-0",
        [open && "w-72"],
        [!open && "-translate-x-80"]
      )}
    >
      <div className="flex justify-center items-center py-10 border-b border-b-gray-100">
        <div className="bg-primary p-2 rounded-md">
          <img src={logo} className="w-[200px] h-[168px]" />
        </div>
      </div>
      <div className="flex pl-6 items-center py-6">
        <img
          src={mockAvatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <Text className="font-medium ml-2">{user.name}</Text>
      </div>

      <ul>
        {routes.map((item, index) => (
          <li key={index} className="flex items-center relative">
            <NavItem
              href={item.href}
              icon={item.icon}
              title={item.title}
              children={item.children}
              permission={item.permission}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AdminSidebar;
