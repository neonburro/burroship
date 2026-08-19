// src/pages/Contact/index.jsx
//
// Request access. The bridge is invitation only, so this is where someone asks to
// come aboard. Deliberately broad and a little mysterious, we do not spell out what
// is inside. Only name and email are required. Everything else lives under a quiet
// "in case you are more interested" expander so the base ask stays tiny, the way a
// door with a peephole would. Phone is for sms, address is for things by mail,
// socials are optional and discord is the one we suggest including.
//
// DELIVERY: on submit we try the burroship Supabase (table access_requests) when it
// is connected, and always show the confirmation. Until the env vars are set and the
// table exists (see supabase/email-templates and the access_requests note), nothing
// is stored, it is front end only. Wiring a notify function to email the crew is the
// next step. Lowercase throughout, no oxford commas, no dashes.
// v1.

import { useState } from "react";
import { Link } from "react-router-dom";
import { burroshipSupabase, supabaseReady } from "../../lib/burroshipSupabase";

const SOCIALS = [
  { key: "instagram", label: "instagram" },
  { key: "x", label: "x" },
  { key: "reddit", label: "reddit" },
  { key: "facebook", label: "facebook" },
];

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [discord, setDiscord] = useState("");
  const [socials, setSocials] = useState({ instagram: "", x: "", reddit: "", facebook: "" });
  const [note, setNote] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = name.trim() && emailOk && status !== "sending";

  async function submit() {
    if (!canSubmit) return;
    setStatus("sending");
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      address: address.trim() || null,
      discord: discord.trim() || null,
      socials,
      note: note.trim() || null,
    };
    try {
      if (supabaseReady) {
        const { error } = await burroshipSupabase.from("access_requests").insert(payload);
        if (error) throw error;
      }
    } catch (e) {
      console.warn("access request not delivered yet:", e?.message);
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <main id="main" className="px-3">
        <section className="pt-32 pb-32 md:pt-40 flex items-center justify-center">
          <div className="w-full max-w-[560px] text-center">
            <div className="flex items-center justify-center gap-2.5 mb-6">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">signal received</span>
            </div>
            <h1 className="text-display-lg text-ink lowercase mb-4">the bridge has your name.</h1>
            <p className="text-lead lowercase mb-10">
              we do not open for everyone. when there is room above the range we will reach out. keep an eye on the sky.
            </p>
            <Link
              to="/"
              className="inline-block text-mono-sm lowercase transition-colors duration-200"
              style={{ padding: "14px 22px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)" }}
            >
              back to the range
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main id="main" className="px-3">
      <section className="pt-28 pb-24 md:pt-36 md:pb-32 flex items-center justify-center">
        <div className="w-full max-w-[600px]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5 mb-6">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">the bridge</span>
            </div>
            <h1 className="text-display-xl text-ink lowercase mb-4">ask to come aboard.</h1>
            <p className="text-lead lowercase mb-10" style={{ fontSize: "18px" }}>
              the bridge is invitation only for now. leave a name and we will find you when there is room.
            </p>
          </div>

          <div
            className="rounded-3xl p-7 md:p-9"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
          >
            <div className="flex flex-col gap-3">
              <Field>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" aria-label="name" autoComplete="name" style={inputStyle} />
              </Field>
              <Field>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" aria-label="email" type="email" autoComplete="email" style={inputStyle} />
              </Field>

              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center justify-between mt-1 transition-colors duration-200 group"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: "6px 2px" }}
                aria-expanded={moreOpen}
              >
                <span className="flex items-center gap-2.5">
                  <span className={"beacon-dot sm" + (moreOpen ? " pulse" : "")} aria-hidden="true" />
                  <span className="text-mono-sm text-ink-muted group-hover:text-ink transition-colors duration-200 lowercase">in case you are more interested</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6" /></svg>
              </button>

              {moreOpen && (
                <div className="flex flex-col gap-3 pt-1">
                  <p className="text-body-sm text-ink-faint lowercase">all optional. the more we have, the more we can send your way.</p>
                  <Field>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="phone, to reach you over sms" aria-label="phone" type="tel" autoComplete="tel" style={inputStyle} />
                  </Field>
                  <Field>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address, to send you things by mail" aria-label="address" autoComplete="street-address" style={inputStyle} />
                  </Field>

                  <div className="pt-2">
                    <p className="text-mono-xs text-ink-faint lowercase mb-2.5">where else you live</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      <Field>
                        <input value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="discord, the one to include" aria-label="discord" style={inputStyle} />
                      </Field>
                      {SOCIALS.map((s) => (
                        <Field key={s.key}>
                          <input
                            value={socials[s.key]}
                            onChange={(e) => setSocials((prev) => ({ ...prev, [s.key]: e.target.value }))}
                            placeholder={s.label}
                            aria-label={s.label}
                            style={inputStyle}
                          />
                        </Field>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Field className="items-start">
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="a short note, if you have one" aria-label="note" rows={3} style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }} />
              </Field>

              <button
                onClick={submit}
                disabled={!canSubmit}
                className="text-mono-sm transition-all duration-200 mt-2 lowercase"
                style={{
                  padding: "15px 18px",
                  borderRadius: "14px",
                  background: canSubmit ? "var(--color-accent)" : "var(--color-surface-raised)",
                  color: canSubmit ? "#FFFFFF" : "var(--color-ink-faint)",
                  border: canSubmit ? "1px solid var(--color-accent)" : "1px solid var(--color-line)",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
                type="button"
              >
                {status === "sending" ? "sending" : "request access"}
              </button>

              <p className="text-mono-xs text-ink-faint lowercase text-center pt-1">
                name and email are all we need. the rest stays encrypted, like the forum on neonburro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
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

function Field({ children, className = "" }) {
  return (
    <div
      className={"flex items-center gap-3 " + className}
      style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "14px", padding: "14px 16px" }}
    >
      {children}
    </div>
  );
}

export default Contact;
