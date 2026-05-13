// src/components/Sections/CesiumPreview.jsx
//
// Per designer: light surface, treat the Cesium map like a product
// shot inside a dark "screen", spec bullets on the right. Demoted
// from full-bleed takeover to framed preview.
 
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Button from "../Atoms/Button";
import TopoLines from "../Atoms/TopoLines";
import Reveal from "../Atoms/Reveal";
 
function CesiumPreview() {
  return (
    <section className="relative bg-bg py-24 md:py-32 overflow-hidden">
      <TopoLines size={620} position="top-left" intensity="subtle" />
 
      <Container size="wide" className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal>
              <PreviewArtwork />
            </Reveal>
          </div>
 
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Reveal delay={0.04}>
              <Eyebrow>
                <span className="beacon-dot mr-2" aria-hidden="true" />
                The Burroship · Live
              </Eyebrow>
            </Reveal>
 
            <Reveal delay={0.1}>
              <h2 className="text-display-lg mt-5 text-ink max-w-[20ch]">
                A working airship over the San Juans.
              </h2>
            </Reveal>
 
            <Reveal delay={0.16}>
              <p className="text-lead mt-5 max-w-[44ch]">
                Photoreal Earth. The Compound, the peaks, the towns.
                Continuous orbit in a slow eight-minute loop.
              </p>
            </Reveal>
 
            <Reveal delay={0.22}>
              <ul className="mt-8 space-y-3 max-w-[44ch]">
                <SpecRow label="Live orbit" value="San Juans corridor" />
                <SpecRow label="Cruise altitude" value="18,000 ft" />
                <SpecRow label="Loop time" value="~8 min" />
                <SpecRow label="Splat library" value="Coming online" />
              </ul>
            </Reveal>
 
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/world/" variant="primary" arrow>
                  Board the airship
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
 
function SpecRow({ label, value }) {
  return (
    <li className="flex items-baseline justify-between gap-6 py-2 border-b border-line">
      <span className="text-mono-sm text-ink-faint">{label}</span>
      <span className="text-body-sm text-ink font-medium">{value}</span>
    </li>
  );
}
 
/* ----- The "product screenshot" — dark framed Cesium impression -----
 * Smaller than v0.4. Lives inside a card on the light page.
 * Same SVG impression as before, with the schedule overlay. */
function PreviewArtwork() {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line bg-dark-bg shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky-v05" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1A2A" />
            <stop offset="50%" stopColor="#1A2A35" />
            <stop offset="100%" stopColor="#0A1108" />
          </linearGradient>
          <linearGradient id="ridge-v05" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F2A1A" />
            <stop offset="100%" stopColor="#0A1108" />
          </linearGradient>
          <radialGradient id="glow-v05" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A8D055" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A8D055" stopOpacity="0" />
          </radialGradient>
        </defs>
 
        <rect width="800" height="600" fill="url(#sky-v05)" />
 
        <path
          d="M0 380 L120 280 L220 320 L340 240 L460 300 L580 220 L700 280 L800 250 L800 600 L0 600 Z"
          fill="url(#ridge-v05)"
          opacity="0.7"
        />
        <path
          d="M0 460 L100 400 L200 440 L300 380 L420 420 L540 360 L660 410 L800 380 L800 600 L0 600 Z"
          fill="#0A1108"
        />
 
        <g stroke="#A8D055" strokeOpacity="0.15" fill="none" strokeWidth="1">
          <path d="M120 460 Q200 440 300 450 T540 430 T800 440" />
          <path d="M100 480 Q220 460 340 470 T600 450 T800 460" />
          <path d="M80 500 Q240 480 380 490 T660 470 T800 480" />
        </g>
 
        <g>
          <circle cx="280" cy="430" r="40" fill="url(#glow-v05)" />
          <circle cx="280" cy="430" r="3" fill="#7BA8C4" />
          <circle cx="305" cy="420" r="45" fill="url(#glow-v05)" />
          <circle cx="305" cy="420" r="3.5" fill="#C9A87C" />
          <circle cx="325" cy="425" r="50" fill="url(#glow-v05)" />
          <circle cx="325" cy="425" r="4" fill="#A8D055" />
        </g>
 
        <g transform="translate(580, 180)">
          <ellipse cx="0" cy="0" rx="22" ry="7" fill="#A8D055" opacity="0.9" />
          <ellipse cx="0" cy="0" rx="34" ry="11" fill="none" stroke="#A8D055" strokeOpacity="0.4" strokeWidth="0.5" />
          <line x1="-22" y1="0" x2="-30" y2="-4" stroke="#A8D055" strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="22" y1="0" x2="30" y2="-4" stroke="#A8D055" strokeOpacity="0.7" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="3" fill="#A8D055" />
        </g>
 
        <g transform="translate(680, 80)" stroke="#A8D055" strokeOpacity="0.5" strokeWidth="0.8" fill="none">
          <line x1="-10" y1="0" x2="10" y2="0" />
          <line x1="0" y1="-10" x2="0" y2="10" />
          <circle cx="0" cy="0" r="6" />
        </g>
      </svg>
 
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-[240px] bg-dark-bg/85 backdrop-blur-md border border-dark-line rounded-lg p-3.5">
        <p className="text-mono-xs text-dark-ink-faint mb-2.5">
          Burroship · Corridor
        </p>
        <div className="flex items-baseline justify-between mb-0.5">
          <span className="text-mono-xs text-dark-accent">Over</span>
          <span className="text-mono-xs text-dark-ink-muted">0:42</span>
        </div>
        <p className="text-dark-ink font-medium text-sm mb-2.5">Mt Sneffels</p>
        <div className="border-t border-dark-line pt-2.5 space-y-1">
          <Row label="Telluride" eta="+1:27" />
          <Row label="Mountain Village" eta="+2:50" />
        </div>
      </div>
 
      <div className="absolute top-3 right-3 bg-dark-bg/70 backdrop-blur-sm border border-dark-line rounded-md px-2.5 py-1.5">
        <p className="text-mono-xs text-dark-ink-faint">38.004 N · 107.79 W</p>
      </div>
    </div>
  );
}
 
function Row({ label, eta }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-mono-xs text-dark-ink-muted">{label}</span>
      <span className="text-mono-xs text-dark-ink-faint">{eta}</span>
    </div>
  );
}
 
export default CesiumPreview;
