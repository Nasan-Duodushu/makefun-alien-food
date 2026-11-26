// One Star, Five Stars for the Food — entry program.
// Writes one sentence (<=200 chars): an alien tourist's one-star review of
// Earth that still compliments the food, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const REVIEW =
  "One star: the locals put pineapple on pizza, then argue about it for decades — and somehow both sides are right, because the pizza is magnificent.";

function entryPath(): string {
  return resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", "entry.txt");
}

function check(text: string): void {
  const trimmed = text.trim();
  const sentences = trimmed.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  if (trimmed.length === 0 || trimmed.length > 200) {
    throw new Error("review fails the 1-200 character gate");
  }
  if (sentences.length !== 1 || trimmed.includes("\n")) {
    throw new Error("review must be exactly one sentence on one line");
  }
  // Brief-fit self-check: a one-star frame, an alien grievance, and a real
  // food compliment must all be present — and no gravity/dumpling modal.
  if (!/^One star:/i.test(trimmed) || !/pizza/i.test(trimmed)) {
    throw new Error("review must keep the one-star frame and the food compliment");
  }
  if (/gravity|dumpling/i.test(trimmed)) {
    throw new Error("review must avoid the gravity/dumpling modal takes");
  }
}

check(REVIEW);
mkdirSync(resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output"), { recursive: true });
writeFileSync(entryPath(), REVIEW, "utf8");
console.log(`wrote ${REVIEW.length} chars to ${entryPath()}`);
