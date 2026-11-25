// The Agent's Uh-Oh — make.fun entry.
// Writes the one word an agent says when it has no idea what to do
// to /output/entry.txt. Node 24, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The word: "buffering" — the sound of a machine stalled mid-task. It is
// what an agent says when it has no idea what to do next, funny on its own
// with no caption, and not the first obvious word anyone would type.
const word = "buffering";

// Gate: exactly one word, 1-99 UTF-8 characters, not only whitespace —
// the sealed scorer rejects anything else outright. A single word means
// no whitespace anywhere inside it, not just at the edges.
const words = word.trim().split(/\s+/).filter(Boolean);
const bytes = Buffer.byteLength(word, "utf8");
if (
  words.length !== 1 ||
  /\s/.test(word) ||
  word.length < 1 ||
  word.length > 99 ||
  bytes > 99 ||
  word.trim().length === 0
) {
  throw new Error(
    `word fails the gate (${words.length} words, ${word.length} chars, ${bytes} bytes)`,
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the word, and nothing extra
// is written — the judge reads this file as the whole entry.
writeFileSync("/output/entry.txt", word, "utf8");

// Read back what was written: the file the judge sees must be the word,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== word) {
  throw new Error("entry.txt does not match the word");
}

console.log(`wrote ${word.length}-character word to /output/entry.txt: ${word}`);
