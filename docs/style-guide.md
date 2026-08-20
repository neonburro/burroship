# the burroship, style guide

Short, and the code is the real authority. Where this and `src/styles/index.css`
disagree, the css wins and this file is wrong.

## the type system

Two families, and the pairing is an idea rather than a taste.

**Newsreader** is the town. A modern cut of the faces small newspapers were set in, and
it is what makes a page of ours look printed instead of rendered. It carries every
headline, every paragraph, every name, the wordmark, anything a person reads.

**IBM Plex Mono** is the ship. The technical voice. It carries every uppercase label,
every button, every readout, the coordinates in the footer, the kickers over a heading.

> serif for what a person says, mono for what the machine says.

That division is the system. A label in the serif or a paragraph in the mono breaks it,
and it will look wrong before you work out why.

### the two rules that never move

- **everything a person reads is lowercase.** headlines, prose, names, buttons that speak
  in our voice. we do not capitalise for emphasis.
- **everything the machine says is uppercase mono**, tracked wide, small. kickers,
  labels, status, coordinates.

The contrast between those two is most of the personality of the site. Keep it.

### the scale

| class | size | use |
|---|---|---|
| `text-display-2xl` | 40 to 68 | one per page at most, the biggest statement |
| `text-display-xl` | 32 to 46 | page headline |
| `text-display-lg` | 26 to 36 | entry title in a list |
| `text-display-md` | 20 to 27 | section heading |
| `text-display-sm` | 17 to 21 | card title |
| `text-lead` | 18 | the line under a headline |
| `text-body` | 16 | reading prose |
| `text-body-sm` | 13 | secondary |
| `text-mono-lg / mono / mono-sm / mono-xs` | 12 / 11 / 10 / 9 | labels, all uppercase |

Newsreader is variable on optical size and `font-optical-sizing: auto` is set on `html`,
so the same family is honest at 68px and at 16px. Do not hand tune per breakpoint.

**Tracking.** A serif needs far less negative tracking than a geometric sans. Display
sits near -0.015em, body sits at 0. The previous system was Rubik at -0.03em, and
carrying that number over closes Newsreader's counters and the word turns to mud. The
wordmark is -0.02em for the same reason.

## colour

One accent, sky blue `--color-accent` #2E9BE6, and it is spent sparingly. A beacon dot,
a live link, the period after the wordmark. If a screen has more than two or three
accent moments it is doing too much.

The ground is a cool blue grey, not white. `--color-chrome` #1C1F26 is the smoky charcoal
of the two floating bars, nav and footer, and they must stay equal.

## shapes

Rounded, generously. 26px on a full sheet, 22px on a bar, 14px on a control. Nothing
square. Where a picture meets a surface, the picture falls into it through an eased
multi stop scrim rather than stopping at a hard line, see `Gate.jsx`.

No containers around content on a phone. Bands run 99.5 percent wide on mobile and 97 on
desktop, which is the house measure and is duplicated in the nav, the footer, the gate
and the log.

## voice

Calm operational intelligence. Plainspoken, dry, specific. Never marketing, never an
exclamation point. Real places anchor everything, Ridgway, Ouray, the Cimarrons,
Courthouse and Chimney.

**No oxford commas. No em dashes and no en dashes.** Hyphens inside compound words are
fine. Write "hueman and ai", never "human and AI".
