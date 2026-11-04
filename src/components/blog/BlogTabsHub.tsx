"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Target,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  GraduationCap,
  CheckCircle2,
  Share2,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { ArticleOneGuide } from "./ArticleOneGuide";
import { ArticleTwoGoals } from "./ArticleTwoGoals";
import { ArticleThreeTime } from "./ArticleThreeTime";
import { BlogTab, SLUG_TO_TAB, TAB_TO_SLUG } from "@/lib/blog-data";

export type { BlogTab };
export { SLUG_TO_TAB, TAB_TO_SLUG };

interface ArticleMeta {
  id: BlogTab;
  slug: string;
  number: string;
  badge: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  tags: string[];
  icon: React.ElementType;
}

const ARTICLES: ArticleMeta[] = [
  {
    id: "article-1",
    slug: "find-the-best-social-media-platform",
    number: "01",
    badge: "Article 1 • Master Guide",
    category: "Platform Selection",
    title: "Find the Best Social Media Platform for Your Business",
    description:
      "A student-developed decision framework evaluating Instagram, TikTok, LinkedIn, Facebook, YouTube, and Pinterest with a 6-factor matrix and worked examples.",
    readTime: "7 min read",
    tags: ["6 Major Networks", "6-Factor Matrix", "Interactive Worksheet"],
    icon: Layers,
  },
  {
    id: "article-2",
    slug: "how-goals-help-you-choose-the-best-platform",
    number: "02",
    badge: "Article 2 • Goal Strategy",
    category: "Strategic Alignment",
    title: "How Your Goals Help You Choose the Best Social Media Platform for Business",
    description:
      "Connect your primary business goals—awareness, website traffic, inquiries, sales, and community—to practical audience actions and observable tracking measures.",
    readTime: "5 min read",
    tags: ["Goal-to-Action Matrix", "Practical KPIs", "Conversion Logic"],
    icon: Target,
  },
  {
    id: "article-3",
    slug: "social-media-platform-with-limited-time",
    number: "03",
    badge: "Article 3 • Capacity & Workflow",
    category: "Time Management",
    title: "Choosing the Best Social Media Platform for Business With Limited Time",
    description:
      "Choose a workload your team can actually manage. A step-by-step 3-hour weekly routine for planning, creating, publishing, responding, and reviewing results.",
    readTime: "5 min read",
    tags: ["3-Hour Weekly Workflow", "Sustainable Cadence", "Batch Production"],
    icon: Clock,
  },
];

