// src/components/Layout/LoginPanel.jsx
//
// The access panel. A clean overlay that slides in from the right on
// every breakpoint — so it doubles as the mobile nav surface. Login
// only for now: username + password, placeholders inside the fields,
// no labels, with a show-password toggle. Submit is a placeholder
// until the backend lands. When nav links exist, they slot in below.

import { useState, useRef, useEffect } from "react";

function LoginPanel({ open, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const firstFieldRef = useRef(null);

  // Focus the first field when the panel opens.
  useEffect(() => {
    if (open && firstFieldRef.current) {
      const t = setTimeout(() => firstFieldRef.current.focus(), 260);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function submit() {
    if (!username.trim() || !password.trim()) return;
    setNote("The bridge is not accepting credentials yet.");
    setPassword("");
    setShow(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  const canSubmit = username.trim() && password.trim();

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(4,5,7,0.72)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.32s var(--ease-standard)",
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Access"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 70,
          width: "min(420px, 100vw)",
          background: "var(--color-surface)",
          borderLeft: "1px solid var(--color-line-strong)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s var(--ease-emphasis)",
          display: "flex",
          flexDirection: "column",
          padding: "clamp(24px, 5vw, 40px)",
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2.5">
            <span className="beacon-dot sm pulse" aria-hidden="true" />
            <span className="text-mono-xs text-ink-faint">Access</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-faint hover:text-ink transition-colors duration-200"
            style={{ cursor: "pointer", background: "transparent", border: "none", padding: 4 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="mb-9">
          <h2 className="text-display-md text-ink mb-2">See what is building.</h2>
          <p className="text-body-sm text-ink-muted">
            Sign in to the bridge.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Field>
            <input
              ref={firstFieldRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Username"
              aria-label="Username"
              spellCheck="false"
              autoComplete="username"
              style={fieldInputStyle}
            />
          </Field>

          <Field>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Password"
              aria-label="Password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              style={fieldInputStyle}
            />
            <button
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="text-ink-faint hover:text-ink transition-colors duration-200"
              style={{ cursor: "pointer", background: "transparent", border: "none", padding: 4, flexShrink: 0 }}
              type="button"
            >
              {show ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.2M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.2-.8" />
                  <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                </svg>
              )}
            </button>
          </Field>

          <button
            onClick={submit}
            disabled={!canSubmit}
            className="text-mono-sm transition-all duration-200 mt-2"
            style={{
              padding: "14px 18px",
              borderRadius: "999px",
              background: canSubmit ? "var(--color-accent)" : "var(--color-surface-raised)",
              color: canSubmit ? "var(--color-bg)" : "var(--color-ink-faint)",
              border: canSubmit ? "1px solid var(--color-accent)" : "1px solid var(--color-line)",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
            type="button"
          >
            Sign in
          </button>

          <div className="min-h-[1.4em] mt-1">
            {note && (
              <p className="text-body-sm" style={{ color: "var(--color-accent)" }} role="status">
                {note}
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-center gap-2.5" style={{ borderTop: "1px solid var(--color-line)", paddingTop: "20px" }}>
            <span className="beacon-dot sm" aria-hidden="true" />
            <span className="text-mono-xs text-ink-faint">
              Ridgway, Colorado · 38.15° N
            </span>
          </div>
        </div>
      </aside>
    </>
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
    <div
      className="flex items-center gap-3"
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-line)",
        borderRadius: "12px",
        padding: "14px 16px",
      }}
    >
      {children}
    </div>
  );
}

export default LoginPanel;
