#!/usr/bin/env node
// Regenerate data/search-index.json from data/topics/*.json, data/problems/*.json, data/patterns.json.
// Run:  node scripts/build-search-index.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)), "..");
const dataDir = path.join(root, "data");

const out = [];

// Topics
const topicsIndex = JSON.parse(fs.readFileSync(path.join(dataDir, "topics.json"), "utf8")).topics;
for (const t of topicsIndex) {
  const fp = path.join(dataDir, "topics", `${t.id}.json`);
  if (!fs.existsSync(fp)) continue;
  const d = JSON.parse(fs.readFileSync(fp, "utf8"));
  const body = [t.blurb, d.whenToUse, d.simplified, ...(d.keyFormulas || [])].join(" ").replace(/\s+/g, " ").slice(0, 600);
  out.push({
    id: `topic:${t.id}`,
    type: "topic",
    title: t.title,
    href: `/topics/${t.id}`,
    body,
    tags: [`tier-${t.tier}`, `lecture-${t.lecture}`],
  });
}

// Problems
const problemsIndex = JSON.parse(fs.readFileSync(path.join(dataDir, "problems.json"), "utf8")).problems;
for (const p of problemsIndex) {
  const fp = path.join(dataDir, "problems", `${p.id}.json`);
  if (!fs.existsSync(fp)) continue;
  const d = JSON.parse(fs.readFileSync(fp, "utf8"));
  const body = [p.blurb, d.statement, d.answerKey].join(" ").replace(/\s+/g, " ").slice(0, 600);
  out.push({
    id: `problem:${p.id}`,
    type: "problem",
    title: p.title,
    href: `/problems/${p.id}`,
    body,
    tags: [p.source, p.pattern, ...(p.topics || []), `difficulty-${p.difficulty}`],
  });
}

// Patterns
const patterns = JSON.parse(fs.readFileSync(path.join(dataDir, "patterns.json"), "utf8")).patterns;
for (const pat of patterns) {
  const body = [pat.oneLiner, pat.technique, ...(pat.triggers || []), ...(pat.template || [])].join(" ").replace(/\s+/g, " ").slice(0, 600);
  out.push({
    id: `pattern:${pat.id}`,
    type: "pattern",
    title: pat.title,
    href: `/patterns/${pat.id}`,
    body,
    tags: ["pattern"],
  });
}

fs.writeFileSync(path.join(dataDir, "search-index.json"), JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} entries to data/search-index.json`);
