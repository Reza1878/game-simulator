import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_BAN_AMOUNT_PAGE,
  ROUTE_LOGOUT,
  ROUTE_PRICING_PAGE,
} from "@/config/routes";
import React, { useMemo } from "react";
import { DollarSign, Home, LogOut, XCircle } from "react-feather";
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
        title: "Logout",
        icon: <LogOut className="icon" />,
        href: ROUTE_LOGOUT,
      },
    ];
  }, []);
  return (
    <aside
      className={clsx(
        "bg-white h-full lg:w-72 visible fixed z-10 overflow-hidden transition-all duration-300 overflow-y-auto",
        [open && "w-72"],
        [!open && "w-0"]
      )}
    >
      <div className="flex justify-center items-center py-10 border-b border-b-gray-100">
        <div className="bg-primary p-2 rounded-md">
          <img src={logo} className="w-[124px] h-[32px]" />
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
