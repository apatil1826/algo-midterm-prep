import Link from "next/link";
import { getPatterns } from "@/lib/data";
import { Markup } from "@/components/Math";

export default function PatternsPage() {
  const patterns = getPatterns();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-50">Pattern Recognition Guide</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Each pattern names a problem shape, lists the trigger signals in problem wording, states the technique,
          gives the standard solution template, and links to practice problems that fit.
        </p>
      </header>

      <section>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/20 p-5 text-xs text-neutral-400">
          <div className="mb-2 font-semibold uppercase tracking-wider text-neutral-300">Decision flow</div>
          <ul className="space-y-1.5 leading-6">
            <li>→ Problem says <em className="text-neutral-200">'state T/F'</em> about growth rates → <Link href="/patterns/tf-asymptotic" className="text-yellow-300 hover:underline">T/F Asymptotic</Link></li>
            <li>→ Problem says <em className="text-neutral-200">'draw the recursion tree'</em> → <Link href="/patterns/recursion-tree-solve" className="text-yellow-300 hover:underline">Recursion Tree</Link></li>
            <li>→ Problem says <em className="text-neutral-200">'prove by induction'</em> → <Link href="/patterns/induct-recurrence" className="text-yellow-300 hover:underline">Induction for Recurrence</Link></li>
            <li>→ Problem says <em className="text-neutral-200">'design as efficient an algorithm as you can'</em> on structured data → <Link href="/patterns/dc-design" className="text-yellow-300 hover:underline">D&C Design</Link></li>
            <li>→ Problem says <em className="text-neutral-200">'determine whether / maximum / count ways'</em> + overlapping subproblems → <Link href="/patterns/dp-design" className="text-yellow-300 hover:underline">DP Design</Link></li>
            <li>→ Problem involves sorted input + logarithmic runtime → <Link href="/patterns/binary-search-variant" className="text-yellow-300 hover:underline">Binary Search Variant</Link></li>
            <li>→ Problem asks about median-of-medians with different group size → <Link href="/patterns/median-of-medians-variant" className="text-yellow-300 hover:underline">MoM Variant</Link></li>
            <li>→ Proving optimal substructure → <Link href="/patterns/exchange-argument" className="text-yellow-300 hover:underline">Exchange Argument</Link></li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {patterns.map((p) => (
          <Link
            key={p.id}
            href={`/patterns/${p.id}`}
            className="group rounded-lg border border-neutral-800 bg-neutral-900/40 p-5 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
          >
            <div className="text-sm font-semibold text-neutral-50 group-hover:text-white">{p.title}</div>
            <div className="mt-1 text-xs leading-5 text-neutral-400">
              <Markup>{p.oneLiner}</Markup>
            </div>
            {p.triggers.length > 0 && (
              <div className="mt-3 border-t border-neutral-800 pt-3 text-[11px] text-neutral-500">
                <div className="mb-1 font-semibold uppercase tracking-wider">Triggers</div>
                <ul className="space-y-0.5">
                  {p.triggers.slice(0, 2).map((t, i) => (
                    <li key={i}>— <Markup>{t}</Markup></li>
                  ))}
                </ul>
              </div>
            )}
          </Link>
        ))}
      </section>
    </div>
  );
}
