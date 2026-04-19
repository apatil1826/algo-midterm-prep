import Link from "next/link";
import { notFound } from "next/navigation";
import { getPattern, getPatterns, getProblem } from "@/lib/data";
import { Markup } from "@/components/Math";

export function generateStaticParams() {
  return getPatterns().map((p) => ({ id: p.id }));
}

export default async function PatternPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pattern = getPattern(id);
  if (!pattern) notFound();

  return (
    <article className="space-y-8">
      <header>
        <div className="text-xs uppercase tracking-wider text-yellow-400">Pattern</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-50">{pattern.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-300">
          <Markup>{pattern.oneLiner}</Markup>
        </p>
      </header>

      <Panel title="Trigger signals in the problem wording">
        <ul className="space-y-1.5 text-sm text-neutral-300">
          {pattern.triggers.map((t, i) => (
            <li key={i} className="leading-6">— <Markup>{t}</Markup></li>
          ))}
        </ul>
      </Panel>

      <Panel title="Technique">
        <p className="text-sm leading-6 text-neutral-300">
          <Markup>{pattern.technique}</Markup>
        </p>
      </Panel>

      <Panel title="Standard solution template">
        <ol className="space-y-1.5 text-sm leading-6 text-neutral-300" style={{ listStyle: "decimal inside" }}>
          {pattern.template.map((t, i) => (
            <li key={i}><Markup>{t}</Markup></li>
          ))}
        </ol>
      </Panel>

      {pattern.pitfalls?.length > 0 && (
        <Panel title="Common pitfalls" accent>
          <ul className="space-y-1.5 text-sm text-neutral-300">
            {pattern.pitfalls.map((p, i) => (
              <li key={i} className="leading-6">— <Markup>{p}</Markup></li>
            ))}
          </ul>
        </Panel>
      )}

      {pattern.examples?.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">Problems that fit this pattern</h2>
          <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900/40">
            {pattern.examples.map(({ id: pid, why }) => {
              const prob = getProblem(pid);
              if (!prob) return null;
              return (
                <li key={pid}>
                  <Link
                    href={`/problems/${pid}`}
                    className="flex items-start gap-4 px-4 py-3 text-sm transition-colors hover:bg-neutral-900"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-neutral-100">{prob.title}</div>
                      <div className="mt-0.5 text-xs leading-5 text-neutral-400">
                        <Markup>{why}</Markup>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </article>
  );
}

function Panel({ title, accent, children }: { title: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <section>
      <h2 className={`mb-3 text-xs font-semibold uppercase tracking-wider ${accent ? "text-red-300" : "text-neutral-400"}`}>
        {title}
      </h2>
      <div
        className={`rounded-lg border p-5 ${
          accent ? "border-red-400/20 bg-red-500/5" : "border-neutral-800 bg-neutral-900/20"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
