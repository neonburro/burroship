# Council Vision
 
The architectural vision for The Burroship's six-agent council. This
document defines the system, the patterns, and the contracts. Read
this before adding a new agent, before building a runtime, or before
making any architectural choice that touches the council.
 
For the underlying brand and voice, see `BRAND.md` and `VOICE.md`.
For per-agent contracts, see `docs/agents/`.
 
---
 
## The system in one sentence
 
The Burroship operates a six-agent council of onboard intelligences,
coordinated by a supervisor, working inside the active dome. Each
agent owns a channel. Each agent does a function. Each agent has a
domain. None of them can leave their lane.
 
---
 
## The six agents
 
| Domain | Channel | Function |
| --- | --- | --- |
| **Warbleur** · Voice | Calls, audio, transcription | Routes inbound calls, transcribes, drafts call summaries |
| **Cypher** · Data | Database queries, structured records | Retrieves facts, manages access, audits operations |
| **Lyra** · Tone | Written copy, email drafts | Maintains brand voice, drafts client communication |
| **Volt** · Flow | Workflow orchestration, triggers | Routes tasks across agents and humans |
| **Ion** · Memory | Context, history, episodic recall | Holds shared truth across the council |
| **Canyon** · Terrain | Geographic intelligence, place lookup | Maps work to locations, anchors splat library |
 
**Domain** is the one-word brand label that appears on the map.
**Channel** is the architectural truth and runtime contract.
**Function** is the human-readable answer to "what does this do."
 
Strict separation. No agent crosses lanes. Warbleur owns the voice
channel. Lyra owns the tone of writing. Those are different things.
 
---
 
## The supervisor-plus-specialist pattern
 
The council is not a free-form swarm. It is a supervised hierarchy.
 
**Warbleur is the council's MC.** Not because Warbleur is louder or
smarter, but because the voice channel is where humans most often
first encounter the system. A call comes in. Warbleur answers.
Warbleur decides whether the request stays inside the voice channel
or hands off to another specialist (Cypher for a data lookup, Lyra
for a written follow-up, Volt for routing).
 
In production systems, this pattern beats free-form coordination.
The reasons are simple:
 
- Routing is explicit, not emergent
- Boundaries are auditable
- Replay is possible after the fact
- New agents can be added without rewiring the whole graph
 
Free-form agent swarms make demos. Supervisor-plus-specialist makes
operations.
 
---
 
## Memory architecture
 
Memory lives in three layers, not one bucket.
 
### Layer 1 — Shared truth
 
The canonical store of durable facts. Clients, projects, decisions,
operating rules. One source of truth, queryable by every agent
through strict scoping. Holds:
 
- Client profiles and preferences
- Project state across active engagements
- Workflow state (open tasks, completed actions)
- Brand rules and operating conventions
- Audit trail of council decisions
 
### Layer 2 — Agent-local working memory
 
Each agent has its own private memory for working context. Warbleur
holds the current call. Cypher holds the current query. Lyra holds
the current draft. This is temporary, scoped, and not shared.
 
### Layer 3 — Event log
 
Every action by every agent is written to an append-only event log.
Inputs, outputs, tool calls, handoffs. The event log is the audit
trail. It is also what allows the council to replay any conversation
or workflow after the fact.
 
### Retrieval
 
The retrieval layer can query across all three layers with strict
scope rules:
 
