import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

function requireRead<T>(fp: string): T {
  if (!fs.existsSync(fp)) {
    throw new Error(
      `Data file missing at runtime: ${fp}. If this is deployed, ensure next.config.js has outputFileTracingIncludes for ./data/**/*.json.`,
    );
  }
  return JSON.parse(fs.readFileSync(fp, "utf8"));
}

export type TopicMeta = {
  id: string;
  title: string;
  tier: number;
  lecture: number;
  blurb: string;
};

export type TopicDetail = {
  id: string;
  title: string;
  whenToUse: string;
  keyFormulas: string[];
  professor: string;
  simplified: string;
};

export type ProblemMeta = {
  id: string;
  title: string;
  source: string;
  topics: string[];
  pattern: string;
  difficulty: "easy" | "medium" | "hard";
  blurb: string;
};

export type ProblemStep = {
  title: string;
  body: string;
  answer?: string;
  tips?: { label: string; content: string }[];
};

export type ProblemDetail = {
  id: string;
  title: string;
  source: string;
  statement: string;
  topics: string[];
  pattern: string;
  steps: ProblemStep[];
  answerKey?: string;
};

export type Pattern = {
  id: string;
  title: string;
  oneLiner: string;
  triggers: string[];
  technique: string;
  template: string[];
  pitfalls: string[];
  examples: { id: string; why: string }[];
};

export function getTopics(): TopicMeta[] {
  return requireRead<{ topics: TopicMeta[] }>(path.join(dataDir, "topics.json")).topics;
}

export function getTopic(id: string): TopicDetail | null {
  const fp = path.join(dataDir, "topics", `${id}.json`);
  if (!fs.existsSync(fp)) return null;
  return requireRead<TopicDetail>(fp);
}

export function getProblems(): ProblemMeta[] {
  return requireRead<{ problems: ProblemMeta[] }>(path.join(dataDir, "problems.json")).problems;
}

export function getProblem(id: string): ProblemDetail | null {
  const fp = path.join(dataDir, "problems", `${id}.json`);
  if (!fs.existsSync(fp)) return null;
  return requireRead<ProblemDetail>(fp);
}

export function getPatterns(): Pattern[] {
  return requireRead<{ patterns: Pattern[] }>(path.join(dataDir, "patterns.json")).patterns;
}

export function getPattern(id: string): Pattern | null {
  const patterns = getPatterns();
  return patterns.find((p) => p.id === id) ?? null;
}

export function getTopicMeta(id: string): TopicMeta | undefined {
  return getTopics().find((t) => t.id === id);
}
