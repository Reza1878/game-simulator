import React from "react";
import * as t from "prop-types";
import clsx from "clsx";

function Button({
  children,
  className,
  variant,
  color,
  type,
  onClick,
  isLoading,
  ...otherProps
}) {
  const variantClassName = {
    filled: {
      primary: "bg-primary opacity-90 text-white hover:opacity-100",
      danger: "bg-red-500 text-white hover:bg-red-600",
    },
    outlined: {
      primary:
        "border border-primary bg-white hover:bg-primary-100 text-primary",
      danger: "border border-red-500 bg-white hover:bg-red-100 text-red-500",
    },
    link: {
      primary: "text-primary hover:decoration-primary hover:underline",
      danger: "text-red-500 hover:decoration-red-500 hover:underline",
    },
  };

  return (
    <button
      type={type}
      className={clsx(
        "block py-2 px-6 transition-all rounded-md font-medium",
        isLoading
          ? "bg-gray-400 pointer-events-none text-white opacity-70"
          : variantClassName[variant][color] ??
              variantClassName["filled"]["primary"],
        className
      )}
      {...otherProps}
      onClick={onClick}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

Button.propTypes = {
  children: t.node,
  className: t.string,
  variant: t.oneOf(["filled", "outlined", "link"]).isRequired,
  color: t.oneOf(["primary", "danger"]).isRequired,
  type: t.string,
  onClick: t.func,
  isLoading: t.bool,
};

Button.defaultProps = {
  variant: "filled",
  color: "primary",
  type: "button",
  onClick: () => {},
  isLoading: false,
};

export default Button;
