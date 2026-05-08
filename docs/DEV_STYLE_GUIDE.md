# Burroship Developer Style Guide

Conventions for writing code in this repo. These are not preferences,
they are rules. The goal is consistency across every file so that
six months from now any contributor (human or AI) opens a file and
knows exactly what to expect.

## Language

- JavaScript only. No TypeScript anywhere.
- React 19 functional components. No class components, ever.
- ES modules with named or default exports. No CommonJS.

## File Organization

- One component per file.
- File name matches export name. Header.jsx exports Header.
- PascalCase for components: Header.jsx, MapWorld.jsx
- camelCase for hooks and lib utilities: useKnock.js, supabase.js
- kebab-case for folders: components/header/, not Header/

## Top of Every File

Every file starts with a path comment. This is a hard rule.

\`\`\`
// src/components/header/Header.jsx
\`\`\`

For CSS files, use a CSS comment:

\`\`\`
/* src/styles/index.css */
\`\`\`

## Imports

Imports are ordered in groups, separated by a blank line:

1. React and React internals
2. Third-party libraries
3. Local lib utilities
4. Local components
5. Styles (last)

\`\`\`
import { useState } from "react";
import { motion } from "framer-motion";

import { supabase } from "../../lib/supabase";

import IdentifyButton from "./IdentifyButton";
\`\`\`

## Tokens, Never Hex

All colors come from CSS custom properties defined in
src/styles/index.css. Use Tailwind utility classes that map to them:

- bg-background not bg-[#050F05]
- text-text-primary not text-white
- border-border not border-zinc-800

If you find yourself wanting a hex code in JSX or in a className,
stop. Add a token to DESIGN.md and src/styles/index.css instead.

## Routes

All routes end with a trailing slash. This matches the convention
across every other Burroship and Cimarron property.

\`\`\`
<Route path="/aboard/" element={<Aboard />} />
\`\`\`

When linking, also include the trailing slash:

\`\`\`
<Link to="/aboard/">Aboard</Link>
\`\`\`

## Copy Conventions

- No em dashes anywhere in user-facing copy.
- No Oxford commas in user-facing copy.
- No exclamation points in UI copy.
- No emoji in UI copy. Mono and sans, that is it.
- Sentence case for buttons and labels, not Title Case.

## Styling

- Tailwind utility classes preferred for layout, spacing, color.
- Custom CSS only when Tailwind cannot express the intent (rare).
- Animation values reference motion tokens from DESIGN.md.
- No inline style props for color, spacing, or typography. Use
  Tailwind classes that read from tokens.

## Components

- Default export at the bottom of the file.
- Props destructured in the function signature.
- No prop types or default values via TypeScript-style syntax.
  Use defaultProps via JS or just default destructuring.
- Components stay under 150 lines. If a component grows past that,
  split it into smaller ones.

## State

- useState for local state.
- useReducer for state with multiple related transitions.
- Context only when state genuinely needs to cross 3+ component
  layers. Prop drilling is fine for shallow trees.
- No global state libraries (no Redux, no Zustand, no Jotai) unless
  a real need emerges. The site is small.

## Network

- Supabase calls go through src/lib/supabase.js, never imported
  directly into components.
- Netlify functions handle anything that needs a server-side secret
  (passphrase validation, write operations with the service role).
- Client-side reads of public data (agent positions, etc.) can use
  the anon key directly.

## Comments

- Code should be self-documenting. Comments explain why, not what.
- TODO comments include the date and a short reason:
  // TODO 2026-05-08: replace with real Mapbox style when token lands

## Commits

- Conventional Commits format:
  - feat: new feature
  - fix: bug fix
  - refactor: code change without behavior change
  - style: formatting only
  - docs: documentation only
  - chore: tooling, deps, config
- Subject in imperative mood: "add map component", not "added map
  component".
- Subject under 72 characters. Body wrapped at 72.

## Editing Existing Files

When asked to modify a file, deliver the complete new file. No
partial patches. No diffs. No str_replace blocks. This is a
project-wide rule, not a preference.

## When in Doubt

Read DESIGN.md. The brand philosophy is the tiebreaker for any
decision the style guide does not cover.
