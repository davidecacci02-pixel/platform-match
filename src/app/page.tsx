import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Compass,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Target,
  Zap,
  BarChart2,
} from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";
import { SCORING_WEIGHTS } from "@/lib/scoring-matrix";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle decorative glow shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-300/30 via-indigo-200/20 to-purple-300/30 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-200 shadow-sm text-xs font-semibold text-brand-700 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Platform Match 2.0 • AI Social Media Consultant
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Free & Ungated</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              AI Social Media Strategy for{" "}
              <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Specific Business
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Stop burning time producing content for channels where your buyers never hang out. Scan your website,
              complete a 3-minute business discovery, and receive transparent mathematical compatibility scoring,
              custom content pillars, a 30-day execution roadmap, and an interactive AI consultant.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/quiz"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-base font-semibold rounded-2xl shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Sparkles className="w-5 h-5 text-brand-200" />
              <span>Start Free AI Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Social Proof / Micro Highlights */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Deterministic Compatibility Scoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Optional Website Intelligence Scan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Interactive AI Consultant Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Benefits */}
      <section className="py-16 bg-white/70 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Why Strategic Channel Selection Matters
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Most brands fail on social by trying to be everywhere at once.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-200 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Zero Wasted Content Hours</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Producing TikTok clips for a B2B legal consultancy or posting text essays on Pinterest drains
                bandwidth with zero ROI. Target the specific algorithmic feeds where your buyers are primed to act.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-200 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Sliders className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Transparent Multi-Factor Scoring</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                No black-box guesses or arbitrary answers. Our matrix scores all 6 dimensions—Audience (30%),
                Goal (25%), Industry (15%), Content (15%), Personality (10%), and Weekly Time (5%).
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-200 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Actionable 30-Day Blueprint</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get a practical primary + secondary dual-channel playbook, realistic posting cadences matching
                your exact team hours, and 3 personalized content ideas you can film or write this week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Preview Grid */}
      <section id="platforms" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
            Deep Algorithmic Coverage
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Preview The 6 Evaluated Platforms
          </h2>
          <p className="text-slate-600 text-sm">
            Each network has distinct demographic strengths, production costs, and conversion dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_PLATFORM_IDS.map((id) => {
            const data = PLATFORMS_DATA[id];
            return (
              <div
                key={id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm text-white"
                        style={{ backgroundColor: data.brandColor }}
                      >
                        <SocialIcon platform={id} size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">
                          {data.name}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {data.primaryDemographics.split("(")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {data.tagline}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">
                        Core Formats
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {data.coreFormats.slice(0, 2).map((fmt) => (
                          <span
                            key={fmt}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold uppercase tracking-wider">
                        Best For
                      </span>
                      <p className="text-slate-700 text-[11px] font-medium line-clamp-1">
                        {data.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
                  <span>Analyze fit in quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <Sparkles className="w-4 h-4 text-brand-300" />
            <span>Discover Your Strongest Match</span>
          </Link>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-16 bg-slate-100/70 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Scientific Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 6-Factor Algorithmic Scoring Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              We never use pseudo-random scores. Every recommendation is computed using an agency-tested
              weighted matrix combining platform audience data with your operational capacity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100">
                <div className="text-2xl font-black text-brand-600">
                  {SCORING_WEIGHTS.audience * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Target Audience</div>
                <div className="text-[11px] text-slate-500">Age, profession & intent density</div>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <div className="text-2xl font-black text-indigo-600">
                  {SCORING_WEIGHTS.goal * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Core Goal</div>
                <div className="text-[11px] text-slate-500">Sales, leads, reach or community</div>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                <div className="text-2xl font-black text-sky-600">
                  {SCORING_WEIGHTS.industry * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Industry Vertical</div>
                <div className="text-[11px] text-slate-500">B2B, tech, fashion, food, education</div>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
                <div className="text-2xl font-black text-purple-600">
                  {SCORING_WEIGHTS.content * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Content Strengths</div>
                <div className="text-[11px] text-slate-500">Short video, long video, copy, photos</div>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                <div className="text-2xl font-black text-rose-600">
                  {SCORING_WEIGHTS.personality * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Brand Voice</div>
                <div className="text-[11px] text-slate-500">Fun, educational, premium, corporate</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-2xl font-black text-emerald-600">
                  {SCORING_WEIGHTS.time * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1">Available Bandwidth</div>
                <div className="text-[11px] text-slate-500">Sustainable weekly production limit</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-brand-600" />
                Deterministic Tie-Breaking Rule:
              </div>
              <p>
                When two platforms tie in overall weighted points, our algorithm prioritizes{" "}
                <span className="font-semibold text-slate-800">Goal Fit</span> first, followed by{" "}
                <span className="font-semibold text-slate-800">Audience Fit</span>, and finally a predefined
                stable priority hierarchy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Banner CTA */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-brand-500/20 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to find where your brand truly belongs?
          </h2>
          <p className="text-brand-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Answer 6 simple multiple-choice questions to receive your compatibility report and actionable 30-day roadmap in 120 seconds.
          </p>
          <div>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold rounded-2xl shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Start the 2-Minute Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
