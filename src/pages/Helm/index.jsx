// src/pages/Helm/index.jsx
//
// The helm, the admin area. Only for is_admin profiles. Here you steer the whole ship:
// add, edit, delete and place the curated map places (the ones anyone can see), and
// review the businesses people submit from the bridge. Places write through the admin
// RLS on the places table, businesses through the admin approve policy.
//
// Placing a pin: type an address and hit locate to geocode it (Mapbox), or type exact
// lat and lng. tier drives how big the marker looms on the map. Full width, no
// container squeeze on mobile. v1.

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../../lib/session";
import { burroshipSupabase } from "../../lib/burroshipSupabase";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

const EMPTY = {
  slug: "", name: "", category: "", subcategory: "", address: "",
  latitude: "", longitude: "", blurb: "", history: "", website: "", phone: "", tier: 0,
};

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 58);
}

function Helm() {
  const { user, profile, loading, signOut } = useSession();

  const [places, setPlaces] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [pNote, setPNote] = useState("");
  const [pStatus, setPStatus] = useState("idle");

  const loadPlaces = useCallback(async () => {
    const { data } = await burroshipSupabase.from("places").select("id,slug,name,category,subcategory,address,latitude,longitude,blurb,history,website,phone,tier,status").order("name");
    setPlaces(data || []);
  }, []);

  const loadBusinesses = useCallback(async () => {
    const { data } = await burroshipSupabase.from("businesses").select("id,name,address,category,status,tier,website,phone").order("created_at", { ascending: false });
    setBusinesses(data || []);
  }, []);

  useEffect(() => {
    if (user && profile?.is_admin) { loadPlaces(); loadBusinesses(); }
  }, [user, profile, loadPlaces, loadBusinesses]);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function editPlace(pl) {
    setEditingId(pl.id);
    setForm({
      slug: pl.slug || "", name: pl.name || "", category: pl.category || "", subcategory: pl.subcategory || "",
      address: pl.address || "", latitude: pl.latitude ?? "", longitude: pl.longitude ?? "",
      blurb: pl.blurb || "", history: pl.history || "", website: pl.website || "", phone: pl.phone || "", tier: pl.tier ?? 0,
    });
    setPNote("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function newPlace() {
    setEditingId(null);
    setForm(EMPTY);
    setPNote("");
  }

  async function geocode() {
    if (!form.address.trim() || !MAPBOX_TOKEN) { setPNote("type an address first."); return; }
    setPNote("locating.");
    try {
      const q = encodeURIComponent(`${form.address}, Ridgway, Colorado`);
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?limit=1&country=us&access_token=${MAPBOX_TOKEN}`);
      const j = await res.json();
      const f = j.features?.[0];
      if (!f) { setPNote("could not find that address."); return; }
      setForm((p) => ({ ...p, longitude: +f.center[0].toFixed(6), latitude: +f.center[1].toFixed(6) }));
      setPNote("located. check the pin.");
    } catch (e) { setPNote("geocode failed. type the coords."); }
  }

  async function savePlace() {
    if (pStatus === "saving") return;
    if (!form.name.trim() || form.latitude === "" || form.longitude === "") { setPNote("name, latitude and longitude are required."); return; }
    setPStatus("saving");
    setPNote("");
    const row = {
      slug: (form.slug.trim() || slugify(form.name)),
      name: form.name.trim(),
      category: form.category.trim() || null,
      subcategory: form.subcategory.trim() || null,
      address: form.address.trim() || null,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      blurb: form.blurb.trim() || null,
      history: form.history.trim() || null,
      website: form.website.trim() || null,
      phone: form.phone.trim() || null,
      tier: Number(form.tier) || 0,
      source: "manual",
      status: "live",
      updated_at: new Date().toISOString(),
    };
    let error;
    if (editingId) {
      ({ error } = await burroshipSupabase.from("places").update(row).eq("id", editingId));
    } else {
      ({ error } = await burroshipSupabase.from("places").insert(row));
    }
    setPStatus("idle");
    if (error) {
      setPNote(String(error.code) === "23505" ? "that slug is taken. change it." : "could not save. try again.");
      return;
    }
    setPNote(editingId ? "saved." : "added.");
    newPlace();
    loadPlaces();
  }

  async function deletePlace(id) {
    await burroshipSupabase.from("places").delete().eq("id", id);
    if (editingId === id) newPlace();
    loadPlaces();
  }

  async function reviewBusiness(id, patch) {
    await burroshipSupabase.from("businesses").update({ ...patch, updated_at: new Date().toISOString() }).eq("id", id);
    loadBusinesses();
  }

  async function deleteBusiness(id) {
    await burroshipSupabase.from("businesses").delete().eq("id", id);
    loadBusinesses();
  }

  if (loading) return <Gate message="reaching the helm." />;
  if (!user) return <Gate message="the helm is locked. sign in from the top." showHome />;
  if (!profile?.is_admin) return <Gate message="the helm is for the crew. this is not your deck." showHome />;

  return (
    <main id="main" className="px-3">
      <section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="w-full max-w-[860px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2.5">
              <span className="beacon-dot sm pulse" aria-hidden="true" />
              <span className="text-mono text-ink-faint lowercase">the helm</span>
            </div>
            <button onClick={signOut} type="button" className="text-mono-xs lowercase" style={{ padding: "10px 16px", borderRadius: "999px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)", background: "transparent", cursor: "pointer" }}>leave</button>
          </div>

          <Card>
            <Head kicker={editingId ? "edit a place" : "add a place"} title={editingId ? form.name || "a place" : "put a pin on the map."} />
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="name"><input value={form.name} onChange={set("name")} style={inp} placeholder="business or landmark" /></Field>
                <Field label="slug"><input value={form.slug} onChange={set("slug")} style={inp} placeholder="auto from name" /></Field>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="kind"><input value={form.category} onChange={set("category")} style={inp} placeholder="amenity, shop, tourism" /></Field>
                <Field label="what exactly"><input value={form.subcategory} onChange={set("subcategory")} style={inp} placeholder="cafe, museum, wine bar" /></Field>
              </div>
              <Field label="address">
                <input value={form.address} onChange={set("address")} style={inp} placeholder="street address in Ridgway" />
                <button onClick={geocode} type="button" className="text-mono-xs lowercase shrink-0" style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid var(--color-accent)", color: "var(--color-accent-deep)", background: "transparent", cursor: "pointer" }}>locate</button>
              </Field>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Field label="latitude"><input value={form.latitude} onChange={set("latitude")} style={inp} placeholder="38.15" /></Field>
                <Field label="longitude"><input value={form.longitude} onChange={set("longitude")} style={inp} placeholder="-107.75" /></Field>
                <Field label="tier 0-3"><input value={form.tier} onChange={set("tier")} type="number" min="0" max="3" style={inp} /></Field>
              </div>
              <Field label="a short line" top><textarea value={form.blurb} onChange={set("blurb")} rows={2} style={{ ...inp, resize: "none", lineHeight: 1.5 }} placeholder="what it is" /></Field>
              <Field label="history" top><textarea value={form.history} onChange={set("history")} rows={2} style={{ ...inp, resize: "none", lineHeight: 1.5 }} placeholder="optional, the story" /></Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="website"><input value={form.website} onChange={set("website")} style={inp} placeholder="optional" /></Field>
                <Field label="phone"><input value={form.phone} onChange={set("phone")} style={inp} placeholder="optional" /></Field>
              </div>
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <button onClick={savePlace} disabled={pStatus === "saving"} type="button" className="text-mono-sm lowercase" style={btn(pStatus !== "saving")}>{pStatus === "saving" ? "saving" : editingId ? "save place" : "add place"}</button>
                {editingId && <button onClick={newPlace} type="button" className="text-mono-sm lowercase" style={ghostBtn}>new place</button>}
                {pNote && <span className="text-body-sm lowercase" style={{ color: "var(--color-accent-deep)" }}>{pNote}</span>}
              </div>
            </div>
          </Card>

          <div className="h-5" />

          <Card>
            <Head kicker="the places" title={`${places.length} on the map.`} />
            <div className="flex flex-col gap-2">
              {places.map((pl) => (
                <div key={pl.id} className="flex items-center justify-between gap-3" style={rowStyle}>
                  <button onClick={() => editPlace(pl)} type="button" className="min-w-0 text-left" style={{ background: "transparent", border: "none", cursor: "pointer", flex: 1 }}>
                    <div className="text-body text-ink truncate">{pl.name}{pl.tier > 0 ? ` · t${pl.tier}` : ""}</div>
                    <div className="text-body-sm text-ink-muted truncate">{pl.subcategory || pl.category || "place"}{pl.address ? ` · ${pl.address}` : ""}</div>
                  </button>
                  <button onClick={() => deletePlace(pl.id)} type="button" aria-label="delete" className="text-mono-xs lowercase shrink-0" style={{ padding: "7px 11px", borderRadius: "9px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-faint)", background: "transparent", cursor: "pointer" }}>delete</button>
                </div>
              ))}
            </div>
          </Card>

          <div className="h-5" />

          <Card>
            <Head kicker="the submissions" title={`${businesses.length} business ${businesses.length === 1 ? "request" : "requests"}.`} sub="approve one to put it on the map. set a tier for how big it looms." />
            {businesses.length === 0 ? (
              <p className="text-body-sm text-ink-muted lowercase">nothing waiting.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {businesses.map((b) => (
                  <div key={b.id} className="flex items-center justify-between gap-3 flex-wrap" style={rowStyle}>
                    <div className="min-w-0">
                      <div className="text-body text-ink truncate">{b.name}<span className="text-mono-xs" style={{ color: b.status === "approved" ? "var(--color-accent-deep)" : "var(--color-ink-faint)" }}>{"  "}{b.status === "approved" ? `on the map · t${b.tier}` : "in review"}</span></div>
                      <div className="text-body-sm text-ink-muted truncate">{b.address}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {b.status !== "approved"
                        ? <button onClick={() => reviewBusiness(b.id, { status: "approved", tier: 1 })} type="button" className="text-mono-xs lowercase" style={btn(true)}>approve</button>
                        : <button onClick={() => reviewBusiness(b.id, { status: "pending" })} type="button" className="text-mono-xs lowercase" style={ghostBtn}>unlist</button>}
                      <button onClick={() => deleteBusiness(b.id)} type="button" className="text-mono-xs lowercase" style={{ padding: "7px 11px", borderRadius: "9px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-faint)", background: "transparent", cursor: "pointer" }}>delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}

function Gate({ message, showHome }) {
  return (
    <main id="main" className="px-3">
      <section className="pt-32 pb-32 md:pt-40 flex items-center justify-center">
        <div className="w-full max-w-[520px] text-center">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="beacon-dot sm pulse" aria-hidden="true" />
            <span className="text-mono text-ink-faint lowercase">the helm</span>
          </div>
          <p className="text-lead lowercase mb-8">{message}</p>
          {showHome && <Link to="/" className="text-mono-sm lowercase text-ink-muted hover:text-ink transition-colors duration-200">back to the range</Link>}
        </div>
      </section>
    </main>
  );
}

function Card({ children }) {
  return <div className="rounded-3xl p-6 md:p-8" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>{children}</div>;
}

function Head({ kicker, title, sub }) {
  return (
    <div className="mb-6">
      <span className="text-mono-xs text-ink-faint lowercase">{kicker}</span>
      <h2 className="text-display-sm text-ink lowercase mt-1.5">{title}</h2>
      {sub && <p className="text-body-sm text-ink-muted lowercase mt-1.5">{sub}</p>}
    </div>
  );
}

function Field({ label, children, top }) {
  return (
    <label className="block">
      <span className="text-mono-xs text-ink-faint lowercase block mb-1.5">{label}</span>
      <div className={"flex gap-3 " + (top ? "items-start" : "items-center")} style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "12px", padding: "12px 14px" }}>
        {children}
      </div>
    </label>
  );
}

const inp = { flex: 1, background: "transparent", outline: "none", border: "none", color: "var(--color-ink)", fontFamily: "var(--font-sans)", fontSize: "15px", width: "100%" };
const rowStyle = { background: "var(--color-bg)", border: "1px solid var(--color-line)", borderRadius: "12px", padding: "12px 14px" };
const ghostBtn = { padding: "11px 18px", borderRadius: "12px", border: "1px solid var(--color-line-strong)", color: "var(--color-ink-muted)", background: "transparent", cursor: "pointer" };
function btn(on) {
  return { padding: "11px 18px", borderRadius: "12px", background: on ? "var(--color-accent)" : "var(--color-surface-raised)", color: on ? "#FFFFFF" : "var(--color-ink-faint)", border: on ? "1px solid var(--color-accent)" : "1px solid var(--color-line)", cursor: on ? "pointer" : "not-allowed" };
}

export default Helm;
