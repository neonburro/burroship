// src/pages/CommandCenter/index.jsx
//
// Route entry. The map is for signed-in people only now: we check the shared session
// first and only lazy-load the heavy Mapbox bundle once we know someone is aboard.
// The /world/ page has no chrome, so the locked state carries its own way home. The
// nb keystroke still opens /world/, it just lands on the locked state until you sign
// in from the home page.

import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import { useSession } from "../../lib/session";

const CommandCenter = lazy(() => import("./CommandCenter"));

function CommandCenterRoute() {
  const { user, loading } = useSession();

  if (loading) return <LoadingFallback />;
  if (!user) return <Locked />;

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
        <span className="beacon-dot sm pulse" aria-hidden="true" />
        <span className="text-mono" style={{ color: "var(--color-dark-accent)" }}>
          Booting the vessel
        </span>
      </div>
    </div>
  );
}

function Locked() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ background: "var(--color-dark-bg)" }}
    >
      <div className="text-center" style={{ maxWidth: "420px" }}>
        <div className="flex items-center justify-center gap-2.5 mb-5">
          <span className="beacon-dot sm pulse" aria-hidden="true" />
          <span className="text-mono lowercase" style={{ color: "var(--color-dark-accent)" }}>the map</span>
        </div>
        <p className="text-lead lowercase mb-8" style={{ color: "var(--color-dark-ink-muted)" }}>
          the map is for those aboard. sign in from the home page to fly it.
        </p>
        <Link
          to="/"
          className="inline-block text-mono-sm lowercase transition-colors duration-200"
          style={{ color: "var(--color-dark-ink)", padding: "12px 24px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          back to the range
        </Link>
      </div>
    </div>
  );
}

export default CommandCenterRoute;
