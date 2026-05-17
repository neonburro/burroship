# Infrastructure
 
The systems that run The Burroship. Project names, environment variable
names, deploy pipeline, fail-safes.
 
**This file is commit-safe.** It contains no keys, no tokens, no
secrets. Only names of things. Actual values live in:
 
- `.env` (local, gitignored)
- Netlify environment variables (UI)
- Supabase dashboard (UI)
- 1Password / Tyler's password manager
 
If you need an actual value, check those places. Never paste secrets
into this file.
 
---
 
## Hosting
 
### Netlify
 
| Field | Value |
| --- | --- |
| Site name | `theburroship` |
| Live URL | `theburroship.netlify.app` |
| Build command | `yarn build` |
| Publish directory | `dist` |
| Node version | 20.x |
| Deploy trigger | `git push` to `main` |
| Preview deploys | enabled on all branches |
 
Dashboard: `app.netlify.com/projects/theburroship`
 
### Custom domain
 
Currently using the default Netlify subdomain. A custom domain
(`theburroship.com` or similar) is planned but not yet purchased.
 
## Database
 
### Supabase project
 
| Field | Value |
| --- | --- |
| Project ref | `twvptrfohuthynndeuxx` |
| Region | US West (Oregon) |
| Project name | Burroship |
| Plan | Free tier (auto-pauses after 7 days inactivity) |
 
**Critical:** Tyler maintains many Supabase projects. The Burroship
project is `twvptrfohuthynndeuxx`. Confusing it with another
project's credentials has cost time in the past.
 
Other related projects (NOT Burroship):
 
- Cimarron Engineering Pulse: `icgkdzxgowhadsqjiiaj`
- NeonBurro Pulse: `sspbripimqvfdkfbpubq`
- AnswersMD: `tqpiogkklioptmwvjtgp`
- Colorado Boy Depot family: `khilufmawwzpbzpoihnw`
- Greenville Transformer: `hwbxtnyshhxjsihuujvn`
 
### Schema
 
The Burroship Supabase has these primary tables:
 
| Table | Purpose |
| --- | --- |
| `world_locations` | Towns, peaks, waypoints, compound. 13 rows seeded. |
| `world_airships` | Vessels. Currently 1 row: The Burroship. |
| `tour_routes` | Waypoint corridors per airship. 1 row: `san-juans-default`. |
 
Row-level security is enabled. Realtime is enabled on
`world_airships` for live position updates (future).
 
### Keep-alive
 
The free tier auto-pauses after 7 days of inactivity. To prevent
pauses, set up a Netlify scheduled function that hits the database
once every 6 days.
 
This is a known footgun. AnswersMD experienced a 3-day outage in
April 2026 because the keep-alive was missing.
 
## Environment variables
 
These are the **names** of environment variables used by the
Burroship project. Actual values live in `.env` (local) and the
Netlify dashboard (production).
 
| Variable | Used for |
| --- | --- |
| `VITE_BURROSHIP_SUPABASE_URL` | Supabase REST URL |
| `VITE_BURROSHIP_SUPABASE_ANON_KEY` | Public anon key |
| `VITE_CESIUM_ION_TOKEN` | Cesium Ion access for 3D Tiles |
| `VITE_MAPBOX_TOKEN` | Mapbox token for future town pages |
 
The `VITE_` prefix is required so Vite exposes them to client code.
 
**Never** put a service role key or other privileged key in a
`VITE_` variable. Those would ship to the client.
 
## Third-party services
 
### Cesium Ion
 
| Field | Value |
| --- | --- |
| Provider | Cesium Ion |
| What we use | Google Photorealistic 3D Tiles via Cesium |
| Token name | `VITE_CESIUM_ION_TOKEN` |
| Plan | Free developer tier |
 
The Cesium library itself loads from CDN:
`https://cesium.com/downloads/cesiumjs/releases/1.130/Build/Cesium/Cesium.js`
 
We do not bundle Cesium with the app. This keeps the bundle small for
non-`/world/` routes.
 
### Mapbox
 
Used for future town pages. Not currently active.
 
