import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BlogTabsHub } from "@/components/blog/BlogTabsHub";

export const metadata: Metadata = {
  title: "Pace Marketing Lab Blog | Social Media Guides & Frameworks",
  description:
    "Explore empirical selection guides, goal-alignment matrices, and sustainable 3-hour workflows created by student marketing researchers at Pace University.",
  keywords: [
    "best social media platforms for business",
    "social media marketing strategy 2026",
    "social media goals for business",
    "limited time social media",
    "pace digital marketing lab blog",
    "platform match educational resources",
  ],
  alternates: {
    canonical: "https://platform-match.vercel.app/blog",
  },
  openGraph: {
    title: "Pace Marketing Lab Blog | Social Media Selection & Research",
    description:
      "Empirical frameworks, platform decision benchmarks, and actionable workflows engineered by Pace University marketing researchers.",
    url: "https://platform-match.vercel.app/blog",
    siteName: "Pace Digital Marketing Lab",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] bg-[#FAF9F6] flex items-center justify-center p-12 text-slate-500 font-bold">
          Loading Pace Marketing Lab Blog...
        </div>
      }
    >
      <BlogTabsHub />
    </Suspense>
  );
}
