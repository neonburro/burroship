// src/components/Layout/LoginPanel.jsx
//
// The access panel. Slides in from the right on every breakpoint, so it is the mobile
// login surface and the account surface both. Signed out it shows the page links and
// a real login (username plus password, resolved through the shared session, same as
// the gate) so mobile can actually sign in. Signed in it shows who you are and a way
// off the bridge. Lowercase copy, no oxford commas, no dashes.
// v3 · real auth plus account view.

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSession, accountLabel, accountInitial } from "../../lib/session";

const LINKS = [
  { to: "/", label: "home" },
  { to: "/build/", label: "build" },
  { to: "/deploy/", label: "deploy" },
  { to: "/automate/", label: "automate" },
  { to: "/rewards/", label: "rewards" },
];

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

function LoginPanel({ open, onClose }) {
  const { user, profile, signInWithUsername, signOut } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");
  const firstFieldRef = useRef(null);
  const location = useLocation();

  const aboard = !!user;

  useEffect(() => {
    if (open && !aboard && firstFieldRef.current) {
      const t = setTimeout(() => firstFieldRef.current.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [open, aboard]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit() {
    if (!username.trim() || !password.trim() || status === "signing") return;
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
    setUsername("");
    setPassword("");
    setShow(false);
  }

  async function leave() {
    await signOut();
    setNote("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter") { e.preventDefault(); submit(); }
  }

  const canSubmit = username.trim() && password.trim() && status !== "signing";
  const label = String(accountLabel(profile, user)).toLowerCase();

  return (
    <>
      <div aria-hidden="true" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(4,5,7,0.72)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.32s var(--ease-standard)" }} />

      <aside role="dialog" aria-modal="true" aria-label="access" style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 70, width: "min(420px, 100vw)", background: "var(--color-surface)", borderLeft: "1px solid var(--color-line-strong)", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.4s var(--ease-emphasis)", display: "flex", flexDirection: "column", padding: "clamp(24px, 5vw, 40px)", overflowY: "auto" }}>
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center gap-2.5">
            <span className="beacon-dot sm pulse" aria-hidden="true" />
            <span className="text-mono-xs text-ink-faint lowercase">{aboard ? "on the bridge" : "access"}</span>
          </div>
          <button onClick={onClose} aria-label="close" className="text-ink-faint hover:text-ink transition-colors duration-200" style={{ cursor: "pointer", background: "transparent", border: "none", padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <nav aria-label="pages" className="mb-9">
          {LINKS.map((link, i) => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} onClick={onClose} className="flex items-center justify-between group transition-colors duration-200" style={{ padding: "14px 0", borderTop: i === 0 ? "none" : "1px solid var(--color-line)", color: active ? "var(--color-accent)" : "var(--color-ink)" }}>
                <span className="text-display-sm lowercase group-hover:text-accent transition-colors duration-200">{link.label}</span>
                {active && <span className="beacon-dot sm" aria-hidden="true" />}
              </Link>
            );
          })}
        </nav>

        {aboard ? (
          <div style={{ borderTop: "1px solid var(--color-line)", paddingTop: "28px" }}>
            <div className="flex items-center gap-3 mb-6">
              <AvatarChip profile={profile} user={user} size={44} />
              <div>
                <div className="text-display-sm text-ink lowercase leading-tight">{label}</div>
                <div className="text-mono-xs text-ink-faint lowercase mt-1">aboard the bridge</div>
              </div>
            </div>
            <p className="text-body-sm text-ink-muted lowercase mb-6">shape your profile and connect a business from the bridge.</p>
            <Link to="/bridge/" onClick={onClose} className="block text-center text-mono-sm lowercase transition-all duration-200 mb-3" style={{ padding: "14px 18px", borderRadius: "999px", background: "var(--color-accent)", color: "#FFFFFF", border: "1px solid var(--color-accent)" }}>
              your bridge
            </Link>
            {profile?.is_admin && (
              <Link to="/helm/" onClick={onClose} className="block text-center text-mono-sm lowercase transition-colors duration-200 mb-3" style={{ padding: "14px 18px", borderRadius: "999px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink)", background: "transparent" }}>
                the helm
              </Link>
            )}
            <button onClick={leave} type="button" className="text-mono-sm lowercase transition-colors duration-200 w-full" style={{ padding: "14px 18px", borderRadius: "999px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)", background: "transparent", cursor: "pointer" }}>
              leave the bridge
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "28px" }}>
              <h2 className="text-display-md text-ink mb-2 lowercase">see what is building.</h2>
              <p className="text-body-sm text-ink-muted lowercase">sign in to the bridge.</p>
            </div>

            <div className="flex flex-col gap-3">
              <Field>
                <input ref={firstFieldRef} value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={onKeyDown} placeholder="username" aria-label="username" spellCheck="false" autoComplete="username" style={fieldInputStyle} />
              </Field>

              <Field>
                <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onKeyDown} placeholder="password" aria-label="password" type={show ? "text" : "password"} autoComplete="current-password" style={fieldInputStyle} />
                <button onClick={() => setShow((s) => !s)} aria-label={show ? "hide password" : "show password"} className="text-ink-faint hover:text-ink transition-colors duration-200" style={{ cursor: "pointer", background: "transparent", border: "none", padding: 4, flexShrink: 0 }} type="button">
                  {show ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.2M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.2-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
                  )}
                </button>
              </Field>

              <button onClick={submit} disabled={!canSubmit} className="text-mono-sm transition-all duration-200 mt-2 lowercase" style={{ padding: "14px 18px", borderRadius: "999px", background: canSubmit ? "var(--color-accent)" : "var(--color-surface-raised)", color: canSubmit ? "#FFFFFF" : "var(--color-ink-faint)", border: canSubmit ? "1px solid var(--color-accent)" : "1px solid var(--color-line)", cursor: canSubmit ? "pointer" : "not-allowed" }} type="button">
                {status === "signing" ? "opening" : "sign in"}
              </button>

              <div className="min-h-[1.4em] mt-1">
                {note && <p className="text-body-sm lowercase" style={{ color: "var(--color-accent-deep)" }} role="status">{note}</p>}
              </div>

              <Link to="/contact/" onClick={onClose} className="text-mono-xs text-ink-faint hover:text-ink transition-colors duration-200 lowercase text-center pt-1">
                request access
              </Link>
            </div>
          </>
        )}

        <div className="mt-auto pt-8">
          <div className="flex items-center gap-2.5" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "20px" }}>
            <span className="beacon-dot sm" aria-hidden="true" />
            <span className="text-mono-xs text-ink-faint lowercase">ridgway, colorado · 38.15° n</span>
          </div>
        </div>
      </aside>
    </>
  );
}

/* Small avatar chip. Uses the profile image when there is one, else a lettered disc
 * in the accent. Shared shape with the nav so a signed in person looks the same
 * everywhere. */
export function AvatarChip({ profile, user, size = 34 }) {
  const url = profile?.avatar_url;
  const initial = accountInitial(profile, user);
  if (url) {
    return (
      <span aria-hidden="true" className="inline-block overflow-hidden shrink-0" style={{ width: size, height: size, borderRadius: "50%", border: "1px solid var(--color-accent)" }}>
        <img src={url} alt="" className="w-full h-full object-cover" />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className="inline-flex items-center justify-center shrink-0" style={{ width: size, height: size, borderRadius: "50%", background: "var(--color-accent)", color: "#0B0C0E", fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: Math.round(size * 0.4) }}>
      {initial}
    </span>
  );
}

const fieldInputStyle = {
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
    <div className="flex items-center gap-3" style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "12px", padding: "14px 16px" }}>
      {children}
    </div>
  );
}

export default LoginPanel;
