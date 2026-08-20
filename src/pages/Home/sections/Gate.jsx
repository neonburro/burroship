// src/pages/Home/sections/Gate.jsx
//
// The front of the ship is a door. A centered login on the page itself under one
// quiet line. Auth now runs through the shared session (useSession), so signing in
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
    <section className="px-3 pt-12 pb-20 md:pt-20 md:pb-28 flex items-center justify-center">
      <div className="w-full max-w-[600px] text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6 md:mb-8">
          <span className="beacon-dot sm pulse" aria-hidden="true" />
          <span className="text-mono text-ink-faint lowercase">the bridge</span>
        </div>

        <h1 className="text-display-xl text-ink lowercase mb-4">a floating incubator.</h1>
        <p className="text-lead lowercase mb-10" style={{ fontSize: "19px" }}>
          {aboard
            ? "you have a key. the rest is coming."
            : "something is being built above the range. sign in to see it."}
        </p>

        {aboard ? (
          <div
            className="rounded-3xl p-7 md:p-9 text-center"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">on the bridge</span>
            </div>
            <div className="text-display-md text-ink lowercase mb-2">welcome aboard, {label}.</div>
            <p className="text-body text-ink-muted lowercase mb-8">
              the bridge is still being built above the range. you are early. that is the point.
            </p>
            <button
              onClick={leave}
              type="button"
              className="text-mono-sm lowercase transition-colors duration-200"
              style={{ padding: "13px 22px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)", background: "transparent", cursor: "pointer" }}
            >
              leave the bridge
            </button>
          </div>
        ) : (
          <div
            className="rounded-3xl p-7 md:p-9 text-left"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
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
