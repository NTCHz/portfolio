import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import { diagramBySlug } from "@/components/diagrams";
import { Reveal } from "@/components/reveal";

const EMAIL = "nonnylnwzaza.1122@gmail.com";

export function generateStaticParams() {
  return projects.filter((p) => hasDetail(p)).map((p) => ({ slug: p.slug }));
}

function hasDetail(p: Project): boolean {
  return Boolean(p.problem || p.images?.length || p.image);
}

function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.name} — Thichanon Ratanasaenwan`;
  return {
    title,
    description: p.description,
    openGraph: {
      title,
      description: p.description,
      // og:image comes from ./opengraph-image.tsx (per-project generated card)
    },
  };
}

const NARRATIVE: { key: keyof Project; label: string }[] = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "The approach" },
  { key: "result", label: "The result" },
];

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !hasDetail(project)) notFound();

  const Diagram = diagramBySlug[project.slug];
  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [{ src: project.image, alt: project.imageAlt ?? `${project.name} screenshot` }]
        : [];

  return (
    <main>
      <header className="nav">
        <Link href="/">← Back</Link>
        <span className="hidden sm:inline">
          <span className="dot-live" />
          {project.name}
        </span>
        <span>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Resume ↓
          </a>
          {"  ·  "}
          <a href={`mailto:${EMAIL}`}>Contact ↗︎</a>
        </span>
      </header>

      {/* hero — asymmetric like the home work cards */}
      <section className="mx-auto w-full max-w-6xl px-6 md:px-10 pt-32 md:pt-40 pb-14 md:pb-20">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div>
              <p className="meta">
                {(project.role ?? "Solo full-stack — design, build, deploy").toUpperCase()}
              </p>
              <h1 className="detail-title mt-4">{project.name}</h1>
            </div>
            <div>
              <p className="detail-lede">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {project.tech.map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
              {(project.github || project.live) && (
                <div className="mt-6 flex flex-wrap gap-6">
                  {project.live && (
                    <a className="detail-link" href={project.live} target="_blank" rel="noreferrer">
                      Live ↗︎
                    </a>
                  )}
                  {project.github && (
                    <a className="detail-link" href={project.github} target="_blank" rel="noreferrer">
                      GitHub ↗︎
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* lead visual */}
        {gallery[0] && (
          <Reveal delay={80}>
            <figure className="shot-frame mt-4">
              <img
                src={gallery[0].src}
                alt={gallery[0].alt}
                width={1600}
                height={1000}
                loading="eager"
              />
            </figure>
            {gallery[0].caption && <figcaption className="shot-cap">{gallery[0].caption}</figcaption>}
          </Reveal>
        )}
      </section>

      {/* narrative — left-aligned columns under a section rule */}
      {NARRATIVE.some((n) => project[n.key]) && (
        <section className="detail-block mx-auto w-full max-w-6xl px-6 md:px-10 py-14">
          <div className="grid gap-10 md:gap-12 md:grid-cols-3">
            {NARRATIVE.map((n, i) => {
              const body = project[n.key] as string | undefined;
              if (!body) return null;
              return (
                <Reveal key={n.key} delay={i * 80}>
                  <div className="narr">
                    <h2 className="narr-label">{n.label}</h2>
                    <p className="narr-body mt-3">{body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="detail-block mx-auto w-full max-w-6xl px-6 md:px-10 py-14">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
              <h2 className="meta">What it does</h2>
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-1">
                {project.highlights.map((h) => (
                  <li key={h} className="hi-item">
                    <span className="hi-mark">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      )}

      {/* architecture diagram */}
      {Diagram && (
        <section className="detail-block mx-auto w-full max-w-6xl px-6 md:px-10 py-14">
          <Reveal>
            <h2 className="meta mb-8">Architecture</h2>
            <div className="overflow-x-auto">
              <Diagram />
            </div>
          </Reveal>
        </section>
      )}

      {/* extra gallery */}
      {gallery.length > 1 && (
        <section className="detail-block mx-auto w-full max-w-6xl px-6 md:px-10 py-14">
          <Reveal>
            <h2 className="meta mb-8">More screens</h2>
          </Reveal>
          <div className="grid gap-12">
            {gallery.slice(1).map((g, i) => (
              <Reveal key={g.src} delay={i * 60}>
                <figure className="shot-frame">
                  <img src={g.src} alt={g.alt} width={1600} height={1000} loading="lazy" />
                </figure>
                {g.caption && <figcaption className="shot-cap">{g.caption}</figcaption>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* footer */}
      <footer className="detail-block mx-auto w-full max-w-6xl px-6 md:px-10 pt-14 pb-16">
        <Reveal>
          <Link className="detail-back" href="/">
            ← All work
          </Link>
          <p className="meta mt-12">Have a system to build?</p>
          <a className="talk mt-4" href={`mailto:${EMAIL}`}>
            Let&apos;s talk<span style={{ color: "var(--accent)" }}>.</span>
          </a>
        </Reveal>
      </footer>
    </main>
  );
}
