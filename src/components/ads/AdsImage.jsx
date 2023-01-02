import clsx from "clsx";
import React from "react";

function AdsImage({ ratio, url, className = "" }) {
  return (
    <img
      src={`${import.meta.env.VITE_BASE_URL}/${url}`}
      className={clsx(
        "object-cover",
        { "w-28 h-28": ratio === "1 / 1" },
        { "w-96 h-28": ratio !== "1 / 1" },
        className
      )}
    />
  );
}

export default AdsImage;
