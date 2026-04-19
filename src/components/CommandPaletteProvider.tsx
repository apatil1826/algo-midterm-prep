"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import searchIndex from "@data/search-index.json";

type IndexItem = {
  id: string;
  type: "topic" | "problem" | "pattern";
  title: string;
  href: string;
  body: string;
  tags?: string[];
};

type Ctx = { open: () => void; close: () => void };
const CommandPaletteCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export function useCommandPalette() {
  return useContext(CommandPaletteCtx);
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex as IndexItem[], {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "tags", weight: 0.3 },
          { name: "body", weight: 0.2 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [],
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return (searchIndex as IndexItem[]).slice(0, 12);
    }
    return fuse.search(query).slice(0, 20).map((r) => r.item);
  }, [query, fuse]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      } else if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  useEffect(() => setActiveIdx(0), [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[activeIdx];
      if (item) {
        router.push(item.href);
        close();
      }
    }
  };

  return (
    <CommandPaletteCtx.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[10vh] backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search topics, problems, patterns…"
              className="w-full border-b border-neutral-800 bg-transparent px-4 py-3.5 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
            />
            <ul className="max-h-[60vh] overflow-y-auto py-1">
              {results.length === 0 && (
                <li className="px-4 py-4 text-sm text-neutral-500">No matches.</li>
              )}
              {results.map((item, idx) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      router.push(item.href);
                      close();
                    }}
                    onMouseEnter={() => setActiveIdx(idx)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      activeIdx === idx ? "bg-neutral-900 text-neutral-50" : "text-neutral-300"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium">{item.title}</div>
                      <div className="truncate text-xs text-neutral-500">{item.body.slice(0, 90)}</div>
                    </div>
                    <span className="shrink-0 rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-400">
                      {item.type}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </CommandPaletteCtx.Provider>
  );
}
