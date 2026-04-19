import Link from "next/link";
import { getTopics } from "@/lib/data";
import { Markup } from "@/components/Math";

const tierLabels: Record<number, string> = {
  1: "Almost certainly on exam",
  2: "Likely",
  3: "Possible",
  4: "Background",
};

export default function TopicsPage() {
  const topics = getTopics();
  const byTier: Record<number, typeof topics> = { 1: [], 2: [], 3: [], 4: [] };
  for (const t of topics) byTier[t.tier]?.push(t);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-50">Topics</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Each topic has a Professor's view (formal, rigorous) and a Simplified view (intuition-first, fast).
          Click a topic to open.
        </p>
      </header>

      {[1, 2, 3, 4].map((tier) => (
        <section key={tier}>
          <div className="mb-3 flex items-baseline gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">Tier {tier}</h2>
            <span className="text-xs text-neutral-500">— {tierLabels[tier]}</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {byTier[tier].map((t) => (
              <Link
                key={t.id}
                href={`/topics/${t.id}`}
                className="group rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
              >
                <div className="text-sm font-medium text-neutral-50 group-hover:text-white">{t.title}</div>
                <div className="mt-1 text-xs leading-5 text-neutral-400">
                  <Markup>{t.blurb}</Markup>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
