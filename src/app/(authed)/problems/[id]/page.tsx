import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblem, getProblems, getPatterns, getTopics } from "@/lib/data";
import { Markup, Prose } from "@/components/Math";
import { MathTip } from "@/components/MathTip";

export const dynamic = "force-dynamic";

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = getProblem(id);
  if (!problem) notFound();

  const pattern = getPatterns().find((pt) => pt.id === problem.pattern);
  const topicsById = Object.fromEntries(getTopics().map((t) => [t.id, t]));

  return (
    <article className="space-y-8">
      <header>
        <div className="text-xs uppercase tracking-wider text-neutral-500">{problem.source}</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-50">{problem.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {pattern && (
            <Link
              href={`/patterns/${pattern.id}`}
              className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-2.5 py-1 text-yellow-300 transition-colors hover:bg-yellow-400/20"
            >
              pattern: {pattern.title}
            </Link>
          )}
          {problem.topics.map((tid) => (
            topicsById[tid] ? (
              <Link
                key={tid}
                href={`/topics/${tid}`}
                className="rounded-full border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-neutral-300 transition-colors hover:border-neutral-700"
              >
                {topicsById[tid].title}
              </Link>
            ) : null
          ))}
        </div>
      </header>

      <section>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">Problem</h2>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/20 p-5">
          <Prose text={problem.statement} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Walkthrough</h2>
        <div className="space-y-6">
          {problem.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-800 bg-neutral-900/20 p-5"
            >
              <h3 className="mb-3 text-base font-semibold text-neutral-50">
                <Markup>{step.title}</Markup>
              </h3>
              {step.answer && (
                <div className="mb-3 rounded-md border border-yellow-400/30 bg-yellow-400/10 px-3 py-2 text-sm text-yellow-100">
                  <Markup>{step.answer}</Markup>
                </div>
              )}
              <Prose text={step.body} />
              {step.tips && step.tips.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.tips.map((tip, j) => (
                    <MathTip key={j} label={tip.label} content={tip.content} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {problem.answerKey && (
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">Answer key</h2>
          <div className="rounded-lg border border-yellow-400/30 bg-yellow-400/5 p-5 text-sm">
            <Prose text={problem.answerKey} />
          </div>
        </section>
      )}
    </article>
  );
}
