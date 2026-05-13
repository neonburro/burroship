# Agents
 
The council. Six onboard systems coordinating the work of The
Burroship. They live on the bridge of the vessel.
 
Read `VOICE.md` first. The agents are systems, not characters.
 
---
 
## The council at a glance
 
| Name | Domain | Beacon color | Job |
| --- | --- | --- | --- |
| Warbleur | Voice | `#A8D055` lantern green | Spoken interactions, calls, transcription |
| Cypher | Data | `#7BA8C4` slate blue | Information retrieval, security, query |
| Lyra | Tone | `#C9A87C` warm tan | Writing, editing, brand consistency |
| Volt | Flow | `#FFD166` amber | Workflow orchestration, triggers |
| Ion | Memory | `#06D6A0` mint | Context, history, recall |
| Canyon | Terrain | `#E29578` clay | Maps, places, location intelligence |
 
## How they appear in the brand
 
### On the home page
 
Six tiles in the Automate section. Each tile:
 
- A small beacon dot in the agent's color
- The agent's name (mono, ink)
- The domain word (mono-xs, faint)
 
That is the entire visible presence on the home page. Tiles link
through to `/automate/` for detail.
 
### On `/automate/`
 
The dedicated agent page. Currently shows the six tiles slightly
larger with beacon dots and roles. Should grow over time into a
"what each agent actually does" page, but never into character
profiles.
 
### On the world map
 
Future work: agents will surface on the Cesium world as beacon
signals over specific locations. Cypher might appear over a data
center, Canyon over the Cimarron, etc. This makes the agents feel
spatial rather than chatbot-shaped.
 
## Voice rules for the agents
 
These rules are downstream of `VOICE.md` but specific enough to
matter here.
 
### What they are
 
- Onboard systems
- Operational intelligences
- Coordinated components of the vessel
- Each with a defined domain
 
### What they are not
 
- Assistants
- Chatbots
- Characters with personalities
- Mascots
- "AI agents" (the term is banned in production copy)
 
### How to talk about them
 
Talk about an agent the way an aviator talks about an instrument.
"The altimeter reads 18,000 feet" is the right register. "Cypher
secured the data" is the right register. "Hi, I'm Cypher!" is not.
 
### Domain words
 
Each agent has one domain word. Use it. Do not expand it.
 
- Voice (not "voice and audio processing")
- Data (not "data analytics platform")
- Tone (not "tone and brand voice management")
- Flow (not "workflow orchestration")
- Memory (not "knowledge base")
- Terrain (not "geographical intelligence")
 
The shortness is part of the voice.
 
## The agents in detail
 
### Warbleur · Voice
 
The system that handles spoken interactions. Inbound calls, outbound
calls, transcription, voice commands, audio routing.
 
Currently implemented for: MW Grid Solutions (call forwarding with
Twilio + Deepgram transcription + Resend notifications). Plans to
expand.
 
Beacon color: `#A8D055` (lantern green, matches the Burroship dark
accent)
 
### Cypher · Data
 
The system that handles information retrieval, security, and queries.
Talks to databases, runs reports, encrypts and decrypts, manages
access.
 
Currently implemented for: Cimarron Engineering Pulse (project
management, client data, audit trails). Plans to handle cross-system
queries.
 
Beacon color: `#7BA8C4` (slate blue, professional reserve)
 
### Lyra · Tone
 
The system that handles writing and editing. Drafts emails, polishes
copy, maintains brand voice consistency, generates documentation.
 
Currently implemented for: client email drafting in Cimarron Pulse.
Plans to handle public-facing copy for client sites.
 
Beacon color: `#C9A87C` (warm tan, paper-like)
 
### Volt · Flow
 
The system that handles workflow orchestration. Triggers cascading
actions, manages task chains, routes work between humans and other
agents.
 
Currently implemented for: lead routing in Cimarron Pulse, automation
pipelines across NeonBurro client sites. Plans to handle multi-step
client workflows.
 
Beacon color: `#FFD166` (amber, electric)
 
### Ion · Memory
 
The system that holds context and history. Remembers what was said,
who was involved, what was decided, when. Provides recall to the
other agents.
 
Currently planned. Will use a vector store layered on Supabase.
 
Beacon color: `#06D6A0` (mint, fresh memory)
 
### Canyon · Terrain
 
The system that handles maps, places, and location intelligence. Knows
where things are, what's nearby, how to get there, what the elevation
is.
 
Currently implemented for: location data in the Cesium world, place
search in the AnswersMD concierge doctor finder. Plans to power the
town pages and the Splat library.
 
Beacon color: `#E29578` (clay, earth)
 
## What the council is NOT
 
A council is not an AI agent. It is a coordinated set of operational
systems. The word "council" implies that they work together, not
that they have personalities and meetings.
 
We do not write fiction about the agents. We do not give them
backstories. We do not have a sixth book in the Council Chronicles
series. If a visitor wants to imagine they are characters, that is
fine. We do not encourage it.
 
## How the council shows up in client work
 
When a client signs on for automation work, they typically engage
one or two agents to start.
 
- A restaurant might engage Warbleur for after-hours call handling
- A property care business might engage Volt for lead routing and
  Canyon for service-area mapping
- A medical practice might engage Cypher for record retrieval and
  Lyra for patient communication drafts
 
The council framing helps clients understand that they are buying
specific capabilities, not "AI." That distinction matters.
 
## Agent infrastructure
 
Each agent eventually lives in a separate Supabase function or set
of functions, with shared memory through the Ion store and shared
context through the Cypher data layer. Right now most of this is
ad-hoc per client. The Burroship Pulse internal tooling will
centralize it over time.
 
## See also
 
- `BRAND.md` for the council's place in the larger Burroship system
- `VOICE.md` for the underlying voice rules
- `CONTENT.md` for how the agents appear in current production copy
- `INFRASTRUCTURE.md` for the Supabase projects each agent uses
