"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  bullets?: { label: string; value: string }[];
  tag?: string;
}

const FAQS: FAQItem[] = [
  {
    id: "best-platform",
    question: "1. What is the best social media platform for my business?",
    answer:
      "There is no single best platform for every business. Your choice should reflect where your intended customers spend time, what you want to achieve, and the content your team can consistently create.\n\nPlatform Match helps you compare six networks using your business inputs, giving you a starting point for deciding which channel to prioritize.",
    tag: "Platform Strategy",
  },
  {
    id: "what-is-it",
    question: "2. What is Platform Match, and is it free?",
    answer:
      "Platform Match is a free social media platform selection tool created as a MAR649 student project. It compares Instagram, TikTok, Facebook, LinkedIn, YouTube, and Pinterest.\n\nComplete the six-question quiz to view your compatibility rankings and a suggested content roadmap.",
    tag: "Tool Overview",
  },
  {
    id: "how-calculated",
    question: "3. How does Platform Match calculate its recommendations?",
    answer:
      "The published framework uses six weighted factors to compute raw compatibility scores clamped from 0 to 100%:",
    bullets: [
      { label: "Target audience", value: "30%" },
      { label: "Marketing goal", value: "25%" },
      { label: "Industry vertical", value: "15%" },
      { label: "Content strengths", value: "15%" },
      { label: "Brand voice", value: "10%" },
      { label: "Available time", value: "5%" },
    ],
    tag: "6-Factor Algorithm",
  },
  {
    id: "limited-time",
    question: "4. Can I use Platform Match if I have little time for social media?",
    answer:
      "Yes. The quiz asks how much time your team can dedicate each week, including an option for under two hours.\n\nChoose the answer that reflects your actual capacity, including content creation, publishing, and responses. Review the recommendation and begin with a workload you can maintain.",
    tag: "Time & Capacity",
  },
  {
    id: "score-guarantee",
    question: "5. Does a high compatibility score guarantee results?",
    answer:
      "No. A compatibility score indicates fit within Platform Match’s framework. For example, a score of 94% does not mean a 94% chance of success.\n\nResults depend on your audience, offer, content, execution, and other factors. Use the recommendation as a planning aid, then adjust your approach using actual outcomes.",
    tag: "Academic Methodology",
  },
];

export function PlatformMatchFAQ() {
  // Keep first question open by default for immediate preview
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "best-platform": true,
    "what-is-it": false,
    "how-calculated": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQS.forEach((f) => (allOpen[f.id] = true));
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const allAreOpen = FAQS.every((f) => openItems[f.id]);

  return (
    <section id="faq" className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* JSON-LD for Search Engines & AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question.replace(/^\d+\.\s*/, ""),
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.bullets
                  ? `${faq.answer} ${faq.bullets.map((b) => `${b.label}: ${b.value}`).join(", ")}`
                  : faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800">
              <HelpCircle className="w-4 h-4 text-[#002D72]" />
              <span className="text-[#002D72] font-black uppercase tracking-wider">
                Frequently Asked Questions
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">Platform Match Guide</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Frequently Asked Questions About Platform Match
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Transparent answers regarding our student research methodology, scoring weights, time management considerations, and realistic expectations.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={allAreOpen ? collapseAll : expandAll}
              className="text-xs font-bold text-[#002D72] hover:text-[#001C48] bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-2xs transition-colors"
            >
              {allAreOpen ? "Collapse All Questions" : "Expand All Questions"}
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = !!openItems[faq.id];

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 bg-white shadow-2xs ${
                  isOpen
                    ? "border-[#002D72]/40 shadow-sm ring-1 ring-[#002D72]/10"
                    : "border-slate-200/90 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D72] rounded-2xl"
                >
                  <div className="space-y-1.5 pr-2">
                    {faq.tag && (
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#002D72]/5 text-[#002D72] mb-1">
                        {faq.tag}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#002D72] text-white rotate-180"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 space-y-4">
                    <p className="whitespace-pre-line text-slate-700 font-normal">
                      {faq.answer}
                    </p>

                    {/* Weighted Bullets if applicable (Question 3) */}
                    {faq.bullets && (
                      <div className="pt-2">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {faq.bullets.map((b, bIdx) => (
                            <div
                              key={bIdx}
                              className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 shadow-2xs"
                            >
                              <span className="text-xs font-bold text-slate-800">
                                {b.label}
                              </span>
                              <span className="text-xs font-black text-[#002D72] bg-[#FFB81C]/30 px-2 py-0.5 rounded-md">
                                {b.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 font-medium pt-3 italic">
                          Your selected answers shape the comparison. These weights describe the relative importance of each factor within the project&apos;s published framework.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mini Trust Footnote */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#002D72]/5 via-white to-[#FFB81C]/10 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#FFB81C]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Created by the Platform Match student project team for MAR649
              </p>
              <p className="text-[11px] text-slate-500">
                Academic research model • Pace University Lubin School of Business • 100% Free
              </p>
            </div>
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs font-black transition-all shadow-sm hover:shadow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB81C]" />
            <span>Take Free Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
