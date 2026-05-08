// src/components/footer/Footer.jsx
function Footer() {
  return (
    <footer id="footer" className="relative w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-6 h-6 rounded-sm border border-primary/60" />
          <span className="font-mono-label text-text-primary">THE BURROSHIP</span>
        </div>

        <h2
          className="text-3xl md:text-4xl font-medium text-text-primary max-w-md mb-12"
          style={{ lineHeight: 1.1 }}
        >
          Pack light. Dream heavy.
        </h2>

        <p className="text-text-secondary max-w-md mb-16">
          The Burroship, LLC. Rooted in Ridgway, Colorado.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-border">
          <p className="font-mono-label text-[10px]">
            (C) {new Date().getFullYear()} THE BURROSHIP, LLC
          </p>
          <p className="font-mono-label text-[10px]">
            P.O. BOX 2111 / RIDGWAY, CO 81432
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;