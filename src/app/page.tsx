import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Check,
  X,
  Play,
  Heart,
  Share2,
  Users,
} from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";
import { SCORING_WEIGHTS } from "@/lib/scoring-matrix";

export default function PlatformMatchLandingPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-[#002D72] selection:text-white relative overflow-hidden">
      {/* Linktree-Style Organic Ambient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#002D72]/[0.06] via-[#FFB81C]/[0.08] to-transparent blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-96 right-[-100px] w-[500px] h-[400px] bg-gradient-to-br from-emerald-400/[0.07] to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[1200px] left-[-100px] w-[600px] h-[500px] bg-gradient-to-tr from-[#002D72]/[0.05] via-[#FFB81C]/[0.06] to-transparent blur-[140px] rounded-full -z-10 pointer-events-none" />

      {/* Top Bar with Quick Navigation to Agency About & Article Guide */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/about"
          prefetch={true}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#002D72] transition-colors px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow hover:scale-[1.01]"
        >
          <Users className="w-3.5 h-3.5 text-[#002D72]" />
          <span>About Pace Marketing Lab &amp; Agency Services →</span>
        </Link>

        <Link
          href="/best-social-media-platforms-for-business"
          prefetch={true}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#002D72] hover:text-[#001C48] transition-colors px-4 py-2 rounded-full bg-[#FFB81C]/20 border border-[#FFB81C]/40 shadow-sm hover:shadow hover:scale-[1.01]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#001C48]" />
          <span>Read our platform selection guide →</span>
        </Link>
      </div>

      {/* =====================================================================
          HERO SECTION: Linktree-Style Headline + 3D Floating Phone Mockup
          ===================================================================== */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Copy & Linktree Pills */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-800">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="flex items-center gap-1.5 text-slate-900">
                  <Sparkles className="w-3.5 h-3.5 text-[#002D72]" />
                  <span>Platform Match 2.0</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[#002D72]">Pace Lubin Research Engine</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#966300] bg-[#FFB81C]/25 px-2 py-0.5 rounded-full">100% Free</span>
              </div>

              {/* Master Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
                  Stop Posting in the Void.{" "}
                  <span className="block mt-1 text-[#002D72] underline decoration-[#FFB81C] decoration-[6px] underline-offset-8">
                    Find Your True Social Fit.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Stop burning 15+ hours every week creating content for platforms where your ideal buyers never convert.
                  Our proprietary algorithm analyzes your audience, goals, and team capacity to reveal your highest-ROI channels and a realistic 30-day playbook.
                </p>
              </div>

              {/* Primary Action Buttons (Linktree Tactile Pill Buttons) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/quiz"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#002D72] hover:bg-[#001C48] text-white text-base font-black rounded-full shadow-xl shadow-[#002D72]/20 hover:scale-[1.03] active:scale-[0.98] transition-all border border-[#002D72]"
                >
                  <Sparkles className="w-5 h-5 text-[#FFB81C]" />
                  <span>Start 3-Minute Quiz</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-bold shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Eye className="w-4 h-4 text-[#002D72]" />
                  <span>See How It Works</span>
                </a>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Deterministic 6-Factor Model</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Competitor Gap Diagnosis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive AI Chat Follow-up</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D FLOATING DEVICE MOCKUP (Linktree Signature Visual) */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
              {/* Backlight Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#002D72]/15 via-[#FFB81C]/20 to-emerald-400/10 blur-3xl rounded-[3rem] -z-10" />

              {/* 3D Tilted Perspective Phone Mockup */}
              <div
                className="w-full max-w-[340px] sm:max-w-[360px] bg-slate-950 rounded-[3rem] p-3.5 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900/40 transition-transform duration-700 ease-out hover:rotate-0 hover:scale-105"
                style={{
                  transform: "perspective(1200px) rotateY(-6deg) rotateX(4deg) rotate(-2deg)",
                }}
              >
                {/* Dynamic Island / Notch */}
                <div className="w-28 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Simulated Phone Screen Canvas (Clean Linktree Profile) */}
                <div className="bg-[#F8F9FA] rounded-[2.5rem] p-5 space-y-4 text-center border border-slate-200/80 overflow-hidden shadow-inner">
                  
                  {/* Profile Header */}
                  <div className="space-y-2 pt-1">
                    <div className="relative w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-[#002D72] shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/davide-cacciuottolo.jpg"
                        alt="Davide Cacciuottolo - Platform Match"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1.5">
                        <h3 className="font-black text-slate-950 text-sm">Pace Marketing Lab</h3>
                        <span className="w-4 h-4 rounded-full bg-[#002D72] text-white flex items-center justify-center text-[9px] font-black">
                          ✓
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-500 mt-0.5">
                        @platform_match • Lubin School of Business
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium px-2 leading-relaxed">
                      AI Social Recommendation Engine &amp; 30-Day Growth Diagnostic for Founders.
                    </p>
                  </div>

                  {/* Simulated Linktree-Style Pill Links Stack */}
                  <div className="space-y-2.5 pt-1 text-left">
                    
                    {/* Link 1: Instagram (Primary Engine 96%) */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
                          <SocialIcon platform="instagram" size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-900 group-hover:text-[#002D72] transition-colors">
                            Instagram Reels
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">
                            #1 Primary Growth Engine
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-black text-xs border border-emerald-200">
                        96%
                      </span>
                    </div>

                    {/* Link 2: TikTok (Synergy 89%) */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shadow-sm">
                          <SocialIcon platform="tiktok" size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-900 group-hover:text-[#002D72] transition-colors">
                            TikTok Syndication
                          </div>
                          <span className="text-[10px] font-bold text-sky-600">
                            #2 Secondary Reach Engine
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-black text-xs border border-sky-200">
                        89%
                      </span>
                    </div>

                    {/* Link 3: LinkedIn (B2B Intent 84%) */}
                    <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shadow-sm">
                          <SocialIcon platform="linkedin" size={16} className="text-white" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-900 group-hover:text-[#002D72] transition-colors">
                            LinkedIn B2B
                          </div>
                          <span className="text-[10px] font-bold text-indigo-600">
                            Professional Authority
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-black text-xs border border-indigo-200">
                        84%
                      </span>
                    </div>

                    {/* Link 4: Unlock 30-Day Growth Roadmap CTA */}
                    <Link
                      href="/quiz"
                      className="block p-3 rounded-2xl bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] shadow-md transition-all text-center font-black text-xs uppercase tracking-wider"
                    >
                      🚀 Take The 3-Min Quiz →
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-bold flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>6/6 Networks Evaluated Deterministically</span>
                  </div>
                </div>
              </div>

              {/* Floating 3D Pill Top-Left: Competitor Intel */}
              <div className="hidden sm:flex items-center gap-2.5 p-3 pr-4 rounded-full bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md absolute -top-4 -left-6 animate-float-slow text-xs">
                <div className="w-7 h-7 rounded-full bg-[#FFB81C]/25 text-[#966300] flex items-center justify-center flex-shrink-0 font-black">
                  <Swords className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    Competitor Intel
                  </span>
                  <span className="font-bold text-slate-900">Uncover Organic Gaps</span>
                </div>
              </div>

              {/* Floating 3D Pill Bottom-Right: 30-Day Roadmap */}
              <div className="hidden sm:flex items-center gap-2.5 p-3 pr-4 rounded-full bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md absolute -bottom-4 -right-6 animate-float-reverse text-xs">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-black">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    30-Day Roadmap
                  </span>
                  <span className="font-bold text-slate-900">Weekly Schedule &amp; Hooks</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          BENCHMARK NUMBERS BANNER (Linktree Style Pill Metrics)
          ===================================================================== */}
      <section className="py-12 bg-white border-y border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#002D72]">
                6 Networks
              </div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                Cross-Examined Simultaneously
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900">
                6 Dimensions
              </div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                Deterministic Weighting Matrix
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600">
                100% Free
              </div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                Zero Gating &amp; Instant Output
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#966300]">
                &lt; 3 Minutes
              </div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                From Questions to Full Strategy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          HOW IT WORKS (Linktree Stepper in Bento Grid)
          ===================================================================== */}
      <section id="how-it-works" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-3.5 py-1.5 rounded-full border border-[#002D72]/20">
            Methodology &amp; Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            How Platform Match Operates
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Most businesses pick platforms based on whatever app is currently hyped. We replace guesswork with empirical channel-market fit.
          </p>
        </div>

        {/* 3 Step Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          
          {/* Step 1 */}
          <div className="bg-white rounded-[2.2rem] border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 p-8 space-y-5 flex flex-col justify-between group hover:-translate-y-1.5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-[#002D72] text-white font-black text-sm flex items-center justify-center shadow-md">
                  01
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  2 Minutes
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-950 group-hover:text-[#002D72] transition-colors">
                Share Business Constraints
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Answer 6 clear multiple-choice questions regarding your core target audience, monthly marketing goal, industry vertical, content superpowers, and realistic weekly time budget.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#002D72]">
              <span>6 focused questions</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-[2.2rem] border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 p-8 space-y-5 flex flex-col justify-between group hover:-translate-y-1.5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-[#FFB81C] text-[#001C48] font-black text-sm flex items-center justify-center shadow-md">
                  02
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Real-time
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-950 group-hover:text-[#002D72] transition-colors">
                Algorithmic Cross-Scoring
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our engine compares your profile against the active algorithmic mechanics of Instagram, TikTok, LinkedIn, YouTube, Facebook, and Pinterest to calculate accurate compatibility percentages.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#966300]">
              <span>Deterministic mathematical weights</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-[2.2rem] border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 p-8 space-y-5 flex flex-col justify-between group hover:-translate-y-1.5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                  03
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Execution
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-950 group-hover:text-[#002D72] transition-colors">
                Receive 30-Day Growth Plan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Walk away with your #1 Primary Channel, #2 Syndication Channel, tailored content pillars, proven video hook concepts, and competitor landscape intelligence ready to execute on Monday.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <span>Actionable roadmap in hand</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          FEATURE SPOTLIGHT: Real Human Lab Research (With Photo)
          ===================================================================== */}
      <section className="py-16 bg-[#F3F4F6] border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Photo Showcase */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[340px] overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pace-hero-collab.jpg"
                alt="Pace University Digital Marketing & Strategy Lab"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#FFB81C] text-[#001C48] font-black text-[10px] uppercase tracking-wider">
                    Lubin School of Business NYC
                  </span>
                  <p className="text-sm font-bold">
                    Pace Marketing Lab Research Headquarters
                  </p>
                  <p className="text-xs text-slate-300">
                    One Pace Plaza, Financial District, Manhattan
                  </p>
                </div>
              </div>
            </div>

            {/* Right Copy & Research Values */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-3 py-1 rounded-full border border-[#002D72]/20">
                  Academic Rigor &bull; Real-World Testing
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Built by Student Researchers, Grounded in Real Market Data
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Unlike generic AI tools that hallucinate advice without context, Platform Match was engineered at Pace University&apos;s Lubin School of Business to solve the real bottleneck facing emerging brands: wasted marketing production time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#002D72] font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Empirical Testing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evaluated across actual small business social campaigns in New York City.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#002D72] font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Anti-Burnout Cadence</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Recommendations are hard-capped to match your team&apos;s genuine bandwidth.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs sm:text-sm font-black shadow-md transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-[#FFB81C]" />
                  <span>Run Free Diagnostic Now</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          THE 6 EVALUATED PLATFORMS (Linktree-Style Visual Showcase)
          ===================================================================== */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-sky-800 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
            Network Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            The 6 Evaluated Platforms
          </h2>
          <p className="text-slate-600 text-sm">
            Each platform operates under distinct algorithmic distribution patterns and audience buyer states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_PLATFORM_IDS.map((id) => {
            const data = PLATFORMS_DATA[id];
            return (
              <div
                key={id}
                className="bg-white rounded-[2rem] p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Top Colored Brand Strip */}
                <div
                  className="absolute inset-x-0 top-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: data.brandColor }}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md text-white group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: data.brandColor }}
                      >
                        <SocialIcon platform={id} size={22} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-950 text-base group-hover:text-[#002D72] transition-colors">
                          {data.name}
                        </h3>
                        <span className="text-xs text-slate-500 font-bold">
                          {data.primaryDemographics.split("(")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {data.tagline}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Key Formats
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {data.coreFormats.slice(0, 2).map((fmt) => (
                          <span
                            key={fmt}
                            className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Ideal For
                      </span>
                      <p className="text-slate-800 text-xs font-semibold line-clamp-1 mt-0.5">
                        {data.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002D72] group-hover:text-[#001C48]">
                  <span>Analyze in Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#002D72] hover:bg-[#001C48] text-white text-sm font-black rounded-full shadow-lg shadow-[#002D72]/15 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#FFB81C]" />
            <span>Discover Your Highest Match</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </section>

      {/* =====================================================================
          SCORING MATRIX TRANSPARENCY (Deterministic Weights)
          ===================================================================== */}
      <section className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Deterministic Weights
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Our 6-Factor Scoring Formula
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              We never return arbitrary scores. Every match percentage is computed using our agency-tested weighting matrix combining platform demographics with your team&apos;s realistic execution capacity.
            </p>
          </div>

          <div className="bg-[#FAF9F6] rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-3xl font-black text-[#002D72]">
                  {SCORING_WEIGHTS.audience * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900">Target Audience</div>
                <div className="text-[11px] text-slate-500 font-medium">Age, role & buyer mindset</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-3xl font-black text-[#0A4694]">
                  {SCORING_WEIGHTS.goal * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900">Core Goal</div>
                <div className="text-[11px] text-slate-500 font-medium">Leads, sales, reach or community</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-3xl font-black text-[#966300]">
                  {SCORING_WEIGHTS.industry * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900">Industry Vertical</div>
                <div className="text-[11px] text-slate-500 font-medium">B2B, tech, local, e-commerce</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-3xl font-black text-purple-700">
                  {SCORING_WEIGHTS.content * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900">Content Strengths</div>
                <div className="text-[11px] text-slate-500 font-medium">Short video, copy, photo carousels</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-3xl font-black text-rose-600">
                  {SCORING_WEIGHTS.personality * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900">Brand Voice</div>
                <div className="text-[11px] text-slate-500 font-medium">Fun, educational, polished, corporate</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-3xl font-black text-emerald-600">
                  {SCORING_WEIGHTS.time * 100}%
                </div>
                <div className="text-xs font-bold text-slate-900">Team Capacity</div>
                <div className="text-[11px] text-slate-500 font-medium">Sustainable weekly hours limit</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-[#002D72] flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-[#002D72]" />
                Tie-Breaking Protocol:
              </div>
              <p className="leading-relaxed text-slate-600">
                If two networks tie in overall weighted points, our algorithm prioritizes{" "}
                <strong className="text-slate-900">Goal Alignment</strong> first, followed by{" "}
                <strong className="text-slate-900">Audience Density</strong>, ensuring you never invest in a channel where prospects aren&apos;t actively making decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FINAL LINKTREE CALL-TO-ACTION CARD
          ===================================================================== */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="p-10 sm:p-16 rounded-[3rem] bg-[#002D72] text-white shadow-2xl space-y-7 relative overflow-hidden">
          {/* Linktree Top Accent Strip */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#FFB81C] via-white to-[#FFB81C]" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB81C]" />
            <span>Fast, Free, &amp; Ungated</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-2xl mx-auto">
            Ready to find where your brand truly converts?
          </h2>
          
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Answer 6 simple multiple-choice questions to receive your compatibility report, competitor benchmark, and actionable 30-day roadmap in 180 seconds.
          </p>

          <div className="pt-3">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] text-base font-black rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-[#001C48]" />
              <span>Start 3-Minute Quiz</span>
              <ArrowRight className="w-5 h-5 text-[#001C48]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
