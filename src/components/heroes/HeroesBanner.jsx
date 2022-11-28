import clsx from "clsx";
import React from "react";

function HeroesBanner({ url, className = "" }) {
  return (
    <img
      src={`${import.meta.env.VITE_BASE_URL}/${url}`}
      alt="Hero banner"
      className={clsx("w-96 h-24 object-cover", className)}
    />
  );
}

export default HeroesBanner;
