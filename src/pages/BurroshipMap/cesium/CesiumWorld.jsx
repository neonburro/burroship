// src/pages/BurroshipMap/cesium/CesiumWorld.jsx
//
// Continuous-corridor flight engine. The tour is now a single
// looping path of waypoints. Camera smoothly eases between them.
// No approach/hold/depart phases — just one fluid airship cruise.
//
// Props from BurroshipMap:
//   locations       — all locations (Supabase or fallback)
//   tourStops       — hydrated waypoint stops with location data joined
//   tourPaused      — boolean, pauses the loop
//   onSelectLocation — callback when a beacon is clicked

import { useEffect, useRef, useState, useCallback } from "react";

import {
  cesiumIonToken,
  atmospherePresets,
  compoundBeaconColors,
  burroshipBounds,
  defaultCamera,
} from "../../../lib/burroship";

import CesiumSchedule from "./CesiumSchedule";

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

const HOUR_OFFSET = {
  dawn: -6,
  day: 0,
  dusk: 6,
  night: 12,
};

function CesiumWorld({ locations, tourStops, tourPaused, onSelectLocation }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const tourRunningRef = useRef(false);
  const beaconEntitiesRef = useRef([]);
  const splatTilesetsRef = useRef([]);
  const handlerRef = useRef(null);
  const currentFlyToCancelRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [tourActive, setTourActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(null);
  const [segmentEndsAt, setSegmentEndsAt] = useState(0);

  // ----- Atmosphere ----------------------------------------------

  const applyAtmosphere = useCallback((presetKey) => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

    const preset = atmospherePresets[presetKey];
    if (!preset) return;

    const baseDate = Cesium.JulianDate.fromIso8601("2026-06-15T12:00:00Z");
    const hours = HOUR_OFFSET[preset.lightPreset] ?? 0;
    viewer.clock.currentTime = Cesium.JulianDate.addHours(
      baseDate, hours, new Cesium.JulianDate()
    );

    viewer.scene.skyAtmosphere.atmosphereLightIntensity =
      preset.lightPreset === "night" ? 3.0 : 12.0;
    viewer.scene.fog.enabled = true;
    viewer.scene.fog.density = preset.fogDensity;
    viewer.scene.verticalExaggeration = preset.exaggeration;
    viewer.scene.skyBox.show = preset.lightPreset === "night";
    viewer.scene.globe.dynamicAtmosphereLighting = true;
    viewer.scene.globe.atmosphereLightIntensity =
      preset.lightPreset === "night" ? 2.5 : 10.0;
  }, []);

  // ----- Smooth camera flight ------------------------------------
  // Cubic-in-out easing is the airship feel — gentle acceleration
  // out of one waypoint, gentle deceleration into the next.

  const flyTo = useCallback((waypoint, durationMs) => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return Promise.resolve();

    if (currentFlyToCancelRef.current) {
      currentFlyToCancelRef.current();
    }

    return new Promise((resolve) => {
      let resolved = false;
      const safeResolve = () => {
        if (!resolved) {
          resolved = true;
          currentFlyToCancelRef.current = null;
          resolve();
        }
      };
      currentFlyToCancelRef.current = safeResolve;

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          waypoint.longitude, waypoint.latitude, waypoint.altitude
        ),
        orientation: {
          heading: Cesium.Math.toRadians(waypoint.heading ?? 0),
          pitch: Cesium.Math.toRadians(waypoint.pitch ?? -22),
          roll: 0,
        },
        duration: durationMs / 1000,
        easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
        complete: safeResolve,
        cancel: safeResolve,
      });
    });
  }, []);

  // ----- Continuous corridor loop --------------------------------

  const tourStopsRef = useRef(tourStops);
  const tourPausedRef = useRef(tourPaused);

  useEffect(() => { tourStopsRef.current = tourStops; }, [tourStops]);
  useEffect(() => { tourPausedRef.current = tourPaused; }, [tourPaused]);

  const stopTour = useCallback(() => {
    tourRunningRef.current = false;
    setTourActive(false);
    setCurrentStopIndex(null);
    if (currentFlyToCancelRef.current) currentFlyToCancelRef.current();
  }, []);

  // Run waypoint n → fly to waypoint (n+1) → recurse.
  // currentStopIndex represents "we're currently flying TOWARD this index"
  // (the destination waypoint), so the schedule UI reads "approaching X".

  const runWaypoint = useCallback(
    async (destIndex) => {
      if (!tourRunningRef.current) return;

      if (tourPausedRef.current) {
        const waitId = setInterval(() => {
          if (!tourPausedRef.current && tourRunningRef.current) {
            clearInterval(waitId);
            runWaypoint(destIndex);
          }
        }, 250);
        return;
      }

      const stops = tourStopsRef.current;
      if (!stops || !stops[destIndex]) return;

      const dest = stops[destIndex];
      const prevIndex = (destIndex - 1 + stops.length) % stops.length;
      const prev = stops[prevIndex];

      // duration_to_next_ms lives on the PREVIOUS stop (it's the
      // time to travel from prev to dest)
      const durationMs = prev.duration_to_next_ms || 50000;

      setCurrentStopIndex(destIndex);
      setSegmentEndsAt(Date.now() + durationMs);

      // Atmosphere tweens at start of each segment — smooth handoff
      applyAtmosphere(dest.atmosphere);

      await flyTo(dest.waypoint, durationMs);

      if (!tourRunningRef.current) return;

      // Loop forever
      const nextIndex = (destIndex + 1) % stops.length;
      runWaypoint(nextIndex);
    },
    [applyAtmosphere, flyTo]
  );

  const startTour = useCallback(() => {
    if (tourRunningRef.current) return;
    tourRunningRef.current = true;
    setTourActive(true);
    // Start by flying from waypoint 0 (initial landing) to waypoint 1
    runWaypoint(1);
  }, [runWaypoint]);

  // ----- Beacons -------------------------------------------------

  const renderBeacons = useCallback(() => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

    beaconEntitiesRef.current.forEach((e) => viewer.entities.remove(e));
    beaconEntitiesRef.current = [];

    locations
      .filter((loc) => loc.latitude != null && loc.longitude != null)
      .forEach((loc) => {
        const isBeacon = loc.subcategory === "compound-beacon";
        const palette = isBeacon
          ? compoundBeaconColors[loc.beacon_color]
          : null;

        const colorHex = palette ? palette.base : "#A8D055";
        const color = Cesium.Color.fromCssColorString(colorHex);
        const isInDev = loc.status === "in-development";

        const entity = viewer.entities.add({
          name: loc.name,
          position: Cesium.Cartesian3.fromDegrees(
            loc.longitude, loc.latitude, 150
          ),
          point: {
            pixelSize: isBeacon ? 18 : 10,
            color: color.withAlpha(0.95),
            outlineColor: Cesium.Color.WHITE.withAlpha(0.5),
            outlineWidth: isBeacon ? 3 : 1.5,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            scaleByDistance: new Cesium.NearFarScalar(
              1000, 1.5, 80000, 0.6
            ),
          },
          label: loc.featured
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
                  10000, 1.0, 80000, 0.0
                ),
              }
            : undefined,
          properties: { locationData: loc },
        });

        beaconEntitiesRef.current.push(entity);
      });
  }, [locations]);

  // ----- Splat loader --------------------------------------------

  const loadSplats = useCallback(async () => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

    splatTilesetsRef.current.forEach((t) => {
      try { viewer.scene.primitives.remove(t); } catch (e) { /* noop */ }
    });
    splatTilesetsRef.current = [];

    for (const loc of locations) {
      if (!loc.splat_asset_id) continue;
      try {
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(
          loc.splat_asset_id
        );
        const target = Cesium.Cartesian3.fromDegrees(
          loc.longitude,
          loc.latitude,
          (loc.elevation_m || 0) + (loc.splat_height_offset_m || 0)
        );
        tileset.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(target);
        viewer.scene.primitives.add(tileset);
        splatTilesetsRef.current.push(tileset);
      } catch (err) {
        console.warn("Splat load failed for", loc.slug, err.message);
      }
    }
  }, [locations]);

  // ----- Click handler -------------------------------------------

  const setupClickHandler = useCallback(() => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed() || !Cesium) return;

    if (handlerRef.current) {
      handlerRef.current.destroy();
      handlerRef.current = null;
    }

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction((click) => {
      const picked = viewer.scene.pick(click.position);
      if (picked?.id?.properties?.locationData) {
        const locData = picked.id.properties.locationData.getValue();
        onSelectLocation(locData);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handlerRef.current = handler;
  }, [onSelectLocation]);

  // ----- Camera bounds enforcement -------------------------------

  const setupBoundsEnforcement = useCallback(() => {
    const Cesium = window.Cesium;
    const viewer = viewerRef.current;
    if (!viewer || !Cesium) return;

    const bounds = burroshipBounds;

    viewer.camera.moveEnd.addEventListener(() => {
      if (tourRunningRef.current) return;
      const pos = Cesium.Cartographic.fromCartesian(viewer.camera.position);
      const lon = Cesium.Math.toDegrees(pos.longitude);
      const lat = Cesium.Math.toDegrees(pos.latitude);
      const alt = pos.height;
      let outOfBounds = false;
      let clamped = { longitude: lon, latitude: lat, altitude: alt };
      if (lon < bounds.west) { clamped.longitude = bounds.west; outOfBounds = true; }
      if (lon > bounds.east) { clamped.longitude = bounds.east; outOfBounds = true; }
      if (lat < bounds.south) { clamped.latitude = bounds.south; outOfBounds = true; }
      if (lat > bounds.north) { clamped.latitude = bounds.north; outOfBounds = true; }
      if (alt < bounds.minAltitude) { clamped.altitude = bounds.minAltitude; outOfBounds = true; }
      if (alt > bounds.maxAltitude) { clamped.altitude = bounds.maxAltitude; outOfBounds = true; }
      if (outOfBounds) {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            clamped.longitude, clamped.latitude, clamped.altitude
          ),
          duration: 1.2,
          easingFunction: Cesium.EasingFunction.QUADRATIC_OUT,
        });
      }
    });
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

        // Land at the corridor's first waypoint — Ridgway at 15,000ft
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(
            defaultCamera.longitude,
            defaultCamera.latitude,
            defaultCamera.altitude
          ),
          orientation: {
            heading: Cesium.Math.toRadians(defaultCamera.heading),
            pitch: Cesium.Math.toRadians(defaultCamera.pitch),
            roll: 0,
          },
        });

        viewer.scene.skyAtmosphere.show = true;
        viewer.scene.skyAtmosphere.atmosphereLightIntensity = 12.0;
        viewer.scene.fog.enabled = true;
        viewer.scene.globe.dynamicAtmosphereLighting = true;
        viewer.scene.globe.dynamicAtmosphereLightingFromSun = true;
        viewer.scene.globe.showGroundAtmosphere = true;
        viewer.scene.globe.depthTestAgainstTerrain = true;

        viewer.scene.screenSpaceCameraController.minimumZoomDistance = 800;
        viewer.scene.screenSpaceCameraController.maximumZoomDistance = 25000;

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

        const creditDiv = document.createElement("div");
        creditDiv.style.cssText =
          "position:absolute;bottom:6px;right:120px;font-family:'JetBrains Mono',monospace;" +
          "font-size:9px;color:rgba(161,161,170,0.6);z-index:5;pointer-events:none;" +
          "letter-spacing:0.05em;";
        creditDiv.textContent = "© CESIUM · GOOGLE · MAXAR";
        containerRef.current.appendChild(creditDiv);

        setReady(true);

        renderBeacons();
        loadSplats();
        setupClickHandler();
        setupBoundsEnforcement();

        if (tourStops && tourStops.length > 0) {
          applyAtmosphere(tourStops[0].atmosphere);
          // Start the loop after a brief beat so the landing settles
          setTimeout(() => {
            if (!cancelled) startTour();
          }, 2500);
        }
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
      if (handlerRef.current) {
        try { handlerRef.current.destroy(); } catch (e) {}
        handlerRef.current = null;
      }
      if (viewer && !viewer.isDestroyed()) {
        try { viewer.destroy(); } catch (e) {}
      }
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready) {
      renderBeacons();
      loadSplats();
    }
  }, [ready, locations, renderBeacons, loadSplats]);

  useEffect(() => {
    if (ready) setupClickHandler();
  }, [ready, setupClickHandler]);

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
      {tourStops && (
        <CesiumSchedule
          tourActive={tourActive}
          currentStopIndex={currentStopIndex}
          segmentEndsAt={segmentEndsAt}
          tourStops={tourStops}
          tourPaused={tourPaused}
        />
      )}
    </>
  );
}

export default CesiumWorld;