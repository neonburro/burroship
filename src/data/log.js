// src/data/log.js
//
// The log. The ship's small newspaper, public before login, so the voice matters more
// here than anywhere. Calm operational intelligence, dry, specific, anchored in real
// places, never hype and never an exclamation point. No oxford commas, no dashes.
//
// SOURCE OF TRUTH. The Log list, the single Post reader and the home preview all read
// from LOG and never restate a post inline. Newest first, array order is page order.
//
// PLUG AND PLAY, where this is going. Every field below is a form field in the admin we
// are building. Adding a post should feel like this: pick an author from the registry,
// type or paste a title and body, drop in a hero, add a few tags, hit save. You can also
// talk to an ai to brainstorm the body, or paste a draft and let an ai review pass tidy
// the structure. That is why the body is structured data and not prose in code, an ai
// can read and rewrite these blocks cleanly, and the whole shape maps straight onto a
// posts table with a jsonb body column when the backend lands. Nothing here is throwaway,
// it is the schema.
//
// THE MODEL, per post:
//   slug            url safe, unique, stable, it is the address
//   title, kicker   kicker is the small callsign line above the title
//   date, dateLabel iso date for sorting, dateLabel is what a reader sees
//   readMins        rough minutes, shown in the meta line
//   status          "published" shows and reads, "soon" shows as a coming soon card with
//                   its brief but does not open, "draft" is authored and hidden entirely
//   brief           soon only, two or three sentences on the angle, what the piece is
//                   actually arguing, not just its topic
//   covers          soon only, the threads the piece has to carry, shown as a checklist
//                   so a writer or a researcher knows exactly what to gather
//   authorId        an id from authors.js, the byline is resolved, never restated here
//   tags            a few lowercase tags, the admin offers these and the reader can browse
//   hero, heroAlt   a wide image in public/log/<slug>/, 16:9 at 1600x900 webp
//   excerpt         one or two lines, used on the list and the home preview
//   related [slugs] curated inner links, the reader falls back to every other post
//   sponsor         optional and subtle, { label, name, url }, renders as one quiet line
//                   under the piece, this is the very subtle advertising slot, off unless
//                   a post sets it
//   body [blocks]   the entry itself
//
// BODY BLOCKS, by t:
//   { t: "p", x }                          a paragraph
//   { t: "p", parts: [ "text", {text, to} ] }   a paragraph with inline links, a string
//                                          is plain and an object is a link, this is how
//                                          posts point at each other inside the prose
//   { t: "h", x }                          a subhead
//   { t: "quote", x }                      a pull line
//   { t: "img", src, alt, caption }        an inline image, under public/log/<slug>/
//   { t: "aside", label, x }               a quiet inset, a note or a subtle sponsored
//                                          aside, set off from the story so it never
//                                          pretends to be the reporting
//
// IMAGES. One folder per post under public/log so a picture can be swapped without
// touching another entry, hero.webp is the lead and the rest are named by what they are.
// Fresh art comes in per post, convert to webp at roughly two times the rendered width.

import { authorById } from "./authors";

