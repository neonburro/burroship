# Gaussian Splats for Burroship

A practical handbook for capturing the world into 3D and putting it on the map.
Written for someone new to splats. By the end of this you will know exactly
what to shoot, what app to process it with, and how to drop the result into
`lib/burroship.js` so it appears in the live map.

---

## What a Gaussian Splat actually is

Forget how 3D usually works — meshes and textures and polygons. A Gaussian
Splat represents a place as millions of soft 3D blobs called "Gaussians."
Each blob has a position, a color, an opacity, and a directional shimmer
that captures how the place looks from different angles. Stack enough of
them together and you get something that reads as a photograph in 3D.

The result looks better than photogrammetry meshes because the Gaussians
encode view-dependent effects — reflections on water, fuzzy edges on
foliage, the way light catches a dusty window. Old-school 3D scans look
sterile. Splats look real.

The trade-off: you can only render what you captured. Splats are not a
generative AI — they are a reconstruction of photographs. Garbage in,
garbage out applies absolutely.

---

## Equipment recommendations

**What you have today is enough to start.**

iPhone (any model from the last 4 years) — great. Modern iPhones have
high-quality cameras and the Polycam / Luma AI apps run directly on
them. This is the fastest path to your first splat.

GoPro — workable for outdoor moving captures (drive-bys, ridgelines)
but trickier indoors because GoPros bake in heavy lens distortion that
processors must correct.

**What to add later, in priority order:**

1. **DJI Mini 4 Pro drone** — about $760. Indispensable for the Compound,
   ridgelines, anything bigger than a building. Has obstacle avoidance and
   does waypoint missions, so you can program a perfect orbit around a
   subject and walk away while it flies. This single purchase changes
   what's possible more than anything else.

2. **Gimbal stabilizer for the iPhone (DJI Osmo Mobile 6)** — about $130.
   Removes the micro-shake that hurts splat quality on handheld captures.
   Worth it once you start scanning interiors that matter.

3. **Insta360 X4 or X5 360 camera** — $400-600. The fastest way to capture
   interiors. One pass through a room and you have all angles. Great for
   the Burroship lounge, geodesic dome interiors, the StackHouse once it's
   built.

4. **DSLR or mirrorless with a wide prime lens** — only matters when you
   need the highest possible quality for a hero shot. iPhone is genuinely
   sufficient for 95% of cases. Don't buy this first.

**Skip for now:** LiDAR scanners (Leica RTC360, Trimble X12) cost $20k+,
output point clouds not splats, and the processing pipeline is different.
We'll talk about LiDAR when you have client demand for sub-centimeter
precision — for marketing-quality splats, iPhone + drone is sufficient.

---

## The capture playbook

### Coverage rules that matter

**Capture from many angles, many heights, many distances.** A splat
trained on photos from one angle will look right from that angle and
melt from any other. Imagine you're a fly buzzing around the subject —
you want to have been everywhere a future viewer might want to be.

**Overlap each frame heavily with the previous one.** 60-80% overlap is
the target. The processor needs shared features between adjacent photos
to figure out where each was taken.

**Keep the lighting consistent.** Don't capture half on a sunny morning
and half at golden hour. Shadows that change between photos confuse the
processor and create floating ghosts in the splat. If you must shoot
across hours, use overcast days.

**Keep the subject stationary.** Trees swaying, cars driving, people
walking — all of these become reconstruction errors. Time your captures
for low-wind, low-traffic moments.

**Stay sharp.** Motion blur is the number-one cause of bad splats. Use a
gimbal or be extremely steady. Polycam will reject blurry frames but it
ruins what's left.

### Image counts by subject size

These are minimums. More is always better up to about 1500 images:

| Subject | Minimum | Comfortable | Hero quality |
|---------|---------|-------------|--------------|
| Single object (vehicle, sculpture) | 80 | 150 | 300 |
| Single room interior | 120 | 250 | 500 |
| Full building exterior | 200 | 400 | 800 |
| Property + outbuildings | 400 | 800 | 1500 |
| Town block / Main Street | 600 | 1200 | 2500 |

### How to actually walk the capture

**For a building exterior:** Stand back far enough to see the whole
thing. Walk a slow ring around it, taking one photo every step or two.
Now move closer, walk another ring at half the distance. Now closer
still. Three concentric rings at three heights (eye level, crouched,
held overhead) is the baseline. Each photo should have a generous
overlap with the one before it.

