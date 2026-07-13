import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.shipfold.com"),
  title: "Thichanon Ratanasaenwan — Full-stack Developer",
  description:
    "Full-stack developer building AI/RAG systems, LINE-platform apps, and the infrastructure that keeps them running. Portfolio of Thichanon (Nonny) Ratanasaenwan.",
  openGraph: {
    title: "Thichanon Ratanasaenwan — Full-stack Developer",
    description:
      "AI/RAG systems, LINE-platform apps, and self-hosted infrastructure.",
    url: "https://portfolio.shipfold.com",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1400, height: 735 }],
  },
  twitter: {
    card: "summary_large_image",
    // no images here: home inherits og-v2, detail pages inherit their per-project
    // opengraph-image via X's og:image fallback
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Thichanon Ratanasaenwan",
              alternateName: "Nont",
              jobTitle: "Full-stack Developer",
              url: "https://portfolio.shipfold.com",
              email: "mailto:nonnylnwzaza.1122@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Chiang Mai", addressCountry: "TH" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "Chiang Mai University" },
              sameAs: [
                "https://github.com/NTCHz",
                "https://www.linkedin.com/in/thichanon-ratanasaenwan",
                "https://instagram.com/ntchz.rw",
              ],
              knowsAbout: [
                "RAG / LLM pipelines",
                "LINE platform (LIFF, OA)",
                "Next.js",
                "ElysiaJS / Bun",
                "FastAPI",
                "PostgreSQL",
                "Self-hosted DevOps (Proxmox, Coolify, Cloudflare Tunnel)",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
