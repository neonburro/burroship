# Agent Contracts
 
This folder holds the operating contract for each agent in the
council. Read `COUNCIL_VISION.md` first for context.
 
---
 
## The contract template
 
Every agent contract follows the same five-field structure:
 
1. **Domain** — the one-word brand label
2. **Channel** — the runtime interface the agent owns
3. **Tool scope** — the exact list of tools the agent can invoke
4. **Handoff rules** — who the agent passes to and under what conditions
5. **Non-goals** — what the agent does NOT do
 
The fifth field is the most important. Non-goals prevent scope
creep faster than any other discipline. Every agent contract states
explicitly what the agent is not allowed to touch.
 
Use [`WARBLEUR_BRIEF.md`](./WARBLEUR_BRIEF.md) as the template.
 
---
 
## The council roster
 
| Agent | Domain | Status | Contract |
| --- | --- | --- | --- |
| Warbleur | Voice | Designed | [WARBLEUR_BRIEF.md](./WARBLEUR_BRIEF.md) |
| Cypher | Data | Pending | (to be written before Cypher's build phase) |
| Lyra | Tone | Pending | (next contract — Lyra is the first production agent) |
| Volt | Flow | Pending | (to be written before Volt's build phase) |
| Ion | Memory | Pending | (to be written before Ion's build phase) |
| Canyon | Terrain | Pending | (to be written before Canyon's build phase) |
 
---
 
## Build order
 
Per `COUNCIL_VISION.md`, the council ships in this order:
 
1. **Lyra** first (repo-aware email delivery agent)
2. **Cypher** after Lyra is stable (database lookups for client work)
3. **Warbleur** after Cypher (voice channel via Twilio)
4. **Ion** after Warbleur (shared memory for the council)
5. **Volt** after Ion (workflow orchestration)
6. **Canyon** after Volt (geographic intelligence and splats)
 
Each phase ends with a working agent in production. No phase is
allowed to start until the previous agent is stable and generating
value for at least one client.
 
---
 
## When to write a new contract
 
A new agent contract is written when:
 
1. The agent's build phase is about to begin
2. The previous agent has shipped and stabilized
3. Tyler has approved the agent's domain and channel
4. There is at least one real client use case waiting
 
Contracts written too early become aspirational. Contracts written
on schedule become operational.
 
---
 
## See also
 
- [COUNCIL_VISION.md](../COUNCIL_VISION.md) for the system architecture
- [COMMUNICATION_PROTOCOL.md](../COMMUNICATION_PROTOCOL.md) for inter-agent messaging
- [AGENTS.md](../AGENTS.md) for the brand-facing description of the council
