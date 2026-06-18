// src/pages/Home/sections/CodeGate.jsx
//
// The Gate. A sealed credential box with a rotating cryptic prompt.
// Every answer is wrong by design — this is theater, not a real gate.
// On submit: a shake, a rotating denial line, the question advances.
// Nothing about what lies beyond. Just the box, the question, the
// tasteful refusal. The dot watches.

import { useState, useEffect, useRef } from "react";
import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import Reveal from "../../../components/Atoms/Reveal";

const PROMPTS = [
  "What is the name of Warbleur's favorite project?",
  "How many burroships are active in the fleet?",
  "Which agent holds the context when the others sleep?",
  "Name the cipher that opens the engine room.",
  "What does the council say before a clean deploy?",
  "Where does the signal go when nobody is watching?",
  "What is the third word the compound never says aloud?",
];

const DENIALS = [
  "Close. The council is unconvinced.",
  "A reasonable guess. Reason is not the key.",
  "The gate considers it. The gate declines.",
  "Noted, logged, and politely refused.",
  "Almost. Almost is the loneliest answer.",
  "The signal heard you. It did not agree.",
  "Wrong, but said with conviction. We respect that.",
];

function CodeGate() {
  const [value, setValue] = useState("");
  const [pIndex, setPIndex] = useState(0);
  const [denial, setDenial] = useState("");
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);

  // Rotate the prompt slowly while idle so the box feels alive.
  useEffect(() => {
    const id = setInterval(() => {
      setDenial((d) => (d ? d : ""));
      setPIndex((i) => (i + 1) % PROMPTS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  function submit() {
    const tries = attempts + 1;
    setAttempts(tries);
    setDenial(DENIALS[tries % DENIALS.length]);
    setShake(true);
    setValue("");
    setTimeout(() => setShake(false), 460);
    setTimeout(() => setPIndex((i) => (i + 1) % PROMPTS.length), 700);
    if (inputRef.current) inputRef.current.focus();
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (value.trim()) submit();
    }
  }

  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "var(--color-surface-engine)",
        borderTop: "1px solid var(--color-line)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 45%, rgba(91,180,240,0.05) 0%, transparent 70%)",
        }}
      />

      <Container size="reading" className="relative z-10">
        <Reveal>
          <div className="flex justify-center mb-8">
            <Eyebrow signal>Credentials required</Eyebrow>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className={shake ? "deny-shake" : ""}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line-strong)",
              borderRadius: "20px",
              padding: "clamp(24px, 5vw, 44px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <span className="beacon-dot sm pulse" aria-hidden="true" />
                <span className="text-mono-xs text-ink-faint">Gate · Sealed</span>
              </div>
              <span className="text-mono-xs text-ink-faint">
                {String(attempts).padStart(3, "0")} attempts
              </span>
            </div>

            <p
              className="text-display-md text-ink mb-8 min-h-[2.4em]"
              style={{ transition: "opacity 0.4s var(--ease-standard)" }}
              key={pIndex}
            >
              {PROMPTS[pIndex]}
            </p>

            <div
              className="flex items-center gap-3 px-5 py-4 rounded-xl"
              style={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-line)",
              }}
              onClick={() => inputRef.current && inputRef.current.focus()}
            >
              <span className="text-mono text-accent select-none">&gt;</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Enter a code"
                aria-label="Enter a code"
                spellCheck="false"
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-ink"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "15px",
                  letterSpacing: "0.04em",
                }}
              />
              <button
                onClick={() => value.trim() && submit()}
                disabled={!value.trim()}
                className="text-mono-sm transition-all duration-200"
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  background: value.trim() ? "var(--color-accent)" : "transparent",
                  color: value.trim() ? "var(--color-bg)" : "var(--color-ink-faint)",
                  border: value.trim()
                    ? "1px solid var(--color-accent)"
                    : "1px solid var(--color-line)",
                  cursor: value.trim() ? "pointer" : "not-allowed",
                }}
              >
                Submit
              </button>
            </div>

            <div className="mt-5 min-h-[1.4em]">
              {denial && (
                <p
                  className="text-body-sm"
                  style={{ color: "var(--color-accent)" }}
                  role="status"
                >
                  {denial}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-mono-xs text-ink-faint text-center mt-8">
            If you know, you know. If you do not, the view is still good from here.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

export default CodeGate;
