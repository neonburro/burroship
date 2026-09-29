// src/pages/Build/index.jsx
//
// The build page. Mirrors the home pattern with co-located sections.
// Quiet hero, what we make, how it goes and a closing band back to
// the gate. Reuses the shared design system end to end. Modular so we
// can add sections later.
// v1 · 2026-06-18

import BuildHero from "./sections/BuildHero";
import WhatWeMake from "./sections/WhatWeMake";
import HowItGoes from "./sections/HowItGoes";
import BuildClosing from "./sections/BuildClosing";

import Head from "../../components/SEO/Head";

function Build() {
  return (
    <main id="main">
      <Head
        title="Build"
        description="Bring the strange one. The same sequence every time, calm on purpose, from the first conversation to a thing running in front of people."
        path="/build/"
      />
      <BuildHero />
      <WhatWeMake />
      <HowItGoes />
      <BuildClosing />
    </main>
  );
}

export default Build;
