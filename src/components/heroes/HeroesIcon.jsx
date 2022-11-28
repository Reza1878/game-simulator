import clsx from "clsx";
import React from "react";

function HeroesIcon({ url, className = "" }) {
  return (
    <img
      src={`${import.meta.env.VITE_BASE_URL}/${url}`}
      alt="Hero icon"
      className={clsx("w-12 h-12 rounded-full object-cover", className)}
    />
  );
}

export default HeroesIcon;
