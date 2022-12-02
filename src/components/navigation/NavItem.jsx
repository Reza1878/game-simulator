import clsx from "clsx";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

import { NavLink } from "react-router-dom";

import { Text } from "../common";

function NavItem({ href, children = [], icon, title, permission = [] }) {
  const [open, setOpen] = useState(false);

  if (!children.length) {
    return (
      <NavLink className={clsx("nav-item", "w-full")} to={href}>
        <div className="flex w-full overflow-hidden py-3 px-6 nav-item">
          <span
            className={clsx(
              "absolute bg-primary inset-y-0 w-1 left-0 rounded-r-lg nav-item-band"
            )}
          />
          {icon}
          <Text className={clsx("ml-2 title")}>{title}</Text>
        </div>
      </NavLink>
    );
  }

  return (
    <div className="w-full">
      <button
        className={"nav-item w-full flex justify-end items-center relative"}
        onClick={() => setOpen(!open)}
      >
        <div className="flex w-full overflow-hidden py-4 px-6 nav-item">
          <span
            className={clsx(
              "absolute bg-primary-500 inset-y-0 w-1 left-0 rounded-r-lg nav-item-band"
            )}
          />
          {icon}
          <Text className={clsx("ml-2 title")}>{title}</Text>
        </div>
        {!open ? (
          <ChevronDown className="mr-4" />
        ) : (
          <ChevronUp className="mr-4" />
        )}
      </button>
      {open && (
        <div className="flex flex-col gap-2">
          {children.map((item, index) => (
            <NavLink key={index} to={item.href} className="w-full pl-12">
              {item.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavItem;
