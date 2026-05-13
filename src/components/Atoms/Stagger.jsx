// src/components/Atoms/Stagger.jsx
import { Children, cloneElement, isValidElement } from "react";
import Reveal from "./Reveal";
 
function Stagger({ children, initialDelay = 0, step = 0.08, className = "" }) {
  const items = Children.toArray(children);
 
  return (
    <div className={className}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child;
        return (
          <Reveal key={i} delay={initialDelay + i * step}>
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
 
export default Stagger;
