// Two Lines to Your Past Self — make.fun entry.
// The program writes exactly two lines to $MAKEFUN_OUTPUT_DIR/entry.txt:
// line 1 warns the past self about one specific moment (one sentence),
// line 2 says in one sentence why that moment mattered and what changed.
// Gate: entry.txt must be UTF-8 text of 1-280 characters, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

const LINES: readonly string[] = [
  "Before you hand the keys of the blue house on Alder Street to its new owners, photograph the pencil marks on the kitchen door.",
  "They are the only record of how tall your children were, and once paint covers them you will spend years trying to remember numbers you knew by heart.",
];

const text: string = LINES.join("\n") + "\n";

// Keep the entry inside the sealed gate: 1-280 characters, exactly two lines,
// one sentence each, no wasted words (a tie on win rate goes to the smaller text).
if (text.length > 280 || LINES.length !== 2) {
  throw new Error(`entry violates the gate: ${text.length} chars, ${LINES.length} lines`);
}

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
const dir: string = isAbsolute(outDir) ? outDir : resolve(process.cwd(), outDir);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), text, "utf8");
