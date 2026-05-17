---
name: bulk-file-delivery
description: Deliver many files (typically 5+) into a user's existing repo as one safe, atomic operation. Use this skill whenever a change touches multiple files, restructures folders, refactors modules at once, scaffolds a feature with multiple files, or rebuilds styling across an app. Triggers include phrases like "redesign the repo," "restructure the components," "rebuild the home page," "drop all these files in," or whenever producing more than five files in one delivery. Use even if the user does not explicitly ask for a deploy script. Assembling many files into a single self-installing shell script is safer than asking the user to download each file individually.
---
 
# Bulk File Delivery
 
A workflow for shipping many files (5+) into a user's existing repo
as one safe, idempotent operation. The default of "here are 20 files,
drop them in" puts cognitive load on the user, costs 20 trips through
download-and-place, and breaks if even one file lands in the wrong
directory. This skill replaces that with a single deploy script the
user runs once.
 
## When this skill matters
 
Use this skill when ANY of these apply:
 
- The delivery includes 5+ files going into different directories
- The work involves restructuring existing folders (moving, deleting,
  renaming)
- The user's repo already has files that conflict with what's being
  added
- Past attempts at "drop these files in" have led to errors
- The user is on a slower connection or on mobile
- You are about to write "Drop file A in ~/path/A, then file B in
  ~/path/B..."
 
Stop and use this skill instead.
 
## The workflow
 
### Step 1 — audit the user's current state
 
Before generating any files, get a real picture of what's in their
repo. Ask for either:
 
- `git status` output
- `tree src -L 3` (or `find src -type f` if tree is not installed)
- A specific directory listing of the area you're touching
 
Without this, you'll guess at what to archive versus replace.
 
### Step 2 — design the file manifest
 
In the conversation, list every file you're going to create and
exactly where it lives. The user should see:
 
- New files (creating)
- Replaced files (already exist, you're overwriting)
- Removed files (already exist, you're archiving)
- Untouched files (already exist, leaving alone)
 
A delivery of 20 files should produce a 4-list summary so the user
can mentally check it.
 
### Step 3 — stage files into a flat output structure
 
Build the files in a working directory that mirrors the target.
Example:
 
```
/home/claude/delivery/files/
├── docs/
│   └── DESIGN.md
└── src/
    ├── App.jsx
    ├── components/Atoms/Button.jsx
    └── pages/Home/index.jsx
```
 
This makes the next step trivial.
 
### Step 4 — generate the deploy script via Python, not bash
 
Bash heredocs nested inside bash scripts are brittle. The content of
each file may contain shell special characters that break the outer
heredoc. Use a Python builder to assemble the deploy script. The
Python builder:
 
1. Reads each source file
2. Verifies the heredoc marker (e.g. `MYPROJECT_EOF_01`) does not
   appear in the file content
3. Emits a `cat > "path" << 'MARKER'` block per file with a unique
   marker
4. Writes the resulting `.sh` to outputs
 
A template builder is included in this skill — see
`scripts/build_deploy_script.py`.
 
### Step 5 — the deploy script should
 
- Begin with `#!/bin/bash` and `set -e`
- Require `package.json` (or similar) to exist as a sanity check
- Archive (don't delete) any files being removed, to
  `_archive/$(date +%Y%m%d_%H%M%S)/`
- Use `[ -f "X" ] && mv ... || true` patterns so the script doesn't
  crash on missing files
- Create directories with `mkdir -p` before writing files
- Echo what it's doing as it goes (one `echo "  -> filepath"` per
  file)
- Clear build caches at the end (`rm -rf node_modules/.vite` for
  Vite, etc.)
- Print clear next steps (verify command, commit command)
 
### Step 6 — surgical edits for unchanged-but-modified files
 
Sometimes a file needs a small change but rewriting it would lose
state. Example: `App.jsx` is mostly fine but needs one import line
removed.
 
Use `sed` for these in the deploy script:
 
```bash
if grep -q "CoordinateBar" src/App.jsx; then
  sed -i.bak '/CoordinateBar/d' src/App.jsx
  rm -f src/App.jsx.bak
fi
```
 
The `.bak` then `rm` pattern works on both GNU sed (Linux) and BSD
sed (macOS). Plain `-i ''` does not work on Linux. Plain `-i` does
not work on macOS.
 
### Step 7 — sandbox test before sending
 
This is the step that matters most. Never send an untested script.
 
```bash
SANDBOX=/tmp/skill-test
rm -rf $SANDBOX
mkdir -p $SANDBOX
cd $SANDBOX
touch package.json
 
bash /mnt/user-data/outputs/deploy.sh 2>&1 | tail -20
 
find $SANDBOX -type f | sort
find $SANDBOX -type f | wc -l
grep -r "MYPROJECT_EOF" $SANDBOX || echo "clean"
```
 
If this fails, fix the script and retest.
 
### Step 8 — deliver one file
 
The user downloads one file. They place it in their repo root. They
run it. Done.
 
Pair the script delivery with a short instruction block:
 
- Where to place the script
- The exact command to run
- What they should see
- What to do if it breaks (the archive folder location)
- The commit command for after they verify
 
## Anti-patterns
 
Things this skill explicitly avoids:
 
- **Tar.gz delivery on macOS** — Safari auto-extracts the archive on
  download. The archive is gone before the user runs the script. Use
  inline heredocs in a single `.sh` file instead.
- **"Just paste this 2000-line block into your terminal"** — terminal
  pastes get truncated, special characters get mangled, copy-paste of
  long blocks gets interrupted by phone notifications.
- **Multiple commands for the user to chain** — every step the user
  has to execute is a step they might miss. One file, one command.
- **Deletion without backup** — always archive. The user has not yet
  verified the new files work.
- **Skipping the sandbox test** — untested scripts that fail in the
  user's repo erode trust faster than anything else.
- **Hardcoded user paths in the script** — use relative paths. The
  script should work from the repo root regardless of where the user
  installed it.
- **`sed -i` without compatibility handling** — BSD sed (macOS) needs
  `-i ''` or `-i.bak`. Use `sed -i.bak ... && rm -f *.bak` for
  cross-platform safety.
 
## Boundary cases
 
- **Single-file edits:** just present the file. Don't bring this
  skill out for one file.
- **2-4 files:** judgment call. If they're in different directories
  or replace existing files, use this skill. If they're co-located
  new files, present them directly.
- **Files needing user input mid-process:** either ship with a clear
  `TODO` comment OR ask the user the value upfront and bake it in.
  Don't make the user edit mid-deploy.
- **Files that need environment variables:** the script should not
  write `.env` files (they often contain secrets). Tell the user
  what env vars to add separately.
 
## Reference
 
See `scripts/build_deploy_script.py` for a reusable Python builder
template. Customize:
 
- The `HEADER` string (project name, archive paths, sanity check)
- The `FOOTER` string (cache-clear command, verify steps, commit)
- The `ORDER` list (the files to include, in dependency order)
- The marker prefix (e.g. `MYPROJECT_EOF_` so it's unique per project)
