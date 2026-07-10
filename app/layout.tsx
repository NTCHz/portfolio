import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
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
