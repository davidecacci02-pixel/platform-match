"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Brain,
  Compass,
  Calendar,
  Layers,
  Lightbulb,
} from "lucide-react";

interface AISynthesisModalProps {
  isOpen: boolean;
  businessName: string;
  industry?: string;
  primaryGoal?: string;
  timeBudget?: string;
  progress: number; // 0 - 100
  phase: number; // 0 - 4
}

const STRATEGIC_TIPS = [
  "Algorithms reward consistency over frequency: posting 2x/week predictably outperforms sporadic bursts.",
  "Focusing 70% of creative energy on your #1 platform delivers 3x higher compounding reach than spreading thin.",
  "Repurposing primary video insights into carousels captures both skimmers and deep-dive buyers.",
  "Hooks addressing high-cost mistakes achieve 40% higher organic save rates than generic announcements.",
  "Secondary channel synergies let you capture warm cross-pollinated traffic with minimal extra filming.",
];

export function AISynthesisModal({
  isOpen,
  businessName,
  industry = "your market",
  primaryGoal = "scalable growth",
  timeBudget = "available hours",
  progress,
  phase,
}: AISynthesisModalProps) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % STRATEGIC_TIPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const milestones = [
    {
      id: 0,
      title: "Auditing Market Positioning",
      desc: `Mapped ${industry.replace(/_/g, " ")} dynamics & target buyer profiles`,
      icon: Compass,
    },
    {
      id: 1,
      title: "Scoring Platform Compatibility",
      desc: `Evaluated 6 network distribution graphs against ${primaryGoal.replace(/_/g, " ")}`,
      icon: Layers,
    },
    {
      id: 2,
      title: "Synthesizing Content Pillars",
      desc: "Drafting bespoke hooks & creative formats with Google Gemini 3.8 Flash",
      icon: Brain,
    },
    {
      id: 3,
      title: "Calibrating 30-Day Execution Roadmap",
      desc: `Designing primary & secondary channel cadence for ${timeBudget.replace(/_/g, " ")}`,
      icon: Calendar,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        {/* Glow ambient background orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-white/10 rounded-3xl shadow-2xl shadow-brand-500/10 text-white p-6 sm:p-8 overflow-hidden space-y-6"
        >
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" style={{ animationDuration: "3s" }} />
              <span>AI Social Strategy Engine</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Synthesizing Your Blueprint
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Assembling custom algorithmic scores & editorial pillars for{" "}
              <span className="font-semibold text-white">{businessName}</span>
            </p>
          </div>

          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-brand-300">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Strategy</span>
              </span>
              <span className="tabular-nums text-white">{Math.round(progress)}%</span>
            </div>

            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400 rounded-full relative overflow-hidden"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              >
                {/* Shimmer light bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* 4 Milestones */}
          <div className="space-y-2.5 pt-1">
            {milestones.map((step) => {
              const isCompleted = phase > step.id || progress >= 100;
              const isActive = phase === step.id && progress < 100;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-950/20 border-emerald-500/30 text-slate-200"
                      : isActive
                      ? "bg-brand-500/10 border-brand-500/40 text-white shadow-sm shadow-brand-500/10"
                      : "bg-slate-900/40 border-white/5 text-slate-500"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : isActive ? (
                      <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center animate-pulse">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center">
                        <Icon className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-xs font-bold ${
                          isCompleted
                            ? "text-emerald-300"
                            : isActive
                            ? "text-brand-200"
                            : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </p>
                      {isCompleted && (
                        <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                          Ready
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug truncate">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rotating Insight Ticker */}
          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-white/5 flex items-start gap-2.5 min-h-[64px]">
            <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                Strategic Insight
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-slate-300 leading-relaxed"
                >
                  {STRATEGIC_TIPS[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Model Badge Footer */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Google Gemini 3.8 Flash</span>
            </span>
            <span>Free Tier • Zero-Cost</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
