// src/lib/empty-stub.js
//
// Intentionally empty. Used as a Vite alias target to short-circuit
// Cesium's KML data source imports, which reference a path that
// newer @zip.js/zip.js versions don't expose. Burroship doesn't use
// KML, so stubbing these out is safe.
export default {};