| Field | Value |
| --- | --- |
| Provider | Mapbox |
| Token name | `VITE_MAPBOX_TOKEN` |
 
### Email
 
| Field | Value |
| --- | --- |
| Provider | Resend |
| From address | `hello@neonburro.com` |
| Used for | Contact form replies, transactional emails |
 
Resend is configured at the agency level (NeonBurro), not per
project.
 
## Deploy pipeline
 
1. Tyler runs deploy script locally
2. Files written to repo
3. Tyler runs `yarn dev`, verifies in browser
4. Tyler commits with `git commit -m "feat: ..."`
5. Tyler pushes to `main`
6. GitHub webhook triggers Netlify
7. Netlify runs `yarn build`
8. Netlify deploys to `theburroship.netlify.app`
9. Cache invalidates, site is live in 30-60 seconds
 
Build typically takes 60-90 seconds. Most failures are typos or
missing imports caught by Vite at build time.
 
## Repository
 
| Field | Value |
| --- | --- |
| Host | GitHub |
| Org | `neonburro` |
| Repo | `neonburro/burroship` |
| Default branch | `main` |
| Author identity | Tyler Reagan `<tyler@neonburro.com>` |
 
## What's NOT in production yet
 
These are planned but not deployed:
 
- Custom domain
- Contact form (the email link points to `hello@neonburro.com` but
  there is no form on the site)
- Newsletter signup
- Town pages (`/ridgway/`, `/ouray/`, etc.)
- Splat library
- Live agent council infrastructure (the agents on the home page are
  presentational only)
- Authentication (no login required anywhere on the public site)
 
## Backup and recovery
 
### What is backed up
 
- The repo via GitHub
- Supabase data via Supabase's daily backups (free tier: 7 days)
- The deploy script archives in `_archive/` (committed to git)
 
### What is not backed up
 
- Local `.env` files (Tyler must keep these somewhere safe)
- Cesium Ion assets if any are uploaded there (planned splats)
- Mapbox custom styles if any are created (not yet)
 
### How to recover
 
If Supabase data is lost:
1. Restore from Supabase point-in-time recovery (7 days only)
2. The world_locations seed data can be re-seeded from migration
   files (`supabase/migrations/`)
 
If the site is broken in production:
1. Find the last good commit in git log
2. `git revert [bad-commit-hash]`
3. `git push`
4. Netlify rebuilds the previous state in 60 seconds
 
If the deploy pipeline is broken:
1. Build locally with `yarn build`
2. Drag-and-drop the `dist/` folder to Netlify manually
3. Then fix the pipeline at leisure
 
## Costs
 
Current monthly:
 
| Service | Cost |
| --- | --- |
| Netlify | $0 (free tier) |
| Supabase | $0 (free tier) |
| Cesium Ion | $0 (free developer tier) |
| GitHub | $0 (free for solo dev) |
| Mapbox | $0 (free tier, not yet used) |
| Resend | Shared with NeonBurro |
 
Total Burroship operating cost: $0/month at current scale.
 
Costs will start when traffic grows past free tier limits or when a
custom domain is purchased.
 
## Operational quirks
 
These are things that have bitten us:
 
- Supabase free tier auto-pauses (set up keep-alive)
- Cesium Ion tokens have origin restrictions (must include
  `theburroship.netlify.app` and `localhost:3009`)
- Vite dev server uses port `3009`, not the default `5173`
- Netlify build sometimes fails on the first try after a major
  dependency change; retry usually works
- Mapbox tokens can be scoped to specific URLs; do not over-scope
  during development
 
## Who to contact
 
- Netlify: Tyler (admin)
- Supabase: Tyler (owner)
- GitHub org: Tyler (owner)
- Mapbox: Tyler (account)
- Cesium Ion: Tyler (account)
- Resend: Tyler (account, shared with NeonBurro)
 
Tyler is currently a one-person operation for Burroship infrastructure.
Adding additional contributors will require account access and a
secrets-rotation policy.
 
## See also
 
- `STYLE_GUIDE.md` for code conventions
- `WORKFLOW.md` for the deploy script pattern
- `WORLD.md` for what lives in the Supabase tables
- `AGENTS.md` for which agents use which infrastructure
