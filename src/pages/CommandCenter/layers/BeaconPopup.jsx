// src/pages/CommandCenter/layers/BeaconPopup.jsx
//
// Click popup for a beacon. Floats anchored to the beacon's
// pixel position via a Mapbox Popup. Brand voice: operational,
// mono labels, calm.
 
import { useEffect, useRef } from "react";
 
/* Mapbox provides its own Popup class. We use it because it
 * handles all the positioning logic correctly when the user
 * pans or zooms. The content is plain HTML rendered into the
 * popup container. */
 
function BeaconPopup({ map, location, onDismiss }) {
  const popupRef = useRef(null);
 
  useEffect(() => {
    if (!map || !location) return;
 
    /* Lazy import to keep mapboxgl out of the home page bundle. */
    let popup;
    let cleanupFn = () => {};
 
    import("mapbox-gl").then((mapboxgl) => {
      const Popup = mapboxgl.default.Popup;
 
      popup = new Popup({
        closeButton: false,
        closeOnClick: true,
        offset: 18,
        anchor: "bottom",
        className: "burroship-popup",
        maxWidth: "280px",
      });
 
      const html = buildPopupHTML(location);
 
      popup
        .setLngLat([location.longitude, location.latitude])
        .setHTML(html)
        .addTo(map);
 
      popupRef.current = popup;
 
      /* When the user clicks outside or hits ESC, dismiss. */
      popup.on("close", () => {
        if (onDismiss) onDismiss();
      });
 
      cleanupFn = () => {
        try {
          popup.remove();
        } catch (e) {
          /* Already removed. */
        }
      };
    });
 
    return () => cleanupFn();
  }, [map, location, onDismiss]);
 
  return null;
}
 
/* Build the popup HTML. Inline styles because Mapbox popups
 * live outside React's tree. */
function buildPopupHTML(loc) {
  const categoryLabel = formatCategory(loc.category);
 
  return `
    <div style="
      background: rgba(2, 5, 3, 0.94);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(168, 208, 85, 0.3);
      border-radius: 10px;
      padding: 14px 16px;
      font-family: 'Inter', -apple-system, sans-serif;
      color: rgba(255, 255, 255, 0.85);
      max-width: 240px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
    ">
      <div style="
        font-family: 'JetBrains Mono', monospace;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #A8D055;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
      ">
        <span style="
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #A8D055;
          box-shadow: 0 0 6px rgba(168, 208, 85, 0.6);
        "></span>
        ${escapeHTML(categoryLabel)}
      </div>
      <div style="
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.2;
        color: #FFFFFF;
        margin-bottom: 8px;
        letter-spacing: -0.01em;
      ">
        ${escapeHTML(loc.name)}
      </div>
      <div style="
        font-size: 12px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.65);
      ">
        ${escapeHTML(loc.blurb || "")}
      </div>
      ${
        loc.elevation_m
          ? `
        <div style="
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        ">
          ${formatElevation(loc.elevation_m)} · ${escapeHTML(loc.city || "")}
        </div>
      `
          : ""
      }
    </div>
  `;
}
 
function formatCategory(category) {
  if (!category) return "Location";
  if (category === "hq") return "Compound · HQ";
  if (category === "client") return "Client";
  if (category === "landmark") return "Landmark";
  if (category === "partner") return "Partner";
  return category;
}
 
function formatElevation(meters) {
  const feet = Math.round(meters * 3.28084);
  return `${feet.toLocaleString()} ft`;
}
 
function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
 
export default BeaconPopup;
