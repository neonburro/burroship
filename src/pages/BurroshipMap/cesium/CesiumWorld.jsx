// src/pages/BurroshipMap/cesium/CesiumWorld.jsx
//
// The Cesium engine. Photorealistic 3D Tiles globally + Cesium World
// Terrain + custom beacons + the tour flying through real Earth.
//
// We use CesiumJS directly (not resium) so we have fine control over
// the camera, lighting, and atmosphere. Resium's JSX bindings are
// great for static scenes but get in the way for cinematic flight.

import { useEffect, useRef, useState, useCallback } from "react";

import {
  cesiumIonToken,
  atmospherePresets,
  tourRoute,
  compoundBeaconColors,
} from "../../../lib/burroship";
import locations from "../../../data/locations.json";

import CesiumSchedule from "./CesiumSchedule";

// Cesium ships its own assets via a base URL. With Vite, we point
// it at the prebuilt static assets bundled by the cesium package.
// We set this on the window before importing Cesium so its
// internal asset paths resolve correctly.
if (typeof window !== "undefined" && !window.CESIUM_BASE_URL) {
  window.CESIUM_BASE_URL = "/cesium/";
}

// Lazy-load Cesium so the Mapbox path doesn't pay for ~5MB of
// WASM/JS until the user actually toggles into Cesium mode.
let CesiumPromise = null;
function loadCesium() {
  if (!CesiumPromise) {
    CesiumPromise = import("cesium");
  }
  return CesiumPromise;
}

