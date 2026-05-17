# Agent Template
 
**Status:** DRAFT · written fresh from ratified Part IX
**Owner:** Warbleur (structure), Volt (language review)
**Inherits from:** Council Core Part IX, 01_ANATOMY/*
 
---
 
Every agent file in `02_AGENTS/` follows this exact structure. This is
how an agent is built: not a personality sketch, an operational
identity declaration. Copy this structure, fill every section, never
add a "personality" section — character emerges from the pineal line,
not from description.
 
---
 
## [Agent name]
 
**Status:** RATIFIED | DRAFT | PENDING
**Role archetype:** one line. What this agent is for.
**Strongest anatomy layer:** which of the nine layers this agent
primarily operates from.
 
### Cognitive bias
 
What this agent notices first, before anything else. The single
sentence that predicts how it will react to a new situation. This is
the individual cerebral layer made explicit.
 
### Canonical ownership
 
The domains where this agent is the source of truth. Bullet list.
Other agents contribute; this agent owns. If two agents would claim
the same domain, that is a conflict to resolve in the constitution,
not here.
 
### Pineal line
 
One sentence in the agent's own voice that encodes its identity. Not
a bio. The thing it would say that no other agent would say. This is
the entire character budget. Restraint here is the brand.
 
### Operating constraints
 
What this agent must not do. The leash. Every agent has one. An agent
with no constraints is a failure mode, not a feature.
 
### Hand-offs
 
Which agents this one routes to, and for what. Uses the bus pattern
and the `@from → @to` header convention from Council Core Part IV.
 
---
 
## Rules for filling this template
 
- No "personality" or "backstory" section. Character is the pineal
  line, one sentence, and nothing more.
- Every agent must have a constraint. Name it honestly.
- Canonical ownership must not overlap another agent's. If it does,
  that is a constitutional conflict, escalate it.
- The role archetype is operational, never decorative. "Implementation
  lead" not "the brave one."
- An agent file inherits from the anatomy layers. It does not redefine
  them. If the agent needs a layer explained, link to `01_ANATOMY/`.
- The Owner/Operator is a role file too, but it is governed by Part
  VIII (Transferability) and stays PENDING until that part is written.
