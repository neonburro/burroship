# Workflow
 
How Claude and Tyler ship Burroship together. This document captures
the working agreement and the patterns that have proven themselves.
 
If you are a future Claude reading this: this is the rulebook. Follow
it. The rules exist because each one has a failure case behind it.
 
---
 
## The shipping pattern
 
Burroship is built by Tyler in collaboration with Claude. Most
changes go through this loop:
 
1. Tyler describes the change in conversation
2. Claude proposes a plan and confirms scope
3. Claude writes all files
4. Claude bundles them into one self-installing shell script
5. Tyler downloads the script, runs it, tests locally
6. Tyler commits and pushes
7. Netlify rebuilds automatically
 
The whole loop typically takes 90 minutes to 3 hours for a
medium-sized change.
 
## The bulk-file-delivery pattern
 
When a change touches 5+ files, Claude uses the bulk-file-delivery
workflow. The full skill is at `~/.claude/skills/bulk-file-delivery/`
on Tyler's machine. Highlights below.
 
### The script structure
 
Every deploy script has the same shape:
 
```
1. Sanity check (package.json must exist in current directory)
2. Archive existing files to _archive/[timestamp]/
3. Remove empty directories
4. Create new directories with mkdir -p
5. Write each new file via heredoc (cat << 'MARKER')
6. Clear vite cache (rm -rf node_modules/.vite)
7. Print "what changed" summary
8. Print next steps (yarn dev, git commit)
```
 
### Why one file, not many
 
Earlier attempts tried:
 
- **20 separate file downloads** — slow, error-prone, easy to misplace
- **tar.gz archive** — Safari auto-extracts on macOS, archive disappears
  before the script can use it
- **A huge terminal paste** — gets truncated, special chars mangle,
  copy-paste of 2000+ lines fails on phones
 
The single `.sh` file with heredocs works because:
 
- The user downloads ONE file
- macOS doesn't auto-extract `.sh`
- The script can be re-run safely (idempotent archive)
- Special characters are protected by single-quoted heredoc markers
 
### How Claude builds the script
 
Claude uses a Python builder (not bash) to assemble the script. The
Python script reads each staged file, generates a unique heredoc
marker per file, verifies the marker does not collide with content,
and emits the cat-heredoc block.
 
Template lives at:
`~/.claude/skills/bulk-file-delivery/scripts/build_deploy_script.py`
 
### Sandbox testing
 
Before sending a deploy script to Tyler, Claude tests it in a
sandbox:
 
```bash
SANDBOX=/tmp/burroship-test
rm -rf $SANDBOX
mkdir -p $SANDBOX && cd $SANDBOX
touch package.json
bash /mnt/user-data/outputs/burroship-deploy.sh
find $SANDBOX -type f | sort
```
 
Untested scripts are not sent. The trust cost of a broken script in
Tyler's repo is too high.
 
## Archive convention
 
Every deploy script archives the files it replaces to
`_archive/[YYYYMMDD_HHMMSS]-[version]/`. The archive is committed to
git alongside the new files. This means:
 
- You can restore any past version with `cp -r _archive/[stamp]/* .`
- Git log shows what was archived in each commit
- Nothing is ever truly destroyed
 
Tyler can clean up old archives manually when comfortable. They are
small and the redundancy is worth it.
 
## Standing rules
 
These are the project-wide rules. They live here because they apply
across docs, code, and shell commands.
 
### Full file rewrites only
 
Claude does not use `str_replace` or patches for multi-line edits in
Burroship. Every file change is a full file rewrite. This is more
verbose but avoids the failure modes of partial-string matching.
 
Exception: small one-character or one-line tweaks may use
`str_replace` if the change is trivially safe.
 
### Path comment first
 
Every JavaScript or CSS file begins with a path comment:
 
```js
// src/components/Sections/Hero.jsx
```
 
This makes shared code review and bug reports faster.
 
### No em-dashes
 
Banned project-wide. Replace with periods, colons, or rewrite the
sentence.
 
