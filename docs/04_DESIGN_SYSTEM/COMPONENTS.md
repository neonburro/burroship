# Components
 
**Status:** DRAFT · written fresh, reflects built atoms
**Owner:** Warbleur
**Inherits from:** 04_DESIGN_SYSTEM/TOKENS.md, STYLE_GUIDE.md
 
---
 
The UI kit. These atoms are built and backward-compatible. They
reference semantic tokens only, never raw hex, so the pending accent
color cannot break them.
 
## Button v2
 
CSS-driven state through a scoped style block and CSS custom
properties. Resilient regardless of the Tailwind v4 token question.
 
- **States:** hover, focus-visible (keyboard), active/pressed,
  disabled, loading. v1 only had hover.
- **Intent taxonomy:** primary, primaryLime, secondary,
  secondaryDark, subtle, subtleDark, nav, operational. Old v1 names
  (ghost, ghostDark, text, textDark) alias forward so no existing
  page breaks.
- **Optional `signal`:** a restrained live beacon for controls that
  should read as real system controls. Reduced-motion aware. Off by
  default.
- Colors are CSS variables from the token layer. No hardcoded hex.
 
## Eyebrow v2
 
A compositional instrument, not just colored uppercase text.
 
- **Tone variants:** accent, muted, dark, default. v1 `tone` prop
  preserved; no page breaks.
- **Optional `signal`:** live dot reusing the beacon system.
- **Optional `rule`:** trailing hairline that extends the label into
  the layout like an instrument scale.
- The most-repeated identity marker on every page. It must read
  operational, never SaaS-label.
 
## Reveal and Stagger
 
- **Reveal:** one-time in-view fade plus small vertical rise.
  `useReducedMotion` is a hard requirement before it ships as a
  pattern.
- **Stagger:** interval 0.05 to 0.06 seconds. Inevitable, not
  theatrical.
 
## The migration note
 
When the Home rebuild happens, `Hero.jsx`'s manual nested
`<span className="beacon-dot">` becomes `<Eyebrow signal>`. Logged so
it is not forgotten.
 
## The rule
 
Components reference the semantic token layer. They never hardcode a
color. This is what lets the entire system be built before the accent
hue is finalized: the components are done; only one token value is
pending, in one file.
