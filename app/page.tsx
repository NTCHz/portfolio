import { projects, type Project } from "@/data/projects";
import { diagramBySlug } from "@/components/diagrams";
import { Reveal } from "@/components/reveal";

const EMAIL = "nonnylnwzaza.1122@gmail.com";
const GITHUB = "https://github.com/NTCHz";

const links: { label: string; href: string }[] = [
  { label: "GitHub", href: GITHUB },
  { label: "LINE", href: "https://line.me/ti/p/H49KQVfR_S" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thichanon-ratanasaenwan" },
  { label: "Facebook", href: "https://www.facebook.com/Thichanon.Ratanasaenwan/" },
  { label: "Instagram", href: "https://instagram.com/ntchz.rw" },
];

const marquee =
  "Full-stack developer \u2726 AI / RAG \u2726 LINE platform \u2726 Self-hosted infra \u2726 17 systems shipped \u2726 ";

const skills: { group: string; items: string }[] = [
  {
    group: "AI / Backend",
    items: "RAG · LLM pipelines · OCR · Elysia + Bun · FastAPI · Express · Prisma / Drizzle",
  },
  { group: "Frontend", items: "Next.js · Nuxt / Vue · Expo · Tailwind" },
  { group: "LINE Platform", items: "LIFF · LINE OA bots · messaging automation" },
  { group: "Infra", items: "Docker · Proxmox · Coolify · Cloudflare · self-hosted CI/CD" },
];

function Work({ project, index }: { project: Project; index: number }) {
  const Diagram = diagramBySlug[project.slug];
  return (
    <Reveal>
      <article className="work">
        <p className="work-no">/{String(index + 1).padStart(2, "0")}</p>
        <div className="mt-3 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <h3 className="work-title">{project.name}</h3>
          <div>
            <p className="work-desc">{project.description}</p>
            {project.proof && <p className="work-proof mt-4">{project.proof}</p>}
            <p className="work-tech mt-4">{project.tech.join(" / ")}</p>
          </div>
        </div>
        {Diagram && (
          <div className="mt-8 overflow-x-auto">
            <Diagram />
          </div>
        )}
      </article>
    </Reveal>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <header className="nav">
        <span>Nont — Thichanon R.</span>
        <span className="hidden sm:inline">
          <span className="dot-live" />
          Available for work
        </span>
        <span>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume ↓</a>
          {"  ·  "}
          <a href={`mailto:${EMAIL}`}>Contact ↗︎</a>
        </span>
      </header>

      <main>
        {/* hero */}
        <section aria-labelledby="hero-heading" className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-32 md:pt-40 pb-10">
          <h1 id="hero-heading" className="mega">
            <span className="hero-line" style={{ fontSize: "clamp(3rem, 19.5vw, 15rem)" }}>
              <span>Thichanon</span>
            </span>
            <span className="hero-line" style={{ fontSize: "clamp(2rem, 12.8vw, 9.9rem)" }}>
              <span>
                Ratanasaenwan<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </span>
          </h1>
          <div className="rise rise-2 mt-8">
            <p className="max-w-md text-base md:text-lg leading-relaxed text-[var(--muted)]">
              Full-stack developer building production systems end to end —
              RAG/LLM backends, LINE-native apps, and the DevOps that keeps them
              running.
            </p>
            <p className="meta mt-6">
              Chiang Mai, TH · Self-hosted on my own homelab
            </p>
          </div>
        </section>

        {/* marquee */}
        <div className="marquee mx-auto w-full max-w-6xl mt-8" aria-hidden>
          <div className="marquee-track">
            <span>{marquee}</span>
            <span>{marquee}</span>
          </div>
        </div>

        {/* featured works */}
        <section aria-labelledby="work-heading" className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-24 md:pt-32 pb-16">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="meta" id="work-heading">
                Selected systems
              </h2>
              <span className="meta">2023 — 2026</span>
            </div>
          </Reveal>
          <div className="mt-10">
            {featured.map((p, i) => (
              <Work key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* archive */}
        <section aria-labelledby="archive-heading" className="mx-auto w-full max-w-6xl px-6 md:px-10 pb-24 md:pb-32">
          <Reveal>
            <h2 className="meta" id="archive-heading">
              Archive — {rest.length} more systems
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8">
              {rest.map((p, i) => {
                const inner = (
                  <>
                    <span className="a-no">{String(i + 5).padStart(2, "0")}</span>
                    <span className="a-name">
                      {p.name}
                      {p.github ? " ↗︎" : ""}
                    </span>
                    <span className="a-desc">{p.description}</span>
                    <span className="a-tech">{p.tech.slice(0, 3).join(" · ")}</span>
                  </>
                );
                return p.github ? (
                  <a key={p.slug} className="arow" href={p.github} target="_blank" rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={p.slug} className="arow">
                    {inner}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* statement + skills */}
        <section aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-6 md:px-10 pb-24 md:pb-32">
          <Reveal>
            <p className="statement max-w-4xl" id="about-heading">
              One repo or twelve — comfortable running <em>multi-service</em>{" "}
              systems, building my own <em>dev tooling</em> along the way.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 80}>
                <div className="skill-col">
                  <h3 className="skill-title">{s.group}</h3>
                  <p className="skill-desc">{s.items}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* footer */}
        <footer className="mx-auto w-full max-w-6xl px-6 md:px-10 pb-12">
          <Reveal>
            <p className="meta">Have a system to build?</p>
            <a className="talk mt-4" href={`mailto:${EMAIL}`}>
              Let&apos;s talk
              <span style={{ color: "var(--accent)" }}>.</span>
            </a>
          </Reveal>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
            <nav className="foot-links" aria-label="Social links">
              {links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a>
            </nav>
            <p className="meta">
              © {new Date().getFullYear()} · Self-hosted via Proxmox + Cloudflare tunnel
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
