// src/components/header/IdentifyButton.jsx
import { useState } from "react";

function IdentifyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="font-mono-label px-4 py-2 rounded-control border border-border hover:border-primary hover:text-primary transition-colors"
      >
        IDENTIFY
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-surface border border-border rounded-card p-8 w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono-label mb-4">PASSPHRASE</p>
            <input
              type="text"
              placeholder="..."
              className="w-full bg-background border border-border rounded-control px-4 py-3 text-text-primary font-mono focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <p className="font-mono-label text-text-secondary mt-4 text-[10px]">
              IDENTIFICATION COMING SOON
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default IdentifyButton;