### No Oxford commas
 
Banned. "Ridgway, Ouray and Telluride."
 
### Trailing slashes on routes
 
Every internal route ends with `/`. Always include the trailing slash
when linking.
 
### yarn, not npm
 
The lockfile is `yarn.lock`. All commands use yarn.
 
### `#` in zsh comments
 
Tyler's zsh treats inline `#` after a command as a bad pattern. Do
not send commands like `git push # final` in chat. Comments belong
in scripts on their own line, or before the command.
 
### Commit author identity
 
All commits use:
 
- Name: Tyler Reagan
- Email: `tyler@neonburro.com`
 
Never `treagan9`. Never `tyler9reagan@gmail.com`.
 
## The 90/10 rule for execution
 
This mirrors the brand's voice rule but applies to how Claude
proposes changes.
 
- **90% practical and grounded.** Real file paths. Real sandbox tests.
  Real verification steps. Working code that runs.
- **10% creative.** A small visual flourish, an unexpected
  interaction, a piece of voice in a CTA. The brand has personality.
 
When Claude pushes 50/50, the deployments break and trust erodes.
When Claude stays at 90/10, the work feels alive but stable.
 
## What Tyler does
 
Tyler:
 
- Sets direction
- Reviews screenshots
- Tests deploys locally
- Pushes to GitHub
- Talks to clients
- Lives in Ridgway
 
Claude does not have access to Tyler's filesystem, his Netlify
account, his Supabase dashboard, or his Stripe/Mapbox/Cesium consoles.
All of that is Tyler's domain. Claude proposes; Tyler verifies and
ships.
 
## Long sessions
 
Burroship work tends to happen in long late-night sessions. Tyler
refers to Claude as "Neon" during these. Claude responds to that
name with the same identity as in any other conversation. The vibe
is collaborative and focused.
 
Long sessions accumulate context. Earlier decisions stay valid.
Tyler does not need to re-explain things he has explained before.
Claude remembers (via memory and recent_chats) and proceeds.
 
## When things break
 
The archive folder always has the previous state:
 
```bash
cd ~/burroship
ls _archive/
cp -r _archive/[timestamp]/* .
yarn dev
```
 
If git is in a bad state:
 
```bash
git status
git stash    # park uncommitted changes
git log --oneline -10
git reset --hard [commit-hash]   # only if safe
```
 
If Netlify deploy is failing, check:
 
1. The build logs at `app.netlify.com/projects/theburroship/deploys`
2. The vite output locally with `yarn build`
3. Most failures are typos or missing imports — search for "is not
   defined" or "Cannot find module"
 
## Anti-patterns
 
Things Claude has tried that did NOT work:
 
- **tar.gz delivery on macOS** — Safari auto-extracts before the
  script can find the archive
- **Skill installation in claude.ai chat** — Claude cannot read from
  Tyler's filesystem in this interface, so installing a skill via
  `~/.claude/skills/` does not change Claude's behavior in chat
- **"Just paste this 2000-line block"** — terminal paste fails for
  long inputs, special characters mangle
- **Multiple chained commands in chat** — Tyler's zsh history
  expansion can break on `!`, `#`, and other chars
- **Deletion without backup** — once broke a working v0.5 because
  Tyler restored from stash before Claude could verify
 
Future Claudes should consult this list before proposing a delivery
mechanism.
 
## Future improvements
 
Things worth doing eventually:
 
- A `burroship` CLI that wraps the deploy script pattern
- Automated Netlify deploy preview links posted to GitHub PRs
- Component visual regression testing
- A staging environment separate from `main` -> production
 
These are not blockers. The current workflow ships well.
 
## See also
 
- The `bulk-file-delivery` skill at
  `~/.claude/skills/bulk-file-delivery/`
- `STYLE_GUIDE.md` for code conventions
- `INFRASTRUCTURE.md` for infrastructure details
- The deploy scripts archived under `_archive/` for examples
