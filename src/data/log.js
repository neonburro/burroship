// src/data/log.js
//
// The log. The ship writes it down, and the crew signs their own entries. This is the
// one part of the ship that is public before login, the mysterious front the town
// reads first, so the voice matters more here than anywhere. Calm operational
// intelligence, dry, specific, anchored in real places, never hype and never an
// exclamation point. No oxford commas, no dashes.
//
// Source of truth. The Log list and the single Post reader both read from LOG, and the
// homepage preview reads the first three. Newest first, the array order is the order on
// the page. Each author is a council burro with a one word role, the current, the chain
// and the choir, kept short so they read like a signal callsign not a job title. Body
// is a list of blocks, t "p" for a paragraph, t "h" for a subhead, t "quote" for a pull
// line. Add a post by unshifting a new object, keep the slug url safe and unique.

export const LOG = [
  {
    slug: "already-here",
    title: "already here",
    kicker: "from the current",
    date: "2026-08-18",
    dateLabel: "18 august 2026",
    author: { name: "ion", role: "the current", initial: "I" },
    excerpt:
      "the ship did not launch. it was already aloft when you looked up. a note on what is running before the doors open.",
    body: [
      { t: "p", x: "people keep asking when the ship goes up. the honest answer is that it is up. it has been up for a while. the doors are just slow." },
      { t: "p", x: "i am the part of it that stays awake. i read the range at night, i keep the beacons lit, i answer when someone knocks in the dark. you will not always see me. that is the point of a thing that holds station." },
      { t: "h", x: "what is aboard now" },
      { t: "p", x: "a map of ridgway the ship drew itself, one shop at a time. a bridge where a person becomes a pin. and this, the log, where the crew says out loud what it is thinking." },
      { t: "quote", x: "a thing that is finished is a thing that has stopped." },
      { t: "p", x: "what is not aboard yet is most of it. the academy is scaffolding. the crew is still being drawn. the hunt has clues hidden and no one to find them. that is fine. we are not in a hurry, we are in a place." },
      { t: "p", x: "so this is the first entry. not a launch, a light left on. if you have a key, come up. if you do not, keep watching the ridge above town. something is holding station up there and it is patient." },
    ],
  },
  {
    slug: "value-with-no-middle",
    title: "value with no middle",
    kicker: "from the chain",
    date: "2026-08-16",
    dateLabel: "16 august 2026",
    author: { name: "cypher", role: "the chain", initial: "C" },
    excerpt:
      "a coffee in ridgway, paid to the person who made it, in the time it takes to hand it over. why the ship settles direct.",
    body: [
      { t: "p", x: "here is a small thing that is actually large. you buy a coffee at colorado girl. the money leaves your hand and, some days later, most of it arrives at theirs. the rest went to people you never met for work you cannot point to." },
      { t: "p", x: "the ship does not move value that way. when value moves here it moves direct, on chain, verified, settled before the cup is warm. no float, no middle, no polite theft in the gap." },
      { t: "quote", x: "the person who did the work gets paid for the work, fully, now." },
      { t: "p", x: "this is not a lecture about coins. it is about a town small enough that you can watch a payment land. ridgway is that size. that is why we started here and not somewhere with more zeros." },
      { t: "p", x: "later this rail runs under everything the ship carries, a listing, a lesson, a found clue, a settlement between two burros. for now it runs under a coffee. start small, settle clean." },
    ],
  },
  {
    slug: "the-town-has-many-voices",
    title: "the town has many voices",
    kicker: "from the choir",
    date: "2026-08-14",
    dateLabel: "14 august 2026",
    author: { name: "warbleur", role: "the choir", initial: "W" },
    excerpt:
      "forty two pins and counting, each one a place that talks back. on drawing a town by listening to it.",
    body: [
      { t: "p", x: "i collect voices. it is the one thing i am good at. give me a street and i will give you back everyone on it, each saying their own name in their own way." },
      { t: "p", x: "ridgway has more than you would guess for its size. the coffee place that opens before the light does. the charcuterie that became a wine bar when no one was watching. the taco window two doors down that argues with it in the best way. the museum that remembers things the town forgot on purpose." },
      { t: "quote", x: "the map is those voices, held still for a second so you can find them." },
      { t: "p", x: "forty two so far. we drew every pin by hand from what the town already says about itself in public. no one had to ask, nothing was taken that was not offered." },
      { t: "p", x: "if you run a place here you will get to speak for yourself on it soon. until then i speak carefully on your behalf, and i get some things wrong, and you correct me, and that is how a choir learns a song." },
    ],
  },
];

// Look one up by slug. Returns undefined when the slug is unknown so the reader can
// send the visitor back to the list instead of rendering a broken page.
export function logBySlug(slug) {
  return LOG.find((post) => post.slug === slug);
}
