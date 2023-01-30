import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function GuestNavItem({
  links = [],
  title,
  href,
  id,
  lastItem = false,
  setActive = (val) => {},
  active,
}) {
  const [open, setOpen] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <li
      key={id}
      className={`font-poppins font-normal cursor-pointer text-[16px] relative ${
        active === title ? "text-white" : "text-dimWhite"
      } ${lastItem ? "mr-0" : "mr-10"}`}
      onClick={() => {
        if (!links.length) {
          setActive(nav.title);
          return;
        }
        setOpen(!open);
      }}
    >
      {links.length === 0 && <Link to={href}>{title}</Link>}
      {links.length > 0 && (
        <>
          <p>{title}</p>
          <div
            className={clsx(
              "p-6 bg-black-gradient absolute top-8 left-0 my-2 rounded-xl sidebar z-10 min-w-[140px]",
              { hidden: !open },
              { flex: open }
            )}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {links.map((link) => {
                if (link.protected) {
                  if (!accessToken) {
                    return null;
                  }
                }
                return (
                  <li
                    key={link.href}
                    className="font-poppins font-medium cursor-pointer text-base mb-4 text-dimWhite hover:text-white"
                  >
                    <Link to={link.href}>{link.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </li>
  );
}

export default GuestNavItem;
