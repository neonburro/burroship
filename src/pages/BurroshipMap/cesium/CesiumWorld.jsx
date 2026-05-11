// src/pages/BurroshipMap/cesium/CesiumWorld.jsx
//
// The Cesium engine. CDN-loaded via window.Cesium (script tag in
// index.html). No npm bundling, no Vite gymnastics.
//
// What it does:
//   - Initializes a Cesium Viewer at the Burroship overview position
//   - Streams Google Photorealistic 3D Tiles as the base Earth layer
//   - Loads any Gaussian Splats declared on tour stops (splats: [...])
//   - Renders Compound beacons as glowing entities at their coords
//   - Runs the autonomous tour (approach/hold/depart) through every stop
//   - Tweens atmosphere per stop (lightPreset, fog density, weather)
//   - Suppresses Cesium's default UI; we render our own schedule

import { useEffect, useRef, useState, useCallback } from "react";

import {
  cesiumIonToken,
  atmospherePresets,
  tourRoute,
  compoundBeaconColors,
} from "../../../lib/burroship";
import locations from "../../../data/locations.json";

import CesiumSchedule from "./CesiumSchedule";

// Wait until window.Cesium is available — it loads from the CDN
// script tag in index.html, which may not be ready when this
// component mounts. Resolves the global Cesium namespace.
function waitForCesium() {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Cesium) {
      resolve(window.Cesium);
      return;
    }
    let tries = 0;
    const id = setInterval(() => {
      tries += 1;
      if (window.Cesium) {
        clearInterval(id);
        resolve(window.Cesium);
      } else if (tries > 100) {
        clearInterval(id);
        reject(new Error("Cesium CDN failed to load"));
      }
    }, 100);
  });
}

// Map our lightPreset names to JulianDate hour offsets that put the
// sun in the right position over Colorado. Cesium drives time-of-day
// lighting from viewer.clock.currentTime.
const HOUR_OFFSET = {
  dawn: -6,    // ~06:00 UTC over CO
  day: 0,      // local solar noon
  dusk: 6,     // ~18:00 UTC over CO
  night: 12,   // ~midnight over CO
};

