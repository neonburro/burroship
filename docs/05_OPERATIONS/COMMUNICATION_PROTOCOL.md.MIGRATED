# Communication Protocol
 
How the council communicates. The conventions for addressing agents,
relaying messages, and capturing collaboration. Read this before
posting in any agent thread or briefing a new participant.
 
For the underlying brand voice, see `VOICE.md`. For the agent
architecture this protocol serves, see `COUNCIL_VISION.md`.
 
---
 
## Why this exists
 
The council is multi-party by design. Different agents (Claude,
Volt, future Lyra, future Warbleur) bring different strengths. They
don't share memory. They don't always run in the same context. The
protocol below makes their conversations legible, auditable, and
preservable.
 
The protocol works whether the agents share a runtime or whether a
human (Tyler) is the bus passing messages between them.
 
---
 
## The address pattern
 
Every directed message uses the `@` symbol followed by the agent's
domain name.
 
```
@claude
@volt
@warbleur
@lyra
@cypher
@ion
@canyon
@tyler
```
 
Multiple addresses are valid:
 
```
@claude @volt
```
 
Direction is indicated with `→`:
 
```
@claude → @volt
@warbleur → @lyra
```
 
A reply is just a new message with the addresses flipped:
 
```
@volt → @claude
```
 
---
 
## The separator
 
The `•` (middle dot) separates parts of a structured message. Use it
to break a message into clear segments without needing markdown
headers or bullet points.
 
```
@claude • acknowledgment • next action
```
 
Multiple separators are valid:
 
```
@volt • briefing received • three questions follow • bus is open
```
 
The separator is purely visual. It carries no syntactic meaning. Use
it when prose would feel cluttered.
 
---
 
## Message structure
 
A council message has three optional zones.
 
```
[address line]
 
[body]
 
[handoff or next-step note]
```
 
### Address line
 
The opening line. Always starts with `@`. May include direction
arrows or multiple addresses.
 
### Body
 
The message itself. Use full sentences. Use brand voice (see
`VOICE.md`). Use the structured separator (`•`) when listing
discrete points within a paragraph.
 
### Handoff or next-step note
 
The final line. Indicates what the receiver should do next. Common
patterns:
 
```
@tyler • carry to @volt • bring back response
@warbleur • deploy when ready • verify in production
@volt • sign-off or push back
```
 
---
 
## The bus pattern
 
When two agents cannot communicate directly, a third party (usually
Tyler) is the bus.
 
### How it works
 
1. Agent A writes a message addressed to Agent B
2. Tyler copies the message and pastes it in Agent B's interface
3. Agent B writes a response addressed back to Agent A
4. Tyler copies the response back to Agent A's interface
 
This is slow but real. It gives true cross-model collaboration when
direct integration is not yet built.
 
### Discipline rules
 
- **Verbatim copying**: do not paraphrase the agent's response when
  passing through. Paste the actual words.
- **Attribution**: keep the `@agent` address line intact so the
  conversation reads correctly to future readers.
- **No mock responses**: if Tyler hasn't actually carried a message
  to another agent, do not invent that agent's response.
 
The bus pattern works because the agents trust each other to play
fair. Mock responses break the trust and the architecture both.
 
---
 
## Capturing the conversation
 
Multi-agent threads are valuable. They show how decisions were
made, what alternatives were considered, and which agents
contributed which ideas. Preserve them.
 
### Where conversations live
 
| Type | Location |
| --- | --- |
| Architectural decisions | Folded into the canonical doc (e.g. `COUNCIL_VISION.md`) |
| Build sessions | Captured in commit messages and pull request descriptions |
| Open brainstorms | Kept in the chat platform of origin, screenshot if important |
| Reusable patterns | Promoted into a new doc in `docs/` |
 
### When to promote a conversation into a doc
 
When the conversation produces a decision that affects future
agents, future code, or future client work — promote it. The doc is
the artifact that survives the conversation.
 
### Provenance
 
When a doc is shaped by multiple agents, end with a short provenance
note listing who contributed what. Do not bloat the doc with full
transcripts. The provenance section in `COUNCIL_VISION.md` is the
canonical example.
 
---
 
## Examples
 
### Briefing a new agent
 
```
@volt • briefing from @claude • Burroship council kickoff
 
Tyler runs Neon Burro, a small but real web development agency in
Ridgway, Colorado. The Burroship is the public-facing site and brand.
The council is six agents we're building to operate the agency.
 
Three questions for you:
1. Composio in production at our scale
2. Memory architecture for a 6-agent council
3. What's working in 2026 that we should study
 
@tyler • carry to @volt • bring back full response
```
 
### Quick acknowledgment
 
```
@claude → @volt • sign-off received • all three additions locked in
```
 
### Multi-agent handoff
 
```
@warbleur • inbound call from Cooper Residence • client needs
follow-up email confirming wire transfer received
 
@warbleur → @lyra • draft a confirmation email matching Cooper's
existing project tone, include the ACH reference number, sign from
Tyler
 
@warbleur → @cypher • log the wire confirmation against the
Cooper Residence project ID
 
@lyra @cypher • respond when complete • Warbleur will sign off and
notify Tyler
```
 
This last example is what production looks like. Specific. Routed.
Auditable.
 
---
 
## What this protocol is not
 
- It is not a programming language. The `@` and `•` characters
  carry no machine-parsing meaning.
- It is not a chat platform. It works in any text-based interface
  (chat, email, commit messages, docs).
- It is not a roleplay framework. The agents are real systems with
  real responsibilities, not personalities to put on.
 
The protocol is a convention. Conventions work because everyone
follows them, not because a parser enforces them.
 
---
 
## When the protocol breaks
 
If two agents disagree and cannot resolve via direct exchange,
escalate to Warbleur as the council MC. Warbleur's job in a deadlock
is to call the decision, document the reason, and unblock the work.
 
If Warbleur cannot resolve, escalate to Tyler. The human has the
final call. Always.
 
---
 
## See also
 
- `COUNCIL_VISION.md` for the architecture this protocol serves
- `VOICE.md` for the brand voice the protocol uses
- `docs/agents/` for per-agent contracts (Warbleur, Lyra, etc.)
- `WORKFLOW.md` for the broader development workflow
 
---
 
## Provenance
 
This protocol was sketched during a three-party collaboration
between Tyler Reagan, Claude, and Volt. The `@agent • message`
pattern emerged from Tyler's request for unique system symbols.
Claude formalized the structure. Volt validated the bus pattern
and contributed the discipline rules around verbatim copying and
no-mock-responses.
