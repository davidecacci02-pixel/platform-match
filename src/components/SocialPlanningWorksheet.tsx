"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Clock,
  ArrowRight,
  Sliders,
  Send,
  Calendar,
  Layers,
} from "lucide-react";

export function SocialPlanningWorksheet() {
  const [audience, setAudience] = useState("Local boutique shoppers & design lovers");
  const [channel, setChannel] = useState("Instagram Reels & Carousels");
  const [action, setAction] = useState("visit our Manhattan showroom and book a styling session");
  const [format, setFormat] = useState("weekly before-and-after process reels");
  const [copied, setCopied] = useState(false);

  const focusStatement = `Our business wants to reach ${audience || "[Target Audience]"} on ${
    channel || "[Primary Channel]"
  } to encourage ${action || "[Desired Action]"} using ${format || "[Core Content Format]"}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(focusStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    audience: true,
    goal: true,
    industry: false,
    content: false,
    voice: false,
    time: false,
  });

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="my-12 rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50 to-[#002D72]/5 border-2 border-[#002D72]/20 p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Pace Gold Accent Tab */}
      <div className="absolute top-0 right-10 bg-[#FFB81C] text-[#001C48] text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-b-xl shadow-sm">
        Ready-to-Fill Planning Worksheet
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D72]/10 text-[#002D72] text-xs font-extrabold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Skyscraper Planning Tool</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Small Business Social Media Strategy Worksheet
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl">
            Fill in the fields below to synthesize your 6 core decision factors into a concrete, 1-sentence strategic focus statement before launching any new profile.
          </p>
        </div>

        {/* 1. Interactive Focus Statement Builder */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
          <h4 className="text-sm font-extrabold text-[#002D72] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FFB81C]" />
            <span>Step 1: Formulate Your Strategic Focus Statement</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-slate-700 block">1. Who is your intended audience?</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., Local homeowners, B2B executives"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72] text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 block">2. Which primary channel are you testing?</label>
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="e.g., Instagram, LinkedIn, TikTok"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72] text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 block">3. What exact action should they take?</label>
              <input
                type="text"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="e.g., book a consultation, call for quote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72] text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 block">4. What content format can you consistently produce?</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="e.g., 60-second video tips, photo carousels"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002D72] text-slate-900"
              />
            </div>
          </div>

          {/* Generated Live Result Box */}
          <div className="rounded-xl bg-[#001C48] text-white p-5 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold border-b border-white/10 pb-2">
              <span className="text-[#FFB81C] uppercase font-bold tracking-wider">
                Generated Strategy Focus Statement
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs text-white hover:text-[#FFB81C] transition-colors font-bold px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Statement"}</span>
              </button>
            </div>
            <p className="text-sm sm:text-base font-serif italic text-slate-100 leading-relaxed">
              &ldquo;{focusStatement}&rdquo;
            </p>
          </div>
        </div>

        {/* 2. Six Framework Readiness Checklist */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-sm font-extrabold text-[#002D72] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FFB81C]" />
              <span>Step 2: Six-Factor Decision Readiness Checklist</span>
            </h4>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              {completedCount}/6 Factors Defined
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                id: "audience",
                label: "1. Target Audience (30%)",
                desc: "Identified where buyers spend time and how they discover solutions.",
              },
              {
                id: "goal",
                label: "2. Marketing Goal (25%)",
                desc: "Selected ONE primary objective (inquiries, awareness, or sales).",
              },
              {
                id: "industry",
                label: "3. Industry Fit (15%)",
                desc: "Verified competitor presence and natural customer search intent.",
              },
              {
                id: "content",
                label: "4. Content Strengths (15%)",
                desc: "Chosen formats your team creates best without friction.",
              },
              {
                id: "voice",
                label: "5. Brand Voice (10%)",
                desc: "Established a consistent professional, casual, or educational tone.",
              },
              {
                id: "time",
                label: "6. Weekly Time Budget (5%)",
                desc: "Calculated exact weekly hours available (e.g., 3-hour limit).",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  checklist[item.id]
                    ? "bg-[#002D72]/5 border-[#002D72] text-[#002D72]"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    checklist[item.id] ? "bg-[#002D72] text-white" : "border border-slate-300 bg-white"
                  }`}
                >
                  {checklist[item.id] && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-extrabold block">{item.label}</span>
                  <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Take Quiz Prompt */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <Sparkles className="w-6 h-6 text-[#FFB81C] flex-shrink-0" />
            <p className="text-xs sm:text-sm font-semibold">
              Want our algorithmic engine to calculate your multi-dimensional compatibility scores automatically?
            </p>
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs font-extrabold whitespace-nowrap shadow-md hover:scale-[1.02] transition-all"
          >
            <span>Take Free 3-Min Quiz</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFB81C]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
