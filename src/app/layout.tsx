import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Platform Match | Social Media Channel Scoring for Modern Brands",
  description:
    "Discover which social platforms are best suited for your brand through an interactive 6-question quiz, transparent weighted scoring, ranked recommendations, and actionable 30-day content strategies.",
  keywords: [
    "social media strategy",
    "platform match",
    "b2b marketing",
    "instagram marketing",
    "tiktok marketing",
    "linkedin strategy",
    "youtube strategy",
    "content strategy",
  ],
  authors: [{ name: "Digital Growth Studio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50/40 text-slate-900 bg-subtle-mesh">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
