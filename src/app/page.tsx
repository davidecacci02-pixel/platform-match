import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Layers,
  GraduationCap,
  Users2,
  Lightbulb,
  Search,
  Video,
  MousePointerClick,
  Share2,
  Building2,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AgencyContactForm } from "@/components/AgencyContactForm";
import { SocialIcon } from "@/components/SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";

export default function AgencyHomePage() {
  const services = [
    {
      id: "social-media",
      icon: Share2,
      accentColor: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-400",
      borderColor: "hover:border-purple-500/40",
      title: "Social Media Strategy",
      tagline: "Channel Selection & Editorial Cadence",
      description:
        "We build organic social media roadmaps that eliminate wasted production hours. By diagnosing your audience demographics and buying intent, we pinpoint the exact channels where your message will resonate and convert.",
      deliverables: [
        "Channel-specific distribution strategy",
        "Weekly editorial cadence & batching schedules",
        "Audience persona & tone of voice guidelines",
      ],
    },
    {
      id: "content-creation",
      icon: Video,
      accentColor: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-400",
      borderColor: "hover:border-pink-500/40",
      title: "Content Creation",
      tagline: "Video Reels, Visuals & High-Impact Copy",
      description:
        "High-converting short-form video concepts, carousels, and visual storytelling tailored to social algorithms. Our student creators craft authentic, scroll-stopping hooks that build trust without feeling like corporate advertisements.",
      deliverables: [
        "Short-form video scripts & hook frameworks",
        "Educational carousel design templates",
        "Repurposing blueprints across secondary networks",
      ],
    },
    {
      id: "seo-ai-search",
      icon: Search,
      accentColor: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/40",
      title: "SEO & AI Search Optimization",
      tagline: "Google, Bing & Generative Engine Discovery",
      description:
        "Optimize your digital footprint for the modern search landscape—including Google Search and Generative AI engines like ChatGPT and Perplexity. We help local businesses and niche brands get found when customers seek answers.",
      deliverables: [
        "Local SEO & Google Business Profile tuning",
        "Search Intent & Keyword Strategy Map",
        "AI engine visibility & structured brand data",
      ],
    },
    {
      id: "digital-advertising",
      icon: MousePointerClick,
      accentColor: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
      borderColor: "hover:border-amber-500/40",
      title: "Digital Advertising (PPC)",
      tagline: "Targeted Ads on Meta, Google & LinkedIn",
      description:
        "Data-driven ad campaigns structured specifically for small business budgets. We focus on high-intent lead generation, hyper-targeted local geographies, and zero-wasted ad spend through meticulous split testing.",
      deliverables: [
        "Hyper-targeted audience segment design",
        "Ad creative copy & visual variations",
        "Budget pacing & conversion tracking setup",
      ],
    },
    {
      id: "marketing-analytics",
      icon: BarChart3,
      accentColor: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/40",
      title: "Marketing Analytics",
      tagline: "Real KPIs, Funnel Tracking & Honest Dashboards",
      description:
        "Transform raw web traffic and social impressions into actionable business intelligence. We audit Google Analytics 4, define meaningful North Star metrics, and cut through vanity metrics to measure real revenue drivers.",
      deliverables: [
        "Executive KPI dashboards in plain English",
        "Customer journey & drop-off analysis",
        "Actionable monthly performance recommendations",
      ],
    },
    {
      id: "platform-match-service",
      icon: Compass,
      accentColor: "from-brand-500/20 to-indigo-500/20",
      iconColor: "text-brand-400",
      borderColor: "hover:border-brand-500/50",
      title: "Platform Match (Proprietary Tool)",
      tagline: "Interactive 3-Minute Strategic Channel Fit",
      description:
        "Our lab's flagship decision tool. Rather than guessing where to post, businesses complete a 3-minute diagnostic and receive an algorithmic compatibility score across 6 major networks, competitor intelligence, and a 30-day playbook.",
      deliverables: [
        "Multi-dimensional compatibility scores",
        "Archetype competitor landscape benchmark",
        "Custom 30-day roadmap with weekly cadence",
      ],
      isFlagship: true,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#080B11] text-white selection:bg-brand-500 selection:text-white relative overflow-hidden">
      {/* Subtle Ambient Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-brand-600/15 via-indigo-600/10 to-transparent blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-96 right-10 w-[500px] h-[400px] bg-gradient-to-br from-cyan-500/10 to-transparent blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-300 shadow-sm hover:border-brand-500/30 transition-colors">
            <GraduationCap className="w-4 h-4 text-brand-400" />
            <span className="text-white font-semibold">Pace University</span>
            <span className="text-white/20">•</span>
            <span className="text-slate-300">Lubin School of Business</span>
            <span className="text-white/20">•</span>
            <span className="text-brand-300 font-medium">Digital Marketing Lab</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Helping Small Businesses{" "}
              <span className="block mt-1 bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Grow in the Digital World
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              We are a student-led digital marketing lab at Pace University in New York City. We bridge cutting-edge academic
              research, modern AI tools, and creative digital strategies to help small businesses and nonprofits build
              predictable, sustainable growth.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 text-base font-bold rounded-2xl shadow-lg shadow-white/10 hover:scale-[1.02] active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/20"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              href="/platform-match"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-300 hover:text-white text-sm sm:text-base font-bold transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Try Platform Match</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Research-Backed Strategies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tailored for Small Businesses &amp; Nonprofits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Student Energy, Faculty-Mentored Rigor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-20 border-t border-white/[0.08] bg-white/[0.015] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider">
              <Users2 className="w-3.5 h-3.5" />
              <span>About Our Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Bridging Academic Research with Real-World Growth
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Based at Pace University’s Lubin School of Business in Downtown Manhattan, our student-led Digital
              Marketing Lab was created with a clear mission: <strong className="text-white font-semibold">empower local small businesses and nonprofit organizations with creative, data-backed marketing strategies</strong> that rival high-priced Madison Avenue agencies.
            </p>
          </div>

          {/* 4 About Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0D121F]/80 border border-white/[0.08] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center font-bold">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Student-Driven Perspectives</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                As digital natives, our student team lives on modern platforms. We understand short-form video hooks, algorithmic shifts, and cultural trends intuitively.
              </p>
            </div>

            <div className="bg-[#0D121F]/80 border border-white/[0.08] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Academic Rigor &amp; Faculty Mentorship</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Every strategy is grounded in consumer psychology, empirical market research, and guided by experienced marketing faculty at Pace University.
              </p>
            </div>

            <div className="bg-[#0D121F]/80 border border-white/[0.08] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Small Business &amp; Nonprofit Focus</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We design realistic, low-overhead plans for lean teams that have tight budgets and limited weekly hours—no bloated retainers or vanity promises.
              </p>
            </div>

            <div className="bg-[#0D121F]/80 border border-white/[0.08] rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Modern AI &amp; Software Tools</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We combine industry-leading platforms (Google Analytics, Meta Ads, SEMrush) with proprietary software developed right here in our lab, like Platform Match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES SECTION */}
      <section id="services" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-14">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Marketing Services
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Practical, high-leverage marketing capabilities designed to help small businesses attract customers, generate leads, and build lasting community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className={`bg-[#0D121F]/90 rounded-2xl p-6 sm:p-7 border ${
                  svc.isFlagship ? "border-brand-500/50 shadow-brand-500/10" : "border-white/[0.08]"
                } ${svc.borderColor} shadow-xl shadow-black/20 transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden`}
              >
                {svc.isFlagship && (
                  <div className="absolute top-0 right-0">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-bl-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-[10px] tracking-wider uppercase">
                      <Sparkles className="w-3 h-3" />
                      Lab Tool
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className={`w-6 h-6 ${svc.iconColor}`} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                      {svc.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium block mt-0.5">
                      {svc.tagline}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {svc.description}
                  </p>

                  <div className="pt-3 border-t border-white/[0.08] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Key Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {svc.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/[0.08]">
                  {svc.isFlagship ? (
                    <Link
                      href="/platform-match"
                      className="inline-flex items-center gap-2 text-xs font-bold text-brand-300 hover:text-white transition-colors"
                    >
                      <span>Launch Platform Match Engine</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                      <span>Inquire about this service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PLATFORM MATCH FEATURE SPOTLIGHT */}
      <section id="platform-match-feature" className="py-20 border-t border-white/[0.08] bg-gradient-to-b from-brand-950/20 via-[#080B11] to-[#080B11] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Feature Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Proprietary Lab Technology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Meet Platform Match
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Most small businesses waste 15+ hours weekly posting on social media networks where their buyers never convert.
                Developed by the Pace Digital Marketing Lab, <strong className="text-white font-semibold">Platform Match</strong> uses a 6-dimension mathematical scoring algorithm to evaluate where your brand will achieve the highest organic return.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/platform-match"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-white/10 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Find Your Platform Match</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>

          {/* Feature Preview Card */}
          <div className="bg-[#0D121F] rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">Interactive 3-Minute Quiz</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Answer 6 focused discovery questions about your audience, growth goals, content style, brand voice, and weekly capacity.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">Weighted Compatibility Matrix</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ranks Instagram, TikTok, LinkedIn, YouTube, Facebook, and Pinterest using a transparent mathematical weighting system.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base">30-Day Growth Roadmap</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Receive actionable posting cadences, 3 tailored content pillars, competitor landscape intelligence, and practical KPI benchmarks.
                </p>
              </div>
            </div>

            {/* Quick 6 Platforms Pill List */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Evaluates 6 major distribution graphs:
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {ALL_PLATFORM_IDS.map((id) => (
                  <div
                    key={id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-slate-300"
                  >
                    <SocialIcon platform={id} size={14} className="text-white" />
                    <span>{PLATFORMS_DATA[id].name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY WORK WITH US SECTION */}
      <section id="why-us" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-14">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            The Pace Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Why Work With Us
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We offer small businesses a collaborative, energetic partnership that combines student innovation with professional rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0D121F] rounded-2xl p-7 border border-white/[0.08] space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center font-bold">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Student-Driven Perspectives</h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We bring boundless energy, an innate understanding of viral mechanics, and fresh eyes unencumbered by outdated agency formulas. We treat your business like our premier portfolio showcase.
            </p>
          </div>

          <div className="bg-[#0D121F] rounded-2xl p-7 border border-white/[0.08] space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Research-Based Marketing Science</h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Backed by university research databases, peer-reviewed marketing frameworks, and Lubin School of Business faculty oversight. No random guesswork—every recommendation is rooted in verified behavioral data.
            </p>
          </div>

          <div className="bg-[#0D121F] rounded-2xl p-7 border border-white/[0.08] space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Creativity Without Agency Overhead</h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Traditional marketing agencies bill $10,000/month retainers for generic slide decks. As a student lab, our incentive is measurable impact, real client case studies, and hands-on portfolio execution.
            </p>
          </div>

          <div className="bg-[#0D121F] rounded-2xl p-7 border border-white/[0.08] space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Personalized, Hands-On Collaboration</h3>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              You won&apos;t be handed off to an anonymous junior account manager. You collaborate directly with motivated students and project leads dedicated to understanding your authentic story and core goals.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-20 border-t border-white/[0.08] bg-white/[0.015] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              Start The Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Brand?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Send our student lab a message below. We will review your current presence, outline initial strategic insights, and schedule an introductory consultation.
            </p>
          </div>

          {/* Interactive Working Contact Form */}
          <AgencyContactForm />
        </div>
      </section>
    </div>
  );
}