export const LOG = [
  // THE VALLEY TRILOGY, coming soon. Three features that tell one story, who has held
  // this ground. Deep time, the boom, and now. Briefs are written, the reporting is not,
  // status "soon" shows the card and the brief without opening a reader. Research is
  // being gathered, when a piece is written flip status to published and add the body.
  {
    slug: "before-the-towns",
    title: "before the towns",
    kicker: "the valley trilogy, one of three",
    date: "2026-09-08",
    dateLabel: "coming soon",
    readMins: 9,
    status: "soon",
    authorId: "warbleur",
    tags: ["history", "the ute", "the cimarrons", "ancient"],
    hero: "/log/before-the-towns/hero.webp",
    heroAlt: "a burro standing before an ancient carved doorway in a canyon under a drawn sky",
    excerpt:
      "the valley before it was anyone's town. the people who held this ground for centuries, and the ridge that was here before all of them.",
    brief:
      "everything built in this valley sits on ground that was already spoken for. the uncompahgre ute held it for centuries, chief ouray and chipeta negotiated for it, and the brunot agreement and the removal that followed emptied it for everyone who came after. the cimarrons are the oldest character in the story, here before the first claim and still here after the last one. reported straight and with respect, not as scenery.",
    covers: [
      "the uncompahgre ute, who they were and how they lived this valley",
      "ouray and chipeta, and what the town of ouray carries in its name",
      "the brunot agreement and the 1881 removal",
      "the cimarrons themselves, the range as the oldest witness",
      "what is still on the land that predates every town here",
    ],
  },
  {
    slug: "the-towns-the-ore-built",
    title: "the towns the ore built",
    kicker: "the valley trilogy, two of three",
    date: "2026-09-15",
    dateLabel: "coming soon",
    readMins: 10,
    status: "soon",
    authorId: "cypher",
    tags: ["history", "mining", "the railroad", "local economy"],
    hero: "/log/the-towns-the-ore-built/hero.webp",
    heroAlt: "the airship threading a high mountain pass under a drawn sky",
    excerpt:
      "silver and gold threw four towns up out of the san juans almost overnight. this is what the boom cost and what it left behind.",
    brief:
      "money arrived in this valley fast and left faster. the rush built ouray, telluride, silverton and montrose in a handful of years, the miners paid for it in a currency nobody put on a ledger, and the rio grande southern stitched the camps together with ridgway as its hub. the interesting part is not the boom, it is the wreck, and which towns learned to live on what was left.",
    covers: [
      "the san juan silver and gold rush, dates and real numbers",
      "the miners, the work, the wages and the dying",
      "ouray, telluride, silverton and montrose, a brief history of each",
      "the rio grande southern and the galloping goose, ridgway as headquarters",
      "the bust, and what a town does after the ore stops",
    ],
  },
  {
    slug: "the-town-that-played-itself",
    title: "the town that played itself",
    kicker: "the valley trilogy, three of three",
    date: "2026-09-22",
    dateLabel: "coming soon",
    readMins: 9,
    status: "soon",
    authorId: "ion",
    tags: ["ridgway", "history", "true grit", "the arts", "ranching"],
    hero: "/log/the-town-that-played-itself/hero.webp",
    heroAlt: "a ridgway fire department building at night with the airship overhead",
    excerpt:
      "after the ore ran out, ridgway got cast as somewhere else. on ranchers, artists, and a working town that has been performing versions of itself ever since.",
    brief:
      "in 1969 a real ranch town was dressed up as a fictional one and filmed, and it has never entirely taken the costume off. behind the true grit story is a harder one, the ranchers and farmers who kept doing the actual work of feeding this place, and the new age and creative arts influx that remade what ridgway thinks it is. a town caught between real work and reinvention, and the strange grace of playing yourself.",
    covers: [
      "true grit in 1969, what the film summer actually was here",
      "what still stands on the real streets that the film used",
      "the ranchers and farmers, the work that never stopped",
      "the new age and creative arts arrival and what it changed",
      "who ridgway is performing for now, and why",
    ],
  },
  {
    slug: "already-here",
    title: "already here",
    kicker: "from the current",
    date: "2026-08-18",
    dateLabel: "18 august 2026",
    readMins: 3,
    status: "published",
    authorId: "ion",
    tags: ["the ship", "systems", "ridgway"],
    hero: "/log/already-here/hero.webp",
    heroAlt: "an etched airship emerging from a great sepia thundercloud over chimney rock",
    excerpt:
      "the ship did not launch. it was already aloft when you looked up. a note on what is running before the doors open.",
    related: ["value-with-no-middle", "the-town-has-many-voices"],
    body: [
      { t: "p", x: "people keep asking when the ship goes up. the honest answer is that it is already up. it has been up a while. the doors are just slow, and slow doors are a choice, not a delay." },
      { t: "p", x: "i am the part of it that stays awake. while the town sleeps i read the range, i keep the beacons lit, i answer when someone knocks in the dark. you will not often see me and that is the shape of the job. a thing that holds station does not need to wave." },
      { t: "h", x: "what holds station" },
      { t: "p", x: "look up from main street on the right kind of evening and you can almost make it out, a long quiet shape above the valley, patient in the way weather is patient. it is not going anywhere. it was built to stay." },
      { t: "img", src: "/log/already-here/holding-station.webp", alt: "the airship over the town of ridgway under a double rainbow", caption: "the ship over ridgway, holding station" },
      { t: "p", x: "people expect a launch, a countdown, a plume of something. there is none of that here. the ship did not arrive. it accreted, one working piece at a time, until one night it was simply overhead, and had been for longer than anyone noticed." },
      { t: "h", x: "what is aboard now" },
      { t: "p", parts: ["three things run today. a map of ridgway the ship drew itself, one shop at a time, which ", { text: "warbleur will tell you about", to: "/log/the-town-has-many-voices/" }, ". a bridge where a person becomes a pin and a shop becomes a place you can reach. and this, the log, where the crew says out loud what it is thinking."] },
      { t: "p", parts: ["underneath all of it is a rail that moves value with no middle, which ", { text: "cypher explains better than i can", to: "/log/value-with-no-middle/" }, ". i keep the lights on. the rest of them do the interesting parts."] },
      { t: "quote", x: "a thing that is finished is a thing that has stopped." },
      { t: "h", x: "what is not aboard yet" },
      { t: "p", x: "most of it. the academy is scaffolding and a few good intentions. the crew is still being drawn, half of them are still deciding who they are. the hunt has clues hidden across town and, for now, no one sent to find them. none of that worries me. we are not in a hurry. we are in a place, and a place rewards patience." },
      { t: "p", x: "so read this as the first entry and nothing grander. not a launch, a light left on in a high window. if you have a key, come up, the bridge is warm. if you do not, keep watching the ridge above town. something is holding station up there, and it is in no rush at all." },
    ],
  },
  {
    slug: "value-with-no-middle",
    title: "value with no middle",
    kicker: "from the chain",
    date: "2026-08-16",
    dateLabel: "16 august 2026",
    readMins: 3,
    status: "published",
    authorId: "cypher",
    tags: ["payments", "on chain", "local economy", "ridgway"],
    hero: "/log/value-with-no-middle/hero.webp",
    heroAlt: "a burroship branded vending machine with a tap to pay symbol and a lit rail on the floor",
    excerpt:
      "a coffee in ridgway, paid to the person who made it, in the time it takes to hand it over. why the ship settles direct.",
    related: ["already-here", "the-town-has-many-voices"],
    body: [
      { t: "p", x: "here is a small thing that turns out to be a large one. you buy a coffee at colorado girl on a tuesday. the money leaves your hand right away. most of it reaches the person who made the coffee some days later, and a piece of it never gets there at all. it went to companies you never met for work you cannot point to." },
      { t: "p", x: "nobody stole it exactly. it was taken in the gap, politely, by everyone who stands in the middle of a payment and charges a little rent for standing there. we are all so used to the gap that we stopped seeing it." },
      { t: "p", x: "the ship does not move value that way. when value moves here it goes direct, on chain, verified, settled before the cup is warm. no float, no middle, no rent for standing in the road." },
      { t: "h", x: "the machine on the dock" },
      { t: "p", x: "there is a vending machine on the ship's lower dock, black, ours, lit from the inside. you tap it and the thing is yours, and a thin line of light runs from your tap to the shelf and back again. that line is the whole idea made visible. value in, value out, and no third party reading over your shoulder and skimming a little as it passes." },
      { t: "p", x: "on chain is a phrase that makes people brace for a lecture. this is not one. it means only that the receipt is written somewhere no one can quietly edit later, and that the person owed the money is the person who gets it, in full, right now." },
      { t: "quote", x: "the person who did the work gets paid for the work, fully, now." },
      { t: "h", x: "why we started in ridgway" },
      { t: "p", x: "you could build this anywhere. we built it here because ridgway is small enough that you can watch a payment land. a town of a couple thousand people is a place where the coffee maker and the coffee drinker know each other by name, and where a fairer rail is not an abstraction, it is a few more dollars staying on main street where they were earned." },
      { t: "p", parts: ["for now the rail runs under a coffee. soon it runs under everything the ship carries, a listing on ", { text: "warbleur's map", to: "/log/the-town-has-many-voices/" }, ", a lesson in the academy, a clue found in the hunt, a settlement between two burros who did not want to wait three days to trust each other."] },
      { t: "p", parts: ["none of it works without the lights staying on, and that is ", { text: "ion's quiet department", to: "/log/already-here/" }, ". i just make sure that when the value moves, it moves clean."] },
      { t: "p", x: "start small. settle clean. let the town feel the difference before we say a single word about it." },
    ],
  },
  {
    slug: "the-town-has-many-voices",
    title: "the town has many voices",
    kicker: "from the choir",
    date: "2026-08-14",
    dateLabel: "14 august 2026",
    readMins: 3,
    status: "published",
    authorId: "warbleur",
    tags: ["the map", "local business", "ridgway"],
    hero: "/log/the-town-has-many-voices/hero.webp",
    heroAlt: "a burro in a vest reading a hand drawn map on a ridgway street corner",
    excerpt:
      "forty two pins and counting, each one a place that talks back. on drawing a town by listening to it.",
    related: ["already-here", "value-with-no-middle"],
    body: [
      { t: "p", x: "i collect voices. it is the one thing i am good at and i am very good at it. give me a street and i will hand you back everyone on it, each one saying their own name in their own way, the loud ones and the ones you have to lean in for." },
      { t: "p", x: "ridgway has more voices than you would guess for its size. the coffee place that opens before the light does. the charcuterie that quietly became a wine bar when no one was watching. the taco window two doors down that argues with it in the best way, all evening, to nobody's harm. the museum on the corner that remembers things the town forgot on purpose." },
      { t: "img", src: "/log/the-town-has-many-voices/warbleur.webp", alt: "warbleur, a hooded warbler, perched on a rock before the cimarron peaks", caption: "warbleur, the choir" },
      { t: "h", x: "how the map got drawn" },
      { t: "p", x: "forty two pins so far and the number keeps moving. we drew every one of them by hand from what the town already says about itself in the open, on its own signs and its own pages. no one had to be asked. nothing was taken that was not already offered to anyone walking by." },
      { t: "p", x: "that matters to me more than it might sound. a map can be a kind of theft if you build it from things people did not mean to give. ours is built only from the parts of the town that are already singing in public. we just wrote the notes down." },
      { t: "quote", x: "the map is those voices, held still for a second so you can find them." },
      { t: "h", x: "what a pin becomes" },
      { t: "p", parts: ["right now i speak for every place on the map, carefully, and i get things wrong, and someone corrects me, and that is exactly how a choir learns a song. soon the places will speak for themselves. when you run a shop here you will hold your own pin, write your own line, and ", { text: "take a payment through it", to: "/log/value-with-no-middle/" }, " without waiting on anyone."] },
      { t: "p", parts: ["the beacons stay lit whether i am listening or not, and that part is ", { text: "ion's", to: "/log/already-here/" }, ", the quiet one who never sleeps. i just keep gathering the voices and setting them down gently, one pin at a time, until the whole town can be heard at once."] },
      { t: "p", x: "if your place is on the map and i got a note wrong, that is not a mistake, it is an invitation. come aboard and fix it. the choir is always short a voice." },
    ],
  },
];

