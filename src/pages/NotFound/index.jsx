// src/pages/NotFound/index.jsx
//
// 404. The route used to fall through to Home, which is a soft 404, the worst of both
// worlds. A visitor thinks the link worked and a crawler indexes a duplicate home page
// under every wrong url it ever tries. This is a real dead end that says so.
//
// The art is the ship leaving without you, which is the joke and also the honest feeling
// of a missing page. One image, one line, two ways back. Nothing clever, a 404 is not the
// place to be clever at somebody who is already lost.
//
// noIndex is deliberate. We want a crawler to drop this and every wrong url under it
// rather than keep them. Netlify serves the SPA shell with a 200 for every path, so this
// meta is the only honest signal we can send that the page is not real.

import { Link } from "react-router-dom";
import Head from "../../components/SEO/Head";

function NotFound() {
  return (
    <main id="main" className="px-3">
      <Head
        title="not found"
        description="That page is not aboard. The ship has moved on."
        path="/404/"
        noIndex
      />

      <section className="pt-[86px] pb-20 md:pb-28">
        <div
          className="mx-auto w-[99.5%] md:w-[97%] overflow-hidden"
          style={{
            background: "var(--color-surface)",
            borderRadius: "26px",
            border: "1px solid var(--color-line)",
            boxShadow: "0 14px 40px rgba(24, 36, 56, 0.13)",
          }}
        >
          <div className="relative">
            <img
              src="/404/left-behind.webp"
              alt="a burro sitting at the mouth of a cave watching the ship fly off into the sunset without him"
              className="block w-full h-auto"
            />
            {/* Same eased scrim as the home deck, so the art falls into the surface with
                no seam. The rgb here IS --color-surface #DFE7F0, keep them equal. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0"
              style={{
                height: "34%",
                background:
                  "linear-gradient(to bottom," +
                  " rgba(223,231,240,0) 0%," +
                  " rgba(223,231,240,0.08) 22%," +
                  " rgba(223,231,240,0.26) 42%," +
                  " rgba(223,231,240,0.55) 60%," +
                  " rgba(223,231,240,0.82) 76%," +
                  " rgba(223,231,240,0.96) 89%," +
                  " #DFE7F0 100%)",
              }}
            />
          </div>

          <div className="w-full max-w-[600px] mx-auto text-center px-5 pb-14 md:pb-16">
            <div className="flex items-center justify-center gap-2.5 mb-6">
              <span className="beacon-dot sm" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">404 · no such page</span>
            </div>

            <h1 className="text-display-xl text-ink lowercase mb-4">it left without you.</h1>
            <p className="text-lead lowercase mb-10" style={{ fontSize: "19px" }}>
              nothing is at that address. the ship holds station somewhere else and the log is still open.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/"
                className="text-mono-sm lowercase transition-all duration-200"
                style={{ padding: "13px 22px", borderRadius: "14px", background: "var(--color-accent)", color: "#FFFFFF", border: "1px solid var(--color-accent)" }}
              >
                back to the ship
              </Link>
              <Link
                to="/log/"
                className="text-mono-sm lowercase transition-colors duration-200"
                style={{ padding: "13px 22px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink)", background: "transparent" }}
              >
                read the log
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2.5">
              <span className="beacon-dot sm" aria-hidden="true" />
              <span className="text-mono-xs text-ink-faint lowercase">ridgway, colorado · 38.15° n</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
