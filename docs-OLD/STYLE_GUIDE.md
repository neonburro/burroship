# Style Guide
 
Engineering conventions. The technical companion to `DESIGN.md`.
 
---
 
## Stack
 
- React 19
- JavaScript only (never TypeScript)
- Vite 5
- Tailwind v4 with `@theme` block
- Framer Motion for animations
- React Router 6
- Cesium from CDN for the `/world/` route
- Supabase (`twvptrfohuthynndeuxx` for Burroship, see `INFRASTRUCTURE.md`)
- Netlify for hosting and serverless functions
 
## File conventions
 
### Path comment first
 
Every JavaScript file begins with a path comment:
 
```js
// src/components/Sections/Hero.jsx
```
 
This is non-negotiable. It makes diffs and bug reports faster.
 
### Naming
 
- Components: PascalCase, one component per file
- Files: match the component name (`Hero.jsx`, not `hero.jsx`)
- Folders: PascalCase for component groups (`Atoms/`, `Sections/`)
- Atoms: small reusable elements (Button, Eyebrow, TopoLines)
- Sections: composed page blocks (Hero, BuildSection, DeploySection)
- Pages: route-level components, always as `index.jsx` inside a folder
 
### Folder structure
 
```
src/
  App.jsx
  main.jsx
  components/
    Atoms/        Button, Eyebrow, TopoLines, Reveal, Stagger
    Layout/       Container, Nav, Footer
    Sections/     Hero, BuildSection, DeploySection, AutomateSection
  pages/
    Home/index.jsx
    Build/index.jsx
    Deploy/index.jsx
    Automate/index.jsx
    BurroshipMap/index.jsx, cesium/, shared/
  styles/
    index.css   The single Tailwind + tokens file
  data/         Static JSON
  lib/          Helpers, Supabase clients
```
 
Pages are folders, not flat files. Even `Home` lives at
`src/pages/Home/index.jsx` so we can add page-specific subcomponents
later without restructuring.
 
### Routes
 
All internal routes use trailing slashes. This is a project-wide rule
enforced by convention, not by code. Examples:
 
- `/build/`
- `/world/`
- `/ridgway/`
 
When linking with `Link to=` or `NavLink to=`, always include the
trailing slash.
 
External links use `<a href=` and open in a new tab via
`target="_blank" rel="noopener noreferrer"`.
 
## Tailwind v4 tokens
 
All design tokens live in `src/styles/index.css` inside one `@theme`
block. Use the token, never the raw hex.
 
### Color tokens
 
```css
@theme {
  --color-ink: #0A0A0A;
  --color-ink-muted: #5A6172;
  --color-ink-faint: #9CA3AF;
  --color-bg: #FFFFFF;
  --color-surface: #F7F7F5;
  --color-surface-engine: #F0EFEB;
  --color-line: #E8E8E5;
  --color-accent: #7AB300;
  --color-accent-hover: #8AC926;
  --color-dark-bg: #020503;
  --color-dark-surface: #0A1108;
  --color-dark-accent: #A8D055;
}
```
 
Use as: `bg-bg`, `text-ink`, `border-line`, `text-accent`, `bg-dark-bg`.
 
If a needed token does not exist, add it to `index.css` first. Never
hardcode hex in components.
 
### Typography classes
 
Use the semantic classes from `index.css`. Never raw Tailwind
size+weight combos:
 
```jsx
<h1 className="text-display-xl">...</h1>
<p className="text-lead">...</p>
<p className="text-body">...</p>
<p className="text-mono">...</p>
```
 
### Spacing
 
Multiples of 4. Use the standard scale:
 
```
gap-3   gap-4   gap-6   gap-8   gap-12   gap-16
```
 
No `gap-5`, no `gap-7`. Stay on the scale.
 
Section padding:
 
```
py-24 md:py-32   most sections
py-28 md:py-36   hero
```
 
## Component patterns
 
### Container
 
Every section wraps content in a Container:
 
```jsx
<Container>            // 1200px max, default
<Container size="wide">    // 1440px, sections and hero
<Container size="reading"> // 720px, long-form
```
 
### Eyebrow
 
The small mono label above section headlines:
 
```jsx
<Eyebrow>Section 01 · Build</Eyebrow>
```
 
Always uppercase, mono, accent color by default.
 
### Button
 
```jsx
<Button to="/world/" variant="primary" arrow>Board the airship</Button>
<Button variant="ghost">See more</Button>
<Button variant="operational" arrow>Open the table</Button>
```
 
