import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogTabsHub, SLUG_TO_TAB, BlogTab } from "@/components/blog/BlogTabsHub";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ARTICLES_METADATA: Record<
  BlogTab,
  {
    title: string;
    description: string;
    canonicalSlug: string;
  }
> = {
  "article-1": {
    title: "Find the Best Social Media Platform for Your Business | Pace Marketing Lab",
    description:
      "A student-developed decision framework evaluating Instagram, TikTok, LinkedIn, Facebook, YouTube, and Pinterest with a 6-factor matrix and worked examples.",
    canonicalSlug: "find-the-best-social-media-platform",
  },
  "article-2": {
    title: "How Your Goals Help You Choose the Best Social Media Platform | Pace Marketing Lab",
    description:
      "Connect your primary business goals—awareness, website traffic, inquiries, sales, and community—to practical audience actions and observable tracking measures.",
    canonicalSlug: "how-goals-help-you-choose-the-best-platform",
  },
  "article-3": {
    title: "Choosing the Best Social Media Platform for Business With Limited Time | Pace Marketing Lab",
    description:
      "Choose a workload your team can actually manage. A step-by-step 3-hour weekly routine for planning, creating, publishing, responding, and reviewing results.",
    canonicalSlug: "social-media-platform-with-limited-time",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tabId = SLUG_TO_TAB[slug];

  if (!tabId) {
    return {
      title: "Article Not Found | Pace Marketing Lab",
    };
  }

  const meta = ARTICLES_METADATA[tabId];
  const url = `https://pace-digital-marketing-lab.vercel.app/blog/${meta.canonicalSlug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "Pace Digital Marketing Lab",
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const tabId = SLUG_TO_TAB[slug];

  if (!tabId) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] bg-[#FAF9F6] flex items-center justify-center p-12 text-slate-500 font-bold">
          Loading article...
        </div>
      }
    >
      <BlogTabsHub initialTab={tabId} />
    </Suspense>
  );
}
