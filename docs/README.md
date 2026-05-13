# The Burroship · Documentation
 
Internal documentation for the people building The Burroship.
 
Read these in any order. They cross-reference each other.
 
## The catalog
 
### Brand and product
 
| File | What it is |
| --- | --- |
| [BRAND.md](./BRAND.md) | What The Burroship is. The conceit, the three rooms, the values. |
| [VOICE.md](./VOICE.md) | The tone manifesto. "Signals from an operating system." |
| [CONTENT.md](./CONTENT.md) | Living source of truth for every line of production copy. |
 
### Design and engineering
 
| File | What it is |
| --- | --- |
| [DESIGN.md](./DESIGN.md) | Visual system. Color, type, decoration, motion. |
| [STYLE_GUIDE.md](./STYLE_GUIDE.md) | Engineering conventions. File structure, tokens, naming. |
| [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) | Netlify, Supabase, env vars, fail-safes. |
| [WORKFLOW.md](./WORKFLOW.md) | How Claude and Tyler ship together. |
 
### The world
 
| File | What it is |
| --- | --- |
| [WORLD.md](./WORLD.md) | The Cesium experience, the gondola vantage, town page plans. |
| [AGENTS.md](./AGENTS.md) | The six-agent council. Warbleur, Cypher, Lyra, Volt, Ion, Canyon. |
| [GAUSSIAN_SPLATS.md](./GAUSSIAN_SPLATS.md) | Practical splat capture and processing handbook. |
 
### Meta
 
| File | What it is |
| --- | --- |
| [README.md](./README.md) | This file. The catalog. |
| [ROADMAP.md](./ROADMAP.md) | Phased build plan. What shipped, what's next. |
| [CLAUDE_SKILLS.md](./CLAUDE_SKILLS.md) | Skills available for Claude Code work on Burroship. |
 
## The order to read for different roles
 
**Anyone new, first 30 minutes:**
1. BRAND
2. VOICE
3. ROADMAP
 
**New designer joining:**
1. BRAND
2. DESIGN
3. VOICE
4. CONTENT
5. WORLD (the vantage section)
6. Skim the rest
 
**New content writer:**
1. BRAND
2. VOICE
3. CONTENT
4. AGENTS
5. ROADMAP
 
**New developer:**
1. BRAND (orient)
2. STYLE_GUIDE
3. INFRASTRUCTURE
4. WORKFLOW
5. WORLD if working on `/world/`
6. The rest as needed
 
**New Claude / contractor:**
1. BRAND
2. WORKFLOW
3. CLAUDE_SKILLS
4. STYLE_GUIDE
5. Then whatever the current task touches
 
**For splat capture work:**
1. BRAND (the vantage matters)
2. WORLD
3. GAUSSIAN_SPLATS
 
## How to update these docs
 
These files are checked into git. Update them when the brand,
infrastructure, or conventions change. Annotate significant changes
in the file rather than just overwriting.
 
For copy that lives on the live site, update `CONTENT.md` to reflect
the new state. The Live/Draft/Locked status keeps everyone aligned.
 
For brand evolution, update `BRAND.md` first, then ripple changes
through `VOICE.md`, `DESIGN.md`, and others as needed.
 
For roadmap progress, mark phases as shipped in `ROADMAP.md` when they
ship. Add new phases to the end as they emerge.
 
## Live site for reference
 
[theburroship.netlify.app](https://theburroship.netlify.app)
 
## The repo
 
[github.com/neonburro/burroship](https://github.com/neonburro/burroship)