export function BlogTabsHub({ initialTab }: { initialTab?: BlogTab }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<BlogTab>(initialTab || "article-1");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Read query params on mount (e.g. ?article=2 or ?tab=goals) if initialTab not explicitly provided
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
      return;
    }
    const tabParam = searchParams.get("tab") || searchParams.get("article");
    if (tabParam && SLUG_TO_TAB[tabParam]) {
      setActiveTab(SLUG_TO_TAB[tabParam]);
    } else if (tabParam === "2") {
      setActiveTab("article-2");
    } else if (tabParam === "3") {
      setActiveTab("article-3");
    } else if (tabParam === "1") {
      setActiveTab("article-1");
    }
  }, [searchParams, initialTab]);

  const selectTab = (id: BlogTab) => {
    setActiveTab(id);
    if (typeof window !== "undefined") {
      const slug = TAB_TO_SLUG[id];
      window.history.pushState(null, "", `/blog/${slug}`);
      const readerEl = document.getElementById("reader");
      if (readerEl) {
        readerEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleCopyLink = (slug: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/blog/${slug}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2500);
      });
    }
  };

  const activeArticle = ARTICLES.find((a) => a.id === activeTab) || ARTICLES[0];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-[#002D72] selection:text-white relative">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              prefetch={true}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#002D72] transition-colors px-4 py-2 rounded-full bg-white border border-slate-200 shadow-2xs hover:shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#002D72]" />
              <span>Back to Lab Home</span>
            </Link>

            <Link
              href="/platform-match"
              prefetch={true}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#002D72] transition-colors px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-2xs hover:shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#002D72]" />
              <span>Platform Match Tool</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#002D72]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#002D72] font-bold">Lab Blog &amp; Educational Articles</span>
          </div>
        </div>
      </div>

      {/* Main Blog Hub Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 space-y-6 text-center sm:text-left w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800">
          <GraduationCap className="w-4 h-4 text-[#002D72]" />
          <span className="text-[#002D72] font-black uppercase tracking-wider">
            Pace Marketing Lab Blog
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[#966300] bg-[#FFB81C]/25 px-2 py-0.5 rounded-full">
            3 Research Articles
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Social Media Selection &amp; Growth Knowledge Hub
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
          Student-developed decision frameworks, platform comparison benchmarks, and actionable playbooks developed by Pace University marketing students for MAR649 to help small businesses make clear, realistic social media choices.
        </p>

        {/* =====================================================================
            ARTICLE SHOWCASE: 3 ELEGANT INTERACTIVE CARDS
            ===================================================================== */}
        <div className="pt-4">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Select an Article to Read
            </h2>
            <span className="text-xs font-semibold text-slate-400">
              Click any card to read below
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ARTICLES.map((art) => {
              const IconComp = art.icon;
              const isSelected = activeTab === art.id;

              return (
                <div
                  key={art.id}
                  onClick={() => selectTab(art.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      selectTab(art.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`p-6 rounded-3xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? "bg-white border-[#002D72] shadow-md ring-2 ring-[#002D72]/15 scale-[1.01]"
                      : "bg-white/80 hover:bg-white border-slate-200/90 shadow-2xs hover:shadow-sm hover:border-slate-300"
                  }`}
                >
                  {/* Active Indicator Top Ribbon */}
                  {isSelected && (
                    <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-[#002D72] via-[#FFB81C] to-[#002D72] rounded-b-full" />
                  )}

                  <div className="space-y-4">
                    {/* Top Row: Icon + Article Number */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#002D72] text-[#FFB81C] shadow-xs"
                            : "bg-slate-100 text-slate-700 group-hover:bg-[#002D72]/10 group-hover:text-[#002D72]"
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {art.number}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Reading Now
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Badge & Title */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#002D72] block">
                        {art.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug group-hover:text-[#002D72] transition-colors">
                        {art.title}
                      </h3>
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                      {art.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{art.readTime}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyLink(art.slug, e)}
                        title="Copy direct article URL for outreach"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 transition-colors"
                      >
                        {copiedSlug === art.slug ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-500" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <span
                        className={`inline-flex items-center gap-1 font-bold transition-all ${
                          isSelected
                            ? "text-[#002D72]"
                            : "text-slate-600 group-hover:text-[#002D72] group-hover:translate-x-0.5"
                        }`}
                      >
                        <span>{isSelected ? "Reading" : "Read"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            AESTHETIC PILL-STYLE TAB SWITCHER (Sticky on Scroll)
            ===================================================================== */}
        <div id="reader" className="pt-6">
          <div className="p-1.5 bg-white rounded-full border border-slate-200 shadow-2xs flex flex-wrap sm:flex-nowrap items-center gap-1 max-w-3xl mx-auto">
            <button
              onClick={() => selectTab("article-1")}
              className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "article-1"
                  ? "bg-[#002D72] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-4 h-4 text-[#FFB81C]" />
              <span>Article 1: Selection Guide</span>
            </button>

            <button
              onClick={() => selectTab("article-2")}
              className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "article-2"
                  ? "bg-[#002D72] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Target className="w-4 h-4 text-[#FFB81C]" />
              <span>Article 2: Aligning Goals</span>
            </button>

            <button
              onClick={() => selectTab("article-3")}
              className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "article-3"
                  ? "bg-[#002D72] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Clock className="w-4 h-4 text-[#FFB81C]" />
              <span>Article 3: Limited Time</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ACTIVE ARTICLE READER CONTAINER
          ===================================================================== */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 w-full">
        <div className="p-6 sm:p-10 md:p-12 rounded-[2.5rem] bg-white border border-slate-200/90 shadow-sm">
          {activeTab === "article-1" && <ArticleOneGuide />}
          {activeTab === "article-2" && <ArticleTwoGoals />}
          {activeTab === "article-3" && <ArticleThreeTime />}

          {/* Bottom Series Navigation */}
          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              You are reading <strong className="text-slate-900">{activeArticle.title}</strong>
            </div>

            <div className="flex items-center gap-3">
              {activeTab !== "article-1" && (
                <button
                  onClick={() =>
                    selectTab(activeTab === "article-3" ? "article-2" : "article-1")
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#002D72] hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Article</span>
                </button>
              )}

              {activeTab !== "article-3" && (
                <button
                  onClick={() =>
                    selectTab(activeTab === "article-1" ? "article-2" : "article-3")
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#002D72] text-xs font-bold text-white hover:bg-[#001C48] transition-colors shadow-2xs"
                >
                  <span>Next Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
