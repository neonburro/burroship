// src/components/Sections/CesiumPreview.jsx
//
// Full-bleed dark section showcasing the Cesium map. Visually
// "the airship lobby." We do not embed the actual map here (too
// expensive on the home page). Instead a static treatment with
// strong CTA to /world/.
 
import Container from "../Layout/Container";
import Eyebrow from "../Atoms/Eyebrow";
import Button from "../Atoms/Button";
import TopoLines from "../Atoms/TopoLines";
import Reveal from "../Atoms/Reveal";
 
function CesiumPreview() {
  return (
    <section className="relative bg-dark-bg text-dark-ink overflow-hidden">
      <TopoLines size={780} position="top-left" intensity="medium" onDark />
      <TopoLines size={520} position="bottom-right" intensity="subtle" onDark />
 
      <Container size="wide" className="relative z-10 py-32 md:py-40">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow tone="dark">
                <span className="beacon-dot on-dark mr-2" aria-hidden="true" />
                The Burroship · Live
              </Eyebrow>
            </Reveal>
 
            <Reveal delay={0.08}>
              <h2 className="text-display-xl mt-6 text-dark-ink">
                An airship cruise over the San Juans.
              </h2>
            </Reveal>
 
            <Reveal delay={0.16}>
              <p className="text-lead mt-6 text-dark-ink-muted max-w-[44ch]">
                Photoreal Earth from Google's 3D tiles. The Compound, the
                peaks, the towns. The Burroship circles, day and night, in a
                slow eight-minute loop.
              </p>
            </Reveal>
 
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button to="/world/" variant="primaryLime" arrow>
                  Board The Burroship
                </Button>
                <Button to="/manifesto/" variant="ghostDark">
                  Read the manifesto
                </Button>
              </div>
            </Reveal>
 
            <Reveal delay={0.32}>
              <dl className="mt-16 grid grid-cols-3 gap-6 max-w-[520px]">
                <Stat label="Altitude" value="18kft" />
                <Stat label="Loop time" value="~8 min" />
                <Stat label="Splats" value="Soon" />
              </dl>
            </Reveal>
          </div>
 
          <div className="lg:col-span-7">
            <Reveal delay={0.16}>
              <PreviewArtwork />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
 
function Stat({ label, value }) {
  return (
    <div>
      <dt className="text-mono-sm text-dark-ink-faint mb-2">{label}</dt>
      <dd className="text-display-sm text-dark-ink">{value}</dd>
    </div>
  );
}
 
/* ----- Stylized preview "screenshot" — an SVG impression of the
 * Cesium map. Not the real thing; a tasteful poster of it. */
function PreviewArtwork() {
  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-dark-line bg-dark-surface">
      {/* Gradient sky → ridge */}
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1A2A" />
            <stop offset="50%" stopColor="#1A2A35" />
            <stop offset="100%" stopColor="#0A1108" />
          </linearGradient>
          <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F2A1A" />
            <stop offset="100%" stopColor="#0A1108" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A8D055" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A8D055" stopOpacity="0" />
          </radialGradient>
        </defs>
 
        <rect width="800" height="600" fill="url(#sky)" />
 
        {/* Mountain silhouettes — back range */}
        <path
          d="M0 380 L120 280 L220 320 L340 240 L460 300 L580 220 L700 280 L800 250 L800 600 L0 600 Z"
          fill="url(#ridge)"
          opacity="0.7"
        />
        {/* Front ridge */}
        <path
          d="M0 460 L100 400 L200 440 L300 380 L420 420 L540 360 L660 410 L800 380 L800 600 L0 600 Z"
          fill="#0A1108"
        />
 
        {/* Topo contour lines on the ridges */}
        <g stroke="#A8D055" strokeOpacity="0.15" fill="none" strokeWidth="1">
          <path d="M120 460 Q200 440 300 450 T540 430 T800 440" />
          <path d="M100 480 Q220 460 340 470 T600 450 T800 460" />
          <path d="M80 500 Q240 480 380 490 T660 470 T800 480" />
        </g>
 
        {/* Three beacons clustered (the Compound) */}
        <g>
          <circle cx="280" cy="430" r="40" fill="url(#glow)" />
          <circle cx="280" cy="430" r="3" fill="#7BA8C4" />
 
          <circle cx="305" cy="420" r="45" fill="url(#glow)" />
          <circle cx="305" cy="420" r="3.5" fill="#C9A87C" />
 
          <circle cx="325" cy="425" r="50" fill="url(#glow)" />
          <circle cx="325" cy="425" r="4" fill="#A8D055" />
        </g>
 
        {/* The Burroship: a small glyph in the sky */}
        <g transform="translate(580, 180)">
          <ellipse cx="0" cy="0" rx="22" ry="7" fill="#A8D055" opacity="0.9" />
          <ellipse cx="0" cy="0" rx="34" ry="11" fill="none" stroke="#A8D055" strokeOpacity="0.4" strokeWidth="0.5" />
          <line x1="-22" y1="0" x2="-30" y2="-4" stroke="#A8D055" strokeOpacity="0.7" strokeWidth="0.5" />
          <line x1="22" y1="0" x2="30" y2="-4" stroke="#A8D055" strokeOpacity="0.7" strokeWidth="0.5" />
          {/* glow */}
          <circle cx="0" cy="0" r="3" fill="#A8D055" />
        </g>
 
        {/* Crosshair / coordinates marker */}
        <g
          transform="translate(680, 80)"
          stroke="#A8D055"
          strokeOpacity="0.5"
          strokeWidth="0.8"
          fill="none"
        >
          <line x1="-10" y1="0" x2="10" y2="0" />
          <line x1="0" y1="-10" x2="0" y2="10" />
          <circle cx="0" cy="0" r="6" />
        </g>
      </svg>
 
      {/* Schedule overlay (real one we built into the Cesium app) */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-[260px] bg-dark-bg/85 backdrop-blur-md border border-dark-line rounded-lg p-4">
        <p className="text-mono-sm text-dark-ink-faint mb-3">
          Burroship · Corridor
        </p>
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-mono text-dark-accent">Over</span>
          <span className="text-mono text-dark-ink-muted">0:42</span>
        </div>
        <p className="text-dark-ink font-medium text-sm mb-3">Mt Sneffels</p>
        <div className="border-t border-dark-line pt-3 space-y-1.5">
          <Row label="Telluride" eta="+1:27" />
          <Row label="Mountain Village" eta="+2:50" />
          <Row label="Ridgway" eta="+4:35" />
        </div>
      </div>
 
      {/* Coordinates corner */}
      <div className="absolute top-4 right-4 hidden md:block">
        <div className="bg-dark-bg/70 backdrop-blur-sm border border-dark-line rounded-md px-3 py-2">
          <p className="text-mono-sm text-dark-ink-faint">38.004 N · 107.79 W</p>
        </div>
      </div>
    </div>
  );
}
 
function Row({ label, eta }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-mono-sm text-dark-ink-muted">{label}</span>
      <span className="text-mono-sm text-dark-ink-faint">{eta}</span>
    </div>
  );
}
 
export default CesiumPreview;
