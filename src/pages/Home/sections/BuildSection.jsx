// src/pages/Home/sections/BuildSection.jsx
//
// Section 01 · Build · The Navigation Table.
//
// The room where you study the terrain before building inside it.
// Calm, workshop-oriented, observational. The six operational
// labels appear as an instrument-style schematic grid.
 
import Container from "../../../components/Layout/Container";
import Eyebrow from "../../../components/Atoms/Eyebrow";
import TopoLines from "../../../components/Atoms/TopoLines";
import Reveal from "../../../components/Atoms/Reveal";
import Button from "../../../components/Atoms/Button";
 
const PROCEDURES = [
  { n: "01", label: "Tree",     hint: "Survey the terrain" },
  { n: "02", label: "Design",   hint: "Draft the vessel" },
  { n: "03", label: "Plan",     hint: "Chart the route" },
  { n: "04", label: "Review",   hint: "Read the signals" },
  { n: "05", label: "Discuss",  hint: "Adjust the bearings" },
  { n: "06", label: "Finalize", hint: "Lock the course" },
];
 
function BuildSection() {
  return (
    <section className="relative bg-bg py-24 md:py-32 border-t border-line overflow-hidden">
      <TopoLines size={520} position="bottom-left" intensity="subtle" />
 
      <Container size="wide" className="relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
 
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>Section 01 · Build</Eyebrow>
            </Reveal>
 
            <Reveal delay={0.06}>
              <h2 className="text-display-lg mt-5 text-ink">
                The navigation table.
              </h2>
            </Reveal>
 
            <Reveal delay={0.12}>
              <p className="text-lead mt-5 max-w-[44ch]">
                Before anything is built, the terrain is read. Six
                operational steps. Sites, dashboards, internal tools, the
                occasional system nobody else makes.
              </p>
            </Reveal>
 
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button to="/build/" variant="operational" arrow>
                  Open the table
                </Button>
              </div>
            </Reveal>
          </div>
 
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <ProcedureTable />
            </Reveal>
          </div>
 
        </div>
      </Container>
    </section>
  );
}
 
function ProcedureTable() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 schematic-grid schematic-grid-fade pointer-events-none"
        aria-hidden="true"
      />
 
      <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {PROCEDURES.map((step) => (
          <div
            key={step.n}
            className="bg-bg p-5 md:p-6 hover:bg-surface transition-colors duration-200"
          >
            <p className="text-mono-xs text-ink-faint mb-3">{step.n}</p>
            <p className="text-display-sm text-ink mb-1">{step.label}</p>
            <p className="text-body-sm text-ink-muted">{step.hint}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default BuildSection;
