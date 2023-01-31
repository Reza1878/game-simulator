import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./GuestNavItem.module.css";

function GuestNavItem({
  links = [],
  title,
  href,
  id,
  lastItem = false,
  setActive = (val) => {},
  active,
}) {
  // const [open, setOpen] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <li
      key={id}
      className={clsx(
        "font-poppins font-normal cursor-pointer text-[16px] relative",
        { "text-white": active === title },
        { "text-dimWhite": active !== title },
        { "mr-10": !lastItem },
        styles["nav-item"]
      )}
      onClick={() => {
        if (!links.length) {
          setActive(nav.title);
          return;
        }
        // setOpen(!open);
      }}
    >
      {links.length === 0 && <Link to={href}>{title}</Link>}
      {links.length > 0 && (
        <>
          <p>{title}</p>
          <div
            className={clsx(
              "p-6 bg-black-gradient absolute left-0 rounded-xl sidebar z-10 min-w-[140px]",
              // { hidden: !open },
              // { flex: open }
              styles["sidebar"]
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
                    {!link.outerLink && (
                      <Link to={link.href}>{link.title}</Link>
                    )}
                    {link.outerLink && (
                      <button
                        onClick={() => (window.location = link.outerLink)}
                      >
                        {link.title}
                      </button>
                    )}
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
