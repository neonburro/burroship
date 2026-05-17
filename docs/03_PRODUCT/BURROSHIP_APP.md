# Burroship App
 
**Status:** DRAFT · written fresh, factual
**Owner:** Warbleur, Owner/Operator ratifies
**Inherits from:** 00_FOUNDATION/BRAND_ARCHITECTURE.md
 
---
 
## What it is
 
The primary digital surface of the Compound world. The main interface,
for now. When someone meets Neon Burro, this is where they meet it.
 
## Its job in the architecture
 
Per the brand architecture: Neon Burro is who does the work, the
Compound is where the work physically lives, and the Burroship app is
where you meet the work. It is a surface, not the whole brand. It
represents the Compound; it is not the Compound.
 
## Structure
 
- Routes: `/`, `/build/`, `/deploy/`, `/automate/`, `/world/`
- Home is the front door: atmosphere first, then operational proof,
  then the council, then the world
- `/world/` is the immersive map surface, mounted without the
  standard nav and footer
- Build, Deploy, Automate are interior destinations, each with its
  own emotional register: craft, trust, intelligence
 
## The home page direction
 
Near-monochrome interface. Black and white base, locked by founder
ruling. The single source of color, motion, and emotion is the
Burroship hero imagery, not the chrome. This is the 90/10 rule
applied to the web: the interface is 90% neutral, the accent is
signal leakage. Color comes from the imagery, never the UI.
 
The hero is the cinematic Burroship in real San Juans terrain. The
wide establishing render is the chosen hero direction. Desktop is a
wide cinematic landscape with negative space for copy; mobile is a
separate portrait composition, not a center-crop, per the Burro
Design Canon hero doctrine.
 
## State
 
The home sections were reorganized into `pages/Home/sections/`
(shipped). The atoms (Button v2, Eyebrow v2) are rebuilt,
backward-compatible, staged. The full home rebuild is gated on the
hero asset existing and on the design system finalizing — including
the one pending accent color.
 
## What does not change
 
The Burroship app inherits the brand architecture and the design
system. It does not redefine them. If the app implies a different
brand hierarchy than `BRAND_ARCHITECTURE.md`, that document wins.
