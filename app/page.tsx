import { projects, type Project } from "@/data/projects";

const EMAIL = "diy.binary@gmail.com";
const GITHUB = "https://github.com/NTCHz";

const skills: { group: string; items: string }[] = [
  { group: "AI / Backend", items: "RAG · LLM pipelines · OCR · Elysia + Bun · FastAPI · Express · Prisma / Drizzle" },
  { group: "Frontend", items: "Next.js · Nuxt / Vue · Expo · Tailwind" },
  { group: "LINE Platform", items: "LIFF · LINE OA bots · messaging automation" },
  { group: "Infra", items: "Docker · Proxmox · Coolify · Cloudflare · self-hosted CI/CD" },
];

function ProjectRow({ project }: { project: Project }) {
  const inner = (
    <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-baseline">
      <div>
        <h3
          className={`font-display ${project.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}
        >
          <span className="title-line">{project.name}</span>
          {project.github && (
            <span className="font-mono text-xs ml-3 text-[var(--signal)]">
              open source ↗
            </span>
          )}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>
      </div>
      <ul className="flex flex-wrap gap-2 md:justify-end md:max-w-60">
        {project.tech.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );

  return project.github ? (
    <a href={project.github} className="project-row" target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <div className="project-row">{inner}</div>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 md:px-10">
      {/* hero */}
      <section aria-labelledby="hero-heading" className="pt-24 md:pt-36 pb-[var(--space-section)]">
        <p className="eyebrow rise">thichanon ratanasaenwan · nonny</p>
        <h1
          id="hero-heading"
          className="font-display rise rise-2 mt-6 leading-[1.02]"
          style={{ fontSize: "var(--text-hero)" }}
        >
          I build production systems{" "}
          <em className="text-[var(--signal)]">end to end.</em>
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <p className="rise rise-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
            Full-stack developer working across RAG/LLM backends, LINE-native
            apps, and the DevOps that keeps them running — plus research
            projects at CMU.
          </p>
          <dl className="manifest rise rise-4" aria-label="How this site is served">
            <div><dt className="inline">host&nbsp;&nbsp;&nbsp;&nbsp;</dt><dd className="inline"><b>proxmox → coolify</b></dd></div>
            <div><dt className="inline">edge&nbsp;&nbsp;&nbsp;&nbsp;</dt><dd className="inline"><b>cloudflare tunnel</b></dd></div>
            <div><dt className="inline">stack&nbsp;&nbsp;&nbsp;</dt><dd className="inline"><b>next.js · typescript</b></dd></div>
            <div><dt className="inline">status&nbsp;&nbsp;</dt><dd className="inline"><span className="ok">● self-hosted from my homelab</span></dd></div>
          </dl>
        </div>
      </section>

      {/* projects */}
      <section aria-labelledby="work-heading" className="pb-[var(--space-section)]">
        <p className="eyebrow" id="work-heading">
          flagship systems
        </p>
        <p className="mt-3 mb-10 text-sm text-[var(--muted)]">
          Mostly private client &amp; org repos — happy to walk through any of
          them in an interview.
        </p>
        {featured.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
        <p className="eyebrow mt-16 mb-6">more systems</p>
        {rest.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </section>

      {/* about / skills */}
      <section aria-labelledby="about-heading" className="pb-[var(--space-section)]">
        <p className="eyebrow" id="about-heading">
          about
        </p>
        <p className="font-display mt-6 max-w-2xl text-2xl md:text-3xl leading-snug">
          One repo or twelve — I&apos;m comfortable running multi-service
          systems, and I build my own dev tooling along the way.
        </p>
        <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="border-t border-[var(--line)] pt-4">
              <dt className="font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
                {s.group}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {s.items}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* contact */}
      <section aria-labelledby="contact-heading" className="pb-[var(--space-section)]">
        <p className="eyebrow" id="contact-heading">
          contact
        </p>
        <h2 className="font-display mt-6 text-4xl md:text-6xl leading-tight">
          Let&apos;s build something{" "}
          <em className="text-[var(--signal)]">that ships.</em>
        </h2>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 font-mono text-sm">
          <a className="text-[var(--paper)] hover:text-[var(--signal)] transition-colors" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <a className="text-[var(--paper)] hover:text-[var(--signal)] transition-colors" href={GITHUB} target="_blank" rel="noreferrer">
            github.com/NTCHz ↗
          </a>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] py-8 font-mono text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} thichanon ratanasaenwan · served from a
        proxmox box via cloudflare tunnel
      </footer>
    </main>
  );
}
