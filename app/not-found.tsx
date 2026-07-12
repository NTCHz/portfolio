import Link from "next/link";

const EMAIL = "nonnylnwzaza.1122@gmail.com";

export default function NotFound() {
  return (
    <main>
      <header className="nav">
        <Link href="/">← Back</Link>
        <span className="hidden sm:inline">
          <span className="dot-live" />
          404
        </span>
        <span>
          <a href={`mailto:${EMAIL}`}>Contact ↗︎</a>
        </span>
      </header>

      <section className="mx-auto flex w-full max-w-6xl grow flex-col justify-center px-6 md:px-10 py-32 md:py-40">
        <h1 className="mega">
          <span className="hero-line" style={{ fontSize: "clamp(4rem, 30vw, 20rem)" }}>
            <span>
              404<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </span>
        </h1>
        <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-[var(--muted)]">
          This page shipped to nowhere. The system you&apos;re looking for
          moved, or never existed.
        </p>
        <Link href="/" className="work-cta mt-8">
          Back to all work →
        </Link>
      </section>
    </main>
  );
}
