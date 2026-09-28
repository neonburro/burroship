// src/pages/Home/sections/Gate.jsx
//
// The front of the ship is a door, and the door and the sky above it are ONE OBJECT.
//
// The banner used to be its own section with the gate floating below it, which left a
// band of dead ground between the picture and the writing and made the page read as two
// unrelated things stacked. Now both live inside a single rounded sheet at the house
// measure, 99.5 percent on mobile and 97 on desktop. The art holds the top, a scrim
// carries its bottom edge down into the surface colour so there is no seam to see, and
// the writing and the login sit in the same shape underneath. One border, one radius,
// one shadow, one object.
//
// BannerHero.jsx is retired from the home page by this and nothing imports it. If the
// banner ever needs to stand alone again it is still there.
//
// The scrim height and the surface colour have to agree or a hard line appears where the
// gradient ends. Both are set here, together, on purpose. Auth now runs through the shared session (useSession), so signing in
// here also flips the nav to your avatar, and signing out from the nav returns this
// card to the login. You sign in with a username, resolved to its email behind the
// scenes. On success the card becomes a short aboard state. Lowercase throughout, no
// oxford commas, no dashes. v3 · shared session.

import { useState } from "react";
import { Link } from "react-router-dom";
import { useSession, accountLabel } from "../../../lib/session";

function friendly(error) {
  if (error === "unknown") return "no bridge key by that name.";
  if (error === "tower") return "the bridge could not reach the tower. try again.";
  if (error === "warming up") return "the bridge is warming up. try again shortly.";
  const m = (error || "").toLowerCase();
  if (m.includes("invalid login")) return "that key does not fit.";
  if (m.includes("not confirmed")) return "this account is not confirmed yet.";
  if (m.includes("rate")) return "too many tries. wait a moment.";
  return "could not sign in. check the name and the key.";
}

