// src/components/SecretMapAccess.jsx
//
// Hidden door to the world map. The map is heavy, every load spins up Mapbox and
// terrain tiles that cost money, so we deliberately keep it OFF the home page and
// give it no visible link. To reach it you type the two letters n then b, anywhere
// that is not a text field, and it opens /world/. A quiet keyhole for us to work on
// it while traffic is low. When we are ready to open the map to everyone we add a
// real button and can retire this, or keep it as an easter egg.
//
// Reset if the two keys are not pressed close together, so ordinary typing of words
// with "nb" in them (in a field, already ignored) or slow stray keys do not trigger.
// v1.

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SEQUENCE = "nb";
const RESET_MS = 900;

function SecretMapAccess() {
  const navigate = useNavigate();
  const bufferRef = useRef("");
  const timerRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      const el = e.target;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const k = e.key.toLowerCase();
      if (k.length !== 1) return;

      bufferRef.current = (bufferRef.current + k).slice(-SEQUENCE.length);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { bufferRef.current = ""; }, RESET_MS);

      if (bufferRef.current === SEQUENCE) {
        bufferRef.current = "";
        navigate("/world/");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);

  return null;
}

export default SecretMapAccess;
