// src/data/authors.js
//
// The available authors. The council correspondents who sign the log, each with a beat.
// This is the list an author picker offers in the admin, click one and the byline, the
// callsign and the monogram all come from here. Posts in log.js reference an author by
// id through authorId and never restate them, so a correspondent's role, beat or picture
// changes in exactly one place and every entry they wrote updates at once.
//
// PLUG AND PLAY NOTE. When the backend lands, this becomes an authors table and the post
// form is a dropdown of these ids. Add a correspondent by adding an entry here, keep the
// id url safe and stable (it is a foreign key in spirit), give them an avatar under
// public/log/authors/<id>.webp when there is real art, until then the monogram carries.
//
// THE BEATS, so a new post lands with the right voice:
//   ion       the current   systems and releases, how things work, the ship
//   cypher    the chain      money, payments, the local economy, value with no middle
//   warbleur  the choir      the town, its people, its history, the voices

export const AUTHORS = [
  { id: "ion", name: "ion", role: "the current", beat: "systems and releases", initial: "I", avatar: null },
  { id: "cypher", name: "cypher", role: "the chain", beat: "money and the local economy", initial: "C", avatar: null },
  { id: "warbleur", name: "warbleur", role: "the choir", beat: "the town, its people and its history", initial: "W", avatar: null },
];

// Resolve an author id to the record. Returns undefined for an unknown id so a caller can
// fall back rather than crash on a post that names a correspondent who was removed.
export function authorById(id) {
  return AUTHORS.find((a) => a.id === id);
}
