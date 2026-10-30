import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pace Marketing Lab | Digital Marketing Agency & Platform Match",
  description:
    "Student-led Digital Marketing Lab at Pace University in NYC. Helping small businesses and nonprofits grow through research-backed social media strategy, content creation, SEO, digital advertising, and our proprietary Platform Match engine.",
  keywords: [
    "digital marketing agency",
    "pace university",
    "lubin school of business",
    "social media strategy",
    "platform match",
    "small business marketing",
    "content creation",
    "seo optimization",
    "digital advertising",
  ],
  authors: [{ name: "Pace University Digital Marketing Lab" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-[#002D72] selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
