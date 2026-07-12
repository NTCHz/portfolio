import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt = "Case study — Thichanon Ratanasaenwan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects
    .filter((p) => p.problem || p.images?.length || p.image)
    .map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const name = p?.name ?? "Case study";
  const role = (p?.role ?? "Solo full-stack — design, build, deploy").toUpperCase();
  const tech = (p?.tech ?? []).slice(0, 5).join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0c",
          color: "#f5f5f5",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 2, color: "#8a8a8a" }}>
          <span>{role}</span>
          <span style={{ color: "#ff4d00" }}>● CASE STUDY</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: name.length > 24 ? 92 : 120, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>{name}</span>
            <span style={{ color: "#ff4d00" }}>.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#b8b8b8" }}>{tech}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28 }}>
          <span style={{ color: "#f5f5f5" }}>Thichanon Ratanasaenwan</span>
          <span style={{ color: "#8a8a8a" }}>portfolio.vlls.space</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