**For a building interior:** Stand in one corner of the room, slowly
rotate, taking a photo every 15-20 degrees so you complete the room in
24 photos. Walk to the next corner and repeat. Walk to the center, do
another rotation. Capture ceiling shots looking up, floor shots looking
down, and detail shots of anything that matters (fireplace, window,
artwork). 200+ photos for a single living-room sized space is normal.

**For a property with terrain:** Use the drone. Program a "Point of
Interest" mission orbiting the center of your subject at three altitudes
(low, mid, high) and let it fly all three automatically. Then walk the
ground perimeter with the phone for low-angle coverage.

**For a ridgeline or landmark you can't approach:** Fly the drone in
a wide oval around the peak from multiple altitudes. This is how
Chimney Rock or Mt Sneffels would eventually become splats.

### What to capture first — recommended order for Burroship

1. **A single Geoship bioceramic dome interior** (once one is built).
   Small enclosed space, dramatic lighting, perfect "show this off" subject.
   ~250 photos, ~1 hour walking it, processes in ~2 hours, done.

2. **Downtown Ridgway one block** (Clinton St between 2nd and 4th).
   Public space, no permissions needed, gives you the demo to show
   the town council. ~1200 photos with drone + phone, processes overnight.

3. **The Compound property from the air** (once buildings exist).
   The hero shot. Drone flight of the entire site at multiple
   altitudes. ~600 photos, processes in 3-4 hours.

