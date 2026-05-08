# The Burroship

> Build. Deploy. Automate.

The public-facing brand site for The Burroship, LLC. Parent entity
behind Neon Burro, NBR, the Burros NFT collection, and related
ventures.

## What This Is

A single-page cinematic site with four sections:

1. Header. Minimal nav with a small login link.
2. Hero. Full-viewport video of the San Juans.
3. Map. Full-width interactive Mapbox view of Ridgway and the
   surrounding Cimarrons. Future home of agent characters moving
   through the world.
4. Footer. Cinematic, mostly locked links to ecosystem properties.

## Stack

- React 19 + Vite 5
- Tailwind CSS v4 (native CSS theme, no JS config)
- Framer Motion 12
- Mapbox GL JS via react-map-gl v8
- Supabase (knock log + future agent positions)
- Netlify (hosting + functions)

## Conventions

- JavaScript only. No TypeScript.
- Full file rewrites only. No partial patches.
- Yarn, not npm.
- Trailing slashes on all routes.
- Path comment at the top of every file.
- No em dashes, no Oxford commas in copy.
- All design tokens live in DESIGN.md and are mirrored to
  src/styles/index.css. Edit both together until v0.2 promotes
  DESIGN.md to executable.

## Setup

\`\`\`
yarn install
cp .env.example .env
\`\`\`

Fill in VITE_MAPBOX_TOKEN, Supabase keys, KNOCK_PASSPHRASE.

\`\`\`
yarn dev
\`\`\`

Site runs at http://localhost:3000

## Deploy

Connected to Netlify. Push to main triggers auto-deploy.

## Repo Structure

\`\`\`
burroship/
  DESIGN.md                   # design system + brand philosophy
  DEV_STYLE_GUIDE.md          # coding conventions
  netlify/functions/          # serverless backend
  public/                     # static assets, video, agent portraits
  src/
    components/
      header/
      hero/
      map/
      footer/
    data/
      agents.json             # v1 agent definitions (hardcoded)
    hooks/
    lib/
    pages/
      Gateway.jsx             # /
      Aboard.jsx              # /aboard/
    styles/
      index.css               # Tailwind v4 + design tokens
  supabase/
    schema.sql                # knock_attempts + agent_positions
\`\`\`

## Roadmap

- [x] v0.1 — Repo scaffold, design system, dependencies
- [ ] v0.2 — Header, hero, basic map, footer (no agents yet)
- [ ] v0.3 — Map agent markers from agents.json
- [ ] v0.4 — Knock login + Supabase logging
- [ ] v0.5 — DESIGN.md promoted to executable via Vite plugin
- [ ] v0.6 — Agent positions driven by Supabase + Netlify deploy webhooks
- [ ] v1.0 — Real video hero, polished motion, public launch

## License

Proprietary. (c) The Burroship, LLC.