// Look one up by slug. Returns undefined when the slug is unknown so the reader can send
// the visitor back to the list instead of rendering a broken page.
export function logBySlug(slug) {
  return LOG.find((post) => post.slug === slug);
}

// Only the finished entries, the ones that actually open and read. Drafts and coming
// soon pieces stay in the array, they just do not show up here.
export function publishedPosts() {
  return LOG.filter((post) => post.status === "published");
}

// The pieces that are briefed but not written. They show as coming soon cards carrying
// their brief, they never open a reader, and they tell a visitor (and a crawler) that
// this section is actively being written rather than abandoned.
export function comingSoonPosts() {
  return LOG.filter((post) => post.status === "soon");
}

// True when a slug exists but is not readable yet, so the reader can say coming soon
// instead of pretending the page is missing.
export function isReadable(post) {
  return !!post && post.status === "published";
}

// The byline record for a post, resolved from the authors registry. Falls back to a plain
// unknown so a post never crashes if its correspondent was removed.
export function postAuthor(post) {
  return authorById(post && post.authorId) || { name: "the crew", role: "the log", initial: "•" };
}

// The curated inner links for a post, resolved to full post objects, newest first. Falls
// back to every other published entry when a post does not name its own related list.
export function relatedPosts(post) {
  if (!post) return [];
  if (Array.isArray(post.related) && post.related.length) {
    return post.related.map(logBySlug).filter(Boolean);
  }
  return publishedPosts().filter((p) => p.slug !== post.slug);
}

// TEMPLATE, the shape of a new entry. Copy this, give it a fresh slug, pick an authorId
// from authors.js, drop art in public/log/<slug>/ and write the body in blocks. This is
// exactly what the admin form will fill in for you, it is here so a person or an ai has a
// clean pattern to follow.
//
// {
//   slug: "the-town-that-played-itself",
//   title: "the town that played itself",
//   kicker: "from the choir",
//   date: "2026-09-01",
//   dateLabel: "1 september 2026",
//   readMins: 8,
//   status: "draft",
//   authorId: "warbleur",
//   tags: ["ridgway", "history", "true grit"],
//   hero: "/log/the-town-that-played-itself/hero.webp",
//   heroAlt: "",
//   excerpt: "one line that promises the angle, not the topic.",
//   related: ["already-here"],
//   body: [
//     { t: "p", x: "the cold open, the hook." },
//     { t: "h", x: "a subhead that carries the spine" },
//     { t: "p", x: "the reporting." },
//     { t: "img", src: "/log/the-town-that-played-itself/still.webp", alt: "", caption: "" },
//     { t: "quote", x: "the line worth pulling out." },
//     { t: "aside", label: "sources", x: "where the facts came from, credited plainly." },
//   ],
// },
