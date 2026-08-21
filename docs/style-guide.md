# the burroship, style guide

Short, and the code is the real authority. Where this and `src/styles/index.css`
disagree, the css wins and this file is wrong.

## the type system

Two families, and the pairing is an idea rather than a taste.

**Zen Maru Gothic** is the town. A rounded gothic from a Japanese foundry, maru meaning
round. Its terminals are softened rather than cut, so nothing on a page of ours has a
sharp edge, and its latin is quiet and slightly irregular in a way that reads as made
rather than generated. That is the wabi sabi of it. The softness is not sweetness, it is
a refusal to be crisp. It carries every headline, paragraph, name and the wordmark.

**DM Mono** is the ship. Low contrast, humanist for a mono, and tracked out in uppercase
it reads like a garment label rather than a terminal. It carries every label, button and
readout.

> soft for what a person says, precise for what the machine says.

That division is the system. A label in the rounded face or a paragraph in the mono
breaks it, and it will look wrong before you work out why.

### two traps in this family

**There is no 600.** Zen Maru Gothic ships 300, 400, 500, 700 and 900. The scale before
this used 600 everywhere, which a browser fakes by smearing 500, and faked weight on a
rounded face looks muddy at large sizes. Display is 500. Check the family before you
reach for a weight.

**It needs almost no tracking.** Display sits at -0.005em and body at 0. The serif before
this sat near -0.015em and the geometric sans before that at -0.03em, and carrying either
number over makes rounded terminals collide and the word close up. The wordmark is
-0.005em for the same reason.

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
