"use client";

import katex from "katex";
import { useMemo } from "react";

export function InlineMath({ children }: { children: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, { throwOnError: false, output: "html" });
    } catch {
      return children;
    }
  }, [children]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function BlockMath({ children }: { children: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, { throwOnError: false, output: "html", displayMode: true });
    } catch {
      return children;
    }
  }, [children]);
  return <div className="katex-display" dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Render a string that may contain $...$ and $$...$$ math inside normal prose. */
export function Markup({ children }: { children: string }) {
  const parts = useMemo(() => parseInlineMath(children), [children]);
  return (
    <>
      {parts.map((p, i) => {
        if (p.type === "inline") return <InlineMath key={i}>{p.value}</InlineMath>;
        if (p.type === "block") return <BlockMath key={i}>{p.value}</BlockMath>;
        return <span key={i}>{renderEmphasis(p.value)}</span>;
      })}
    </>
  );
}

type Part = { type: "text" | "inline" | "block"; value: string };

function parseInlineMath(input: string): Part[] {
  const out: Part[] = [];
  let buf = "";
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === "$" && input[i + 1] === "$") {
      if (buf) {
        out.push({ type: "text", value: buf });
        buf = "";
      }
      const end = input.indexOf("$$", i + 2);
      if (end === -1) {
        buf += input.slice(i);
        break;
      }
      out.push({ type: "block", value: input.slice(i + 2, end) });
      i = end + 2;
    } else if (ch === "$") {
      if (buf) {
        out.push({ type: "text", value: buf });
        buf = "";
      }
      const end = input.indexOf("$", i + 1);
      if (end === -1) {
        buf += input.slice(i);
        break;
      }
      out.push({ type: "inline", value: input.slice(i + 1, end) });
      i = end + 1;
    } else {
      buf += ch;
      i++;
    }
  }
  if (buf) out.push({ type: "text", value: buf });
  return out;
}

/** Very light handling for **bold** inside text chunks. */
function renderEmphasis(text: string): React.ReactNode {
  const pieces = text.split(/(\*\*[^*]+\*\*)/g);
  return pieces.map((piece, i) => {
    if (piece.startsWith("**") && piece.endsWith("**")) {
      return <strong key={i} className="font-semibold text-neutral-100">{piece.slice(2, -2)}</strong>;
    }
    return <span key={i}>{piece}</span>;
  });
}

/** Render a paragraph-like body: splits on double newlines into paragraphs, keeps $ math. */
export function Prose({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={className ?? "prose-body text-neutral-300"}>
      {blocks.map((block, i) => {
        if (block.startsWith("- ")) {
          const items = block.split(/\n(?=- )/);
          return (
            <ul key={i}>
              {items.map((it, j) => (
                <li key={j}><Markup>{it.replace(/^- /, "")}</Markup></li>
              ))}
            </ul>
          );
        }
        if (/^\d+\. /.test(block)) {
          const items = block.split(/\n(?=\d+\. )/);
          return (
            <ol key={i}>
              {items.map((it, j) => (
                <li key={j}><Markup>{it.replace(/^\d+\. /, "")}</Markup></li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i}>
            <Markup>{block}</Markup>
          </p>
        );
      })}
    </div>
  );
}
