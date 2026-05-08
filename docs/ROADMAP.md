# Burroship Roadmap

## North Star

The Burroship is a living Ridgway world map where burro characters
become intelligent local operators, moving through a stylized world,
tied to real businesses, deploys, events, and council planning.

## The Big Rule

Build the map first. Then make it alive. Then make it smart. Then
make it 3D. Do not build the dream all at once.

## Phases

### Phase 1. Cinematic Skeleton  (shipped)

Header, hero, footer, placeholder map section, three routes.
Live on Netlify. Foundation for everything else.

Status: complete.

### Phase 2. Real Map  (next)

Mapbox dark terrain centered on Ridgway. Pitched at 50 degrees.
Custom style matching DESIGN.md. Zoom and pan controls.
Featured Ridgway locations as styled pins (no agents yet).

Doc to write before this phase: MAP_SYSTEM.md.

Definition of done: the /map/ route shows a beautifully styled
3D-tilted Mapbox of Ridgway and the Cimarrons. Pinch to zoom.
Drag to rotate. Looks like the cabin window of an airship.

### Phase 3. Agents on the Map

Burro portraits as circular markers. agents.json holds hardcoded
positions for v1. Click a marker, an agent card opens with name,
role, status, current task.

Docs to write before this phase: AGENTS.md, WORLD.md.

Definition of done: the three character images you have show up
on the Ridgway map at locations you choose. Click each one, learn
who they are.

### Phase 4. Movement and Supabase

A small Supabase project for burroship. Three tables:
agent_positions, agent_routes, events.

Agents read positions from Supabase, not from agents.json.
Agents glide between locations smoothly.
"Currently working at" status lights up.

Definition of done: you update an agent's position via SQL, and
the map updates in (near) real time.

### Phase 5. Deploy Triggers

Netlify webhook from each client repo (Pulse, Cimarron, etc.)
fires on every successful deploy. The webhook updates the
agent_positions table with the appropriate burro at the
appropriate client location.

Definition of done: when coloradoboydepot.com deploys, the assigned
agent visibly moves to Colorado Boy Depot's coordinates and stays
there for the duration of the deploy.

### Phase 6. Council Intelligence

The agents review deploys, events, and business activity. They
generate recommendations. Tyler reviews and approves. The map
becomes a thinking surface, not just a display.

Doc to write before this phase: COUNCIL.md.

Definition of done: every morning, you open burroship.com/aboard/
and see a council brief from the night before. "We noticed X. We
recommend Y. Approve to execute."

### Phase 7. 3D Burro World

Three.js / React Three Fiber. GLB burro models. Buildings as
tools. Gaussian splats of Ridgway. Weather and time-of-day. The
full dream.

Definition of done: the map becomes a real-time stylized 3D world
where burros walk between buildings and the seasons change with
the calendar.

## Master Files

Each doc is written before its phase, not before the project. This
keeps docs informed by reality instead of speculation.

Root level (brand and conventions):
- DESIGN.md (exists)
- DEV_STYLE_GUIDE.md (exists)
- README.md (exists)

docs/ level (build plan):
- ROADMAP.md (this file)
- MAP_SYSTEM.md (write before Phase 2)
- AGENTS.md (write before Phase 3)
- WORLD.md (write before Phase 3)
- COUNCIL.md (write before Phase 6)

## What Each Phase Ships

Every phase ends with a deployable, shippable URL. Never wait for
the next phase to ship the current one.

- Phase 1 ships a live cinematic brand site.
- Phase 2 ships a live URL where the map is the experience.
- Phase 3 ships a live URL where the characters appear on the map.
- Phase 4 ships a live URL where the world is alive.
- Phase 5 ships a live URL where reality (deploys) updates the world.
- Phase 6 ships a live URL where the agents tell Tyler what to do.
- Phase 7 ships a live URL that is a stylized world.

## Velocity

One phase at a time. Don't rush. Don't skip phases. Don't merge
phases.

The reward for shipping Phase 2 is starting Phase 3, not
half-building Phase 4 alongside it.

## When Stuck

Read DESIGN.md. The brand philosophy is the tiebreaker for any
decision the build doesn't obviously solve.