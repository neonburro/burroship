// src/components/Layout/Container.jsx
import { forwardRef } from "react";

const SIZES = {
  reading: "max-w-[720px]",
  default: "max-w-[1200px]",
  wide: "max-w-[1440px]",
};

const Container = forwardRef(function Container(
  { children, size = "default", className = "", as: As = "div", ...rest },
  ref
) {
  return (
    <As
      ref={ref}
      className={
        "mx-auto w-full px-6 md:px-10 lg:px-14 " +
        SIZES[size] +
        (className ? " " + className : "")
      }
      {...rest}
    >
      {children}
    </As>
  );
});

export default Container;