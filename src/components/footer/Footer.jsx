// src/components/footer/Footer.jsx
export default function Footer() {
  const sections = [
    {
      label: "ECOSYSTEM",
      links: [
        { name: "Neon Burro", href: "https://neonburro.com", live: true },
        { name: "The Lounge", href: "#", live: false },
        { name: "The Shop", href: "#", live: false },
        { name: "Pulse", href: "#", live: false },
      ],
    },
    {
      label: "COLLECTIVE",
      links: [
        { name: "The Compound", href: "#", live: false },
        { name: "The Saloon", href: "#", live: false },
        { name: "Operators", href: "#", live: false },
        { name: "Labs", href: "#", live: false },
      ],
    },
    {
      label: "DISPATCHES",
      links: [
        { name: "Journal", href: "#", live: false },
        { name: "Manifest", href: "#", live: false },
        { name: "Field Reports", href: "#", live: false },
      ],
    },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-section">
        {/* Top: brand + tagline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-sm border border-primary/60" />
              <span className="font-mono-label text-text-primary">
                THE BURROSHIP
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-medium text-text-primary max-w-md"
              style={{ lineHeight: 1.1 }}
            >
              Pack light. Dream heavy.
            </h2>
          </div>

          <div className="flex items-start md:justify-end">
            <p className="text-text-secondary max-w-sm">
              The Burroship, LLC is the parent entity of Neon Burro and
              its ecosystem of creative technology ventures. Rooted in
              Ridgway, Colorado.
            </p>
          </div>
        </div>

        {/* Middle: link sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-border">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="font-mono-label mb-6">{section.label}</p>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.live ? (
                      
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-primary hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <span className="text-text-secondary cursor-default">
                        {link.name}
                        <span className="font-mono-label ml-2 text-[10px] opacity-60">
                          SOON
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: legal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono-label text-[10px]">
            © {new Date().getFullYear()} THE BURROSHIP, LLC
          </p>
          <p className="font-mono-label text-[10px]">
            P.O. BOX 2111 · RIDGWAY, CO 81432
          </p>
        </div>
      </div>
    </footer>
  );
}
