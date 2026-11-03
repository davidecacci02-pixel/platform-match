import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  TrendingUp,
  Zap,
  BarChart3,
  GraduationCap,
  Users,
  Lightbulb,
  Search,
  Video,
  MousePointerClick,
  Share2,
  Building2,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  Instagram,
  Mail,
  Layers,
  Sliders,
  Target,
} from "lucide-react";
import { AgencyContactForm } from "@/components/AgencyContactForm";
import { SocialIcon } from "@/components/SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Pace Digital Marketing Lab | Digital Marketing Help for NYC Small Businesses",
  },
  description:
    "Student-led digital marketing lab at Pace University helping NYC small businesses grow. Free marketing services, student-run projects, and our Platform Match tool.",
};

export default function LabHomePage() {
  const services = [
    {
      id: "social-media",
      icon: Share2,
      title: "Social Media Audit & Strategy",
      tagline: "Channel Prioritization & Cadence",
      description:
        "We audit your current social channels and target customer demographics. Our student researchers help you prioritize the top platforms where your buyers actually spend time, eliminating wasted effort.",
      deliverables: [
        "Social footprint & competitor audit",
        "Realistic weekly posting calendar",
        "Target audience profile & content themes",
      ],
      badge: "Organic Reach",
    },
    {
      id: "content-creation",
      icon: Video,
      title: "Short-Form Video & Visual Content",
      tagline: "Reels, TikTok Concepts & Carousels",
      description:
        "Relatable, engaging short-form video ideas, hooks, and clean visual carousels created with student energy. We focus on authentic storytelling that builds trust with neighborhood customers without high production budgets.",
      deliverables: [
        "Hook scripts for Instagram Reels & TikTok",
        "Clean Canva-ready visual templates",
        "Repurposing guidelines for multiple channels",
      ],
      badge: "Creative Lab",
    },
    {
      id: "seo-ai-search",
      icon: Search,
      title: "Google Business Profile & Local Search",
      tagline: "Local Storefront Discovery on Google Maps",
      description:
        "Help local customers find and trust your business when searching nearby. We set up, optimize, and organize your Google Business Profile, photos, service categories, and local neighborhood search keywords.",
      deliverables: [
        "Google Business Profile audit & optimization",
        "Local keyword & category targeting checklist",
        "Customer review response guidelines",
      ],
      badge: "Local Search",
    },
    {
      id: "digital-advertising",
      icon: MousePointerClick,
      title: "Social Media Advertising Setup",
      tagline: "Budget-Conscious Meta & LinkedIn Ads",
      description:
        "Simple, targeted paid campaigns tailored for small business budgets ($5–$20/day). We configure local geographic radiuses, write clear promotional copy, and help you generate genuine customer inquiries.",
      deliverables: [
        "Local geographic & interest audience setup",
        "Promotional ad copy & image variations",
        "Budget pacing & conversion tracking guidance",
      ],
      badge: "Paid Growth",
    },
    {
      id: "marketing-analytics",
      icon: BarChart3,
      title: "Marketing Analytics & Reporting",
      tagline: "Clear Monthly Traffic & Growth Reports",
      description:
        "Understand what is actually working without drowning in complex data. We set up Google Analytics 4 and deliver a straightforward, 1-page monthly summary report in plain English.",
      deliverables: [
        "Google Analytics 4 setup & tracking verification",
        "1-page executive monthly performance summary",
        "Actionable next-month recommendations",
      ],
      badge: "Analytics",
    },
    {
      id: "platform-match-service",
      icon: Compass,
      title: "Platform Match (Lab Tool)",
      tagline: "Interactive 3-Minute Strategic Channel Fit",
      description:
        "Our lab's signature diagnostic tool. Complete a 3-minute assessment to discover your top-ranked social platform fit, competitor category benchmarks, and actionable strategic positioning.",
      deliverables: [
        "Multi-factor compatibility scores",
        "Competitor category benchmarks",
        "Competitor gap & whitespace analysis",
      ],
      badge: "Signature Tool",
      isFlagship: true,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-[#002D72] selection:text-white relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#002D72]/[0.06] via-[#FFB81C]/[0.08] to-transparent blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[1200px] right-[-100px] w-[500px] h-[400px] bg-gradient-to-br from-[#002D72]/[0.05] to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* =========================================================================
          1. HERO SECTION: "Helping Small Businesses Grow in the Digital World"
          ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/80 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Top Bar Announcement Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 shadow-sm text-xs font-extrabold text-slate-800 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB81C] animate-pulse" />
              <span className="text-[#002D72] uppercase tracking-wider">Pace University</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">Lubin School of Business</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#002D72]">NYC Student Lab</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/platform_match"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#002D72] transition-colors px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-[#FFB81C]" />
                <span>@platform_match</span>
              </a>

              <Link
                href="/platform-match"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#002D72] hover:text-[#001C48] transition-colors px-4 py-1.5 rounded-full bg-[#FFB81C]/20 border border-[#FFB81C]/40 shadow-sm hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#001C48]" />
                <span>Try Platform Match Tool →</span>
              </Link>
            </div>
          </div>

          {/* Master Headline */}
          <div className="space-y-6 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08] font-sans">
              Helping Small Businesses{" "}
              <span className="block mt-1 text-[#002D72] underline decoration-[#FFB81C] decoration-[6px] underline-offset-8">
                Grow in the Digital World
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Based at Pace University’s Lubin School of Business in Downtown Manhattan. We are a student-led digital marketing and research lab empowering NYC small businesses through research-backed marketing strategies, hands-on student projects, and practical planning tools.
            </p>
          </div>

          {/* Action Navigation Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-[#002D72]/20 hover:scale-[1.02] transition-all"
            >
              <Share2 className="w-4 h-4 text-[#FFB81C]" />
              <span>Explore Marketing Services</span>
            </a>

            <Link
              href="/platform-match"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] text-xs sm:text-sm font-black border border-[#E5A417] shadow-sm hover:scale-[1.02] transition-all"
            >
              <Compass className="w-4 h-4 text-[#001C48]" />
              <span>Try Platform Match Tool</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition-all"
            >
              <Users className="w-4 h-4 text-[#002D72]" />
              <span>Meet the Student Team</span>
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold border border-slate-300 shadow-sm transition-all"
            >
              <Mail className="w-4 h-4 text-[#002D72]" />
              <span>Get a Free Review</span>
            </a>
          </div>

          {/* High-Impact Hero Showcase: Pace Students Collaborating */}
          <div className="relative pt-6 max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <Image
                src="/images/pace-hero-collab.jpg"
                alt="Pace Digital Marketing Lab student researchers collaborating on marketing strategies in Downtown Manhattan"
                width={1920}
                height={1080}
                priority
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Gradient Vignette Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001C48]/95 via-[#001C48]/30 to-transparent" />

              {/* Floating Overlay Information Badges */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
                <div className="space-y-2 max-w-lg">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold text-[#FFB81C] border border-white/30">
                    <GraduationCap className="w-4 h-4 text-[#FFB81C]" />
                    <span>One Pace Plaza • Downtown Manhattan, NYC</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Pace Digital Marketing Lab
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    Lubin School of Business students analyzing real small business social footprints and building custom conversion roadmaps.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com/platform_match"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4 text-[#FFB81C]" />
                    <span>@platform_match</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0" />
                <span>Research-Backed Empirical Frameworks</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0" />
                <span>Tailored for Small Businesses &amp; Nonprofits</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0" />
                <span>Student Energy, Faculty-Mentored Rigor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LAB MISSION: Academic Heritage & Bridging Academic Rigor
          ========================================================================= */}
      <section id="mission" className="py-24 bg-[#FAF9F6] border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002D72]/10 border border-[#002D72]/20 text-[#002D72] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Lab Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Bridging Academic Rigor with Real-World Growth
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based at Pace University’s Lubin School of Business in Downtown Manhattan, the <strong className="text-slate-900 font-semibold">Pace Digital Marketing Lab</strong> was created with a clear mission: to empower local small businesses and non-profit organizations with creative, data-backed marketing strategies and practical planning tools.
            </p>
          </div>

          {/* 4 Pillars Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Student-Driven Perspectives</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                As digital natives, our student team understands modern platforms, short-form video hooks, and cultural trends intuitively.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Academic Rigor &amp; Oversight</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every strategy is grounded in consumer behavior, empirical research frameworks, and guided by marketing faculty at Pace University.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Small Business Focus</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We design realistic, low-overhead plans for lean teams that have tight budgets and limited weekly hours—no bloated retainers.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Modern Tools &amp; Software</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We combine industry-standard analytics tools with proprietary software developed in our lab, such as Platform Match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OUR MARKETING SERVICES (#services)
          ========================================================================= */}
      <section id="services" className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-4 py-1.5 rounded-full border border-[#002D72]/20">
              Lab Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Our Marketing Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Practical, high-leverage marketing capabilities designed to help small businesses attract customers, generate inquiries, and build community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className={`bg-white rounded-[2.2rem] p-8 border ${
                    svc.isFlagship
                      ? "border-[#002D72] shadow-xl ring-2 ring-[#002D72]/10"
                      : "border-slate-200 shadow-sm hover:border-[#002D72]/40"
                  } transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 relative overflow-hidden`}
                >
                  {svc.isFlagship && (
                    <div className="absolute top-0 right-0">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-bl-2xl bg-[#002D72] text-[#FFB81C] font-extrabold text-[10px] tracking-wider uppercase shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Signature Tool
                      </span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="w-14 h-14 rounded-full bg-[#002D72]/10 text-[#002D72] border border-[#002D72]/20 flex items-center justify-center group-hover:bg-[#002D72] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-slate-950 group-hover:text-[#002D72] transition-colors">
                        {svc.title}
                      </h3>
                      <span className="text-xs text-slate-500 font-bold block mt-1">
                        {svc.tagline}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {svc.description}
                    </p>

                    <div className="pt-4 border-t border-slate-200/60 space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Key Deliverables
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {svc.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/60">
                    {svc.isFlagship ? (
                      <Link
                        href="/platform-match"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>Try Platform Match</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FFB81C]" />
                      </Link>
                    ) : (
                      <a
                        href="#contact"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
                      >
                        <span>Inquire about this service</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. MEET PLATFORM MATCH (Preview with clear "Try Platform Match" button)
          ========================================================================= */}
      <section id="platform-match-preview" className="py-24 bg-[#FAF9F6] border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-[3rem] bg-gradient-to-br from-[#002D72] to-[#001840] text-white shadow-2xl relative overflow-hidden border border-[#002D72]">
            {/* Ambient Background Ornamentation */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FFB81C]/15 to-transparent blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Left Column: Copy & Highlights */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-[#FFB81C] animate-pulse" />
                  <span className="text-[#FFB81C] font-black uppercase tracking-wider">
                    Signature Lab Diagnostic Tool
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white">100% Free</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    Meet Platform Match
                  </h2>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
                    Stop guessing where to post. Our lab’s free diagnostic quiz evaluates your business model, customer demographics, and weekly time budget across 6 major platforms in 3 minutes.
                  </p>
                </div>

                {/* 6 Evaluated Platforms Icons */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Evaluates 6 Major Social Networks:
                  </div>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                    {ALL_PLATFORM_IDS.map((pid) => {
                      const p = PLATFORMS_DATA[pid];
                      return (
                        <div
                          key={pid}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white font-medium"
                        >
                          <SocialIcon platform={pid} className="w-3.5 h-3.5" />
                          <span>{p.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Clear Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
                  <Link
                    href="/platform-match"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] text-sm font-black shadow-xl transition-all hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <span>Try Platform Match</span>
                    <ArrowRight className="w-4 h-4 text-[#001C48]" />
                  </Link>

                  <Link
                    href="/quiz"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold backdrop-blur-md transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="w-4 h-4 text-[#FFB81C]" />
                    <span>Take the 3-Minute Quiz</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Preview Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-7 text-slate-900 shadow-2xl border border-white/20 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-black text-xs">
                        PM
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900">Platform Match Report</div>
                        <div className="text-[10px] text-slate-500 font-medium">3-Minute Strategy Output</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Sample Result
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <SocialIcon platform="instagram" className="w-5 h-5 text-[#E4405F]" />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">Instagram</div>
                          <div className="text-[10px] text-slate-500">Primary Channel (Visual &amp; Local)</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#002D72]">94% Match</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <SocialIcon platform="tiktok" className="w-5 h-5 text-black" />
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">TikTok</div>
                          <div className="text-[10px] text-slate-500">Secondary Growth (Short-Form Reach)</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-700">86% Match</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#002D72]/5 border border-[#002D72]/15 text-[11px] text-slate-700 space-y-1">
                    <div className="font-extrabold text-[#002D72]">What You Receive:</div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Comprehensive 6-platform compatibility scores, competitor category benchmarks, and strategic brand positioning customized to your available team capacity.
                    </p>
                  </div>

                  <Link
                    href="/platform-match"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#002D72] text-xs font-bold transition-all"
                  >
                    <span>Learn how the scoring formula works</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHY WORK WITH OUR STUDENT LAB (#why-us)
          ========================================================================= */}
      <section id="why-us" className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-4 py-1.5 rounded-full border border-[#002D72]/20">
              The Pace Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Why Work With Our Student Lab
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We offer small businesses a collaborative, energetic partnership that combines student innovation with faculty-mentored academic rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="bg-[#FAF9F6] rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Student-Driven Perspectives</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We bring boundless energy, an innate understanding of viral mechanics, and fresh eyes unencumbered by outdated agency formulas. We treat your business like our premier portfolio showcase.
              </p>
            </div>

            <div className="bg-[#FAF9F6] rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Research-Based Marketing Science</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Grounded in university research, established marketing frameworks, and Lubin School of Business faculty mentorship. Every recommendation is rooted in verified strategic principles.
              </p>
            </div>

            <div className="bg-[#FAF9F6] rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Creativity Without Agency Overhead</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Traditional agencies charge high retainers for generic slide decks. As an academic lab, our focus is measurable learning, practical impact, and hands-on portfolio execution.
              </p>
            </div>

            <div className="bg-[#FAF9F6] rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Personalized Collaboration</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                You collaborate directly with motivated students and project leads dedicated to understanding your authentic story, neighborhood customer base, and core growth goals.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#002D72] hover:text-[#001C48] transition-colors px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm hover:shadow"
            >
              <Users className="w-4 h-4 text-[#002D72]" />
              <span>Meet the 6 Student Researchers on the Lab Team →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CONTACT SECTION (#contact)
          ========================================================================= */}
      <section id="contact" className="py-24 bg-[#FAF9F6] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-4 py-1.5 rounded-full border border-[#002D72]/20">
              Start The Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Ready to Accelerate Your Brand?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Send our student lab a message below. We will review your current online footprint, outline initial strategic insights, and schedule an introductory consultation.
            </p>
          </div>

          {/* Interactive Working Contact Form */}
          <AgencyContactForm />
        </div>
      </section>
    </div>
  );
}
