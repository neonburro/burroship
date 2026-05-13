# The Burroship · Documentation
 
Internal documentation for the people building The Burroship.
 
Read these in any order. They cross-reference each other.
 
## The catalog
 
| File | What it is | Read if you are |
| --- | --- | --- |
| [BRAND.md](./BRAND.md) | What The Burroship is. The conceit, the three rooms, the values. | Anyone, first |
| [VOICE.md](./VOICE.md) | The tone manifesto. "Signals from an operating system." | A writer or designer |
| [DESIGN.md](./DESIGN.md) | Visual system. Color, type, decoration, motion. | A designer or frontend developer |
| [STYLE_GUIDE.md](./STYLE_GUIDE.md) | Engineering conventions. File structure, tokens, naming. | A developer |
| [CONTENT.md](./CONTENT.md) | Living source of truth for every line of copy. | A writer or developer wiring copy |
| [WORLD.md](./WORLD.md) | The Cesium experience. Airship, towns, waypoints. | Anyone working on `/world/` or town pages |
| [AGENTS.md](./AGENTS.md) | The six-agent council. Names, domains, what each does. | Anyone working on `/automate/` |
| [WORKFLOW.md](./WORKFLOW.md) | How Claude and Tyler ship together. Deploy patterns. | Future contributors and future Claudes |
| [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) | Netlify, Supabase, env vars, fail-safes. | Anyone with operator access |
 
## The order to read for different roles
 
**New designer joining:**
1. BRAND
2. DESIGN
3. VOICE
4. CONTENT
5. Skim the rest
 
**New content writer:**
1. BRAND
2. VOICE
3. CONTENT
4. AGENTS
 
**New developer:**
1. BRAND (orient)
2. STYLE_GUIDE
3. INFRASTRUCTURE
4. WORKFLOW
5. The rest as needed
 
**New Claude / contractor:**
1. BRAND
2. WORKFLOW
3. STYLE_GUIDE
4. Then whatever the current task touches
 
## Updating these docs
 
These files are checked into git. Update them when the brand,
infrastructure, or conventions change. Annotate significant changes
in the file rather than just overwriting.
 
Live site for reference: [theburroship.netlify.app](https://theburroship.netlify.app)
