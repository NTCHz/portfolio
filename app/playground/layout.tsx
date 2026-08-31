import type { Metadata } from "next";

const title = "Ask my portfolio — RAG Playground | Thichanon Ratanasaenwan";
const description =
  "A retrieval-augmented chat grounded on real shipped projects. BM25 retrieval runs in your browser; your OpenAI key calls the model directly.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/playground" },
  openGraph: {
    title,
    description,
    url: "/playground",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1400, height: 735 }],
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
