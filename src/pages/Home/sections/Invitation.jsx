// src/pages/Home/sections/Invitation.jsx
//
// The invitation. One line, one field. Simple yet powerful. The prompt
// reads "invitation code?" and the container is blank with sky blue
// text on pure black. An eyeball toggles whether the input is visible.
// No submit theater. No attempts. Quiet and clean.

import { useState, useRef } from "react";
import Container from "../../../components/Layout/Container";

function Invitation() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  return (
    <section className="relative py-32 md:py-48 w-full overflow-hidden" style={{ background: "#000000", borderTop: "1px solid var(--color-line)" }}>
      <Container size="reading" className="relative z-10 text-center">
        <h2 className="text-display-lg mb-10 lowercase" style={{ color: "var(--color-accent)" }}>invitation code?</h2>

        <div className="flex items-center gap-3 mx-auto max-w-[480px] px-5 py-4 rounded-xl" style={{ background: "#000000", border: "1px solid var(--color-line)" }} onClick={() => inputRef.current && inputRef.current.focus()}>
          <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} type={show ? "text" : "password"} aria-label="Invitation code" spellCheck="false" autoComplete="off" className="flex-1 bg-transparent outline-none text-center" style={{ fontFamily: "var(--font-mono)", fontSize: "15px", letterSpacing: "0.18em", color: "var(--color-accent)", border: "none" }} />
          <button onClick={(e) => { e.stopPropagation(); setShow((s) => !s); }} aria-label={show ? "Hide code" : "Show code"} type="button" style={{ cursor: "pointer", background: "transparent", border: "none", padding: 4, flexShrink: 0, color: "var(--color-accent)", opacity: 0.7 }}>
            {show ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3l18 18" /><path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.2 4.2M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.2-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>
            )}
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Invitation;
