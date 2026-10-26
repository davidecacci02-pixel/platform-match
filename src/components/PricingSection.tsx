"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Check,
  Zap,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Star,
  Flame,
  Clock,
  Layers,
  Lock,
  MessageSquare,
  FileText,
  Users,
} from "lucide-react";
import { LeadModal } from "./LeadModal";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"onetime" | "monthly">("onetime");
  const [activePlanModal, setActivePlanModal] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const pricingData = {
    blueprint: {
      name: "Growth Blueprint",
      subtitle: "The essential algorithmic roadmap to validate your channels and eliminate wasted production hours.",
      tag: "Essential Strategy",
      price: billingCycle === "onetime" ? "€49" : "€29",
      billingPeriod: billingCycle === "onetime" ? "one-time payment" : "per month",
      savingsNote: billingCycle === "onetime" ? "Lifetime access & free matrix updates" : "Cancel anytime with 1 click",
      features: [
        {
          title: "Complete 6-Platform Algorithmic Fit Audit",
          desc: "Multi-dimensional scoring across Audience, Goal, Vertical, Content, Voice & Time.",
          included: true,
        },
        {
          title: "Tailored 30-Day Execution Calendar",
          desc: "3 custom content pillars with sustainable weekly publishing cadences.",
          included: true,
        },
        {
          title: "Industry Competitor Vulnerability Benchmark",
          desc: "Identifies saturation points and competitor blindspots you can exploit organically.",
          included: true,
        },
        {
          title: "Multi-Format Repurposing Matrix",
          desc: "Exact formulas to turn 1 core content format into 5 high-leverage channel assets.",
          included: true,
        },
        {
          title: "Capacity-Calibrated Posting Limits",
          desc: "Posting frequency guaranteed to remain under 3–5 hours weekly without burnout.",
          included: true,
        },
        {
          title: "Interactive AI Strategy Consultant",
          desc: "Unlimited self-serve chat for real-time hooks, angles, and content ideation.",
          included: true,
        },
        {
          title: "Executive Strategy PDF & Markdown Export",
          desc: "Downloadable presentation-ready report to share with stakeholders.",
          included: true,
        },
        {
          title: "Standard Email Support",
          desc: "Direct support from our strategy team within 48 business hours.",
          included: true,
        },
        {
          title: "1-on-1 Strategy Deep Dive (45 min)",
          desc: "Private consultation with a Senior Growth Architect.",
          included: false,
        },
        {
          title: "Plug-and-Play Notion & Figma Hub",
          desc: "Pre-built production sprint boards and script writing templates.",
          included: false,
        },
        {
          title: "Priority VIP Private WhatsApp / Slack",
          desc: "Under 12-hour turnaround for post reviews and priority advisory.",
          included: false,
        },
      ],
      ctaText: "Get Instant Blueprint",
      ctaSub: "Instant report & immediate access",
    },
    advisory: {
      name: "Full Architecture & Advisory",
      subtitle: "End-to-end bespoke social architecture, plug-and-play production workspaces, and private 1-on-1 expert advisory.",
      tag: "Most Popular • Maximum ROI",
      price: billingCycle === "onetime" ? "€149" : "€79",
      billingPeriod: billingCycle === "onetime" ? "one-time payment" : "per month",
      savingsNote: billingCycle === "onetime" ? "Lifetime pro access + 1-on-1 review" : "Continuous advisory & weekly reviews",
      features: [
        {
          title: "Everything in Growth Blueprint",
          desc: "All 6 platform audits, 30-day calendar, repurposing matrix & AI consultant.",
          included: true,
          highlight: true,
        },
        {
          title: "1-on-1 Strategy Deep Dive (45 min)",
          desc: "Private video consultation with a Senior Growth Architect to review your positioning and conversion offer.",
          included: true,
          highlight: true,
        },
        {
          title: "Plug-and-Play Notion & Figma Production Hub",
          desc: "Ready-to-use production sprint templates, video script formats, and creative asset trackers.",
          included: true,
        },
        {
          title: "Full-Funnel Lead Conversion Architecture",
          desc: "Engineered specifically to convert profile visitors into paying inbound customers.",
          included: true,
        },
        {
          title: "Multi-Channel Primary + Synergy Integration",
          desc: "Master-satellite content syndication workflow multiplying organic reach up to 3x.",
          included: true,
        },
        {
          title: "Custom Brand Voice AI Prompt Suite",
          desc: "Pre-calibrated prompts fine-tuned for your exact industry vocabulary and tone.",
          included: true,
        },
        {
          title: "Priority VIP Advisory Channel (WhatsApp & Slack)",
          desc: "Direct channel with our strategy team with guaranteed <12 hour feedback turnaround.",
          included: true,
          highlight: true,
        },
        {
          title: "100% Risk-Free 14-Day Money-Back Guarantee",
          desc: "If you don't find total strategic clarity for your brand, we refund you completely.",
          included: true,
        },
      ],
      ctaText: "Claim Full Architecture & Advisory",
      ctaSub: "Includes private 45-min strategist session",
    },
  };

  const faqs = [
    {
      q: "How does the 1-on-1 strategy deep dive session work?",
      a: "After you complete the assessment or reserve your advisory tier, our Senior Growth Architect reviews your diagnostic data, competitive landscape, and brand positioning. We then host a private 45-minute video call to refine your channel priority, script your first content batch, and structure your conversion funnel.",
    },
    {
      q: "What if my team has very limited hours to produce content?",
      a: "That's exactly why Platform Match was created. Our scoring matrix explicitly clamps and calibrates your publishing schedule to under 3–5 hours per week. Instead of burning 15+ hours spreading yourself thin, we focus 70% of your energy on your single highest-affinity channel.",
    },
    {
      q: "Can I take the diagnostic quiz for free before deciding?",
      a: "Yes, 100%! The 6-question quiz and baseline platform ranking are completely free and ungated with zero credit card required. You can review your top match and then upgrade to a full tactical blueprint or hands-on advisory whenever you're ready.",
    },
    {
      q: "What is the difference between One-Time Payment and Monthly?",
      a: "One-Time Payment grants you permanent lifetime access to the complete strategic roadmap, downloadable guides, and initial consultation with zero recurring fees. The Monthly option is designed for scaling brands that want continuous monthly strategy reviews, fresh quarterly competitor audits, and ongoing WhatsApp/Slack advisory.",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Decorative Aurora Background Behind Pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-brand-600/15 via-indigo-600/15 to-cyan-500/10 blur-[130px] rounded-full -z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Transparent Investment • Proven High ROI
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Invest in Clarity.{" "}
          <span className="block mt-1 bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
            Stop Guessing Your Growth.
          </span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Choose the strategic depth calibrated to your growth phase: from a self-serve algorithmic blueprint to full-service social architecture with direct 1-on-1 strategist advisory.
        </p>

        {/* Billing Switcher Toggle */}
        <div className="pt-6 flex items-center justify-center">
          <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-700/80 inline-flex items-center gap-1 shadow-xl">
            <button
              type="button"
              onClick={() => setBillingCycle("onetime")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                billingCycle === "onetime"
                  ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>One-Time Payment</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
                Lifetime Deal
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Monthly Subscription</span>
              <span className="text-[11px] text-slate-400 font-normal">
                (Flexible)
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* The 2 Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch max-w-5xl mx-auto">
        {/* OFFER 1: Growth Blueprint */}
        <div className="bg-slate-900/80 rounded-3xl p-7 sm:p-9 border border-slate-700/80 hover:border-slate-600 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-all group relative overflow-hidden">
          {/* Subtle top indicator line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-slate-600 to-slate-400 opacity-60" />

          <div className="space-y-6">
            {/* Header info */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                {pricingData.blueprint.tag}
              </div>
              <h3 className="text-2xl font-black text-white">
                {pricingData.blueprint.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {pricingData.blueprint.subtitle}
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {pricingData.blueprint.price}
                </span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  / {pricingData.blueprint.billingPeriod}
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-medium">
                ✓ {pricingData.blueprint.savingsNote}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                What&apos;s Included:
              </span>
              <ul className="space-y-3 text-xs">
                {pricingData.blueprint.features.map((feat, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 ${
                      feat.included ? "text-slate-200" : "text-slate-500 opacity-40"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feat.included
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-600"
                      }`}
                    >
                      {feat.included ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <span className="text-[9px] font-bold">✕</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`font-bold ${feat.included ? "text-white" : ""}`}>
                        {feat.title}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                        {feat.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 mt-6 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => setActivePlanModal("Growth Blueprint")}
              className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <span>{pricingData.blueprint.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-slate-400 font-medium">
              {pricingData.blueprint.ctaSub}
            </p>
          </div>
        </div>

        {/* OFFER 2: Full Architecture & Advisory (FEATURED / HIGHLIGHTED) */}
        <div className="bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-brand-950/60 rounded-3xl p-7 sm:p-9 border-2 border-brand-500 shadow-2xl shadow-brand-500/25 backdrop-blur-xl flex flex-col justify-between transition-all group relative overflow-hidden lg:-translate-y-2">
          {/* Top Aurora Highlight Line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-400 via-indigo-400 to-cyan-400" />

          {/* Glowing Top-Right Badge */}
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-brand-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              Most Popular
            </span>
          </div>

          <div className="space-y-6">
            {/* Header info */}
            <div className="space-y-2 pr-28 sm:pr-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-[11px] font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {pricingData.advisory.tag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {pricingData.advisory.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {pricingData.advisory.subtitle}
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-950/80 to-slate-950/80 border border-brand-500/30 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {pricingData.advisory.price}
                </span>
                <span className="text-xs text-brand-300 font-semibold uppercase tracking-wider">
                  / {pricingData.advisory.billingPeriod}
                </span>
              </div>
              <p className="text-xs text-cyan-300 font-medium">
                ★ {pricingData.advisory.savingsNote}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-300 block">
                Everything In Blueprint, Plus Exclusive Architecture:
              </span>
              <ul className="space-y-3 text-xs">
                {pricingData.advisory.features.map((feat, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-3 ${
                      feat.highlight ? "p-2 rounded-xl bg-brand-500/10 border border-brand-500/20" : ""
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-tr from-brand-500 to-indigo-500 text-white shadow-sm shadow-brand-500/30">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div className="flex-1">
                      <span className={`font-bold ${feat.highlight ? "text-cyan-300 font-extrabold" : "text-white"}`}>
                        {feat.title}
                      </span>
                      <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
                        {feat.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 mt-6 border-t border-brand-500/30 space-y-3">
            <button
              type="button"
              onClick={() => setActivePlanModal("Full Architecture & Advisory")}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-600 to-purple-600 hover:from-brand-400 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2 border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <Sparkles className="w-4 h-4 text-brand-200" />
              <span>{pricingData.advisory.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-cyan-300 font-semibold">
              🔒 100% Risk-Free: 14-Day Full Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-center">
        <div className="space-y-1 p-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white block">14-Day Guarantee</span>
          <p className="text-[11px] text-slate-400">Full refund if not 100% satisfied</p>
        </div>

        <div className="space-y-1 p-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mx-auto mb-2 border border-brand-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white block">Instant Delivery</span>
          <p className="text-[11px] text-slate-400">Roadmap generated immediately</p>
        </div>

        <div className="space-y-1 p-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto mb-2 border border-cyan-500/30">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white block">1-on-1 Advisory</span>
          <p className="text-[11px] text-slate-400">Direct human strategist session</p>
        </div>

        <div className="space-y-1 p-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mx-auto mb-2 border border-purple-500/30">
            <Lock className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white block">Zero Lock-In</span>
          <p className="text-[11px] text-slate-400">Transparent pricing, cancel anytime</p>
        </div>
      </div>

      {/* Free Quiz Alternative CTA */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">
          Want to test your compatibility first?{" "}
          <Link
            href="/quiz"
            className="text-brand-300 hover:text-white underline font-semibold transition-colors inline-flex items-center gap-1"
          >
            Take the free 2-minute diagnostic assessment
            <ArrowRight className="w-3 h-3" />
          </Link>
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-20 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Frequently Asked Questions
          </span>
          <h3 className="text-2xl font-bold text-white">
            Everything you need to know about our plans
          </h3>
        </div>

        <div className="space-y-3 pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white hover:text-brand-300 transition-colors"
                >
                  <span className="text-sm font-bold flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180 text-brand-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lead / Plan Selection Modal */}
      <LeadModal
        isOpen={Boolean(activePlanModal)}
        onClose={() => setActivePlanModal(null)}
        selectedPlan={activePlanModal || undefined}
      />
    </section>
  );
}
