// src/components/Layout/Container.jsx
import { forwardRef } from "react";

const SIZES = {
  reading: "max-w-[720px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]",
  full: "max-w-[99%]",
};

const Container = forwardRef(function Container(
  { children, size = "default", className = "", as: As = "div", ...rest },
  ref
) {
  const pad = size === "full" ? "px-4 md:px-0" : "px-6 md:px-10 lg:px-14";
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