function Gate() {
  const { user, profile, signInWithUsername, signOut } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");

  const aboard = !!user;
  const canSubmit = username.trim() && password.trim() && status !== "signing";
  const signing = status === "signing";
  const label = String(accountLabel(profile, user)).toLowerCase();

  async function submit() {
    if (!canSubmit) return;
    setStatus("signing");
    setNote("");
    const { error } = await signInWithUsername(username, password);
    if (error) {
      setNote(friendly(error));
      setPassword("");
      setStatus("idle");
      return;
    }
    setStatus("idle");
  }

  async function leave() {
    await signOut();
    setUsername("");
    setPassword("");
    setNote("");
    setShow(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") { e.preventDefault(); submit(); }
  }

  return (
    /* ── FULL BLEED, AND THE RAIL SITS INSIDE IT, 2026-09-28 ────────────────
       Tyler. "Make the hero and the navigation similar to neonburro. Full, with
       rounded corners at the bottom, no fade."

       This was a floating card. Ninety nine and a half percent wide, twenty six
       pixel radius on all four corners, a border, a drop shadow, and eighty six
       pixels of padding above it to clear a nav that was itself a floating card.
       Two cards and a gap.

       It is one sheet now. Edge to edge, square at the top where it meets the
       rail so the two read as one dark object, and the house corner on the
       bottom two only so the page below reads as a second object rather than as
       the rest of this one. Rounding all four would make it a card floating on a
       page again, which is the thing being undone.

       The clamp is neonburro's HERO_CORNER, the same value the studio hero and
       the academy bands carry. */
    <section className="pb-16 md:pb-24">
      <div
        className="w-full overflow-hidden"
        style={{
          background: "var(--color-surface)",
          borderBottomLeftRadius: "clamp(20px, 3.2vw, 48px)",
          borderBottomRightRadius: "clamp(20px, 3.2vw, 48px)",
        }}
      >
        <div className="relative">
          <img
            src="/banners/airship-crown.webp"
            alt=""
            aria-hidden="true"
            className="block w-full h-auto"
          />
          {/* The fade is gone, 2026-09-28. Tyler asked for no fade or anything.

              There used to be a thirty four percent tall seven stop gradient
              here, easing the art down into #DFE7F0 so the picture and the page
              read as one sheet. It was careful work and it was solving a problem
              that no longer exists. A fade hides a seam between two objects. The
              hero is now one full bleed sheet with a rounded bottom edge, so the
              art simply ends where the sheet ends and there is no seam to hide.

              If a fade ever comes back it means the shape regressed to a card. */}
        </div>

      <div className="w-full max-w-[600px] mx-auto text-center px-5 pb-14 md:pb-16" style={{ marginTop: "-2px" }}>
        <div className="flex items-center justify-center gap-2.5 mb-6 md:mb-8">
          <span className="beacon-dot sm pulse" aria-hidden="true" />
          <span className="text-mono text-ink-faint lowercase">the bridge</span>
        </div>

        <h1 className="text-display-xl text-ink lowercase mb-4">a floating incubator.</h1>
        <p className="text-lead lowercase mb-10" style={{ fontSize: "19px" }}>
          {aboard
            ? "you are aboard. the range is open, the rest is coming."
            : "something is being built above the range. sign in to see it."}
        </p>

        {aboard ? (
          <div
            className="rounded-3xl p-7 md:p-9 text-center"
            style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)" }}
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">on the bridge</span>
            </div>
            <div className="text-display-md text-ink lowercase mb-2">welcome aboard, {label}.</div>
            <p className="text-body text-ink-muted lowercase mb-8">
              the range is live below. shape your profile and connect a business from the bridge.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/world/"
                className="text-mono-sm lowercase transition-all duration-200"
                style={{ padding: "13px 22px", borderRadius: "14px", background: "var(--color-accent)", color: "#FFFFFF", border: "1px solid var(--color-accent)" }}
              >
                open the range
              </Link>
              <Link
                to="/bridge/"
                className="text-mono-sm lowercase transition-colors duration-200"
                style={{ padding: "13px 22px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink)", background: "transparent" }}
              >
                your bridge
              </Link>
              {profile?.is_admin && (
                <Link
                  to="/helm/"
                  className="text-mono-sm lowercase transition-colors duration-200"
                  style={{ padding: "13px 22px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink)", background: "transparent" }}
                >
                  the helm
                </Link>
              )}
            </div>
            <button
              onClick={leave}
              type="button"
              className="text-mono-xs lowercase transition-colors duration-200 mt-6 text-ink-faint hover:text-ink"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              leave the bridge
            </button>
          </div>
        ) : (
          <div
            className="rounded-3xl p-7 md:p-9 text-left"
            style={{ background: "var(--color-surface-raised)", border: "1px solid var(--color-line)" }}
          >
            <div className="flex flex-col gap-3">
              <Field>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="username"
                  aria-label="username"
                  spellCheck="false"
                  autoComplete="username"
                  style={inputStyle}
                />
              </Field>

              <Field>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="password"
                  aria-label="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  style={inputStyle}
                />
                <button
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "hide password" : "show password"}
                  className="text-ink-faint hover:text-ink transition-colors duration-200"
                  style={{ cursor: "pointer", background: "transparent", border: "none", padding: 4, flexShrink: 0 }}
                  type="button"
                >
                  {show ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.2M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.2-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
                  )}
                </button>
              </Field>

              <button
                onClick={submit}
                disabled={!canSubmit}
                className="text-mono-sm transition-all duration-200 mt-2 lowercase"
                style={{
                  padding: "14px 18px",
                  borderRadius: "14px",
                  background: canSubmit ? "var(--color-accent)" : "var(--color-surface-raised)",
                  color: canSubmit ? "#FFFFFF" : "var(--color-ink-faint)",
                  border: canSubmit ? "1px solid var(--color-accent)" : "1px solid var(--color-line)",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
                type="button"
              >
                {signing ? "opening" : "enter the bridge"}
              </button>

              <div className="min-h-[1.4em] mt-1 text-center">
                {note && <p className="text-body-sm lowercase" style={{ color: "var(--color-accent-deep)" }} role="status">{note}</p>}
              </div>

              <div className="flex items-center justify-center gap-4 text-mono-xs lowercase pt-1">
                <button
                  type="button"
                  onClick={() => setNote("password recovery opens when the bridge does.")}
                  className="text-ink-faint hover:text-ink transition-colors duration-200"
                  style={{ background: "transparent", border: "none", cursor: "pointer" }}
                >
                  forgot password
                </button>
                <span aria-hidden="true" className="text-ink-faint">·</span>
                <Link to="/contact/" className="text-ink-faint hover:text-ink transition-colors duration-200">
                  request access
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-7 flex items-center justify-center gap-2.5">
          <span className="beacon-dot sm" aria-hidden="true" />
          <span className="text-mono-xs text-ink-faint lowercase">ridgway, colorado · 38.15° n</span>
        </div>
      </div>
      </div>
    </section>
  );
}

const inputStyle = {
  flex: 1,
  background: "transparent",
  outline: "none",
  border: "none",
  color: "var(--color-ink)",
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
};

function Field({ children }) {
  return (
    <div
      className="flex items-center gap-3"
      style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "14px", padding: "14px 16px" }}
    >
      {children}
    </div>
  );
}

export default Gate;
