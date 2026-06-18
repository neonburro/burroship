// src/pages/Home/sections/Collage.jsx
//
// The field. No title. Full width and flush. A tetris of interlocking
// plates that fill the space seamlessly, barely separated, with very
// subtle rounded corners like ancient seamless stonework. No hover, no
// glow. On desktop a varied grid. On mobile everything stacks two up.
// Optional image via /collage/<id>.png otherwise a toned placeholder.

const PLATES = [
  { id: "compound", label: "the compound", tag: "hq", tone: "#22252C", span: "col-span-2 row-span-2" },
  { id: "stackhouse", label: "the stackhouse", tag: "strategy", tone: "#1A2630", span: "col-span-1 row-span-1" },
  { id: "burroships", label: "the burroships", tag: "staging", tone: "#202830", span: "col-span-1 row-span-1" },
  { id: "field", label: "the field", tag: "terrain", tone: "#181B20", span: "col-span-2 row-span-1" },
  { id: "council", label: "the council", tag: "agents", tone: "#1C2733", span: "col-span-2 row-span-1" },
  { id: "engine", label: "the engine room", tag: "deploy", tone: "#16181D", span: "col-span-1 row-span-1" },
  { id: "signal", label: "signal tower", tag: "relay", tone: "#1E2A36", span: "col-span-1 row-span-1" },
  { id: "gate", label: "the gate", tag: "sealed", tone: "#202329", span: "col-span-2 row-span-1" },
];

function Collage() {
  return (
    <section className="relative w-full" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(150px,1fr)] md:auto-rows-[minmax(200px,1fr)] gap-1">
        {PLATES.map((plate) => (
          <Plate key={plate.id} plate={plate} />
        ))}
      </div>
    </section>
  );
}

function Plate({ plate }) {
  return (
    <div className={"relative overflow-hidden rounded-[3px] " + plate.span} style={{ background: plate.tone }}>
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: `url(/collage/${plate.id}.png)`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.9 }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,9,11,0.92) 0%, rgba(8,9,11,0.15) 55%, transparent 100%)" }} />
      <div className="absolute top-4 left-4">
        <span className="text-mono-xs" style={{ color: "var(--color-ink-faint)" }}>{plate.tag}</span>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <span className="text-display-sm text-ink leading-tight lowercase">{plate.label}</span>
      </div>
    </div>
  );
}

export default Collage;
