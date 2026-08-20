// src/pages/CommandCenter/layers/BeaconPopup.jsx
//
// The beacon card. Shows on hover (and on click) anchored to a beacon. It is a small
// interactive directory entry: what the place is, its name, a line about it, the
// address, and tight action buttons. If we have a phone the call button is a real
// tel: link, so on a phone you tap it and it dials. Website opens in a new tab. Sky
// blue accent to match the map. Content is HTML because Mapbox popups live outside
// React's tree.

import { useEffect, useRef } from "react";

const ACCENT = "#4FB0F0";

function BeaconPopup({ map, location, onDismiss }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (!map || !location) return;

    let popup;
    let cleanupFn = () => {};

    import("mapbox-gl").then((mapboxgl) => {
      const Popup = mapboxgl.default.Popup;

      popup = new Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 16,
        anchor: "bottom",
        className: "burroship-popup",
        maxWidth: "260px",
      });

      popup
        .setLngLat([location.longitude, location.latitude])
        .setHTML(buildPopupHTML(location))
        .addTo(map);

      popupRef.current = popup;

      popup.on("close", () => {
        if (onDismiss) onDismiss();
      });

      cleanupFn = () => {
        try { popup.remove(); } catch (e) { /* already removed */ }
      };
    });

    return () => cleanupFn();
  }, [map, location, onDismiss]);

  return null;
}

const PHONE_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
const GLOBE_ICON = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';

function buildPopupHTML(loc) {
  const kicker = formatKind(loc.subcategory || loc.category);
  const rows = [];

  rows.push(`
    <div style="font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${ACCENT};margin-bottom:6px;display:flex;align-items:center;gap:6px;">
      <span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:${ACCENT};box-shadow:0 0 6px ${ACCENT};"></span>
      ${escapeHTML(kicker)}
    </div>`);

  rows.push(`<div style="font-family:'Rubik',-apple-system,sans-serif;font-size:15px;font-weight:600;line-height:1.2;color:#fff;letter-spacing:-0.01em;">${escapeHTML(loc.name)}</div>`);

  if (loc.blurb) {
    rows.push(`<div style="font-family:'Rubik',sans-serif;font-size:12px;line-height:1.5;color:rgba(255,255,255,0.68);margin-top:7px;">${escapeHTML(loc.blurb)}</div>`);
  }

  if (loc.address) {
    rows.push(`<div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.42);margin-top:8px;">${escapeHTML(loc.address)}</div>`);
  }

  const actions = [];
  if (loc.phone) {
    actions.push(`<a href="tel:${escapeAttr(cleanTel(loc.phone))}" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:9px 10px;border-radius:9px;background:${ACCENT};color:#08131c;">${PHONE_ICON} call</a>`);
  }
  if (loc.website) {
    actions.push(`<a href="${escapeAttr(cleanUrl(loc.website))}" target="_blank" rel="noopener noreferrer" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:9px 10px;border-radius:9px;border:1px solid ${ACCENT};color:${ACCENT};">${GLOBE_ICON} visit</a>`);
  }
  if (actions.length) {
    rows.push(`<div style="display:flex;gap:8px;margin-top:12px;">${actions.join("")}</div>`);
  }

  return `<div style="background:rgba(6,10,14,0.95);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(79,176,240,0.32);border-radius:12px;padding:14px 16px;max-width:230px;box-shadow:0 6px 28px rgba(0,0,0,0.5);">${rows.join("")}</div>`;
}

function formatKind(kind) {
  if (!kind) return "place";
  return String(kind).replace(/[_;]+/g, " ").replace(/\s+/g, " ").trim();
}

function cleanTel(phone) {
  return String(phone).replace(/[^\d+]/g, "");
}

function cleanUrl(url) {
  const u = String(url).trim();
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function escapeAttr(str) {
  return escapeHTML(String(str));
}

export default BeaconPopup;
