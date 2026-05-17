# Design Tokens
 
**Status:** DRAFT · structure final, ONE value pending
**Owner:** Volt (palette finalization), Warbleur (token structure)
**Inherits from:** 04_DESIGN_SYSTEM/STYLE_GUIDE.md, live src/styles/index.css
 
---
 
## The model
 
Three tiers. This is the pattern that lets the whole docs tree and
codebase be written now while exactly one color decision stays open.
 
1. **Base palette** — raw values. The only place a hex literal exists.
2. **Semantic aliases** — `accent`, `ink`, `surface`, `border`,
   `warmth`. Every file and component references these, never a hex.
3. **Component tokens** — per-component, reference semantic aliases.
 
Because everything references the semantic layer, the unresolved
accent color touches exactly one line in the base palette. Swapping it
when Volt delivers is a one-value change, not a rewrite.
 
## Base palette
 
Locked to live `src/styles/index.css` `@theme`. These are the source
of truth. Brand-language names are for designer communication only.
 
| Semantic | Token | Value | Status |
|---|---|---|---|
| ink | `--color-ink` | `#0A0A0A` | LOCKED (black) |
| ink-muted | `--color-ink-muted` | `#5A6172` | LOCKED |
| ink-faint | `--color-ink-faint` | `#9CA3AF` | LOCKED |
| bg | `--color-bg` | `#FFFFFF` | LOCKED (white) |
| surface | `--color-surface` | `#F7F7F5` | LOCKED |
| surface-deep | `--color-surface-deep` | `#EDEDE8` | LOCKED |
| line | `--color-line` | `#E8E8E5` | LOCKED |
| dark-bg | `--color-dark-bg` | `#020503` | LOCKED |
| dark-ink | `--color-dark-ink` | `#FFFFFF` | LOCKED |
| **accent** | `--color-accent` | **`#7AB300` (current, PENDING)** | **NOT FINAL** |
| accent-hover | `--color-accent-hover` | `#8AC926` (PENDING) | NOT FINAL |
| dark-accent | `--color-dark-accent` | `#A8D055` (PENDING) | NOT FINAL |
 
## The one open decision
 
The accent is the only unresolved value in the entire system. The
Owner/Operator ruled it moves to a "magical descriptive fruit"
direction, away from the current deep lime, and delegated the
finalization to Volt. Until Volt delivers exact hexes:
 
- The black-and-white base is **locked and final** (founder ruling)
- The accent stays at the current deep lime as a placeholder ONLY
- No file anywhere hardcodes the accent hex — all reference
  `--color-accent` so the swap is one line here
- The fruit name is the brand layer, never the code layer. Code uses
  `accent`. Brand language uses the fruit name. They map here.
 
## Naming grammar (brand layer, when Volt delivers)
 
State or age modifier plus exotic fruit. Examples of the grammar, not
the decision: Petrified Plum, Sunbruised Persimmon, Frostbitten
Quince, Ember Fig, Midnight Lychee. Volt selects the hue and the name
together and confirms accent count (single vs primary plus rare
secondary). Ion gives the emotional-temperature read.
 
## Rule
 
If this file and `src/styles/index.css` ever disagree, the code is
the source of truth and this file is corrected to match. Tokens are
semantic in code. Poetic names live only here, in the brand-layer
mapping, never in `index.css`.