4. **Colorado Boy Depot interior** (with Matt's permission). The
   first client business splat. Becomes a demo for tourism use case.

5. **The StackHouse + Burroships staging** (once they're real
   physical sites). The lore-anchoring shots.

---

## Processing the photos into a splat

You have three tiers of processing. Each trades cost for quality and control.

### Tier 1 — Polycam (recommended starting point)

- $10-15/month on the consumer plan
- iPhone app captures and uploads in one flow
- 30 minutes to 2 hours processing on their cloud
- Export as `.ply` (splat point cloud) or `.glb` (mesh fallback)

Workflow:
1. Open Polycam, choose Gaussian Splatting mode
2. Walk the subject following the coverage rules above
3. Hit "Process"
4. When done, hit "Export" → choose `.ply` format → download

This is the fastest way to your first splat. Limitations: max ~2000
images, no fine control over the optimization, output quality is good
but not best-in-class.

### Tier 2 — Luma AI (better quality, also consumer-friendly)

- Free tier exists, $30/month for Pro features
- Web app, accepts video or photo bundle
- Slightly better visual quality than Polycam in most cases
- Export as `.ply` (Gaussian Splat) or `.usdz` (Apple mesh)

Workflow:
1. Record a slow walking video (4K, 30 minutes max) or upload a photo bundle
2. Upload to Luma AI web
3. Wait 1-4 hours
4. Download the splat

Luma is the safer pick if quality matters more than speed.

### Tier 3 — Cesium ion's built-in processing

- Included with Commercial plan ($149/month)
- Upload raw images directly to Cesium ion
- Outputs 3D Tiles with level-of-detail streaming built in
- Hosts and streams the result automatically

This is the eventual path for production splats because it skips the
"convert to 3D Tiles" step (Polycam and Luma give you a raw .ply that
you still have to convert before streaming). For the first few captures,
use Polycam or Luma. Once you have a real workflow, evaluate moving
upstream to Cesium ion.

### Tier 4 — Self-hosted (do not start here)

Tools like NeRFStudio (`gsplat`, `splatfacto`) on a local GPU give you
total control and zero monthly fees. They also require a beefy NVIDIA
GPU (RTX 3090 or better), Linux, and significant setup time. Worth it
eventually if you process many splats per week. Not worth it for your
first three.

---

## Uploading to Cesium ion

Once you have a `.ply` file from Polycam or Luma:

1. Log in to https://ion.cesium.com
2. Click **My Assets** → **Add data**
3. Choose **3D Tiles** as the destination format
4. Drag in your `.ply` file
5. Set the **source type** to "3D Gaussian Splat"
6. Choose your tiling preset (default is fine)
7. Submit and wait — usually 30 minutes to a few hours depending on
   splat size

When processing is complete, the asset gets an **Asset ID** (a number
like `2845691`). Copy this — it's how the code references your splat.

The Commercial plan ($149/month) is required if NeonBurro crosses
$50K annual revenue or has raised $50K+, which it has. Free Community
tier is fine while building and testing.

---

## Adding a splat to the map

This is the easy part once you have an Asset ID.

Open `src/lib/burroship.js`. Find the tour stop you want the splat
attached to — for example, the Compound:

```javascript
{
  name: "The Compound",
  slug: "compound",
  longitude: -107.5800,
  latitude: 38.1380,
  atmosphere: "compoundDusk",
  splats: [],   // ← this is where it goes
  ...
}
```

Add an entry to the splats array:

```javascript
splats: [
  {
    assetId: 2845691,        // from Cesium ion
    longitude: -107.5800,    // where the splat is geographically anchored
    latitude: 38.1380,       // (use the real location of what you captured)
    height: 2200,            // ground elevation in meters (look up via the
                             // location's known elevation — Ridgway is ~2080m,
                             // the Compound area is ~2200m, Sneffels summit
                             // is ~4313m, etc.)
  },
],
```

Save the file. The Cesium engine reads `tourRoute` on load, finds any
stops with splats declared, and loads them as 3D Tilesets at their
declared positions. They'll be visible the next time the tour camera
flies near them.

For multiple splats at one location (rare but supported), just add more
objects to the array.

---

## Quality-of-life tips

**Test the splat before adding it to production.** Cesium ion has a
Sandcastle preview that loads any of your assets in a test viewer.
Use it to verify the splat looks right before you wire it into
Burroship.

**Splats have a "right size".** Too small and they look like a smudge
on the photoreal Google tiles underneath. Too big and they tower over
real-world buildings. Capture coverage that matches the scale of what
you want represented.

**Splats fade in / out poorly at the moment.** The current Cesium
implementation doesn't have great blend logic between splats and the
underlying photoreal layer. You'll see a visible "pop" when entering
splat range. This will improve as Cesium iterates; for now, design the
tour to fly slowly into splat zones rather than warping in.

**Capture in a single session if possible.** Lighting changes ruin
splats. Sunrise to sunset is too long. Aim for under 2 hours of
shooting per splat.

**Drone splats: capture at golden hour, never noon.** Overhead noon
sun bakes harsh shadows that confuse the optimizer. The hour after
sunrise or before sunset gives soft directional light that splats
love.

**Backup raw photos to cloud immediately.** If a splat doesn't turn
out, you'll need to reprocess. Losing the source photos means
re-shooting.

**Watch the Cesium ion usage quotas.** Free tier covers building and
testing. Once you ship, monitor streaming GB / month against your
plan limit. Each splat asset accounts toward storage, each end-user
session accounts toward streaming.

---

## Phase plan

**Phase 1 (now — code is shipped):** Map renders Google Photoreal
3D Tiles base. Splats array exists on every tour stop but is empty.
No splat work needed; Burroship looks great out of the box.

**Phase 2 (within 2 weeks):** Capture your first splat. Recommend
starting with a single interior space — easier than outdoor, faster
to process, lower stakes. The Compound when it has any built
structure, or a Geoship dome interior at a vendor demo, or even your
office. Get the workflow down with something low-stakes first.

**Phase 3 (within 6 weeks):** First "real" splat — downtown Ridgway
or a hero Compound shot. This becomes the demo for the town-licensing
business model.

**Phase 4 (3-6 months out):** Ridgway town council pitch. Splat-based
3D map of Ridgway as a tourism and planning tool. Subdomain at
`ridgway.burroship.com`. Recurring contract.

**Phase 5 (6-12 months out):** Replicate for other towns. Ouray,
Telluride, Mountain Village — each becomes its own subdomain, its own
splat library, its own monthly recurring revenue.

---

## Reference links

- Cesium ion: https://ion.cesium.com
- Polycam: https://poly.cam
- Luma AI: https://lumalabs.ai
- Cesium pricing: https://cesium.com/pricing
- 3D Tiles spec (Gaussian Splat extension): https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_content_gaussian_splatting
- DJI Mini 4 Pro: https://www.dji.com/mini-4-pro

---

## When you have your first asset ID

Send me the asset ID and the approximate longitude/latitude of what you
captured. I will add the splats entry to `lib/burroship.js` and verify it
loads correctly in the live tour. From there you have a working pattern
to follow for everything else.