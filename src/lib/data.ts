import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

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

function read<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

export function getTopics(): TopicMeta[] {
  return read<{ topics: TopicMeta[] }>(path.join(dataDir, "topics.json")).topics;
}

export function getTopic(id: string): TopicDetail | null {
  const fp = path.join(dataDir, "topics", `${id}.json`);
  if (!fs.existsSync(fp)) return null;
  return read<TopicDetail>(fp);
}

export function getProblems(): ProblemMeta[] {
  return read<{ problems: ProblemMeta[] }>(path.join(dataDir, "problems.json")).problems;
}

export function getProblem(id: string): ProblemDetail | null {
  const fp = path.join(dataDir, "problems", `${id}.json`);
  if (!fs.existsSync(fp)) return null;
  return read<ProblemDetail>(fp);
}

export function getPatterns(): Pattern[] {
  return read<{ patterns: Pattern[] }>(path.join(dataDir, "patterns.json")).patterns;
}

export function getPattern(id: string): Pattern | null {
  const patterns = getPatterns();
  return patterns.find((p) => p.id === id) ?? null;
}

export function getTopicMeta(id: string): TopicMeta | undefined {
  return getTopics().find((t) => t.id === id);
}
