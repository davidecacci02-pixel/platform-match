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
  Swords,
  Calendar,
  Layers,
  ShieldCheck,
  ChevronRight,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";
import { SCORING_WEIGHTS } from "@/lib/scoring-matrix";

export default function PlatformMatchLandingPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#080B11] text-white selection:bg-brand-500 selection:text-white relative overflow-hidden">
      {/* Subtle Ambient Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-brand-600/15 via-indigo-600/10 to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-64 right-10 w-[450px] h-[350px] bg-gradient-to-br from-cyan-500/10 to-transparent blur-[100px] rounded-full -z-10 pointer-events-none" />

      {/* Top Breadcrumb Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Digital Marketing Lab (Agency Home)</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Live Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300 shadow-sm hover:border-brand-500/30 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Platform Match 2.0 • AI Strategic Engine
            </span>
            <span className="text-white/20">|</span>
            <span className="text-brand-300 font-semibold">100% Free & Ungated</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-5 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Stop Posting in the Void.{" "}
              <span className="block mt-1 bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Find Your True Social Fit.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Stop burning 15+ hours weekly creating content for platforms where your buyers never convert.
              Discover transparent mathematical compatibility scoring, uncover competitor blindspots, and unlock an actionable 30-day growth roadmap.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/quiz"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 text-base font-bold rounded-2xl shadow-lg shadow-white/10 hover:scale-[1.02] active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-brand-600" />
              <span>Start Free AI Consultation</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </Link>

            <Link
              href="#platforms"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm font-semibold transition-all"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Preview 6 Networks</span>
            </Link>
          </div>

          {/* Trust Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Deterministic Multi-Factor Scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Industry Competitor Benchmarking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Interactive AI Consultant Chat</span>
            </div>
          </div>

          {/* HERO VISUAL SHOWCASE: 3D Floating Glass Report Mockup */}
          <div className="pt-8 pb-4 max-w-4xl mx-auto relative">
            {/* Ambient Backlight under mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 via-indigo-500/10 to-transparent blur-3xl rounded-3xl -z-10" />

            {/* Main Mockup Window */}
            <div className="bg-[#0D121F]/90 border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-left transition-all hover:border-white/20">
              {/* Studio Browser Bar */}
              <div className="px-5 py-3.5 bg-[#080B11]/90 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-3.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>platform-match.app/results/demo-report</span>
                </div>
                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider hidden sm:inline">
                  Interactive Preview
                </span>
              </div>

              {/* Mockup Content Grid */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Simulated Business Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
                      Discovery Complete
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                      Strategic Social Distribution Report
                    </h3>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>6/6 Networks Ranked</span>
                  </span>
                </div>

                {/* Simulated Platform Match Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* #1 Primary Engine Preview */}
                  <div className="bg-[#13192B]/90 p-5 rounded-xl border border-brand-500/40 shadow-lg shadow-brand-500/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E1306C] text-white flex items-center justify-center font-bold shadow-md shadow-[#E1306C]/30">
                          <SocialIcon platform="instagram" size={18} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Instagram</h4>
                          <span className="text-[11px] text-brand-300 font-semibold">#1 Primary Growth Engine</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-white">96%</span>
                        <span className="block text-[10px] text-emerald-400 font-bold uppercase">Optimal Match</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div className="bg-gradient-to-r from-brand-500 to-emerald-400 h-full rounded-full w-[96%]" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Algorithmic priority matches your visual short-form content. 70% of weekly effort allocated here.
                    </p>
                  </div>

                  {/* #2 Secondary Synergy Engine Preview */}
                  <div className="bg-[#13192B]/90 p-5 rounded-xl border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold border border-white/20 shadow-md">
                          <SocialIcon platform="tiktok" size={18} className="text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">TikTok</h4>
                          <span className="text-[11px] text-cyan-400 font-semibold">#2 Secondary Synergy</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-white">89%</span>
                        <span className="block text-[10px] text-cyan-400 font-bold uppercase">High Reach</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full w-[89%]" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Repurpose Instagram Reels with zero filming overhead to tap non-follower algorithmic reach.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Pill 1 (Competitor Intelligence) */}
            <div className="hidden lg:flex items-center gap-3 p-3.5 pr-5 rounded-xl bg-[#0D121F]/95 border border-white/15 shadow-xl shadow-black/50 backdrop-blur-md absolute -bottom-5 -left-8 animate-float-slow">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-300 flex items-center justify-center flex-shrink-0 border border-amber-500/25">
                <Swords className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
                  Competitor Intelligence
                </span>
                <span className="text-white font-medium">Rivals Over-Rely on Paid Ads • Organic Gap Open</span>
              </div>
            </div>

            {/* Floating Glass Pill 2 (Growth Roadmap) */}
            <div className="hidden lg:flex items-center gap-3 p-3.5 pr-5 rounded-xl bg-[#0D121F]/95 border border-white/15 shadow-xl shadow-black/50 backdrop-blur-md absolute -bottom-5 -right-8 animate-float-reverse">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center flex-shrink-0 border border-emerald-500/25">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-left text-xs">
                <span className="font-bold text-emerald-300 block uppercase tracking-wider text-[10px]">
                  30-Day Growth Roadmap
                </span>
                <span className="text-white font-medium">Calibrated to Under 3 Hours / Week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Metric Highlights Banner */}
      <section className="py-10 border-y border-white/[0.08] bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                6 Networks
              </div>
              <p className="text-xs text-slate-400 font-medium">Evaluated Across Every Metric</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                6 Dimensions
              </div>
              <p className="text-xs text-slate-400 font-medium">Weighted Algorithmic Compatibility</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                100% Free
              </div>
              <p className="text-xs text-slate-400 font-medium">Deterministic & Zero Gating</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-300">
                &lt; 3 Minutes
              </div>
              <p className="text-xs text-slate-400 font-medium">Instant Full Strategic Roadmap</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              Strategic Competitive Edge
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Strategic Channel Fit Matters
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Most brands fail on social by spreading themselves thin across 5 platforms with zero algorithmic resonance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0D121F]/70 border border-white/[0.08] hover:border-cyan-500/40 rounded-2xl p-7 space-y-4 shadow-xl shadow-black/20 transition-all group hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                Zero Wasted Production Hours
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Filming TikTok clips for a B2B legal boutique or drafting long articles on Pinterest wastes bandwidth with zero commercial ROI. Target the specific algorithms where your prospects have active buying intent.
              </p>
              <div className="pt-2 text-xs font-medium text-cyan-400 flex items-center gap-1.5">
                <span>Save 10+ hours/week</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0D121F]/70 border border-white/[0.08] hover:border-brand-500/40 rounded-2xl p-7 space-y-4 shadow-xl shadow-black/20 transition-all group hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-brand-500/15 text-brand-300 flex items-center justify-center border border-brand-500/20 group-hover:scale-105 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                Deterministic 6-Factor Matrix
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                No black-box hallucinations. Our matrix cross-examines Audience Overlap (30%), Marketing Goal (25%), Industry Fit (15%), Content Strengths (15%), Brand Voice (10%), and Team Capacity (5%).
              </p>
              <div className="pt-2 text-xs font-medium text-brand-400 flex items-center gap-1.5">
                <span>Transparent mathematical logic</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0D121F]/70 border border-white/[0.08] hover:border-amber-500/40 rounded-2xl p-7 space-y-4 shadow-xl shadow-black/20 transition-all group hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                Actionable 30-Day Growth Plan
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                Receive an immediate execution plan with primary & secondary synergy, 3 tailored content pillars, weekly posting cadences, and realistic success KPIs calibrated to your team&apos;s available hours.
              </p>
              <div className="pt-2 text-xs font-medium text-amber-400 flex items-center gap-1.5">
                <span>Step-by-step roadmap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Preview Grid */}
      <section id="platforms" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Algorithmic Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The 6 Evaluated Platforms
          </h2>
          <p className="text-slate-400 text-sm">
            Each network operates on distinct algorithmic distributions, audience demographics, and conversion triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_PLATFORM_IDS.map((id) => {
            const data = PLATFORMS_DATA[id];
            return (
              <div
                key={id}
                className="bg-[#0D121F]/80 rounded-2xl p-6 border border-white/[0.08] hover:border-white/20 shadow-xl shadow-black/20 transition-all flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Subtle top line */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: data.brandColor }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md text-white group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: data.brandColor }}
                      >
                        <SocialIcon platform={id} size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-brand-300 transition-colors">
                          {data.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">
                          {data.primaryDemographics.split("(")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {data.tagline}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-white/[0.08] text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">
                        Core Formats
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {data.coreFormats.slice(0, 2).map((fmt) => (
                          <span
                            key={fmt}
                            className="px-2.5 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 text-[11px] font-medium"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">
                        Best For
                      </span>
                      <p className="text-slate-300 text-[11px] font-medium line-clamp-1 mt-0.5">
                        {data.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300 transition-colors">
                  <span>Analyze fit in quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-950 text-sm font-bold rounded-xl shadow-lg shadow-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Discover Your Strongest Match</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 border-t border-white/[0.08] bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Scientific Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our 6-Factor Algorithmic Scoring Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              We never use pseudo-random scores. Every recommendation is computed using an agency-tested weighted matrix combining platform audience data with your operational capacity.
            </p>
          </div>

          <div className="bg-[#0D121F]/80 rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="text-2xl font-extrabold text-cyan-400">
                  {SCORING_WEIGHTS.audience * 100}%
                </div>
                <div className="text-xs font-bold text-white">Target Audience</div>
                <div className="text-[11px] text-slate-400 font-normal">Age, profession & intent density</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="text-2xl font-extrabold text-indigo-400">
                  {SCORING_WEIGHTS.goal * 100}%
                </div>
                <div className="text-xs font-bold text-white">Core Goal</div>
                <div className="text-[11px] text-slate-400 font-normal">Sales, leads, reach or community</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="text-2xl font-extrabold text-sky-400">
                  {SCORING_WEIGHTS.industry * 100}%
                </div>
                <div className="text-xs font-bold text-white">Industry Vertical</div>
                <div className="text-[11px] text-slate-400 font-normal">B2B, tech, fashion, food, services</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="text-2xl font-extrabold text-purple-400">
                  {SCORING_WEIGHTS.content * 100}%
                </div>
                <div className="text-xs font-bold text-white">Content Strengths</div>
                <div className="text-[11px] text-slate-400 font-normal">Short video, long video, copy, photos</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="text-2xl font-extrabold text-rose-400">
                  {SCORING_WEIGHTS.personality * 100}%
                </div>
                <div className="text-xs font-bold text-white">Brand Voice</div>
                <div className="text-[11px] text-slate-400 font-normal">Fun, educational, premium, corporate</div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="text-2xl font-extrabold text-emerald-400">
                  {SCORING_WEIGHTS.time * 100}%
                </div>
                <div className="text-xs font-bold text-white">Available Bandwidth</div>
                <div className="text-[11px] text-slate-400 font-normal">Sustainable weekly production limit</div>
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.08] text-xs text-slate-300 space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-brand-400" />
                Deterministic Tie-Breaking Logic:
              </div>
              <p className="leading-relaxed text-slate-400">
                When two platforms tie in overall weighted score, our algorithm prioritizes{" "}
                <span className="font-medium text-cyan-300">Goal Fit</span> first, followed by{" "}
                <span className="font-medium text-indigo-300">Audience Fit</span>, and finally a predefined
                sustainable priority hierarchy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Aurora Banner CTA */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0D121F]/90 text-white shadow-2xl border border-brand-500/30 space-y-6 relative overflow-hidden">
          {/* Subtle decorative glow line */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-brand-400 to-pink-400" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to find where your brand truly belongs?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Answer 6 simple multiple-choice questions to receive your compatibility report, competitor benchmark, and actionable 30-day roadmap in 120 seconds.
          </p>
          <div className="pt-2">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2.5 px-9 py-4 bg-white text-slate-950 hover:bg-slate-100 text-base font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-100"
            >
              <Sparkles className="w-5 h-5 text-brand-600" />
              <span>Start the 2-Minute Quiz</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
