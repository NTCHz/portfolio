"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildCorpus, retrieve, buildContext, type Scored } from "@/lib/rag";

const EMAIL = "nonnylnwzaza.1122@gmail.com";
const KEY_STORE = "pf_openai_key";
const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

const SUGGESTIONS = [
  "Does he have LINE platform experience?",
  "What has he built with RAG or LLMs?",
  "Which projects used self-hosted infrastructure?",
  "Show me his logistics or delivery work.",
];

type Msg = {
  role: "user" | "assistant";
  content: string;
  cites?: Scored[];
};

function systemPrompt(context: string): string {
  return [
    "You are the portfolio assistant for Thichanon (Nont) Ratanasaenwan, a full-stack developer.",
    "Answer ONLY from the CONTEXT below — it lists his real shipped projects.",
    "Cite the projects you use with their bracket number, e.g. [1]. Be concise (2-4 sentences).",
    "If the context does not cover the question, say so plainly and suggest emailing him.",
    "",
    "CONTEXT:",
    context,
  ].join("\n");
}

export default function Playground() {
  const corpus = useMemo(() => buildCorpus(), []);
  const [apiKey, setApiKey] = useState("");
  const [savedKey, setSavedKey] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<HTMLDivElement>(null);

  // Load key from localStorage after mount (client only).
  useEffect(() => {
    const k = window.localStorage.getItem(KEY_STORE);
    if (k) {
      setApiKey(k);
      setSavedKey(true);
    }
  }, []);

  function saveKey() {
    if (!apiKey.trim()) return;
    window.localStorage.setItem(KEY_STORE, apiKey.trim());
    setSavedKey(true);
    setError(null);
  }

  function clearKey() {
    window.localStorage.removeItem(KEY_STORE);
    setApiKey("");
    setSavedKey(false);
  }

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    if (!apiKey.trim()) {
      setError("Add your OpenAI API key first — it stays in your browser.");
      return;
    }
    setError(null);
    setInput("");

    const hits = retrieve(q, corpus, 6);
    const history = messages
      .slice(-4)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "assistant", content: "", cites: hits },
    ]);
    setLoading(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: MODEL,
          stream: true,
          temperature: 0.2,
          messages: [
            { role: "system", content: systemPrompt(buildContext(hits)) },
            ...history,
            { role: "user", content: q },
          ],
        }),
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => "");
        throw new Error(
          res.status === 401
            ? "Invalid API key."
            : `OpenAI error ${res.status}. ${detail.slice(0, 140)}`,
        );
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      // Parse Server-Sent Events: lines of `data: {json}` ending in `data: [DONE]`.
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const payload = t.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  ...next[next.length - 1],
                  content: acc,
                };
                return next;
              });
              streamRef.current?.scrollIntoView({ block: "end" });
            }
          } catch {
            /* partial JSON across chunks — ignored, next read completes it */
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed.";
      setError(msg);
      setMessages((prev) => {
        const next = [...prev];
        // Drop the empty assistant placeholder on failure.
        if (next[next.length - 1]?.content === "") next.pop();
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="nav">
        <Link href="/">← Back</Link>
        <span className="hidden sm:inline">
          <span className="dot-live" />
          RAG playground
        </span>
        <span>
          <a href={`mailto:${EMAIL}`}>Contact ↗︎</a>
        </span>
      </header>

      <section className="mx-auto w-full max-w-3xl px-6 md:px-10 pt-28 md:pt-32 pb-24">
        <h1 className="pg-title">
          Ask my portfolio<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          A retrieval-augmented chat grounded on my real shipped projects.
          Keyword retrieval (BM25) runs in your browser; your OpenAI key calls
          the model directly — it never touches my server. Answers cite the
          systems they came from.
        </p>

        {/* key management */}
        <div className="pg-key mt-8">
          {savedKey ? (
            <div className="flex items-center justify-between gap-4">
              <span className="pg-key-ok">
                <span className="dot-live" /> Key saved in this browser
              </span>
              <button className="pg-btn-ghost" onClick={clearKey}>
                Clear key
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-…  (OpenAI API key, stays in your browser)"
                className="pg-input grow"
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && saveKey()}
              />
              <button className="pg-btn" onClick={saveKey}>
                Save key
              </button>
            </div>
          )}
        </div>

        {/* conversation */}
        <div className="mt-10 flex flex-col gap-8">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "pg-user" : "pg-bot"}>
              {m.role === "user" ? (
                <p className="pg-user-text">{m.content}</p>
              ) : (
                <div>
                  <p className="pg-bot-text whitespace-pre-wrap">
                    {m.content || (loading ? "…" : "")}
                  </p>
                  {m.cites && m.cites.length > 0 && (
                    <div className="pg-cites mt-4">
                      {m.cites.map((c, n) => (
                        <Link
                          key={c.chunk.slug}
                          href={`/work/${c.chunk.slug}`}
                          className="pg-cite"
                        >
                          [{n + 1}] {c.chunk.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={streamRef} />
        </div>

        {error && <p className="pg-error mt-6">{error}</p>}

        {/* suggestions (only before first message) */}
        {messages.length === 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="pg-chip" onClick={() => ask(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* composer */}
        <form
          className="pg-composer mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my work…"
            className="pg-input grow"
            disabled={loading}
          />
          <button className="pg-btn" disabled={loading || !input.trim()}>
            {loading ? "…" : "Ask →"}
          </button>
        </form>

        <p className="meta mt-6">
          Model: {MODEL} · Open-source pattern · No data leaves your browser
          except the OpenAI call you authorize.
        </p>
      </section>
    </main>
  );
}
