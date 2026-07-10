import { projects, type Project } from "@/data/projects";

const EMAIL = "nonnylnwzaza.1122@gmail.com";
const GITHUB = "https://github.com/NTCHz";

const channels: { label: string; href: string; icon: string }[] = [
  { label: EMAIL, href: `mailto:${EMAIL}`, icon: "✉" },
  { label: "github.com/NTCHz", href: GITHUB, icon: "⌥" },
  { label: "LINE", href: "https://line.me/ti/p/H49KQVfR_S", icon: "◉" },
  {
    label: "linkedin/thichanon-ratanasaenwan",
    href: "https://www.linkedin.com/in/thichanon-ratanasaenwan",
    icon: "in",
  },
  {
    label: "facebook",
    href: "https://www.facebook.com/Thichanon.Ratanasaenwan/",
    icon: "f",
  },
  { label: "instagram @ntchz.rw", href: "https://instagram.com/ntchz.rw", icon: "◌" },
];

const skills: { group: string; items: string }[] = [
  {
    group: "AI / Backend",
    items:
      "RAG · LLM pipelines · OCR · Elysia + Bun · FastAPI · Express · Prisma / Drizzle",
  },
  { group: "Frontend", items: "Next.js · Nuxt / Vue · Expo · Tailwind" },
  {
    group: "LINE Platform",
    items: "LIFF · LINE OA bots · messaging automation",
  },
  {
    group: "Infra",
    items: "Docker · Proxmox · Coolify · Cloudflare · self-hosted CI/CD",
  },
];

function Tile({ project, big }: { project: Project; big?: boolean }) {
  const body = (
    <>
      <p className="tile-path">systems/{project.slug}</p>
      <h3
        className={`font-display mt-3 text-[var(--bright)] ${
          big ? "text-2xl md:text-3xl" : "text-base md:text-lg"
        }`}
      >
        {project.name}
        {project.github && <span className="signal text-xs align-super"> ↗</span>}
      </h3>
      <p
        className={`mt-2 leading-relaxed text-[var(--dim)] ${
          big ? "text-sm max-w-md" : "text-xs"
        }`}
      >
        {project.description}
      </p>
      {project.proof && <p className="proof">{project.proof}</p>}
      <ul className="mt-auto pt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </>
  );

  const span = big ? "min-h-52" : "";
  return project.github ? (
    <a href={project.github} target="_blank" rel="noreferrer" className={`tile ${span}`}>
      {body}
    </a>
  ) : (
    <div className={`tile ${span}`}>{body}</div>
  );
}

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <header className="site-nav">
        <span className="text-[var(--dim)]">
          <span className="signal">~/</span>nont
        </span>
        <nav className="flex gap-5" aria-label="Main navigation">
          <a href={GITHUB} target="_blank" rel="noreferrer">github</a>
          <a href={`mailto:${EMAIL}`}>contact ↗</a>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 md:px-10">
      {/* hero */}
      <section
        aria-labelledby="hero-heading"
        className="pt-24 md:pt-32 pb-20 md:pb-28"
      >
        <p className="prompt cursor rise">whoami</p>
        <h1
          id="hero-heading"
          className="font-display rise rise-2 mt-6 uppercase leading-[1.08] text-[var(--bright)]"
          style={{
            fontSize: "clamp(1.9rem, 0.6rem + 4.6vw, 4.2rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Thichanon
          <br />
          <span className="glow-text signal">Ratanasaenwan</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-start">
          <p className="rise rise-3 max-w-md text-base leading-relaxed">
            Full-stack developer. I build production systems end to end — RAG/LLM
            backends, LINE-native apps, and the DevOps that keeps them running.
            Research projects at Chiang Mai University.
            <span className="mt-3 block font-mono text-xs text-[var(--dim)]">
              รับพัฒนาระบบครบวงจร — LINE OA / LIFF · ระบบหลังบ้าน · AI — คุยไทยได้
            </span>
          </p>
          <dl className="manifest rise rise-4" aria-label="How this site is served">
            <div>
              <dt className="inline">host&nbsp;&nbsp;&nbsp;&nbsp;</dt>
              <dd className="inline"><b>proxmox → coolify</b></dd>
            </div>
            <div>
              <dt className="inline">edge&nbsp;&nbsp;&nbsp;&nbsp;</dt>
              <dd className="inline"><b>cloudflare tunnel</b></dd>
            </div>
            <div>
              <dt className="inline">stack&nbsp;&nbsp;&nbsp;</dt>
              <dd className="inline"><b>next.js · typescript</b></dd>
            </div>
            <div>
              <dt className="inline">status&nbsp;&nbsp;</dt>
              <dd className="inline">
                <span className="ok">● self-hosted from my homelab</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* systems */}
      <section aria-labelledby="work-heading" className="pb-20 md:pb-28">
        <h2 className="sect" id="work-heading">
          systems
        </h2>
        <p className="mt-4 mb-8 font-mono text-xs text-[var(--dim)]">
          17 shipped systems — mostly private client &amp; org repos. Happy to
          walk through any of them in an interview.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {featured.map((p) => (
            <Tile key={p.slug} project={p} big />
          ))}
        </div>
        <p className="mt-12 mb-4 font-mono text-xs text-[var(--dim)]">
          + {rest.length} more systems — ask me about any of them
        </p>
        <div>
          {rest.map((p) => (
            <div key={p.slug} className="sys-row">
              <span className="sys-name">
                {p.github ? (
                  <a href={p.github} target="_blank" rel="noreferrer" className="hover:text-[var(--signal)]">
                    {p.name} <span className="signal">↗</span>
                  </a>
                ) : (
                  p.name
                )}
              </span>
              <span className="sys-desc">{p.description}</span>
              <span className="sys-tags">{p.tech.slice(0, 3).join(" · ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* operator */}
      <section aria-labelledby="about-heading" className="pb-20 md:pb-28">
        <h2 className="sect" id="about-heading">
          operator
        </h2>
        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--bright)]">
          One repo or twelve — I&apos;m comfortable running multi-service
          systems, and I build my own dev tooling along the way.
        </p>
        <dl className="mt-10 grid gap-3 sm:grid-cols-2">
          {skills.map((s) => (
            <div key={s.group} className="tile">
              <dt className="font-display text-xs uppercase tracking-widest signal">
                {s.group}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--dim)]">
                {s.items}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* contact */}
      <section aria-labelledby="contact-heading" className="pb-20 md:pb-28">
        <h2 className="sect" id="contact-heading">contact</h2>
        <div className="palette-wrap">
          <div className="palette">
            <p className="palette-head">
              <span className="signal">$</span> open --channel{" "}
              <span className="signal palette-caret">█</span>
            </p>
            {channels.map((c) => (
              <a
                key={c.href}
                className="palette-row"
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span className="palette-ic">{c.icon}</span>
                <span className="palette-label">{c.label}</span>
                <span className="palette-enter">↵</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] py-8 font-mono text-xs text-[var(--dim)]">
        © {new Date().getFullYear()} thichanon ratanasaenwan · served from a
        proxmox box via cloudflare tunnel
      </footer>
    </main>
    </>
  );
}
