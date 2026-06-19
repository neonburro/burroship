// src/pages/Home/sections/Invitation.jsx
//
// The invitation. One line, one field, one move. The prompt reads
// "invitation code?" in sky blue on pure black. An eyeball reveals
// what was typed. A solid sky blue circle with a right arrow advances.
// Every wrong code shuffles a copper rejection line. Every code is
// wrong by design. Quiet and clean.
// v2 · 2026-06-18 · added copper denial shuffle on advance

import { useState, useRef } from "react";
import Container from "../../../components/Layout/Container";

const COPPER = "#C77B4A";

const DENIALS = [
  "nope.",
  "hmm..",
  "yenaw.. almost",
  "maybe talk with ion.",
  "no.",
  "sorry didnt work..",
  "hmm.. try again maybe",
  "maybe check your spelling..",
  "nope sorry..",
  "not quite.",
  "the gate stays shut.",
  "close. not close enough.",
  "ask warbleur nicely.",
  "still no.",
];

function Invitation() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [denial, setDenial] = useState("");
  const [idx, setIdx] = useState(-1);
  const inputRef = useRef(null);

  function advance() {
    if (!value.trim()) return;
    const next = (idx + 1) % DENIALS.length;
    setIdx(next);
    setDenial(DENIALS[next]);
    setValue("");
    if (inputRef.current) inputRef.current.focus();
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      advance();
    }
  }

  return (
    <section className="relative py-32 md:py-48 w-full overflow-hidden" style={{ background: "#000000", borderTop: "1px solid var(--color-line)" }}>
      <Container size="reading" className="relative z-10 text-center">
        <h2 className="text-display-lg mb-10 lowercase" style={{ color: "var(--color-accent)" }}>invitation code?</h2>

        <div className="flex items-center gap-3 mx-auto max-w-[520px] pl-5 pr-2 py-2 rounded-full" style={{ background: "#000000", border: "1px solid var(--color-line)" }} onClick={() => inputRef.current && inputRef.current.focus()}>
          <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} type={show ? "text" : "password"} aria-label="invitation code" spellCheck="false" autoComplete="off" className="flex-1 bg-transparent outline-none text-center" style={{ fontFamily: "var(--font-mono)", fontSize: "15px", letterSpacing: "0.18em", color: "var(--color-accent)", border: "none", padding: "10px 0" }} />

          <button onClick={(e) => { e.stopPropagation(); setShow((s) => !s); }} aria-label={show ? "hide code" : "show code"} type="button" style={{ cursor: "pointer", background: "transparent", border: "none", padding: 6, flexShrink: 0, color: "var(--color-accent)", opacity: 0.65 }}>
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.2M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.2-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
            )}
          </button>

          <button onClick={(e) => { e.stopPropagation(); advance(); }} aria-label="advance" type="button" className="flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--color-accent)", border: "none", cursor: "pointer", boxShadow: "0 0 16px var(--color-accent-glow)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
          </button>
        </div>

        <div className="min-h-[1.6em] mt-6">
          {denial && (
            <p className="text-mono-sm lowercase" style={{ color: COPPER }} role="status" key={idx}>{denial}</p>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Invitation;
