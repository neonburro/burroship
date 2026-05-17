# Motion
 
**Status:** DRAFT · written fresh from ratified material
**Owner:** Ion and Volt
**Inherits from:** 04_DESIGN_SYSTEM/STYLE_GUIDE.md
 
---
 
## The principle
 
Motion is slow, useful, almost infrastructural. It reveals state. It
does not attract attention. Arrival-based reveals are correct;
performative choreography is not. The Apple-grade feeling comes from
pacing, not animation density.
 
## The rules
 
- Default reveal is fade plus a small vertical rise. Nothing more
  ornate by default.
- Reduced motion is respected, always. This is a hard requirement on
  the Reveal atom, not a nicety. `useReducedMotion` gates motion
  before it ships as a pattern.
- Stagger is light. Interval around 0.05 to 0.06 seconds. It should
  feel inevitable, not theatrical. A larger interval drifts toward
  presentation-deck.
- Large physical objects move heavily and precisely. Never like toys
  or drones. The Burroship has mass.
- Functional ornament is allowed sparingly: a restrained live-signal
  beacon that makes a control read as a real system control. Off by
  default, reduced-motion aware, never decorative.
 
## What is parked
 
A deeper motion doctrine (blink rhythm, idle behavior, camera
behavior, environmental response) was proposed and deliberately
deferred. It is governed uncertainty, not neglect. It belongs to a
later canon cycle, not now. The burros should feel watchful, never
hyperactive — but that section is parked until there is operational
reason to write it.
 
## The test
 
Does the motion help the user understand state, or does it perform
for its own sake? If it performs, it is wrong, regardless of how good
it looks.
