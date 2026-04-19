"use client";

import { useState, useRef, useEffect } from "react";
import { Markup } from "./Math";

export function MathTip({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
          open
            ? "border-yellow-400/60 bg-yellow-400/20 text-yellow-100"
            : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700"
        }`}
        aria-expanded={open}
      >
        <span className="mr-1 text-neutral-500">tip:</span> {label}
      </button>
      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-20 mt-2 w-80 max-w-[90vw] rounded-lg border border-neutral-700 bg-neutral-950 p-3 text-xs leading-relaxed text-neutral-200 shadow-xl"
        >
          <Markup>{content}</Markup>
        </div>
      )}
    </div>
  );
}
