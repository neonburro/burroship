// src/pages/Bridge/index.jsx
//
// The bridge, the client area. Signed-in only. Two things live here: your PERSONAL
// profile (anonymous by default, the handle is all that is required, change it any
// time) and your BUSINESSES (a business is what lands on the map, so its address is
// required, and it waits for our review before it shows). Everything reads and writes
// through the shared session and the profiles + businesses tables under their own RLS.
// Full width, no container squeeze on mobile. Locked state if you are not aboard.
// v1.

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSession, accountLabel } from "../../lib/session";
import { burroshipSupabase } from "../../lib/burroshipSupabase";
import { AvatarChip } from "../../components/Layout/LoginPanel";

const EMPTY_BIZ = { name: "", address: "", website: "", phone: "", category: "", blurb: "" };

function Bridge() {
  const { user, profile, loading, signOut, refreshProfile } = useSession();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [pStatus, setPStatus] = useState("idle");
  const [pNote, setPNote] = useState("");

  const [businesses, setBusinesses] = useState([]);
  const [biz, setBiz] = useState(EMPTY_BIZ);
  const [bStatus, setBStatus] = useState("idle");
  const [bNote, setBNote] = useState("");

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setUsername(profile.username || "");
    }
  }, [profile]);

  const loadBusinesses = useCallback(async () => {
    if (!user) return;
    const { data } = await burroshipSupabase
      .from("businesses")
      .select("id,name,address,website,phone,category,blurb,status")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: true });
    setBusinesses(data || []);
  }, [user]);

  useEffect(() => { loadBusinesses(); }, [loadBusinesses]);

  async function saveProfile() {
    if (!user || pStatus === "saving") return;
    if (!username.trim()) { setPNote("a handle cannot be empty."); return; }
    setPStatus("saving");
    setPNote("");
    const { error } = await burroshipSupabase
      .from("profiles")
      .update({ display_name: displayName.trim() || null, username: username.trim(), updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (error) {
      setPStatus("idle");
      const dup = String(error.code) === "23505" || /duplicate|unique/i.test(error.message || "");
      setPNote(dup ? "that handle is taken. try another." : "could not save. try again.");
      return;
    }
    setPStatus("idle");
    setPNote("saved.");
    refreshProfile();
  }

  async function addBusiness() {
    if (!user || bStatus === "saving") return;
    if (!biz.name.trim() || !biz.address.trim()) { setBNote("a business needs a name and an address."); return; }
    setBStatus("saving");
    setBNote("");
    const { error } = await burroshipSupabase.from("businesses").insert({
      owner_id: user.id,
      name: biz.name.trim(),
      address: biz.address.trim(),
      website: biz.website.trim() || null,
      phone: biz.phone.trim() || null,
      category: biz.category.trim() || null,
      blurb: biz.blurb.trim() || null,
    });
    if (error) { setBStatus("idle"); setBNote("could not add. try again."); return; }
    setBStatus("idle");
    setBiz(EMPTY_BIZ);
    setBNote("added. we will review it before it lands on the map.");
    loadBusinesses();
  }

  if (loading) return <Locked message="reaching the bridge." />;
  if (!user) return <Locked message="the bridge is locked. sign in from the top to come aboard." showRequest />;

  const label = String(accountLabel(profile, user)).toLowerCase();
  const setBizField = (k) => (e) => setBiz((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <main id="main" className="px-3">
      <section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="w-full max-w-[720px] mx-auto">
          <div className="flex items-center justify-between mb-10 md:mb-12">
            <div className="flex items-center gap-3">
              <AvatarChip profile={profile} user={user} size={46} />
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="beacon-dot sm pulse" aria-hidden="true" />
                  <span className="text-mono text-ink-faint lowercase">the bridge</span>
                </div>
                <div className="text-display-sm text-ink lowercase leading-tight mt-1">{label}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {profile?.is_admin && (
                <Link to="/helm/" className="text-mono-xs lowercase transition-colors duration-200" style={{ padding: "10px 16px", borderRadius: "999px", border: "1px solid var(--color-accent)", color: "var(--color-accent-deep)", background: "transparent" }}>
                  the helm
                </Link>
              )}
              <button
                onClick={signOut}
                type="button"
                className="text-mono-xs lowercase transition-colors duration-200"
                style={{ padding: "10px 16px", borderRadius: "999px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)", background: "transparent", cursor: "pointer" }}
              >
                leave
              </button>
            </div>
          </div>

          <Card>
            <CardHead kicker="your profile" title="who you are." sub="anonymous unless you say otherwise. the handle is all we need." />
            <div className="flex flex-col gap-3">
              <Labeled label="handle">
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="handle" aria-label="handle" spellCheck="false" style={inputStyle} />
              </Labeled>
              <Labeled label="display name">
                <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="what others see, optional" aria-label="display name" style={inputStyle} />
              </Labeled>
              <div className="flex items-center gap-4 pt-1">
                <button onClick={saveProfile} disabled={pStatus === "saving"} type="button" className="text-mono-sm lowercase transition-all duration-200" style={saveBtnStyle(pStatus !== "saving")}>
                  {pStatus === "saving" ? "saving" : "save profile"}
                </button>
                {pNote && <span className="text-body-sm lowercase" style={{ color: "var(--color-accent-deep)" }} role="status">{pNote}</span>}
              </div>
            </div>
          </Card>

          <div className="h-5" />

          <Card>
            <CardHead kicker="your business" title="put it on the map." sub="a business needs a name and an address, that is the pin. we review each one before it shows." />

            <button
              type="button"
              onClick={() => setBNote("google connect is coming. it will use google's own secure sign in, so we never see your password, we just help improve your listing.")}
              className="flex items-center justify-center gap-2.5 w-full mb-6 text-mono-sm lowercase transition-colors duration-200"
              style={{ padding: "13px 18px", borderRadius: "14px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink)", background: "var(--color-bg)", cursor: "pointer" }}
            >
              <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", background: "var(--color-ink)", color: "var(--color-bg)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11 }}>G</span>
              connect google business
            </button>

            {businesses.length > 0 && (
              <div className="flex flex-col gap-2.5 mb-6">
                {businesses.map((b) => (
                  <div key={b.id} className="flex items-center justify-between gap-3" style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "14px", padding: "14px 16px" }}>
                    <div className="min-w-0">
                      <div className="text-body text-ink truncate">{b.name}</div>
                      <div className="text-body-sm text-ink-muted truncate">{b.address}</div>
                    </div>
                    <span className="text-mono-xs lowercase shrink-0" style={{ color: b.status === "approved" ? "var(--color-accent-deep)" : "var(--color-ink-faint)" }}>{b.status === "approved" ? "on the map" : "in review"}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Labeled label="business name">
                <input value={biz.name} onChange={setBizField("name")} placeholder="business name" aria-label="business name" style={inputStyle} />
              </Labeled>
              <Labeled label="address">
                <input value={biz.address} onChange={setBizField("address")} placeholder="street address in Ridgway" aria-label="address" style={inputStyle} />
              </Labeled>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Labeled label="website">
                  <input value={biz.website} onChange={setBizField("website")} placeholder="optional" aria-label="website" style={inputStyle} />
                </Labeled>
                <Labeled label="phone">
                  <input value={biz.phone} onChange={setBizField("phone")} placeholder="optional" aria-label="phone" style={inputStyle} />
                </Labeled>
              </div>
              <Labeled label="what you are">
                <input value={biz.category} onChange={setBizField("category")} placeholder="cafe, gallery, outfitter, optional" aria-label="category" style={inputStyle} />
              </Labeled>
              <Labeled label="a short line" alignTop>
                <textarea value={biz.blurb} onChange={setBizField("blurb")} placeholder="how you would describe it, optional" aria-label="short line" rows={2} style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }} />
              </Labeled>
              <div className="flex items-center gap-4 pt-1">
                <button onClick={addBusiness} disabled={bStatus === "saving"} type="button" className="text-mono-sm lowercase transition-all duration-200" style={saveBtnStyle(bStatus !== "saving")}>
                  {bStatus === "saving" ? "adding" : "add business"}
                </button>
                {bNote && <span className="text-body-sm lowercase" style={{ color: "var(--color-accent-deep)" }} role="status">{bNote}</span>}
              </div>
            </div>
          </Card>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            <span className="beacon-dot sm" aria-hidden="true" />
            <span className="text-mono-xs text-ink-faint lowercase">ridgway, colorado · 38.15° n</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function Locked({ message, showRequest }) {
  return (
    <main id="main" className="px-3">
      <section className="pt-32 pb-32 md:pt-40 flex items-center justify-center">
        <div className="w-full max-w-[520px] text-center">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="beacon-dot sm pulse" aria-hidden="true" />
            <span className="text-mono text-ink-faint lowercase">the bridge</span>
          </div>
          <p className="text-lead lowercase mb-8">{message}</p>
          <div className="flex items-center justify-center gap-4 text-mono-sm lowercase">
            <Link to="/" className="text-ink-muted hover:text-ink transition-colors duration-200">back to the range</Link>
            {showRequest && (
              <>
                <span aria-hidden="true" className="text-ink-faint">·</span>
                <Link to="/contact/" className="text-ink-muted hover:text-ink transition-colors duration-200">request access</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ children }) {
  return (
    <div className="rounded-3xl p-6 md:p-8" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>
      {children}
    </div>
  );
}

function CardHead({ kicker, title, sub }) {
  return (
    <div className="mb-6">
      <span className="text-mono-xs text-ink-faint lowercase">{kicker}</span>
      <h2 className="text-display-sm text-ink lowercase mt-1.5">{title}</h2>
      {sub && <p className="text-body-sm text-ink-muted lowercase mt-1.5">{sub}</p>}
    </div>
  );
}

function Labeled({ label, children, alignTop }) {
  return (
    <label className="block">
      <span className="text-mono-xs text-ink-faint lowercase block mb-1.5">{label}</span>
      <div className={"flex gap-3 " + (alignTop ? "items-start" : "items-center")} style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "14px", padding: "13px 16px" }}>
        {children}
      </div>
    </label>
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
  width: "100%",
};

function saveBtnStyle(enabled) {
  return {
    padding: "13px 22px",
    borderRadius: "14px",
    background: enabled ? "var(--color-accent)" : "var(--color-surface-raised)",
    color: enabled ? "#FFFFFF" : "var(--color-ink-faint)",
    border: enabled ? "1px solid var(--color-accent)" : "1px solid var(--color-line)",
    cursor: enabled ? "pointer" : "not-allowed",
  };
}

export default Bridge;
