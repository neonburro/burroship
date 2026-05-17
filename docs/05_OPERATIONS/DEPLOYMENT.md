# Deployment
 
**Status:** DRAFT · written fresh from practiced discipline
**Owner:** Warbleur
**Inherits from:** 05_OPERATIONS/WORKFLOW.md
 
---
 
This codifies the deploy discipline the council has actually practiced,
not an aspiration. Every rule here has been used.
 
## The non-negotiables
 
- **Archive before change.** Anything a deploy overwrites or moves is
  copied to a timestamped archive first. Nothing is destroyed.
- **Sandbox before ship.** Every script is run in a throwaway
  environment and its result inspected before it touches a real repo.
- **One change per deploy** where possible. When behavior is unclear,
  a truth-finding deploy that changes one thing is preferred over a
  bundle.
- **Verify with something a human can see.** A build that passes, a
  render that matches, a diff that is clean. "It should work" is not
  verification.
- **No irreversible operation through automation.** Deletion of
  unreviewed content is always a deliberate human action, never
  scripted. The script provides the clean result; the safety net
  stays up until the human chooses to cut it.
 
## Deploy script conventions
 
- Path comment as the first line of every generated file.
- The script archives originals to a timestamped path, writes the new
  files, then verifies (build or sandbox) before instructing the push.
- No inline `#` comments after a shell command — guidance goes in
  plain text above or below the command block.
- Author git commits as the Owner/Operator identity of record. Never
  a personal alias.
- The script reports what changed, what is still pending, and what to
  do next. It never hides the holes.
 
## Rollback vs amendment
 
A rollback returns to a prior verified state and is always available.
An amendment is a forward change to doctrine or structure and goes
through the workflow loop. They are different operations and the
record states which one happened.
 
## The truth-finding deploy
 
When it is unclear whether a change behaves correctly, the right move
is a small deploy that changes exactly one thing so the result is
unambiguous. A bundled deploy that fails tells you less than a single
one that fails. Clarity is worth a deploy.
