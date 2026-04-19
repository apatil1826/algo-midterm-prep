"use client";

import { useState } from "react";
import { Prose } from "./Math";

export function TopicViewSwitcher({ professor, simplified }: { professor: string; simplified: string }) {
  const [view, setView] = useState<"simplified" | "professor">("simplified");

  return (
    <section>
      <div className="mb-4 flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-900/40 p-1 text-xs">
        <button
          type="button"
          onClick={() => setView("simplified")}
          className={`flex-1 rounded-md px-3 py-1.5 transition-colors ${
            view === "simplified"
              ? "bg-yellow-400 text-neutral-900"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          Simplified view
        </button>
        <button
          type="button"
          onClick={() => setView("professor")}
          className={`flex-1 rounded-md px-3 py-1.5 transition-colors ${
            view === "professor"
              ? "bg-yellow-400 text-neutral-900"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          Professor's view
        </button>
      </div>

      <div className="rounded-lg border border-neutral-800 bg-neutral-900/20 p-5 md:p-6">
        <Prose text={view === "simplified" ? simplified : professor} />
      </div>
    </section>
  );
}
