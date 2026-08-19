// src/pages/Home/sections/Gate.jsx
//
// The front of the ship is a door. A centered login on the page itself, not a
// slide out, under one quiet mysterious line. We do not explain much. You either
// have a key to the bridge or you watch from the range. The submit is a
// placeholder until the backend lands, same copy as the slide out panel. Lowercase
// throughout, no oxford commas, no dashes. v1.

import { useState } from "react";

function Gate() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");

  const canSubmit = username.trim() && password.trim();

  function submit() {
    if (!canSubmit) return;
    setNote("the bridge is not accepting credentials yet.");
    setPassword("");
    setShow(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") { e.preventDefault(); submit(); }
  }

  return (
    <section className="px-6 pt-10 pb-20 md:pt-16 md:pb-28 flex items-center justify-center">
      <div className="w-full max-w-[430px] text-center">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <span className="beacon-dot sm pulse" aria-hidden="true" />
          <span className="text-mono text-ink-faint lowercase">the bridge</span>
        </div>

        <h1 className="text-display-lg text-ink lowercase mb-3">a floating incubator.</h1>
        <p className="text-lead lowercase mb-9">
          something is being built above the range. sign in to see it.
        </p>

        <div
          className="rounded-3xl p-6 md:p-7 text-left"
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
              enter the bridge
            </button>

            <div className="min-h-[1.4em] mt-1 text-center">
              {note && <p className="text-body-sm lowercase" style={{ color: "var(--color-accent-deep)" }} role="status">{note}</p>}
            </div>
          </div>
        </div>

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
