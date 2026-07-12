import { projects, type Project } from "@/data/projects";

/** One retrievable chunk = one project, flattened to searchable text. */
export type Chunk = {
  slug: string;
  title: string;
  /** Human-readable text shown as the citation body. */
  text: string;
  /** Lowercased token multiset for scoring. */
  tokens: string[];
};

const STOP = new Set(
  (
    // grammar
    "a an the of to in on for and or with is are was were be been being this that it its as at by from into over under also using used use built build ship shipped " +
    // question words (queries are natural language)
    "does do did has have had his him he she her they you your i me my what which who whom how why when where can could would should is-it show tell about " +
    // portfolio-generic filler that appears in half the project names — pure noise for intent
    "platform platforms system systems app apps application service services solution solutions project projects tool tools full stack developer dev work works experience"
  ).split(/\s+/),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function projectText(p: Project): string {
  return [
    p.name,
    p.description,
    p.role,
    p.problem,
    p.approach,
    p.result,
    ...(p.highlights ?? []),
    p.tech.join(" "),
    p.proof,
  ]
    .filter(Boolean)
    .join(". ");
}

export function buildCorpus(items: Project[] = projects): Chunk[] {
  return items.map((p) => {
    const text = projectText(p);
    return { slug: p.slug, title: p.name, text, tokens: tokenize(text) };
  });
}

/** Inverse document frequency so rare terms (e.g. "liff") outweigh common ones. */
function idf(corpus: Chunk[]): Map<string, number> {
  const df = new Map<string, number>();
  for (const c of corpus) {
    for (const t of new Set(c.tokens)) df.set(t, (df.get(t) ?? 0) + 1);
  }
  const n = corpus.length;
  const out = new Map<string, number>();
  for (const [t, d] of df) out.set(t, Math.log(1 + n / d));
  return out;
}

export type Scored = { chunk: Chunk; score: number };

/** BM25-lite: TF weighted by IDF, length-normalized. Enough for a ~20-doc corpus. */
export function retrieve(query: string, corpus: Chunk[], k = 4): Scored[] {
  const qTerms = tokenize(query);
  if (qTerms.length === 0) return [];
  const weight = idf(corpus);
  const avgLen = corpus.reduce((s, c) => s + c.tokens.length, 0) / corpus.length;
  const scored = corpus.map((chunk) => {
    const tf = new Map<string, number>();
    for (const t of chunk.tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    const norm = chunk.tokens.length / avgLen;
    let score = 0;
    for (const q of qTerms) {
      const f = tf.get(q);
      if (!f) continue;
      // BM25 k1=1.5 b=0.75
      score += (weight.get(q) ?? 0) * ((f * 2.5) / (f + 1.5 * (0.25 + 0.75 * norm)));
    }
    return { chunk, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

/** Assemble the retrieved chunks into a grounding context block for the LLM. */
export function buildContext(hits: Scored[]): string {
  return hits
    .map((h, i) => `[${i + 1}] ${h.chunk.title}\n${h.chunk.text}`)
    .join("\n\n");
}
