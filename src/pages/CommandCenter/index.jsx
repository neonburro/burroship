// src/pages/CommandCenter/index.jsx
//
// Route entry. Mapbox is heavy. We lazy-load CommandCenter so it
// only downloads when the visitor actually navigates to /world/.
 
import { Suspense, lazy } from "react";
 
const CommandCenter = lazy(() => import("./CommandCenter"));
 
function CommandCenterRoute() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CommandCenter />
    </Suspense>
  );
}
 
function LoadingFallback() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "var(--color-dark-bg)" }}
    >
      <div className="flex items-center gap-3">
        <span className="beacon-dot sm pulse on-dark" aria-hidden="true" />
        <span
          className="text-mono"
          style={{ color: "var(--color-dark-accent)" }}
        >
          Booting the vessel
        </span>
      </div>
    </div>
  );
}
 
export default CommandCenterRoute;
