// src/components/header/Header.jsx
import IdentifyButton from "./IdentifyButton";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-sm border border-primary/60"
            aria-hidden="true"
          />
          <span className="font-mono-label text-text-primary">
            THE BURROSHIP
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          
            href="#map"
            className="font-mono-label hover:text-primary transition-colors"
          >
            MAP
          </a>
          
            href="https://neonburro.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono-label hover:text-primary transition-colors"
          >
            NEON BURRO
          </a>
          
            href="#footer"
            className="font-mono-label hover:text-primary transition-colors"
          >
            CONTACT
          </a>
        </nav>

        <IdentifyButton />
      </div>
    </header>
  );
}
