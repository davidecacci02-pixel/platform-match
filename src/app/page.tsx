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
  Plus,
} from "lucide-react";
import { AgencyContactForm } from "@/components/AgencyContactForm";
import { TeamCardStudio } from "@/components/TeamCardStudio";
import { SocialIcon } from "@/components/SocialIcon";
import { ALL_PLATFORM_IDS, PLATFORMS_DATA } from "@/lib/platforms";

export default function AgencyHomePage() {
  const services = [
    {
      id: "social-media",
      icon: Share2,
      title: "Social Media Strategy",
      tagline: "Channel Selection & Editorial Cadence",
      description:
        "We build organic social media roadmaps that eliminate wasted production hours. By diagnosing your audience demographics and buying intent, we pinpoint the exact channels where your message will resonate and convert.",
      deliverables: [
        "Channel-specific distribution strategy",
        "Weekly editorial cadence & batching schedules",
        "Audience persona & tone of voice guidelines",
      ],
      badge: "Organic Reach",
    },
    {
      id: "content-creation",
      icon: Video,
      title: "Content Creation",
      tagline: "Video Reels, Visuals & High-Impact Copy",
      description:
        "High-converting short-form video concepts, carousels, and visual storytelling tailored to social algorithms. Our student creators craft authentic, scroll-stopping hooks that build trust without feeling like corporate advertisements.",
      deliverables: [
        "Short-form video scripts & hook frameworks",
        "Educational carousel design templates",
        "Repurposing blueprints across secondary networks",
      ],
      badge: "Creative Lab",
    },
    {
      id: "seo-ai-search",
      icon: Search,
      title: "SEO & AI Search Optimization",
      tagline: "Google, Bing & Generative Engine Discovery",
      description:
        "Optimize your digital footprint for the modern search landscape—including Google Search and Generative AI engines like ChatGPT and Perplexity. We help local businesses and niche brands get found when customers seek answers.",
      deliverables: [
        "Local SEO & Google Business Profile tuning",
        "Search Intent & Keyword Strategy Map",
        "AI engine visibility & structured brand data",
      ],
      badge: "Search & AI",
    },
    {
      id: "digital-advertising",
      icon: MousePointerClick,
      title: "Digital Advertising (PPC)",
      tagline: "Targeted Ads on Meta, Google & LinkedIn",
      description:
        "Data-driven ad campaigns structured specifically for small business budgets. We focus on high-intent lead generation, hyper-targeted local geographies, and zero-wasted ad spend through meticulous split testing.",
      deliverables: [
        "Hyper-targeted audience segment design",
        "Ad creative copy & visual variations",
        "Budget pacing & conversion tracking setup",
      ],
      badge: "Paid Growth",
    },
    {
      id: "marketing-analytics",
      icon: BarChart3,
      title: "Marketing Analytics",
      tagline: "Real KPIs, Funnel Tracking & Honest Dashboards",
      description:
        "Transform raw web traffic and social impressions into actionable business intelligence. We audit Google Analytics 4, define meaningful North Star metrics, and cut through vanity metrics to measure real revenue drivers.",
      deliverables: [
        "Executive KPI dashboards in plain English",
        "Customer journey & drop-off analysis",
        "Actionable monthly performance recommendations",
      ],
      badge: "Analytics",
    },
    {
      id: "platform-match-service",
      icon: Compass,
      title: "Platform Match (Proprietary Tool)",
      tagline: "Interactive 3-Minute Strategic Channel Fit",
      description:
        "Our lab's flagship decision tool. Rather than guessing where to post, businesses complete a 3-minute diagnostic and receive an algorithmic compatibility score across 6 major networks, competitor intelligence, and a 30-day playbook.",
      deliverables: [
        "Multi-dimensional compatibility scores",
        "Archetype competitor landscape benchmark",
        "Custom 30-day roadmap with weekly cadence",
      ],
      badge: "Flagship Lab Tool",
      isFlagship: true,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-[#002D72] selection:text-white">
      {/* =========================================================================
          1. HERO SECTION (Linktree-Inspired Modern University Aesthetics)
          ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 overflow-hidden bg-white">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#002D72]/8 via-[#FFB81C]/10 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Linktree-Style Pill Institutional Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 shadow-sm text-xs font-extrabold text-slate-800 transition-all hover:scale-[1.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB81C] animate-pulse" />
              <span className="text-[#002D72] uppercase tracking-wider">Pace University</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">Lubin School of Business</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#002D72]">Digital Marketing Lab</span>
            </div>
          </div>

          {/* Master Headline & Subhead */}
          <div className="space-y-6 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[1.06] font-sans">
              Helping Small Businesses{" "}
              <span className="block mt-1 text-[#002D72]">
                Grow in the Digital World
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              A student-led digital marketing and research lab at Pace University in Downtown Manhattan.
              We bridge academic data science, modern AI tools, and creative digital storytelling to build
              predictable, high-converting growth for local businesses.
            </p>
          </div>

          {/* Linktree-Style Rounded-Full Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#002D72] hover:bg-[#001C48] text-white text-base font-extrabold rounded-full shadow-lg shadow-[#002D72]/20 hover:scale-[1.02] active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#002D72]"
            >
              <span>Explore Lab Services</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>

            <Link
              href="/platform-match"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFB81C] hover:bg-[#E5A417] border border-[#E5A417] text-[#001C48] text-base font-black shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-[#001C48]" />
              <span>Try Platform Match Engine</span>
            </Link>

            <Link
              href="#team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold border border-slate-200 transition-all hover:scale-[1.02]"
            >
              <Users className="w-4 h-4 text-[#002D72]" />
              <span>Meet the Team &amp; Create Card</span>
            </Link>
          </div>

          {/* High-Impact Hero Showcase: Pace Students Collaborating */}
          <div className="relative pt-6 max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <Image
                src="/images/pace-hero-collab.jpg"
                alt="Pace University Digital Marketing Lab students collaborating on marketing research in Downtown Manhattan"
                width={1920}
                height={1080}
                priority
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Gradient Vignette Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001C48]/95 via-[#001C48]/30 to-transparent" />

              {/* Floating Overlay Information Badges */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
                <div className="space-y-2 max-w-md">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-extrabold text-[#FFB81C] border border-white/30">
                    <GraduationCap className="w-4 h-4 text-[#FFB81C]" />
                    <span>One Pace Plaza • Downtown Manhattan, NYC</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    Pace University Digital Marketing Lab
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                    Lubin School of Business students analyzing real small business social footprints and building custom conversion roadmaps.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <div className="px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-right">
                    <span className="block text-xs font-black text-[#FFB81C] uppercase tracking-wider">
                      Empirical Framework
                    </span>
                    <span className="text-xs text-slate-100 font-semibold">
                      Data Science + Creative Strategy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linktree-Style Trust Strip */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-3 p-4 rounded-full bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0" />
                <span>Research-Backed Empirical Frameworks</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-full bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0" />
                <span>Tailored for Small Businesses &amp; Nonprofits</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-full bg-white border border-slate-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#002D72] flex-shrink-0" />
                <span>Student Energy, Faculty-Mentored Rigor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT US SECTION (Academic Heritage & 4 Linktree Bento Pillars)
          ========================================================================= */}
      <section id="about" className="py-24 bg-[#FAF9F6] border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002D72]/10 border border-[#002D72]/20 text-[#002D72] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Our Academic Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Bridging Academic Rigor with Real-World Growth
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based at Pace University’s Lubin School of Business in Downtown Manhattan, our student-led Digital
              Marketing Lab was created with a clear mission: <strong className="text-slate-900 font-semibold">to empower local small businesses and non-profit organizations with creative, data-backed marketing strategies</strong> that rival high-priced Madison Avenue agencies.
            </p>
          </div>

          {/* 4 About Pillars with Linktree-Style Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Student-Driven Perspectives</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                As digital natives, our student team lives on modern platforms. We understand short-form video hooks, algorithmic shifts, and cultural trends intuitively.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Academic Rigor &amp; Oversight</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every strategy is grounded in consumer psychology, empirical market research, and guided by experienced marketing faculty at Pace University.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Small Business Focus</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We design realistic, low-overhead plans for lean teams that have tight budgets and limited weekly hours—no bloated retainers or vanity promises.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-7 space-y-3.5 shadow-sm hover:shadow-xl hover:border-[#002D72]/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold shadow-md shadow-[#002D72]/10">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Modern AI &amp; Software Tools</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                We combine industry-leading platforms (Google Analytics, Meta Ads, SEMrush) with proprietary software developed in our lab, like Platform Match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MEET OUR TEAM & INTERACTIVE CARD STUDIO (User requested manual upload & cards)
          ========================================================================= */}
      <section id="team" className="py-24 bg-white border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB81C]/20 border border-[#FFB81C]/40 text-[#855B00] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#002D72]" />
              <span>Linktree-Style Team Studio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight font-sans">
              Meet Our Team &amp; Researchers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Esplora le card dei membri del lab oppure <strong className="text-slate-900 font-bold">aggiungi manualmente la tua foto</strong> per generare la tua card personalizzata con i tuoi link in stile Linktree!
            </p>
          </div>

          {/* Interactive Team Studio with Manual Upload and Live Card Creator */}
          <TeamCardStudio />
        </div>
      </section>

      {/* =========================================================================
          4. CORE LAB SERVICES (Linktree-Inspired Bento Cards)
          ========================================================================= */}
      <section id="services" className="py-24 bg-[#FAF9F6] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-4 py-1.5 rounded-full border border-[#002D72]/20">
              Lab Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Our Marketing Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Practical, high-leverage marketing capabilities designed to help small businesses attract customers, generate leads, and build lasting community.
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
                        Flagship Lab Tool
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

                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
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

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    {svc.isFlagship ? (
                      <Link
                        href="/platform-match"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
                      >
                        <span>Launch Platform Match Engine</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href="#contact"
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        <span>Inquire about this service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PLATFORM MATCH FEATURE SPOTLIGHT
          ========================================================================= */}
      <section id="platform-match-feature" className="py-24 bg-white border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Feature Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB81C]/20 border border-[#FFB81C]/40 text-[#855B00] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#002D72]" />
                <span>Proprietary Lab Technology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
                Meet Platform Match
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Most small businesses waste 15+ hours weekly posting on social media networks where their buyers never convert.
                Developed by our Pace marketing researchers, <strong className="text-slate-900 font-semibold">Platform Match</strong> uses a 6-dimension mathematical scoring algorithm to evaluate where your brand will achieve the highest organic return.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/platform-match"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#002D72] hover:bg-[#001C48] text-white font-extrabold text-sm rounded-full shadow-lg shadow-[#002D72]/20 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-[#FFB81C]" />
                <span>Find Your Platform Match</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Feature Preview Card with Linktree Bento Layout */}
          <div className="bg-[#FAF9F6] rounded-[2.5rem] p-7 sm:p-12 border border-slate-200 shadow-lg space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="p-7 rounded-[2rem] bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Interactive 3-Minute Quiz</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Answer 6 focused discovery questions about your audience, growth goals, content style, brand voice, and weekly capacity.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-7 rounded-[2rem] bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">Weighted Compatibility Matrix</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ranks Instagram, TikTok, LinkedIn, YouTube, Facebook, and Pinterest using a transparent mathematical weighting system.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-7 rounded-[2rem] bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">30-Day Growth Roadmap</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive actionable posting cadences, 3 tailored content pillars, competitor landscape intelligence, and practical KPI benchmarks.
                </p>
              </div>
            </div>

            {/* Quick 6 Platforms Pill List */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Evaluates 6 major distribution graphs:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {ALL_PLATFORM_IDS.map((id) => (
                  <div
                    key={id}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-sm"
                  >
                    <SocialIcon platform={id} size={15} />
                    <span>{PLATFORMS_DATA[id].name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY WORK WITH US SECTION
          ========================================================================= */}
      <section id="why-us" className="py-24 bg-[#FAF9F6] border-b border-slate-200/80">
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
            <div className="bg-white rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
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

            <div className="bg-white rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Research-Based Marketing Science</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Backed by university research databases, peer-reviewed marketing frameworks, and Lubin School of Business faculty oversight. No random guesswork—every recommendation is rooted in verified behavioral data.
              </p>
            </div>

            <div className="bg-white rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Creativity Without Agency Overhead</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Traditional marketing agencies bill $10,000/month retainers for generic slide decks. As an academic lab, our incentive is measurable client impact, real case studies, and hands-on portfolio execution.
              </p>
            </div>

            <div className="bg-white rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-950">Personalized, Hands-On Collaboration</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                You won&apos;t be handed off to an anonymous junior account manager. You collaborate directly with motivated students and project leads dedicated to understanding your authentic story and core goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CONTACT SECTION
          ========================================================================= */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002D72] bg-[#002D72]/10 px-4 py-1.5 rounded-full border border-[#002D72]/20">
              Start The Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Ready to Accelerate Your Brand?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