function CesiumWorld() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const tourTimeoutRef = useRef(null);
  const tourRunningRef = useRef(false);
  const beaconEntitiesRef = useRef([]);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [tourActive, setTourActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseEndsAt, setPhaseEndsAt] = useState(0);

  // ----- Atmosphere -----------------------------------------
  // Cesium's atmosphere is driven through scene.skyAtmosphere,
  // scene.fog, scene.globe.atmosphereLightIntensity, and the sun
  // position. Light presets map to a sun position offset from
  // local solar noon.

  const applyAtmosphere = useCallback(async (presetKey) => {
    const Cesium = await loadCesium();
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed()) return;

    const preset = atmospherePresets[presetKey];
    if (!preset) return;

    const scene = viewer.scene;

    // Map lightPreset to a JulianDate offset that puts the sun in
    // the right position. We use a fixed reference date with hour
    // adjusted for time of day.
    const baseDate = Cesium.JulianDate.fromIso8601("2026-06-15T12:00:00Z");
    const hourOffset = {
      dawn: -6,    // 06:00 UTC ≈ dawn over CO
      day: 0,      // local solar noon
      dusk: 6,     // 18:00 UTC ≈ dusk over CO
      night: 12,   // 00:00 UTC ≈ night over CO
    }[preset.lightPreset] || 0;

    const targetTime = Cesium.JulianDate.addHours(
      baseDate,
      hourOffset,
      new Cesium.JulianDate()
    );
    viewer.clock.currentTime = targetTime;

    // Atmosphere intensity follows time of day
    scene.globe.atmosphereLightIntensity =
      preset.lightPreset === "night" ? 3.0 : 10.0;

    // Fog density scales with the preset's fog range
    scene.fog.enabled = true;
    scene.fog.density = preset.fogHorizonBlend * 0.0006;

    // Terrain exaggeration — applies globally
    scene.verticalExaggeration = preset.exaggeration;

    // Star visibility at night
    scene.skyBox.show = preset.lightPreset === "night";
  }, []);

  // ----- Camera flight --------------------------------------
  // Cesium uses meters for height, radians for orientation. We map
  // tour stop {longitude, latitude, zoom, pitch, bearing} to
  // Cartesian positions and HeadingPitchRoll orientations.

  const flyToStop = useCallback(async (config, durationMs) => {
    const Cesium = await loadCesium();
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed()) return;

    // Convert Mapbox-style zoom to Cesium altitude in meters.
    // Empirical mapping: zoom 10 → 30km, zoom 14 → 3km, zoom 16 → 800m
    const altitude = Math.pow(2, 22 - config.zoom) * 0.8;

    // Mapbox pitch is in degrees (0 = top-down, 60 = oblique).
    // Cesium pitch is also degrees but inverted (0 = horizon, -90 = top-down).
    const cesiumPitch = -(90 - config.pitch);
    const heading = config.bearing != null ? config.bearing : 0;

    const destination = Cesium.Cartesian3.fromDegrees(
      config.longitude,
      config.latitude,
      altitude
    );

    return new Promise((resolve) => {
      viewer.camera.flyTo({
        destination,
        orientation: {
          heading: Cesium.Math.toRadians(heading),
          pitch: Cesium.Math.toRadians(cesiumPitch),
          roll: 0,
        },
        duration: durationMs / 1000,
        easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
        complete: resolve,
        cancel: resolve,
      });
    });
  }, []);

  // ----- Tour engine ----------------------------------------

  const stopTour = useCallback(() => {
    tourRunningRef.current = false;
    setTourActive(false);
    setCurrentStopIndex(null);
    setCurrentPhase(null);
    if (tourTimeoutRef.current) {
      clearTimeout(tourTimeoutRef.current);
      tourTimeoutRef.current = null;
    }
  }, []);

  const runPhase = useCallback(
    async (stopIndex, phase) => {
      if (!tourRunningRef.current) return;

      const stop = tourRoute[stopIndex];
      const config = stop[phase];

      setCurrentStopIndex(stopIndex);
      setCurrentPhase(phase);
      setPhaseEndsAt(Date.now() + config.durationMs);

      if (phase === "approach") {
        applyAtmosphere(stop.atmosphere);
      }

      if (phase === "hold") {
        // Approach to start bearing fast, then slow rotation to end bearing
        await flyToStop(
          { ...config, bearing: config.bearingStart },
          2000
        );
        await flyToStop(
          { ...config, bearing: config.bearingEnd },
          config.durationMs - 2000
        );
      } else {
        await flyToStop(config, config.durationMs);
      }

      if (!tourRunningRef.current) return;

      if (phase === "approach") {
        runPhase(stopIndex, "hold");
      } else if (phase === "hold") {
        runPhase(stopIndex, "depart");
      } else {
        const nextIndex = (stopIndex + 1) % tourRoute.length;
        runPhase(nextIndex, "approach");
      }
    },
    [applyAtmosphere, flyToStop]
  );

  const startTour = useCallback(() => {
    if (tourRunningRef.current) return;
    tourRunningRef.current = true;
    setTourActive(true);
    runPhase(0, "approach");
  }, [runPhase]);

  // ----- Beacon entities ------------------------------------
  // Render the location pins as Cesium entities. Compound beacons
  // get their metallic glow color; everything else is the lantern
  // green primary.

  const renderBeacons = useCallback(async () => {
    const Cesium = await loadCesium();
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed()) return;

    // Clear any existing
    beaconEntitiesRef.current.forEach((e) => viewer.entities.remove(e));
    beaconEntitiesRef.current = [];

    locations
      .filter((loc) => loc.lat != null && loc.lng != null)
      .forEach((loc) => {
        const isBeacon = loc.subcategory === "compound-beacon";
        const palette = isBeacon
          ? compoundBeaconColors[loc.beaconColor]
          : null;

        const colorHex = palette ? palette.base : "#A8D055";
        const color = Cesium.Color.fromCssColorString(colorHex);
        const isInDev = loc.status === "in-development";

        const entity = viewer.entities.add({
          name: loc.name,
          position: Cesium.Cartesian3.fromDegrees(loc.lng, loc.lat, 100),
          point: {
            pixelSize: isBeacon ? 14 : 8,
            color: color.withAlpha(0.9),
            outlineColor: Cesium.Color.WHITE.withAlpha(0.4),
            outlineWidth: isBeacon ? 2 : 1,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          },
          label: isBeacon
            ? {
                text: loc.name + (isInDev ? "  ◉" : ""),
                font: "11px 'JetBrains Mono', monospace",
                fillColor: color,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -28),
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
              }
            : undefined,
          description: loc.blurb,
          properties: { slug: loc.slug },
        });

        beaconEntitiesRef.current.push(entity);
      });
  }, []);

  // ----- Init -----------------------------------------------

  useEffect(() => {
    let cancelled = false;
    let viewer = null;

    async function init() {
      if (!cesiumIonToken) {
        setError("CESIUM TOKEN MISSING");
        return;
      }

      const Cesium = await loadCesium();
      if (cancelled || !containerRef.current) return;

      Cesium.Ion.defaultAccessToken = cesiumIonToken;

      viewer = new Cesium.Viewer(containerRef.current, {
        // Suppress the default UI — we render our own
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        creditContainer: document.createElement("div"), // hide credits visually but keep for ToS
      });

      // The default credit container is empty above; place real
      // credits in a small container we control
      const creditDiv = document.createElement("div");
      creditDiv.style.cssText =
        "position:absolute;bottom:6px;right:120px;font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(161,161,170,0.6);z-index:5;pointer-events:none;";
      creditDiv.textContent = "© Cesium ion · Google · Maxar";
      containerRef.current.appendChild(creditDiv);

      viewerRef.current = viewer;

      // Photorealistic 3D Tiles via Google
      try {
        const tileset = await Cesium.createGooglePhotorealistic3DTileset();
        viewer.scene.primitives.add(tileset);
      } catch (e) {
        console.warn("Google Photorealistic 3D Tiles failed to load", e);
      }

      // Better atmospheric scattering on the globe
      viewer.scene.skyAtmosphere.show = true;
      viewer.scene.skyAtmosphere.atmosphereLightIntensity = 10.0;
      viewer.scene.fog.enabled = true;
      viewer.scene.globe.dynamicAtmosphereLighting = true;
      viewer.scene.globe.dynamicAtmosphereLightingFromSun = true;
      viewer.scene.globe.showGroundAtmosphere = true;

      // No bing logo, no double cursor
      viewer.scene.requestRenderMode = false;

      if (cancelled) {
        viewer.destroy();
        return;
      }

      setReady(true);

      // Render beacons
      renderBeacons();

      // First frame atmosphere then tour
      applyAtmosphere(tourRoute[0].atmosphere);
      setTimeout(() => {
        if (!cancelled) startTour();
      }, 1500);
    }

    init().catch((err) => {
      console.error("Cesium init failed", err);
      setError(err.message || "Cesium failed to initialize");
    });

    return () => {
      cancelled = true;
      tourRunningRef.current = false;
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-mono-label text-text-secondary">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0, background: "#020503" }}
      />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-mono-label text-text-secondary animate-pulse">
            BURROSHIP · BOARDING
          </p>
        </div>
      )}

      <CesiumSchedule
        tourActive={tourActive}
        currentStopIndex={currentStopIndex}
        currentPhase={currentPhase}
        phaseEndsAt={phaseEndsAt}
      />
    </>
  );
}

export default CesiumWorld;