// src/pages/Home/sections/Collage.jsx
//
// The field. No titles. True full width and flush. A tetris of
// interlocking plates that fill the space like seamless stonework
// with very subtle rounded corners. No hover and no glow. On desktop
// a varied grid. On mobile everything stacks two up. Images render
// from /collage/<id>.png. Sizes are documented in PLATES below.
// v1 · 2026-06-18

const PLATES = [
  { id: "compound", tone: "#22252C", span: "col-span-2 row-span-2" },
  { id: "stackhouse", tone: "#1A2630", span: "col-span-1 row-span-1" },
  { id: "burroships", tone: "#202830", span: "col-span-1 row-span-1" },
  { id: "field", tone: "#181B20", span: "col-span-2 row-span-1" },
  { id: "council", tone: "#1C2733", span: "col-span-2 row-span-1" },
  { id: "engine", tone: "#16181D", span: "col-span-1 row-span-1" },
  { id: "signal", tone: "#1E2A36", span: "col-span-1 row-span-1" },
  { id: "gate", tone: "#202329", span: "col-span-2 row-span-1" },
];

function Collage() {
  return (
    <section className="relative w-full" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(150px,1fr)] md:auto-rows-[minmax(220px,1fr)] gap-1">
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
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: `url(/collage/${plate.id}.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
    </div>
  );
}

export default Collage;