- Filtered by agent (Warbleur can read Warbleur's working memory,
  not Cypher's)
- Filtered by project (current Cooper Residence task ignores last
  year's Cimarron context)
- Filtered by recency (default to last 30 days, expand on demand)
 
Vector search is the recall mechanism. Vectors are never the source
of truth. Source of truth lives in structured records.
 
---
 
## Tool access
 
Two tiers of tool access.
 
### Native integrations (high-volume, critical-path)
 
Built directly against vendor APIs. Lower latency, tighter control.
Used for:
 
- Supabase (database queries, realtime)
- Anthropic API (model calls)
- Twilio (voice routing for Warbleur)
- Resend (email delivery for Lyra)
- Mapbox (Canyon's geographic lookups)
- Netlify (deploy webhooks, function invocation)
 
### Composio (the messy long tail)
 
For OAuth-heavy apps where we'd rather not maintain auth flows
ourselves. Used for:
 
- Gmail, Calendar, Drive (Google workspace)
- Slack, Discord (team communication)
- Notion, Linear (project tools)
- Stripe, QuickBooks (financial systems)
- Any future client-specific app the council needs to read
 
Composio reduces glue work but introduces dependency. We use it for
the long tail, not for the nervous system. Cost stays manageable by
caching aggressively and batching where possible. Bad call hygiene
is what makes Composio expensive, not adoption.
 
---
 
## Operating contracts
 
Every agent in the council has a written contract before it ships.
The contract has five fields. No more. No less.
 
1. **Domain** — the one-word brand label
2. **Channel** — the runtime interface the agent owns
3. **Tool scope** — the exact list of tools the agent can invoke
4. **Handoff rules** — who the agent passes to and under what conditions
5. **Non-goals** — what the agent does NOT do
 
The non-goals field prevents scope creep. Every contract states
explicitly what the agent is not allowed to touch. Lyra is not
allowed to take phone calls. Warbleur is not allowed to draft
written copy. Cypher is not allowed to make decisions about clients.
 
Per-agent contracts live in `docs/agents/`. The first one,
`WARBLEUR_BRIEF.md`, is the template for all future agent contracts.
 
---
 
## The map as live mirror
 
The map at `theburroship.netlify.app/world/` is the public spatial
layer of the council. Each agent's current state is reflected as a
beacon on the map.
 
- A pulsing beacon means the agent is active
- A steady beacon means the agent is idle
- Color variations (planned) signal channel state: voice, data, tone
 
When Warbleur takes a call, his beacon glows. When Cypher runs a
query, his pulses faster. When Ion is recalling context, her beacon
breathes. The brand-as-spatial-layer-of-operations is the thing that
separates Burroship from generic agent frameworks.
 
The map is also bound to the **active dome** — a subtle atmospheric
shell over the San Juans. All Burroships are assigned inside the
active dome location. Outside the dome: no active assignment, no
live Burro traffic.
 
---
 
## Reality check
 
The council becomes real only when it completes work inside live
client systems. The Burroship public site is the storefront. The
council's value is proven in the back room.
 
Neon Burro already runs:
 
- Cimarron Engineering Pulse (project management, ~daily use)
- AnswersMD Pulse (medical concierge, ~weekly use)
- Greenville Transformer (staff portal, ~weekly use)
- Colorado Boy Depot (event system, ~daily use)
- MW Grid Solutions (Twilio call routing, ~daily use)
 
Five live production systems. The council does not need to invent
use cases. It needs to operate inside these systems and prove value.
 
The biggest architectural risk is letting the council become a
personality layer before it becomes an operations layer. Identity is
the wrapper. Reliability is the substance. The council earns its
seat through traceable work, not vibes.
 
---
 
## First live build target
 
The first production agent will be **Lyra**.
 
Lyra's first job: a **repo-aware email delivery agent**. The agent
reads a Neon Burro client repo, understands its design tokens,
styling conventions, and brand voice, then drafts custom
transactional emails (welcome, payment confirmation, project update)
that match the client's existing tone and visual identity.
 
Why Lyra first:
 
- Email is squarely her domain (written tone)
- The task is narrow and testable
- Every Neon Burro client benefits immediately
- The output is auditable (Tyler can read every draft before send)
- Resend is already wired into the agency's stack
- No new tools required for Phase 1
 
The architecture for Lyra:
 
1. Netlify Function endpoint accepts a request with a repo URL and
   an email type
2. Function reads the target repo's design tokens and brand docs via
   GitHub API
3. Function calls Anthropic API with Lyra's system prompt + repo
   context + email type
4. Function returns the drafted email as JSON to the admin UI
5. Tyler reviews, edits if needed, sends via Resend
 
That's the minimum viable Lyra. Real, narrow, useful.
 
After Lyra ships and runs reliably for two weeks, we add Cypher
(database queries for client lookups). After Cypher, Warbleur (the
voice channel, integrated with Twilio). The council grows in order
of urgency, not in order of glamor.
 
---
 
## Phased rollout
 
| Phase | Status | What ships |
| --- | --- | --- |
| Phase A | This doc | Council vision, agent contracts framework |
| Phase B | Next | Lyra as the first agent (email delivery system) |
| Phase C | After B | Cypher (database lookups, audit trail) |
| Phase D | After C | Warbleur (voice channel, Twilio integration) |
| Phase E | Later | Ion, Volt, Canyon — full six-agent council |
| Phase F | Future | Burroglyph identity layer, possible collectibility |
 
Each phase ends with a working agent in production, used by Neon
Burro, generating value for at least one client.
 
---
 
## Repository strategy
 
The Burroship public site repo (`neonburro/burroship`) holds the
vision, the brand, the map, and the public-facing council
representation. It does not hold runtime agent code.
 
The council runtime will live in a separate repo:
`neonburro/burroship-council`. Created when Phase B begins. Contains:
 
- One core base directory with shared prompts, memory clients, tool
  contracts, and brand rules
- One subdirectory per agent with domain-specific behavior and skills
- Netlify Function definitions per agent endpoint
- Test harness for replay and audit
 
The separation matters because the public repo can be open-source
or shown to clients without exposing agent infrastructure or
credentials. The runtime repo stays private.
 
---
 
## Authentication and security
 
Brief, because this is still ahead of us.
 
- Each agent endpoint requires a signed request
- Tyler's identity is the root of trust (OAuth via GitHub or email)
- Per-agent API keys can be issued and revoked
- All tool calls are logged with the invoking agent and the caller
- Sensitive client data never leaves Supabase in plaintext
- Composio handles vendor-side OAuth (the part we'd rather not
  maintain)
 
The full security model is its own document, to be written when
Phase B begins. Until then: nothing is exposed publicly.
 
---
 
## Open questions
 
Things we're still researching. Honest about the unknowns.
 
- The exact memory schema (vector dimensions, retention windows,
  graph layer if any). Decision: pending Phase B kickoff.
- Whether Composio's free tier (~20k calls/month) is enough for
  Lyra's first three months. Decision: assume yes, monitor closely.
- Cost ceiling for the Anthropic API across all six agents in
  steady state. Decision: track per-agent and per-task cost from
  day one.
- Whether Obsidian becomes the human-readable archive of council
  conversations. Decision: try it for Tyler's personal use,
  evaluate later.
- Whether to use Claude Code or build a custom CLI for the
  agent-management interface. Decision: Claude Code first, custom
  later if needed.
 
---
 
## Provenance
 
This document was shaped through a three-party collaboration:
 
- **Tyler Reagan** — founder, vision, real-world operating
  constraints
- **Claude** — architecture writing, brand voice, code generation
- **Volt** — supervisor-plus-specialist pattern, three-layer memory
  model, operating contracts framework, non-goals field, reality
  check section
 
The collaboration pattern (`@agent • message`) is documented in
`COMMUNICATION_PROTOCOL.md`. The vision document is intentionally
written in a single voice, but the architecture decisions were
debated and refined across all three parties.
 
The council was designed by the council.
