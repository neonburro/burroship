# Infrastructure
 
**Status:** DRAFT · written fresh, factual
**Owner:** Warbleur
**Inherits from:** nothing — this is factual record
 
---
 
The real stack behind the Burroship surface. Boring tools that
quietly do their job. No secrets, keys, or credentials live in this
file or any doc — only the shape of the system.
 
## The Burroship app
 
- **Framework:** React 19, Vite 5
- **Styling:** Tailwind v4, CSS-based `@theme` config in
  `src/styles/index.css`. No `tailwind.config.js`. No TypeScript.
- **Motion:** Framer Motion 12
- **Map:** Mapbox GL JS v3, react-map-gl v8
- **Data:** Supabase (Postgres, row-level security)
- **Hosting:** Netlify, continuous deploy from the repo
- **Functions:** Netlify functions for sync HTTP
 
## Environments
 
- **Development** — localhost, the vessel under construction
- **Staging** — Netlify preview per pull request
- **Production** — the live site, every push deploys
 
## Principles
 
- Pick the boring tool that does its job over the exciting one that
  needs babysitting.
- Modern infrastructure without the modern infrastructure tax.
- Continuous deploy: every push to production, every PR a preview.
- The database is real. Postgres, row-level security, realtime only
  where it earns its place.
 
## What lives where
 
- The docs tree is in the repo under `docs/`.
- Design tokens are in `src/styles/index.css` and mirrored
  semantically in `04_DESIGN_SYSTEM/TOKENS.md`. The code is the
  source of truth for token values.
- The map data is in Supabase and mirrored in the CommandCenter data
  files. Behavior is verified against production, not assumed.
 
## The standing infrastructure note
 
The map page has a production commit that was shipped but never
visually confirmed by a human. That is recorded in the product
docs and the ledger as the oldest open verification thread. Honest
infrastructure documentation names what is unverified, not just what
is built.
