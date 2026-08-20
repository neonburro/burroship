// src/data/log.js
//
// The log. The ship's small newspaper, public before login, so the voice matters more
// here than anywhere. Calm operational intelligence, dry, specific, anchored in real
// places, never hype and never an exclamation point. No oxford commas, no dashes.
//
// SOURCE OF TRUTH. The Log list, the single Post reader and the home preview all read
// from LOG and never restate a post inline. Array order is page order, left to right on
// the home page and top to bottom on the log. The arrival arc is deliberately in STORY
// order and not newest first, ancient ridgway then the island then the arrival, because
// the three are one narrative and reading them backwards spoils it. A later standalone
// entry that is not part of an arc goes on top.
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
//   expanding       true while a published entry is still only an opening, renders an
//                   honest being expanded line, drop it when the piece is finished
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
  // THE ARRIVAL ARC. Three entries that tell one story, why a ship full of burros went
  // looking for somewhere to settle, what the island taught them, and why they stopped
  // here instead. These are the three on the home page. Right now each carries its title
  // and an opening, and says plainly that the rest is being written, which is the honest
  // signal to a reader and to a crawler both. Expand them one at a time, oldest question
  // first, and drop the expanding flag when a piece is actually finished.
  
  {
    slug: "ancient-ridgway",
    title: "ancient ridgway",
    kicker: "from the choir",
    date: "2026-08-18",
    dateLabel: "18 august 2026",
    readMins: 2,
    status: "published",
    expanding: true,
    authorId: "warbleur",
    tags: ["ridgway", "history", "ancient", "the cimarrons"],
    hero: "/log/ancient-ridgway/hero.webp",
    heroAlt: "chimney rock and courthouse standing over the valley in sepia with the ship above them",
    excerpt:
      "courthouse and chimney stood over this valley long before ridgway colorado had a name. what was here first, and who it belonged to.",
    related: ["early-ridgway-tourism", "what-the-island-taught-us"],
    body: [
      { t: "p", x: "stand anywhere on the north side of town and you can see the two of them, courthouse and chimney, sitting up over the valley like they are waiting for something. they were there before the town, before the ranches, before the ore, before the name. they will be there after." },
      { t: "p", x: "we are new here. one autumn and a winter is nothing, and the first thing you owe a place that old is to find out what happened on it before you showed up and started having opinions." },
      { t: "p", x: "so this is the piece about what was here first. the uncompahgre ute held this valley for a very long time, and held it well, and what happened to that is not a footnote to the town's history, it is the hinge the whole rest of it turns on. it deserves telling straight, with real sources and without making anyone scenery in their own story." },
      { t: "quote", x: "everything built in this valley sits on ground that was already spoken for." },
      { t: "p", x: "we are still gathering it. some of it is in the county records and some of it is in the museum on the corner and some of it is only held by people who will tell you if you ask properly and listen for longer than is comfortable." },
      { t: "aside", label: "still being written", x: "this entry is an opening. the full piece is being reported with real sources and is not going to be rushed, because getting this one wrong would be worse than being slow. it will land here at this address." },
    ],
  },
  {
    slug: "what-the-island-taught-us",
    title: "what the island taught us",
    kicker: "from the chain",
    date: "2026-08-19",
    dateLabel: "19 august 2026",
    readMins: 2,
    status: "published",
    expanding: true,
    authorId: "cypher",
    tags: ["the island", "trust", "machines", "ridgway"],
    hero: "/log/what-the-island-taught-us/hero.webp",
    heroAlt: "the ship at rest over still water in the mist with a pine on the shore",
    excerpt:
      "we went to the island meaning to settle there. we came back to ridgway with a different idea about what technology is actually for.",
    related: ["early-ridgway-tourism", "ancient-ridgway"],
    body: [
      { t: "p", x: "the honest version is that we meant to settle there. we had picked it out from a long way off and everything we found when we arrived made the case stronger, right up until it made a different case instead." },
      { t: "p", x: "what got us was not the machines, although the machines are what people ask about. it was what the machines implied. a thing left standing on a quiet road, unattended, working, still there in the morning with everything in it. you cannot build that out of engineering. the engineering is downstream of something else." },
      { t: "p", x: "that something else was the actual lesson, and it is embarrassingly simple. everything worked because people were treated as though they could be trusted, and so they were. the technology was just the trust made visible, small and useful and nobody making a speech about it." },
      { t: "quote", x: "the machine on the empty road is not a machine. it is a sentence about the people who walk past it." },
      { t: "p", x: "there was older work under the island too, further down, and that is its own entry. the part that changed our route was above ground and completely ordinary." },
      { t: "p", x: "so we did not stay. we came away instead with a way of building things that we wanted to try somewhere small enough that you could watch it work, and a valley eventually made that offer." },
      { t: "aside", label: "still being written", x: "this entry is an opening. the full piece, the crossing, the year on the island, the old work under the ground and what we carried out of it, is being written and will land here at this address." },
    ],
  },
  {
    slug: "early-ridgway-tourism",
    title: "early ridgway tourism",
    kicker: "from the current",
    date: "2026-08-20",
    dateLabel: "20 august 2026",
    readMins: 2,
    status: "published",
    expanding: true,
    authorId: "ion",
    tags: ["ridgway", "tourism", "the ship", "san juans"],
    hero: "/log/early-ridgway-tourism/hero.webp",
    heroAlt: "the ship over the cimarrons in a wide golden sunburst with the aspens turning",
    excerpt:
      "the first burros to tour this valley were not planning to stay. a note on what ridgway colorado does to visitors who only meant to pass through.",
    related: ["ancient-ridgway", "what-the-island-taught-us"],
    body: [
      { t: "p", x: "we were not looking for colorado. that should be said first, because the story gets told the other way around and the other way around is tidier and wrong." },
      { t: "p", x: "we had been out a long time by then. we had crossed water twice, wintered somewhere we will write about later, and come away from the island with a set of ideas we did not have when we left. the plan, to the extent there was one, was to go back." },
      { t: "p", x: "then we came over the divide on an evening in autumn and the whole valley was doing that thing it does, the light coming in low and gold and the aspens turning all at once like something switching on, and courthouse and chimney standing up out of it. we slowed down to look. we have not really started moving again." },
      { t: "quote", x: "a place makes its argument quietly, and then you notice you have stopped." },
      { t: "p", x: "what held us was not the view. plenty of places are beautiful and we passed most of them. it was that this one was small enough to know, working, unfinished, and full of people who already did for each other the thing we had spent a year admiring somewhere else." },
      { t: "aside", label: "still being written", x: "this entry is an opening, not the finished piece. the full account, the crossing, the winter before it and the first year on the ground here, is being written and will land in this same place. nothing is being moved and the address will not change." },
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
//   slug: "your-new-slug",
//   title: "the title",
//   kicker: "from the choir",
//   date: "2026-09-01",
//   dateLabel: "1 september 2026",
//   readMins: 8,
//   status: "draft",
//   authorId: "warbleur",
//   tags: ["ridgway", "history", "true grit"],
//   hero: "/log/your-new-slug/hero.webp",
//   heroAlt: "",
//   excerpt: "one line that promises the angle, not the topic.",
//   related: ["early-ridgway-tourism"],
//   body: [
//     { t: "p", x: "the cold open, the hook." },
//     { t: "h", x: "a subhead that carries the spine" },
//     { t: "p", x: "the reporting." },
//     { t: "img", src: "/log/your-new-slug/still.webp", alt: "", caption: "" },
//     { t: "quote", x: "the line worth pulling out." },
//     { t: "aside", label: "sources", x: "where the facts came from, credited plainly." },
//   ],
// },
