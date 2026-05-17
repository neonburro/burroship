# Claude Skills
 
Skills available for working on The Burroship. A skill is a folder
containing a `SKILL.md` file that tells Claude how to handle a
specific type of task.
 
## What skills do (and don't do)
 
**Skills work in Claude Code** (the terminal CLI for coding) when
installed at `~/.claude/skills/`. Claude Code reads them
automatically and applies the relevant ones based on the task.
 
**Skills do NOT change Claude's behavior in claude.ai chat.** The
chat interface cannot read from your local filesystem. The skills
are documented here as a reference and as installable assets, but
they only auto-trigger inside Claude Code.
 
For chat work, the best practice is to point Claude at the relevant
skill file in this repo. For example: "Use the bulk-file-delivery
pattern in docs/skills/bulk-file-delivery/SKILL.md."
 
## The skills
 
### bulk-file-delivery
 
**When it applies:** Delivering 5+ files into the repo as one
atomic operation.
 
**What it does:** Builds a single self-installing `.sh` deploy
script with all files inlined via heredocs, archives existing files
to `_archive/[timestamp]/` before overwriting, runs in a sandbox
test before sending.
 
**Why it exists:** Earlier attempts at "drop these 20 files in" or
"download this tar.gz" failed because macOS auto-extracts archives
on download. The single-script pattern is the workflow that works.
 
**Location:** `docs/skills/bulk-file-delivery/SKILL.md`
 
**Install to Claude Code:**
 
```bash
mkdir -p ~/.claude/skills
cp -r ~/burroship/docs/skills/bulk-file-delivery ~/.claude/skills/
ls ~/.claude/skills/bulk-file-delivery/
```
 
### burroship-voice
 
**When it applies:** Writing any production copy for The Burroship.
 
**What it does:** Loads the voice manifesto, the banned-phrase list,
the 90/10 ratio, the real-place vocabulary, and the three-rooms
metaphor. Ensures copy stays in the "signals from an operating
system" register.
 
**Why it exists:** The voice is specific and easy to drift from.
Even when Claude knows the rules in conversation, a long session
can erode them. The skill is insurance.
 
**Location:** `docs/skills/burroship-voice/SKILL.md`
 
**Install to Claude Code:**
 
```bash
mkdir -p ~/.claude/skills
cp -r ~/burroship/docs/skills/burroship-voice ~/.claude/skills/
ls ~/.claude/skills/burroship-voice/
```
 
## Installing all Burroship skills at once
 
```bash
mkdir -p ~/.claude/skills
cp -r ~/burroship/docs/skills/* ~/.claude/skills/
ls ~/.claude/skills/
```
 
You should see:
 
```
bulk-file-delivery/
burroship-voice/
```
 
After this, Claude Code automatically reads the relevant skill
when you start a Burroship-related task.
 
## Updating a skill
 
Skills are just markdown files. Edit them in `docs/skills/[name]/SKILL.md`,
commit the change, and re-install if you've already installed them
locally:
 
```bash
cp ~/burroship/docs/skills/[name]/SKILL.md ~/.claude/skills/[name]/
```
 
## Adding a new skill
 
1. Create `docs/skills/[new-skill-name]/SKILL.md`
2. Write the YAML frontmatter (`name`, `description`)
3. Write the body
4. Add an entry to this file
5. Commit
 
The frontmatter `description` is what Claude reads when deciding
whether to use the skill. Be specific. The skill-creator skill at
`~/.claude/skills/skill-creator/` has a full guide.
 
## Reference
 
The format and conventions come from Anthropic's skill-creator
documentation. The general shape of a SKILL.md:
 
```markdown
---
name: skill-name
description: When to trigger and what the skill does. Be specific.
---
 
# Skill Name
 
What the skill helps Claude do.
 
## When this skill matters
 
Concrete trigger phrases or contexts.
 
## The workflow
 
Steps Claude should follow.
 
## Anti-patterns
 
Things to avoid.
```
 
## See also
 
- `WORKFLOW.md` for the bulk-file-delivery pattern in narrative form
- `VOICE.md` for the voice rules the burroship-voice skill enforces
- `STYLE_GUIDE.md` for engineering conventions
