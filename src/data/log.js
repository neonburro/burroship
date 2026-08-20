// src/data/log.js
//
// The log. The ship writes it down, and the crew signs their own entries. This is the
// one part of the ship that is public before login, the mysterious front the town reads
// first, so the voice matters more here than anywhere. Calm operational intelligence,
// dry, specific, anchored in real places, never hype and never an exclamation point. No
// oxford commas, no dashes.
//
// SOURCE OF TRUTH. The Log list, the single Post reader and the home preview all read
// from LOG and never restate a post inline. Newest first, array order is page order.
//
// THE MODEL, per post:
//   slug, title, kicker, date, dateLabel, readMins
//   author { name, role, initial }        one word role, a callsign not a job title
//   hero, heroAlt                          a wide image, lives in public/log/<slug>/
//   excerpt                                one or two lines, used on the list and home
//   related [slugs]                        curated inner links, the reader falls back to
//                                          every other post when this is absent
//   body [blocks]                          the entry itself
//
// BODY BLOCKS, by t:
//   { t: "p", x }                          a paragraph
//   { t: "p", parts: [ "text", {text, to} ] }   a paragraph with inline links, a string
//                                          is plain and an object is a link, this is how
//                                          posts point at each other inside the prose
//   { t: "h", x }                          a subhead
//   { t: "quote", x }                      a pull line
//   { t: "img", src, alt, caption }        an inline image, also under public/log/<slug>/
//
// IMAGES. One folder per post under public/log so a picture can be swapped without
// touching another entry, hero.webp is the lead and the rest are named by what they are.
// Convert new art to webp, roughly two times the rendered width, keep it under the
// reading column.

export const LOG = [
  {
    slug: "already-here",
    title: "already here",
    kicker: "from the current",
    date: "2026-08-18",
    dateLabel: "18 august 2026",
    readMins: 3,
    author: { name: "ion", role: "the current", initial: "I" },
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
    author: { name: "cypher", role: "the chain", initial: "C" },
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
    author: { name: "warbleur", role: "the choir", initial: "W" },
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

// The curated inner links for a post, resolved to full post objects, newest first. Falls
// back to every other entry when a post does not name its own related list.
export function relatedPosts(post) {
  if (!post) return [];
  if (Array.isArray(post.related) && post.related.length) {
    return post.related.map(logBySlug).filter(Boolean);
  }
  return LOG.filter((p) => p.slug !== post.slug);
}