Variants:
- `primary` — dark pill, lime on hover
- `primaryLime` — lime pill (for dark surfaces)
- `ghost` — outlined, light surface
- `ghostDark` — outlined, dark surface
- `text` — text link with hover color shift
- `operational` — underlined operator-link style for section CTAs
 
Each variant explicitly sets default AND hover colors. The v0.5 bug
where text disappeared on hover came from inheriting transparent. Do
not write a new variant without setting both.
 
### Reveal
 
Scroll-triggered fade-and-rise:
 
```jsx
<Reveal delay={0.1}>
  <h1>...</h1>
</Reveal>
```
 
Default duration 480ms. Stagger by passing different `delay` props.
 
### Stagger
 
Wraps a group of children with sequential delays:
 
```jsx
<Stagger step={0.08}>
  <h1>...</h1>
  <p>...</p>
  <button>...</button>
</Stagger>
```
 
### TopoLines
 
```jsx
<TopoLines size={520} position="top-right" intensity="subtle" />
```
 
Positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`,
`center`, `right-center`, `left-center`.
Intensities: `subtle` (0.06), `medium` (0.10), `strong` (0.16).
 
## Voice in code
 
The `[draft]` comment marker indicates placeholder copy waiting for
the content writer:
 
```jsx
{/* [draft] Replace with content writer's hero subhead */}
<p className="text-lead">
  A vessel of small operational systems...
</p>
```
 
Search the repo for `[draft]` to find all unfinished copy slots.
 
## Repo conventions
 
### Commits
 
- Lowercase subject line
- Conventional commit prefix when useful: `feat:`, `fix:`, `refactor:`,
  `docs:`, `style:`
- Imperative present tense: "add hero spec strip" not "added"
- No em-dashes in commit messages
- Body optional, used for context-heavy commits
 
### Branching
 
Main branch is `main`. Most work happens directly on `main` for this
solo-developer project. PR branches are used when multiple
contributors are involved.
 
### Archives
 
Old files are not deleted. They are moved to `_archive/[timestamp]/`
preserving their relative path. The deploy scripts do this
automatically. Archive folders are committed and remain in git
history.
 
### Author identity
 
All commits use:
- Name: Tyler Reagan
- Email: tyler@neonburro.com
 
Never use `treagan9` or `tyler9reagan@gmail.com`.
 
## Shell conventions
 
Tyler's zsh treats `#` as a bad pattern when used inline. Never
include comments after `#` in shell commands when sending them in
chat. Comments belong in scripts (one per line) or before the command
itself.
 
## Package manager
 
`yarn`, not `npm`. Run `yarn add`, `yarn dev`, `yarn build`.
 
## Working with Claude
 
The bulk-file-delivery pattern is documented in `WORKFLOW.md`. Use it
for any change touching 5+ files.
 
The rule against tar.gz delivery on macOS is real: Safari
auto-extracts the archive on download, so the script can't find it.
All deliveries that target Tyler's local repo come as a single
`.sh` file with files inlined via heredocs.
 
## Accessibility
 
- All interactive elements need a visible focus outline. Tailwind v4
  default is fine. Do not remove without replacement.
- Color contrast: Topo Lime `#7AB300` on white is 4.7:1, passes WCAG
  AA for normal text. Use for headlines, links, CTAs but not body
  paragraphs.
- Decorative SVGs get `aria-hidden="true"`.
- Skip link in `Nav.jsx`, hidden by default, visible on tab.
 
## File creation discipline
 
- Always use full file rewrites, never `str_replace` or patches for
  multi-line changes
- One file per message when sharing inline (heredoc with `cat <<` is
  the canonical pattern)
- `touch` and `mkdir -p` before writing new files
- Always include the path comment first
 
## When the system breaks
 
The bulk-file-delivery script archives everything to
`_archive/[timestamp]/` before overwriting. If a deploy goes wrong:
 
```bash
ls _archive/
cp -r _archive/[timestamp_folder]/* .
```
 
This restores the previous state. The archive folder remains in git
history, so even after a successful deploy, you can `git log` to find
the archived version of any file.
 
## See also
 
- `DESIGN.md` for visual decisions
- `VOICE.md` for copy decisions
- `BRAND.md` for the product reasoning
- `WORKFLOW.md` for how Claude and Tyler ship together
- `INFRASTRUCTURE.md` for Supabase, Netlify, env var references
