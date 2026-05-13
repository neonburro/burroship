# Burroship Style Guide
 
Engineering companion to `BURROSHIP_DESIGN.md`. This is the technical contract.
 
## Stack
 
- React 19, JavaScript only (no TypeScript)
- Vite 5
- Tailwind v4 with `@theme` block
- Framer Motion for animations
- React Router 6 with trailing-slash routes
- Cesium loaded from CDN for the `/world/` route only
- Mapbox + react-map-gl for town pages (coming later)
 
## File conventions
 
Every file's first line is a path comment:
 
```js
// src/components/Sections/Hero.jsx
```
 
Page routes:
 
- `/` → `src/pages/Home/index.jsx`
- `/build/` → `src/pages/Build/index.jsx`
- `/deploy/` → `src/pages/Deploy/index.jsx`
- `/automate/` → `src/pages/Automate/index.jsx`
- `/world/` → `src/pages/BurroshipMap/index.jsx` (existing Cesium experience)
 
Components organized by role:
 
```
src/components/
  Layout/        Nav, Footer, Container — page chrome
  Sections/      Hero, AreasGrid, Manifesto, Closer — composed page blocks
  Atoms/         Button, Eyebrow, TopoLines, Reveal — small reusable pieces
```
 
Trailing slashes on every internal Link `to=` value.
 
## Tailwind v4 theme tokens
 
All design tokens live in `src/styles/globals.css` inside a single `@theme` block. Use the
token, never the raw hex. If a token does not exist for what you need, add it to `globals.css`
first.
 
Color tokens map to design system roles:
 
```css
@theme {
  --color-ink: #0A0A0A;
  --color-ink-muted: #5A6172;
  --color-ink-faint: #9CA3AF;
  --color-bg: #FFFFFF;
  --color-surface: #F7F7F5;
  --color-surface-deep: #EDEDE8;
  --color-line: #E8E8E5;
  --color-accent: #7AB300;
  --color-accent-hover: #8AC926;
  --color-dark-bg: #020503;
  --color-dark-surface: #0A1108;
  --color-dark-ink: #FFFFFF;
  --color-dark-accent: #A8D055;
}
```
 
Use as: `bg-bg`, `text-ink`, `border-line`, `text-accent`, `bg-dark-bg`.
 
## Component patterns
 
### Container
 
Always wrap section content. Three widths:
 
```jsx
<Container>            // 1200px max, default
<Container size="wide">  // 1440px, hero or maps
<Container size="reading">  // 720px, manifesto or article
```
 
### Eyebrow
 
The small mono label above section headlines.
 
```jsx
<Eyebrow>San Juan Mountains</Eyebrow>
```
 
Renders as uppercase mono, 11px, tracked 0.12em, accent color.
 
### Button
 
```jsx
<Button to="/world/">Board The Burroship →</Button>             // primary, default
<Button variant="ghost" to="/manifesto/">Read more</Button>      // ghost outline
<Button variant="text" to="/build/">Learn more</Button>          // text link with arrow
```
 
Routes use `to=`, external links use `href=`.
 
### Reveal
 
Wraps children in a scroll-triggered fade-and-rise animation.
 
```jsx
<Reveal delay={0.1}>
  <h1>...</h1>
</Reveal>
```
 
Default delay 0, default duration 480ms. Stagger by passing different `delay` props.
 
### TopoLines
 
The signature topographic ring decoration.
 
```jsx
<TopoLines size={420} position="top-right" intensity="subtle" />
```
 
Positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `center`.
Intensities: `subtle` (12% opacity), `medium` (18%), `strong` (28%).
 
## Spacing
 
Section padding-y is `py-32` desktop, `py-20` mobile. Always.
 
Hero sections get `py-40` desktop, `py-24` mobile — they earn the extra room.
 
Between elements within a section, use the scale: `gap-3 4 6 8 12 16`. No `gap-5` or
`gap-7` — those are not in the scale.
 
## Typography classes
 
Use semantic class names from globals.css, never raw tailwind size+weight combos:
 
```jsx
<h1 className="text-display-xl">Build. Deploy. Automate.</h1>
<p className="text-lead">Big paragraph below hero.</p>
<p className="text-body">Standard body copy.</p>
<p className="text-mono">SECTION 002</p>
```
 
Italic uses inline span: `<em className="italic text-accent">Automate.</em>`
 
## Voice in copy
 
Six-word maximum on hero headlines. Three to ten words on section headlines. Sub-headlines may
breathe to fifteen words.
 
Numbers are spelled out only when zero through nine and not in a label or stat context. "Six
agents" reads better than "6 agents" in prose. In a stat panel, "6" is fine.
 
Em-dashes are banned per existing repo rules. Use a period or a colon. If you find yourself
wanting an em-dash, you can split the sentence.
 
Oxford commas are banned per existing repo rules. "Ridgway, Ouray and Telluride."
 
## Motion default
 
Wrap pages or sections in framer-motion variants for the stagger. Atoms like Button get a
180ms color transition via CSS. Avoid motion library overhead for simple hovers.
 
Section reveals use `viewport={{ once: true, margin: "-100px" }}` so they only fire once when
the user scrolls past.
 
## Accessibility
 
Color contrast: Topo Lime `#7AB300` on white gets a 4.7:1 ratio for normal text. That passes
WCAG AA. Use it for headlines, links, and CTAs but never for body paragraphs.
 
All interactive elements need a visible focus outline. Tailwind v4 default is fine. Do not
remove `outline` without replacement.
 
Skip-to-content link is in Nav.jsx, hidden by default, visible on tab.
 
## Routes table
 
| Path           | Component                                  | Status     |
| -------------- | ------------------------------------------ | ---------- |
| `/`            | Home (assembles Hero, CesiumPreview, etc.) | Built      |
| `/world/`      | BurroshipMap (Cesium experience)           | Built      |
| `/build/`      | Build (scaffolded, placeholder content)    | Scaffolded |
| `/deploy/`     | Deploy (scaffolded, placeholder content)   | Scaffolded |
| `/automate/`   | Automate (scaffolded, placeholder content) | Scaffolded |
 
Town pages (`/ridgway/`, `/ouray/`, etc.) come in a later session.
