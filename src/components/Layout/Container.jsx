// src/components/Layout/Container.jsx
//
// Layout container. Width presets shared across the site.
// v1 · 2026-06-18 · full is 97% desktop and edge to edge mobile.
// bleed is true full width for the collage field.

import { forwardRef } from "react";

const SIZES = {
  reading: "max-w-[720px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]",
  full: "max-w-[97%]",
  bleed: "max-w-none",
};

const Container = forwardRef(function Container(
  { children, size = "default", className = "", as: As = "div", ...rest },
  ref
) {
  const pad =
    size === "full"
      ? "px-5 md:px-0"
      : size === "bleed"
      ? "px-0"
      : "px-6 md:px-10 lg:px-14";
  return (
    <As
      ref={ref}
      className={"mx-auto w-full " + pad + " " + SIZES[size] + (className ? " " + className : "")}
      {...rest}
    >
      {children}
    </As>
  );
});

export default Container;
