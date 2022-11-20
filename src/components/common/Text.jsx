import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

function Text({ children, bold, className, variant }) {
  const arrClassName = [];
  if (bold) {
    arrClassName.push("font-bold");
  }

  switch (variant) {
    case "h1":
      arrClassName.push("text-2xl");
      break;
    case "h2":
      arrClassName.push("text-xl");
      break;
    case "h3":
      arrClassName.push("text-lg");
      break;
    case "p":
      arrClassName.push("text-[16px]");
      break;
    default:
      arrClassName.push("text-[16px]");
      break;
  }

  return (
    <p className={clsx("font-poppins", arrClassName, className)}>{children}</p>
  );
}

Text.propTypes = {
  children: PropTypes.node,
  bold: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["h1", "h2", "h3", "p"]),
};

export default Text;
