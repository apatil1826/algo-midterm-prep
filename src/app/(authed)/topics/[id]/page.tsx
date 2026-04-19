import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopic, getTopicMeta, getTopics, getProblems } from "@/lib/data";
import { TopicViewSwitcher } from "@/components/TopicViewSwitcher";
import { Markup, Prose } from "@/components/Math";

export const dynamic = "force-dynamic";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = getTopic(id);
  const meta = getTopicMeta(id);
  if (!topic || !meta) notFound();

  const relatedProblems = getProblems().filter((p) => p.topics.includes(id));

  return (
    <article className="space-y-8">
      <header>
        <div className="text-xs uppercase tracking-wider text-neutral-500">
          Tier {meta.tier} {meta.lecture > 0 ? `· Lecture ${meta.lecture}` : ""}
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-50">{topic.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-400">
          <span className="font-medium text-neutral-300">When to use: </span>
          <Markup>{topic.whenToUse}</Markup>
        </p>
      </header>

      {topic.keyFormulas?.length > 0 && (
        <section className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-5">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">Key formulas</h2>
          <ul className="space-y-2 text-sm text-neutral-200">
            {topic.keyFormulas.map((f, i) => (
              <li key={i} className="leading-7">
                <Markup>{f}</Markup>
              </li>
            ))}
          </ul>
        </section>
      )}

      <TopicViewSwitcher professor={topic.professor} simplified={topic.simplified} />

      {relatedProblems.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">Practice problems</h2>
          <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900/40">
            {relatedProblems.map((p) => (
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
                  <div className="shrink-0 text-xs text-neutral-500">{p.source}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
