import Link from "next/link";
import { getProblems } from "@/lib/data";
import { Markup } from "@/components/Math";

export default function ProblemsPage() {
  const problems = getProblems();
  const bySource: Record<string, typeof problems> = {};
  for (const p of problems) {
    (bySource[p.source] ??= []).push(p);
  }
  const sources = Object.keys(bySource).sort((a, b) => {
    const order = ["Practice Midterm", "Homework 1", "Homework 2", "Homework 2 (Extra)", "Problem Solving Session 2", "Problem Solving Session 3"];
    return (order.indexOf(a) - order.indexOf(b)) || a.localeCompare(b);
  });

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-50">Practice Problems</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          Clean walkthroughs of every practice-midterm, homework, and problem-solving-session problem relevant to
          this exam. Math rendered inline; side-tips appear where logs, exponents, summations, or the master theorem
          come up.
        </p>
      </header>

      {sources.map((src) => (
        <section key={src}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-200">{src}</h2>
          <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900/40">
            {bySource[src].map((p) => (
              <li key={p.id}>
                <Link
                  href={`/problems/${p.id}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-neutral-900"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-neutral-100">{p.title}</div>
                    <div className="truncate text-xs text-neutral-400">
                      <Markup>{p.blurb}</Markup>
                    </div>
                  </div>
                  <div className="shrink-0 rounded bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-400">
                    {p.difficulty}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