function CesiumWorld() {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const tourRunningRef = useRef(false);
  const tourTimeoutRef = useRef(null);
  const beaconEntitiesRef = useRef([]);
  const splatTilesetsRef = useRef([]);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [tourActive, setTourActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);
  const [phaseEndsAt, setPhaseEndsAt] = useState(0);

  // ----- Atmosphere ----------------------------------------------

  const applyAtmosphere = useCallback((presetKey) => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

    const preset = atmospherePresets[presetKey];
    if (!preset) return;

    // Sun position via clock time
    const baseDate = Cesium.JulianDate.fromIso8601("2026-06-15T12:00:00Z");
    const hours = HOUR_OFFSET[preset.lightPreset] ?? 0;
    viewer.clock.currentTime = Cesium.JulianDate.addHours(
      baseDate,
      hours,
      new Cesium.JulianDate()
    );

    // Atmosphere intensity follows time of day
    viewer.scene.skyAtmosphere.atmosphereLightIntensity =
      preset.lightPreset === "night" ? 3.0 : 12.0;

    // Fog density
    viewer.scene.fog.enabled = true;
    viewer.scene.fog.density = preset.fogDensity;

    // Terrain exaggeration applies globally
    viewer.scene.verticalExaggeration = preset.exaggeration;

    // Stars only at night
    viewer.scene.skyBox.show = preset.lightPreset === "night";

    // Globe brightness ties to lighting
    viewer.scene.globe.dynamicAtmosphereLighting = true;
    viewer.scene.globe.atmosphereLightIntensity =
      preset.lightPreset === "night" ? 2.5 : 10.0;
  }, []);

  // ----- Camera flight -------------------------------------------

  const flyToStop = useCallback((config, durationMs) => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return Promise.resolve();

    return new Promise((resolve) => {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          config.longitude,
          config.latitude,
          config.altitude
        ),
        orientation: {
          heading: Cesium.Math.toRadians(config.heading ?? 0),
          pitch: Cesium.Math.toRadians(config.pitch ?? -45),
          roll: 0,
        },
        duration: durationMs / 1000,
        easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
        complete: resolve,
        cancel: resolve,
      });
    });
  }, []);

  // ----- Tour engine ---------------------------------------------

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
        // Initial quick-snap to hold position with starting heading
        await flyToStop(
          { ...config, heading: config.headingStart },
          2500
        );
        // Slow rotate to ending heading over the remainder
        await flyToStop(
          { ...config, heading: config.headingEnd },
          config.durationMs - 2500
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

  // ----- Beacons --------------------------------------------------
  // Render every location as a Cesium entity. Compound beacons get
  // their metallic-glow color; others get the lantern primary.

  const renderBeacons = useCallback(() => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

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
          position: Cesium.Cartesian3.fromDegrees(loc.lng, loc.lat, 150),
          point: {
            pixelSize: isBeacon ? 18 : 10,
            color: color.withAlpha(0.95),
            outlineColor: Cesium.Color.WHITE.withAlpha(0.5),
            outlineWidth: isBeacon ? 3 : 1.5,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            scaleByDistance: new Cesium.NearFarScalar(
              1000, 1.5, 50000, 0.6
            ),
          },
          label: isBeacon
            ? {
                text: loc.name + (isInDev ? "  ◉" : ""),
                font: "11px 'JetBrains Mono', monospace",
                fillColor: color,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -32),
                heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                translucencyByDistance: new Cesium.NearFarScalar(
                  5000, 1.0, 50000, 0.0
                ),
              }
            : undefined,
          description: loc.blurb,
          properties: { slug: loc.slug },
        });

        beaconEntitiesRef.current.push(entity);
      });
  }, []);

  // ----- Gaussian Splat loader -----------------------------------
  // Walk the tour route, find any stops with splats[] entries, load
  // each as a Cesium3DTileset from its ion asset ID. The splats
  // appear at their declared coordinates; Cesium handles streaming,
  // LOD, and composition with the underlying photoreal tiles.

  const loadSplats = useCallback(async () => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

    // Clear any prior splat tilesets
    splatTilesetsRef.current.forEach((t) => {
      try { viewer.scene.primitives.remove(t); } catch (e) { /* noop */ }
    });
    splatTilesetsRef.current = [];

    for (const stop of tourRoute) {
      if (!stop.splats || stop.splats.length === 0) continue;

      for (const splat of stop.splats) {
        try {
          const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(
            splat.assetId
          );

          // Position the splat at its declared coordinates
          if (splat.longitude != null && splat.latitude != null) {
            const target = Cesium.Cartesian3.fromDegrees(
              splat.longitude,
              splat.latitude,
              splat.height ?? 0
            );
            const m = Cesium.Transforms.eastNorthUpToFixedFrame(target);
            tileset.modelMatrix = m;
          }

          viewer.scene.primitives.add(tileset);
          splatTilesetsRef.current.push(tileset);
        } catch (err) {
          console.warn(
            "Splat load failed for assetId " + splat.assetId,
            err.message
          );
        }
      }
    }
  }, []);

  // ----- Init -----------------------------------------------------

  useEffect(() => {
    let cancelled = false;
    let viewer = null;

    async function init() {
      try {
        if (!cesiumIonToken) {
          throw new Error("CESIUM TOKEN MISSING — set VITE_CESIUM_ION_TOKEN");
        }

        const Cesium = await waitForCesium();
        if (cancelled || !containerRef.current) return;

        Cesium.Ion.defaultAccessToken = cesiumIonToken;

        viewer = new Cesium.Viewer(containerRef.current, {
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
          creditContainer: document.createElement("div"),
        });

        viewerRef.current = viewer;

        // Suppress the dot-grid imagery layer until photoreal tiles load
        viewer.scene.globe.show = true;
        viewer.scene.skyAtmosphere.show = true;

        // Photorealistic 3D Tiles — Google's global photogrammetry
        try {
          const tileset = await Cesium.createGooglePhotorealistic3DTileset();
          viewer.scene.primitives.add(tileset);
        } catch (e) {
          console.warn("Google Photorealistic 3D Tiles failed", e);
        }

        if (cancelled) {
          viewer.destroy();
          return;
        }

        // Atmospheric polish
        viewer.scene.skyAtmosphere.atmosphereLightIntensity = 12.0;
        viewer.scene.fog.enabled = true;
        viewer.scene.globe.dynamicAtmosphereLighting = true;
        viewer.scene.globe.dynamicAtmosphereLightingFromSun = true;
        viewer.scene.globe.showGroundAtmosphere = true;

        // Quieter credit display
        const creditDiv = document.createElement("div");
        creditDiv.style.cssText =
          "position:absolute;bottom:6px;right:120px;font-family:'JetBrains Mono',monospace;" +
          "font-size:9px;color:rgba(161,161,170,0.6);z-index:5;pointer-events:none;" +
          "letter-spacing:0.05em;";
        creditDiv.textContent = "© CESIUM · GOOGLE · MAXAR";
        containerRef.current.appendChild(creditDiv);

        setReady(true);

        renderBeacons();
        await loadSplats();
        applyAtmosphere(tourRoute[0].atmosphere);

        setTimeout(() => {
          if (!cancelled) startTour();
        }, 1500);
      } catch (err) {
        console.error("Cesium init failed", err);
        if (!cancelled) {
          setError(err.message || "Cesium failed to initialize");
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      tourRunningRef.current = false;
      if (tourTimeoutRef.current) clearTimeout(tourTimeoutRef.current);
      if (viewer && !viewer.isDestroyed()) {
        try { viewer.destroy(); } catch (e) { /* noop */ }
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