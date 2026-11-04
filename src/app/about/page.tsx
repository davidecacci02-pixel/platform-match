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
  GraduationCap,
  Users,
  Lightbulb,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Instagram,
  ArrowLeft,
  Mail,
  Award,
  BookOpen,
} from "lucide-react";
import { TeamCardStudio } from "@/components/TeamCardStudio";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "About Us | Pace Digital Marketing Lab",
  },
  description:
    "Meet the student team behind the Pace Digital Marketing Lab at Lubin School of Business. Six students helping NYC small businesses succeed online.",
};

export default function AboutUsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#FAF9F6] text-slate-900 selection:bg-[#002D72] selection:text-white">
      {/* =========================================================================
          1. ABOUT HEADER & BREADCRUMB
          ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-20 border-b border-slate-200/80 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb / Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#002D72] transition-colors px-4 py-2 rounded-full bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#002D72]" />
              <span>Back to Lab Home</span>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/platform_match"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#002D72] transition-colors px-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-[#FFB81C]" />
                <span>@platform_match</span>
              </a>

              <Link
                href="/platform-match"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#002D72] hover:text-[#001C48] transition-colors px-4 py-2 rounded-full bg-[#FFB81C]/20 border border-[#FFB81C]/40 shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-[#001C48]" />
                <span>Platform Match Tool →</span>
              </Link>
            </div>
          </div>

          {/* Institutional Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 shadow-sm text-xs font-extrabold text-slate-800 transition-all hover:scale-[1.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB81C] animate-pulse" />
              <span className="text-[#002D72] uppercase tracking-wider">Pace University</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">Lubin School of Business</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#002D72]">Pace Digital Marketing Lab</span>
            </div>
          </div>

          {/* Master Headline */}
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] font-sans">
              About Our Lab &amp;{" "}
              <span className="block mt-1 text-[#002D72] underline decoration-[#FFB81C] decoration-[6px] underline-offset-8">
                Student Research Team
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Based at Pace University’s Lubin School of Business in Downtown Manhattan. We are six undergraduate and graduate students developing student decision frameworks, consumer behavior analysis, and channel-market fit modeling for MAR649 to help small businesses thrive online.
            </p>
          </div>

          {/* Navigation Action Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#team"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs sm:text-sm font-extrabold shadow-md hover:scale-[1.02] transition-all"
            >
              <Users className="w-4 h-4 text-[#FFB81C]" />
              <span>Meet the 6 Researchers</span>
            </a>
            <a
              href="#mission"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition-all"
            >
              <Building2 className="w-4 h-4 text-[#002D72]" />
              <span>Academic Heritage &amp; Mission</span>
            </a>
            <a
              href="#why-us"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold border border-slate-200 transition-all"
            >
              <Award className="w-4 h-4 text-[#002D72]" />
              <span>Why Work With Us</span>
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] text-xs sm:text-sm font-black border border-[#E5A417] shadow-sm transition-all"
            >
              <Mail className="w-4 h-4 text-[#001C48]" />
              <span>Get a Free Review</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LAB MISSION & ACADEMIC HERITAGE
          ========================================================================= */}
      <section id="mission" className="py-20 bg-[#FAF9F6] border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002D72]/10 border border-[#002D72]/20 text-[#002D72] text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Academic Heritage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Bridging Academic Rigor with Real-World Growth
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Based at Pace University’s Lubin School of Business at One Pace Plaza in Downtown Manhattan, the <strong className="text-slate-900 font-semibold">Pace Digital Marketing Lab</strong> was founded as a collaborative bridge between academic marketing research and the dynamic small business community of New York City.
            </p>
          </div>

          {/* Collaboration Showcase Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-200 bg-white p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002D72]/10 text-[#002D72] text-xs font-extrabold">
                  <BookOpen className="w-4 h-4" />
                  <span>Downtown Manhattan • Lubin School of Business</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Where Theory Meets Practical Execution
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Too often, small businesses are forced to choose between overpriced agency retainers that produce generic slide decks or struggling alone with fragmented advice online. Our lab was built to solve this exact problem.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Under the faculty mentorship of Pace University’s marketing department, our student researchers apply rigorous methodologies—consumer behavior frameworks, demographic analysis, and quantitative channel scoring—to create actionable, low-overhead playbooks for real entrepreneurs.
                </p>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/images/pace-hero-collab.jpg"
                  alt="Pace University marketing lab research session"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
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
              <h3 className="font-extrabold text-slate-900 text-base">Student Decision Framework</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Every strategy is grounded in consumer behavior, student-developed decision models, and created as an academic project for MAR649 at Pace University.
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
          3. MEET OUR STUDENT RESEARCH TEAM (All 6 Members with Equal Cards)
          ========================================================================= */}
      <section id="team" className="py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#002D72]/10 border border-[#002D72]/20 text-[#002D72] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Student Researchers • Lubin School of Business</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight font-sans">
              Meet Our Student Research Team
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Six undergraduate and graduate marketing students at Pace University conducting academic market research, consumer behavior analysis, and channel-market fit modeling for MAR649.
            </p>
          </div>

          {/* About Us & Project Concept Overview (MAR649) */}
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/90 rounded-[2rem] p-6 sm:p-9 shadow-sm space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-black text-[#002D72] flex items-center gap-2 font-sans">
                <Sparkles className="w-5 h-5 text-[#FFB81C]" />
                <span>About Us</span>
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Pace Marketing Lab is a student-created digital marketing concept developed for MAR649. Through our Platform Match tool, we explore how small businesses and nonprofits can make clearer decisions about their social media priorities.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We created Platform Match to help visitors compare six social media platforms using their audience, marketing goals, industry, content strengths, brand voice, and available time.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Our approach combines a public decision framework with practical educational content, including guides, FAQs, and worked examples. Visitors can explore the methodology and try the free quiz to understand how their inputs influence the recommendations.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-200 space-y-2">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#002D72]" />
                <span>Meet the Project Team</span>
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Our team brings together students working on keyword research, website development, content, off-site SEO, and answer engine optimization.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-200 space-y-2">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#002D72]" />
                <span>About This Project</span>
              </h4>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Pace Marketing Lab and Platform Match are academic project concepts. Business scenarios are illustrative unless explicitly identified as real research. Recommendations provide a starting point for planning and testing; they do not represent proven client outcomes.
              </p>
            </div>
          </div>

          {/* Interactive Team Card Studio (Displays all 6 members with equal cards) */}
          <TeamCardStudio />
        </div>
      </section>

      {/* =========================================================================
          4. WHY WORK WITH OUR STUDENT LAB (#why-us)
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
                Grounded in university research, established marketing frameworks, and Lubin School of Business faculty mentorship. Every recommendation is rooted in verified strategic principles.
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
                Traditional agencies charge high retainers for generic slide decks. As an academic lab, our focus is measurable learning, practical impact, and hands-on portfolio execution.
              </p>
            </div>

            <div className="bg-white rounded-[2.2rem] p-8 border border-slate-200 space-y-3.5 shadow-sm hover:shadow-xl transition-all">
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
        </div>
      </section>

      {/* =========================================================================
          5. CALL TO ACTION: Get a Free Review on Homepage Contact
          ========================================================================= */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="p-10 sm:p-14 rounded-[3rem] bg-[#002D72] text-white shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#FFB81C] via-white to-[#FFB81C]" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span>Work With Our Student Researchers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Accelerate Your Small Business?
            </h2>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Reach out to our student lab for a complimentary digital footprint audit, social media consultation, or to explore our Platform Match diagnostic tool.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] text-sm font-black shadow-lg hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4 text-[#001C48]" />
                <span>Get a Free Review on Homepage</span>
              </Link>

              <Link
                href="/platform-match"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/30 backdrop-blur-md transition-all hover:scale-105"
              >
                <Compass className="w-4 h-4 text-[#FFB81C]" />
                <span>Try Platform Match Tool</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
