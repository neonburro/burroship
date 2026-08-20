// src/pages/Home/sections/TwoThings.jsx
//
// A small band under the gate that says, broadly, what the ship is for: it connects
// the town below it, and it hides a treasure hunt across the range. Kept mysterious
// on purpose, we hint and do not explain the mechanics. Full width like the rest, no
// container squeeze on mobile. Two facets, side by side on desktop, stacked on phone.
// The copy is the pitch: why a business or a player would want to come aboard.

const FACETS = [
  {
    title: "connecting the town",
    body: "we are quietly wiring the shops of ridgway into one map. come aboard and you get a pin, a page, and people who find you on the way to somewhere else.",
  },
  {
    title: "the hunt",
    body: "riddles are hidden across the range, the digital kind that put you on real ground. the map lends you the town. the clues keep the treasure.",
  },
];

function TwoThings() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto w-[99.5%] md:w-[97%]">
        <div className="flex items-center gap-2.5 mb-6 md:mb-8">
          <span className="beacon-dot sm" aria-hidden="true" />
          <span className="text-mono text-ink-faint lowercase">what the ship is doing</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {FACETS.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="beacon-dot sm" aria-hidden="true" />
                <span className="text-display-md text-ink lowercase">{f.title}</span>
              </div>
              <p className="text-body text-ink-muted lowercase leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TwoThings;
