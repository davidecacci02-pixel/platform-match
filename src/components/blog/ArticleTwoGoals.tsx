import React from "react";
import Link from "next/link";
import {
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Eye,
  Globe,
  MessageSquare,
  ShoppingBag,
  Users,
  Compass,
  GraduationCap,
  Clock,
  Layers,
  Sliders,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

export function ArticleTwoGoals() {
  return (
    <article className="space-y-12">
      {/* Article Header */}
      <header className="space-y-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-bold text-slate-800">
          <Target className="w-3.5 h-3.5 text-[#002D72]" />
          <span className="text-[#002D72] font-black uppercase tracking-wider">
            Article 2 • Strategy &amp; Alignment
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium">Goal-First Marketing</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] font-sans">
          How Your Goals Help You Choose the Best Social Media Platform for Business
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
          The best social media platform for business depends on what you want to achieve. Before choosing a channel, identify your audience, the action you want them to take, and the content your team can consistently create.
        </p>

        {/* Author Byline */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-200/70">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#002D72] text-[#FFB81C] flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-4 h-4 text-[#FFB81C]" />
            </div>
            <span className="font-bold text-slate-900">
              By the Platform Match student project team
            </span>
            <span className="text-slate-400">•</span>
            <span>Pace Digital Marketing Lab</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>5 min read</span>
            <span className="text-slate-400">•</span>
            <span>Goal Alignment &amp; KPIs</span>
          </div>
        </div>
      </header>

      {/* Intro Highlight */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic border-l-4 border-[#002D72] pl-4">
          &ldquo;A clear goal helps you compare platforms with a purpose.&rdquo;
        </p>
      </div>

      {/* Section 1: Start with one business goal */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Start with one business goal
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Your business may want more visibility, website visitors, sales, and customer conversations. For your initial plan, choose one main priority.
        </p>

        <p className="text-slate-700 text-base leading-relaxed">
          A bakery introducing a new menu might focus on awareness. A consultant with appointment availability might focus on inquiries. These are different goals, so the content, call to action, and measures of progress should reflect that difference.
        </p>

        {/* Practical Action Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-black text-slate-900">
            Use this table to connect your goal to a practical action:
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#002D72] text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-black text-xs uppercase tracking-wider">
                    Your goal
                  </th>
                  <th scope="col" className="px-5 py-4 font-black text-xs uppercase tracking-wider">
                    What you want people to do
                  </th>
                  <th scope="col" className="px-5 py-4 font-black text-xs uppercase tracking-wider">
                    What you could track
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4" />
                    </span>
                    <span>Brand awareness</span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Discover and explore your business
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-medium">
                    Relevant reach and profile visits
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4" />
                    </span>
                    <span>Website traffic</span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Visit a useful page
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-medium">
                    Visits arriving from your social content
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <span>Inquiries</span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Ask about your product or service
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-medium">
                    Relevant messages and information requests
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-4 h-4" />
                    </span>
                    <span>Sales</span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Complete a purchase
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-medium">
                    Purchases attributable to social activity, where tracking allows
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-bold text-slate-950 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </span>
                    <span>Community</span>
                  </td>
                  <td className="px-5 py-4 text-slate-700">
                    Participate in useful conversations
                  </td>
                  <td className="px-5 py-4 text-slate-900 font-medium">
                    Relevant comments and repeat participation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Observation Callout */}
        <div className="p-5 rounded-2xl bg-[#FFB81C]/15 border border-[#FFB81C]/40 text-slate-900 space-y-1.5 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-[#855B00] flex-shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base font-semibold leading-relaxed">
            Choose measures you can actually observe. Likes can provide feedback, but they do not automatically show whether your business goal was achieved.
          </p>
        </div>
      </section>

      {/* Section 2: Check where your audience looks for information */}
      <section className="space-y-4 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Check where your audience looks for information
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Consider how your customers discover businesses like yours and what helps them make decisions. Ask customers directly, review existing analytics, or examine relevant audience research.
        </p>

        <p className="text-slate-700 text-base leading-relaxed">
          Avoid choosing a platform only because it is popular. The important question is whether it offers a useful way to reach and communicate with your intended customers.
        </p>
      </section>

      {/* Section 3: Match the plan to your content strengths */}
      <section className="space-y-4 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Match the plan to your content strengths
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          List what your team can produce well: photographs, short videos, detailed demonstrations, written explanations, or graphics.
        </p>

        <p className="text-slate-700 text-base leading-relaxed">
          Then consider the time needed to create that content and respond to people. A plan that fits your team&apos;s skills and capacity is easier to maintain and evaluate.
        </p>
      </section>

      {/* Section 4: Compare your options with Platform Match */}
      <section className="space-y-6 pt-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Compare your options with Platform Match
          </h2>
          <div className="h-1 w-12 bg-[#FFB81C] rounded-full" />
        </div>

        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
          Platform Match compares Instagram, TikTok, Facebook, LinkedIn, YouTube, and Pinterest using six factors:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: "Target audience", weight: "30%" },
            { name: "Marketing goal", weight: "25%" },
            { name: "Industry vertical", weight: "15%" },
            { name: "Content strengths", weight: "15%" },
            { name: "Brand voice", weight: "10%" },
            { name: "Available time", weight: "5%" },
          ].map((factor, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between"
            >
              <span className="text-xs font-bold text-slate-900">{factor.name}</span>
              <span className="text-xs font-black text-[#002D72] bg-[#002D72]/10 px-2 py-0.5 rounded-md">
                {factor.weight}
              </span>
            </div>
          ))}
        </div>

        <p className="text-slate-700 text-base leading-relaxed">
          Use the recommendation alongside your customer knowledge to choose an initial channel priority. Compatibility scores are planning indicators, not predictions of sales or engagement.
        </p>

        {/* CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#002D72] text-white shadow-xl space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#FFB81C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Decision Tool</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Try the free Platform Match quiz
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              Explore which platform best fits your unique business inputs in just 3 minutes.
            </p>
          </div>

          <Link
            href="/quiz"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#FFB81C] hover:bg-[#E5A417] text-[#001C48] font-black text-sm rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#001C48]" />
            <span>Start Free Quiz</span>
            <ArrowRight className="w-4 h-4 text-[#001C48]" />
          </Link>
        </div>

        <p className="text-xs text-slate-500 font-medium italic pt-2">
          By the Platform Match student project team • MAR649 Pace Digital Marketing Lab, Pace University.
        </p>
      </section>
    </article>
  );
}
