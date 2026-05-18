# Hero Render Brief
 
**Status:** LOCKED · ready to generate against
**Owner:** Owner/Operator produces, Ion holds the anti-drift leash
**Inherits from:** 04_DESIGN_SYSTEM/BRAND.md (canon v1.2),
04_DESIGN_SYSTEM/IMAGERY.md, 03_PRODUCT/SITEMAP.md
 
---
 
This is the single source of truth for the homepage hero asset. It
reconciles every ratified decision from the design system so a
generation pass lands on-canon the first time instead of through
rework. The hero is the one hard gate on the homepage; this brief is
what unblocks it.
 
---
 
## The one-line intent
 
A slow, cinematic arrival at a docked Burroship in cold San Juans
mountain dusk — a real vessel in a real place, warm intelligence
leaking out of a quiet machine.
 
## Non-negotiables (from ratified canon)
 
1. **Organism and vessel are distinct.** The Burroship is a *vessel*
   — a real, weathered, heavy craft the burros crew. It is NOT a
   burro, not a burro in a costume, not a mascot shape. If the render
   reads as a cute animal-ship hybrid, it is off-canon and rejected.
   No literal human hands anywhere.
2. **90/10 color.** ~90% cold neutral and natural — stone, fog,
   snow, dusk blue-grey, weathered metal. ~10% accent as *signal
   leakage*, never a flood.
3. **The accent is Petrified Plum `#5B3A59`.** This is LOCKED. The
   warm light leaking from the vessel — windows, a door seam, an
   interior glow — carries this hue. A render with zero accent
   leakage is off-canon by founder ruling. A render where the plum
   is a flood, not a leak, is also off-canon.
4. **Mountain observatory, not esports team.** Quiet, observant,
   restrained, slightly uncanny, patient. Not heroic, not explosive,
   not a game key-art splash. If it feels like a movie poster, pull
   back.
5. **Real place.** The San Juans near Ridgway — real ridgelines,
   real alpine scale, real cold light. Not a generic fantasy
   mountain.
 
## Composition — desktop (primary)
 
- **Format:** wide cinematic landscape (target 16:9 or wider, e.g.
  2400×1000+).
- **Subject placement:** the docked vessel sits off-center — roughly
  the right or left third — leaving a large quiet negative-space
  region for the homepage thesis line and the two actions to sit over
  cleanly. The copy area must be calm and uncluttered, low detail.
- **Distance:** mid-to-far. The vessel is integrated into the
  landscape, not filling the frame. We are arriving toward it, not
  standing on it.
- **Light:** cold mountain dusk — blue-grey ambient, last light on
  the ridges, the warm Petrified Plum interior glow as the only warm
  source. The warm/cold contrast is the entire emotional engine of
  the image.
- **Atmosphere:** thin cold air, possible low fog or haze at the
  vessel's base, snow on the high ground. Restrained. No drama
  weather.
 
## Composition — mobile (separate, not a crop)
 
- **Format:** portrait (target 1080×1600+).
- **This is a different composition, not a center-crop of desktop.**
  The vessel is the single clear focal point, lower-center or
  lower-third, with the cold sky and ridgeline above carrying the
  negative space for stacked copy.
- Same light, same palette, same vessel silhouette — recomposed
  vertically. The silhouette must read as the same canonical vessel,
  not a redesign.
 
## Mood words (for the generation prompt)
 
Alpine observatory. Docked airship at cold dusk. Weathered industrial
vessel. Warm Petrified Plum interior glow through small windows.
Architectural silence. Last light on San Juan ridgelines. Thin cold
air. Restrained. Patient. Slightly uncanny. Real landscape, mythic
purpose. Cinematic but not heroic.
 
## Negative prompt (what kills it)
 
No mascot. No cute. No animal-vessel hybrid. No human hands. No people
foregrounded. No explosive light, no lens flare drama, no neon flood.
No generic fantasy mountain. No game key-art energy. No startup gloss.
No flat daylight. Plum is a leak, never a wash.
 
## Acceptance test
 
Hold the result against five questions. All five must be yes:
 
1. Is the vessel clearly a *crewed craft*, not a creature?
2. Is the palette ~90% cold neutral with plum only as a leak?
3. Does the desktop frame have a genuine quiet area for copy?
4. Does it feel like a patient observatory, not a poster?
5. Could this be a real place near Ridgway at real dusk?
 
A render that fails any one is iterated, not shipped. Ion holds this
test; the Owner/Operator produces against it.
 
## What happens after the asset exists
 
1. Asset goes into the repo (path TBD, likely `public/hero/`).
2. The hero section of the Home rebuild gets built around the real
   asset — desktop wide, mobile portrait, copy over the negative
   space, the two actions from the sitemap.
3. `INFORMATION_ARCHITECTURE.md` hero status flips PENDING-ASSET →
   the real section. The homepage's one hard gate closes.
 
Everything downstream of the hero is already unblocked: atoms shipped,
Petrified Plum locked, fonts settled, IA written. This brief is the
last thing standing between the current state and a buildable
homepage, and producing the asset is the Owner/Operator's to do.
