import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogTabsHub } from "@/components/blog/BlogTabsHub";
import { SLUG_TO_TAB, ARTICLES_METADATA } from "@/lib/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(SLUG_TO_TAB).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug;
  const tabId = slug ? SLUG_TO_TAB[slug] : undefined;

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
  const resolved = await params;
  const slug = resolved?.slug;
  const tabId = slug ? SLUG_TO_TAB[slug] : undefined;

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
