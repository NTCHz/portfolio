import type { Metadata } from "next";
import { Geist, Geist_Mono, Martian_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Martian_Mono({
  variable: "--font-display",
  weight: ["700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.vlls.space"),
  title: "Thichanon Ratanasaenwan — Full-stack Developer",
  description:
    "Full-stack developer building AI/RAG systems, LINE-platform apps, and the infrastructure that keeps them running. Portfolio of Thichanon (Nonny) Ratanasaenwan.",
  openGraph: {
    title: "Thichanon Ratanasaenwan — Full-stack Developer",
    description:
      "AI/RAG systems, LINE-platform apps, and self-hosted infrastructure.",
    url: "https://portfolio.vlls.space",
    type: "website",
    images: [{ url: "/og.png", width: 2400, height: 1260 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
