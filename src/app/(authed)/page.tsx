import Link from "next/link";
import { getTopics, getProblems, getPatterns } from "@/lib/data";
import { Markup } from "@/components/Math";

export default function HomePage() {
  const topics = getTopics();
  const problems = getProblems();
  const patterns = getPatterns();
  const tier1Topics = topics.filter((t) => t.tier === 1);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-50">Algorithms Midterm Prep</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
          Concept mastery + pattern recognition for the MPCS Algorithms midterm. Every topic has both a
          professor-style formal view and a simplified intuition view. Every problem has a step-by-step walkthrough
          with math side-tips. The pattern guide is the map from problem wording to attack plan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <Badge>90 minutes · 35 points</Badge>
          <Badge>Part A: 15 pts exercises</Badge>
          <Badge>Part B: 20 pts design</Badge>
          <Badge>Instructor: Ishan Agarwal</Badge>
        </div>
      </section>

      <Section title="Pattern Recognition Guide" subtitle="Read a problem → recognize the shape → know the attack plan." href="/patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((p) => (
            <Link
              key={p.id}
              href={`/patterns/${p.id}`}
              className="group rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
            >
              <div className="text-sm font-medium text-neutral-50 group-hover:text-white">{p.title}</div>
              <div className="mt-1 text-xs leading-5 text-neutral-400">
                <Markup>{p.oneLiner}</Markup>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Tier-1 Topics" subtitle="Almost certainly on the exam." href="/topics">
        <div className="grid gap-3 md:grid-cols-2">
          {tier1Topics.map((t) => (
            <TopicCard key={t.id} topic={t} />
          ))}
        </div>
      </Section>

      <Section title="Practice Problems" subtitle="Full step-by-step walkthroughs with math side-tips." href="/problems">
        <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-900/40">
          {problems.slice(0, 10).map((p) => (
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
      </Section>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-neutral-300">
      {children}
    </span>
  );
}

function Section({
  title,
  subtitle,
  href,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-100">{title}</h2>
          {subtitle && <p className="mt-1 text-xs text-neutral-500">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="text-xs text-neutral-400 transition-colors hover:text-neutral-100">
            See all →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function TopicCard({ topic }: { topic: { id: string; title: string; blurb: string; tier: number } }) {
  return (
    <Link
      href={`/topics/${topic.id}`}
      className="group rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
    >
      <div className="text-sm font-medium text-neutral-50 group-hover:text-white">{topic.title}</div>
      <div className="mt-1 text-xs leading-5 text-neutral-400">
        <Markup>{topic.blurb}</Markup>
      </div>
    </Link>
  );
}
