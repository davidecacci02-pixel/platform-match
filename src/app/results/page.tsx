"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  Target,
  Clock,
  Compass,
  Building2,
  Bot,
  Zap,
  Bookmark,
  MessageSquare,
  TrendingUp,
  Swords,
  AlertTriangle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { RecommendationEngineResult, PlatformScoreResult } from "@/lib/recommendation-engine";
import { PLATFORMS_DATA } from "@/lib/platforms";
import { SocialIcon } from "@/components/SocialIcon";
import { ScoreProgressBar } from "@/components/ScoreProgressBar";
import { LeadModal } from "@/components/LeadModal";
import { AskAIConsultant } from "@/components/AskAIConsultant";
import {
  BusinessDiscovery,
  MarketingAssessmentExtension,
  BusinessSnapshot,
  AIStrategyOutput,
} from "@/lib/business-schema";
import {
  loadStoredResults,
  loadStoredBusiness,
  loadStoredExtension,
  loadStoredSnapshot,
  loadStoredStrategy,
  saveStoredStrategy,
  clearQuizSession,
} from "@/lib/session";

export default function ResultsPage() {
  const router = useRouter();

  const [results, setResults] = useState<RecommendationEngineResult | null>(null);
  const [business, setBusiness] = useState<BusinessDiscovery | null>(null);
  const [extension, setExtension] = useState<MarketingAssessmentExtension | null>(null);
  const [snapshot, setSnapshot] = useState<BusinessSnapshot | null>(null);
  const [strategy, setStrategy] = useState<AIStrategyOutput | null>(null);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [isAllIdeasExpanded, setIsAllIdeasExpanded] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    // Ensure viewport lands cleanly at top of page on mount
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    const loadedResults = loadStoredResults();
    const loadedBusiness = loadStoredBusiness() as BusinessDiscovery;
    const loadedExtension = loadStoredExtension() as MarketingAssessmentExtension;
    const loadedSnapshot = loadStoredSnapshot();
    const loadedStrategy = loadStoredStrategy();

    setResults(loadedResults);
    setBusiness(loadedBusiness);
    setExtension(loadedExtension);
    setSnapshot(loadedSnapshot);
    setStrategy(loadedStrategy);
    setIsClientLoaded(true);

    if (loadedResults && typeof window !== "undefined") {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#7c3aed", "#6366f1", "#ec4899", "#3b82f6"],
        });
      } catch {
        // Safe ignore
      }
    }
  }, []);

  const handleRetakeQuiz = () => {
    clearQuizSession();
    router.push("/quiz");
  };

  const handleUpdateStrategy = (newStrategy: AIStrategyOutput) => {
    setStrategy(newStrategy);
    saveStoredStrategy(newStrategy);
  };

  if (!isClientLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Graceful empty/invalid session state
  if (!results || !results.rankedPlatforms || results.rankedPlatforms.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <Info className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">No Active Consultation Session</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We couldn&apos;t find your consultation data in this session. Complete the 3-minute business
              discovery to get your tailored AI social media strategy.
            </p>
          </div>
          <Link
            href="/quiz"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Consultation</span>
          </Link>
        </div>
      </div>
    );
  }

  const primaryResult = results.rankedPlatforms[0];
  const secondaryResult = results.rankedPlatforms[1];
  const tertiaryResult = results.rankedPlatforms[2];
  const primaryMeta = PLATFORMS_DATA[primaryResult.platformId];
  const secondaryMeta = PLATFORMS_DATA[secondaryResult.platformId];
  const tertiaryMeta = PLATFORMS_DATA[tertiaryResult.platformId];

  // Fallback business context if missing
  const activeBusinessName = business?.businessName || "Your Brand";
  const activeIndustryLabel = results.answerLabels.industry;
  const isAIEnhanced = strategy?.isAIEnhanced ?? false;

  return (
    <div className="flex-1 flex flex-col py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
      {/* Header Banner & Personalized Headline */}
      <section className="space-y-4 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-slate-200/80 pb-8">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Strategic Consultation Report
            </div>
            {isAIEnhanced ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Enhanced ({strategy?.engineModelUsed || "Gemini Free Tier"})</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Deterministic Strategy Engine (Offline / Free Tier Ready)</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Strategic Roadmap for{" "}
            <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
              {activeBusinessName}
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tailored for <strong className="text-slate-900">{results.answerLabels.audience}</strong> with a core focus on{" "}
            <strong className="text-slate-900">{results.answerLabels.goal}</strong> within a{" "}
            <strong className="text-slate-900">{results.strategy30Day.weeklyTimeBudget}</strong> schedule.
          </p>
        </div>

        <button
          onClick={handleRetakeQuiz}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold transition-all shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Consultation</span>
        </button>
      </section>

      {/* Business Snapshot Card (Stage 3 Integration) */}
      {snapshot && (
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Business Positioning Snapshot
                </h2>
                <span className="text-xs text-slate-500">
                  {activeBusinessName} • {activeIndustryLabel}
                </span>
              </div>
            </div>

            {snapshot.verifiedFromWebsite && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Website Verified
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
                Positioning
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{snapshot.positioning}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
                Buyer Profile
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{snapshot.audienceProfile}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
                Primary Objective
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{snapshot.marketingObjective}</p>
            </div>
          </div>
        </section>
      )}

      {/* Strategic Considerations Callout (Stage 4) */}
      {strategy && strategy.strategicConsiderations && strategy.strategicConsiderations.length > 0 && (
        <section className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-5 text-xs sm:text-sm text-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>AI Strategic Considerations</span>
          </div>
          <ul className="space-y-1.5 pl-1">
            {strategy.strategicConsiderations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Top 3 Recommendation Cards (Stage 4) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Top Ranked Platform Matches
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Ranked deterministically by demographic overlap, algorithmic intent, and your weekly time budget.
          </p>
        </div>

        {/* Primary Platform Hero Card (#1) */}
        <div className="bg-white rounded-3xl border-2 border-brand-500 shadow-xl shadow-brand-500/5 p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-bl-2xl bg-brand-600 text-white font-extrabold text-xs tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Primary Growth Engine • #1 Match
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: primaryMeta.brandColor }}
              >
                <SocialIcon platform={primaryResult.platformId} size={32} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {primaryMeta.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold">
                    Primary Engine
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{primaryMeta.tagline}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-4xl sm:text-5xl font-black text-slate-900">
                  {primaryResult.score}%
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase">Compatibility</span>
              </div>
              <ScoreProgressBar score={primaryResult.score} />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Why {primaryMeta.name} is Your #1 Channel
            </h4>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
              {primaryResult.explanation.detailedRationale}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strategic Advantages</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {primaryResult.explanation.topMatchingAttributes.map((attr, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{attr}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>Sustainable Cadence</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {primaryResult.explanation.suggestedFrequency}
              </p>
              <div className="pt-1 text-[11px] text-amber-700 font-medium">
                <strong>Limitation:</strong> {primaryResult.explanation.limitations[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary (#2) & Tertiary (#3) Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rank #2 */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: secondaryMeta.brandColor }}
                  >
                    <SocialIcon platform={secondaryResult.platformId} size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{secondaryMeta.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                        Rank #2 • Synergy
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{secondaryMeta.tagline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">{secondaryResult.score}%</span>
                </div>
              </div>

              <ScoreProgressBar score={secondaryResult.score} heightClass="h-2" />

              <p className="text-xs text-slate-600 leading-relaxed">
                {secondaryResult.explanation.detailedRationale}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-slate-700 block">Frequency:</span>
                <p className="text-slate-600">{secondaryResult.explanation.suggestedFrequency}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Top Strength:</span>
              <span className="font-semibold text-slate-700 truncate max-w-[200px]">
                {secondaryResult.explanation.topMatchingAttributes[0].split(":")[0]}
              </span>
            </div>
          </div>

          {/* Rank #3 */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: tertiaryMeta.brandColor }}
                  >
                    <SocialIcon platform={tertiaryResult.platformId} size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{tertiaryMeta.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                        Rank #3
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{tertiaryMeta.tagline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">{tertiaryResult.score}%</span>
                </div>
              </div>

              <ScoreProgressBar score={tertiaryResult.score} heightClass="h-2" />

              <p className="text-xs text-slate-600 leading-relaxed">
                {tertiaryResult.explanation.detailedRationale}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <span className="font-semibold text-slate-700 block">Frequency:</span>
                <p className="text-slate-600">{tertiaryResult.explanation.suggestedFrequency}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">Top Strength:</span>
              <span className="font-semibold text-slate-700 truncate max-w-[200px]">
                {tertiaryResult.explanation.topMatchingAttributes[0].split(":")[0]}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Six-Platform Ranking Table */}
      <section className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900">
            Complete 6-Platform Compatibility Rankings
          </h2>
          <p className="text-xs text-slate-500">
            Compare all evaluated networks. Click any platform to view its dimensional breakdown and trade-offs.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {results.rankedPlatforms.map((item) => {
            const meta = PLATFORMS_DATA[item.platformId];
            const isExpanded = expandedPlatform === item.platformId;

            return (
              <div key={item.platformId} className="py-4">
                <div
                  onClick={() =>
                    setExpandedPlatform((curr) => (curr === item.platformId ? null : item.platformId))
                  }
                  className="flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 p-2.5 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 text-center font-bold text-sm text-slate-400">
                      #{item.rank}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: meta.brandColor }}
                    >
                      <SocialIcon platform={item.platformId} size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {meta.name}
                        </span>
                        {item.isPrimary && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Primary
                          </span>
                        )}
                        {item.isSecondary && !item.isPrimary && (
                          <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                            Synergy
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 hidden sm:inline-block">
                        {meta.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 hidden xs:block">
                      <ScoreProgressBar score={item.score} heightClass="h-1.5" />
                    </div>
                    <span className="font-black text-slate-900 text-base sm:text-lg min-w-[48px] text-right">
                      {item.score}%
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-2xl space-y-3 text-xs text-slate-700 animate-fade-in">
                    <p className="leading-relaxed font-medium">{item.explanation.detailedRationale}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200/50">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Audience Fit</span>
                        <span className="font-semibold text-slate-800">{item.dimensionScores.audience}/100</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Goal Fit</span>
                        <span className="font-semibold text-slate-800">{item.dimensionScores.goal}/100</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Content Fit</span>
                        <span className="font-semibold text-slate-800">{item.dimensionScores.content}/100</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
                      <strong>Limitations to note:</strong> {item.explanation.limitations.join(" • ")}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Competitive Benchmark & Whitespace Analysis */}
      {strategy?.competitorBenchmark && (
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle top ambient gradient line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-brand-500 to-emerald-500" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold flex-shrink-0 shadow-lg shadow-amber-500/10">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Competitive Intelligence
                  </span>
                  <span className="text-xs text-slate-400">• {activeIndustryLabel}</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                  Industry Competitor Benchmark & Market Whitespace
                </h2>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 text-slate-200 border border-white/15 flex items-center gap-2 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Real Competitor Analysis Active</span>
            </span>
          </div>

          {/* REAL COMPETITOR BENCHMARK CARDS */}
          {strategy.competitorBenchmark.benchmarkedCompetitors &&
            strategy.competitorBenchmark.benchmarkedCompetitors.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-400" />
                    <span>Real Competitor Archetypes in Your Industry</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Diagnosing rivals&apos; vulnerabilities to position {activeBusinessName} as the clear authority
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {strategy.competitorBenchmark.benchmarkedCompetitors.map((comp, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 border border-slate-700/80 hover:border-slate-600 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-lg shadow-black/20 backdrop-blur-md transition-all"
                    >
                      <div className="space-y-3">
                        {/* Competitor Header */}
                        <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/10">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                              {comp.type}
                            </span>
                            <h4 className="text-base font-bold text-white tracking-tight mt-1.5">
                              {comp.name}
                            </h4>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                            Archetype 0{idx + 1}
                          </span>
                        </div>

                        {/* Channel Focus */}
                        <div className="text-xs text-slate-300 bg-white/5 rounded-xl p-3 border border-white/5 flex items-start gap-2">
                          <span className="text-slate-400 font-semibold flex-shrink-0">Channel Focus:</span>
                          <span className="text-slate-200">{comp.channelFocus}</span>
                        </div>

                        {/* Competitor Blindspot (Flaw) */}
                        <div className="bg-rose-950/30 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                          <div className="flex items-center gap-1.5 text-rose-300 font-bold text-xs">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Competitor Blindspot & Weakness</span>
                          </div>
                          <p className="text-xs text-rose-100/90 leading-relaxed font-normal">
                            {comp.primaryFlaw}
                          </p>
                        </div>
                      </div>

                      {/* Your Counter-Strategy & Edge */}
                      <div className="pt-3 border-t border-white/10 bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
                          <Zap className="w-3.5 h-3.5" />
                          <span>How {activeBusinessName} Out-Maneuvers Them</span>
                        </div>
                        <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                          {comp.ourCounterStrategy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* HEAD-TO-HEAD COMPARISON MATRIX */}
          {strategy.competitorBenchmark.headToHeadComparison &&
            strategy.competitorBenchmark.headToHeadComparison.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Head-to-Head Comparison: Typical Rivals vs. Your Strategy</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Why your organic positioning delivers higher ROI with less friction
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-950/60 backdrop-blur-md">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        <th className="py-3 px-4 sm:px-5">Strategic Dimension</th>
                        <th className="py-3 px-4 sm:px-5 text-rose-300">Typical Industry Competitors</th>
                        <th className="py-3 px-4 sm:px-5 text-emerald-300 bg-emerald-500/10">
                          {activeBusinessName} Advantage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {strategy.competitorBenchmark.headToHeadComparison.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 sm:px-5 font-bold text-white whitespace-nowrap">
                            {row.dimension}
                          </td>
                          <td className="py-3.5 px-4 sm:px-5 text-slate-300 leading-relaxed">
                            <div className="flex items-start gap-2">
                              <span className="text-rose-400 font-bold mt-0.5">✕</span>
                              <span>{row.competitorsApproach}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 sm:px-5 text-emerald-100 font-medium leading-relaxed bg-emerald-500/[0.04]">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{row.yourAdvantage}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          {/* 3 CORE MARKET WHITESPACE PILLARS */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Strategic Whitespace Opportunities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Saturation Analysis
                </span>
                <h4 className="text-sm font-bold text-white">Competitor Baseline</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {strategy.competitorBenchmark.industryLandscape}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                  Unserved Audience Demand
                </span>
                <h4 className="text-sm font-bold text-white">The Market Gap</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {strategy.competitorBenchmark.competitorGap}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Winning Formula
                </span>
                <h4 className="text-sm font-bold text-white">Your Unfair Advantage</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {strategy.competitorBenchmark.whitespaceAdvantage}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4-LAYER 30-DAY GROWTH ROADMAP */}
      <section className="bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 space-y-9 shadow-xl">
        {/* Section Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold backdrop-blur-sm border border-white/10">
            <Calendar className="w-3.5 h-3.5" />
            Strategic Playbook
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            30-Day Growth Roadmap
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            A high-leverage execution roadmap calibrated to your team&apos;s available hours.
          </p>
        </div>

        {/* LAYER 1: At-a-Glance Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Primary Platform
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: PLATFORMS_DATA[results.strategy30Day.primaryPlatform].brandColor }}
              >
                <SocialIcon platform={results.strategy30Day.primaryPlatform} size={15} className="text-white" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-white truncate">
                {PLATFORMS_DATA[results.strategy30Day.primaryPlatform].name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                #1
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Secondary Platform
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].brandColor }}
              >
                <SocialIcon platform={results.strategy30Day.secondaryPlatform} size={15} className="text-white" />
              </div>
              <span className="font-extrabold text-sm sm:text-base text-white truncate">
                {PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Synergy
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Weekly Cadence
            </span>
            <div className="mt-2">
              <span className="font-extrabold text-sm sm:text-base text-white block truncate">
                {results.strategy30Day.cadenceSummary}
              </span>
              <p className="text-[10px] text-slate-400">Sustainable Pace</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Time Budget
            </span>
            <div className="mt-2">
              <span className="font-extrabold text-sm sm:text-base text-white block truncate">
                {results.strategy30Day.weeklyTimeBudget.split("/")[0]}
              </span>
              <p className="text-[10px] text-slate-400">Weekly Hours</p>
            </div>
          </div>
        </div>

        {/* LAYER 2: Platform Strategy (Two Compact Cards) */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Dual-Channel Strategy & Effort Allocation
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Platform Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: PLATFORMS_DATA[results.strategy30Day.primaryPlatform].brandColor }}
                    >
                      <SocialIcon platform={results.strategy30Day.primaryPlatform} size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        {PLATFORMS_DATA[results.strategy30Day.primaryPlatform].name}
                      </h3>
                      <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
                        Primary Growth Engine
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    70% Effort
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {results.strategy30Day.primaryWhy}
                </p>
              </div>
              <div className="pt-2.5 border-t border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Focus:</span>
                <span className="text-white font-semibold">{results.strategy30Day.primaryEffort}</span>
              </div>
            </div>

            {/* Secondary Platform Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].brandColor }}
                    >
                      <SocialIcon platform={results.strategy30Day.secondaryPlatform} size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        {PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].name}
                      </h3>
                      <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">
                        Syndication Channel
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    30% Effort
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {results.strategy30Day.secondaryWhy}
                </p>
              </div>
              <div className="pt-2.5 border-t border-white/10 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Focus:</span>
                <span className="text-white font-semibold">{results.strategy30Day.secondaryEffort}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 3: Content Ideas (3 Featured + View All 6+ Ideas) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Ready-to-Execute Content Concepts
            </div>
            <button
              onClick={() => setIsAllIdeasExpanded(!isAllIdeasExpanded)}
              className="inline-flex items-center gap-1 text-[11px] text-brand-300 hover:text-white font-semibold transition-colors"
            >
              <span>{isAllIdeasExpanded ? "Collapse to Top 3" : "View All 6 Concepts"}</span>
              {isAllIdeasExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* 3 Featured Ideas or All 6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(isAllIdeasExpanded && strategy && strategy.contentIdeas
              ? strategy.contentIdeas
              : results.strategy30Day.personalizedIdeas
            ).slice(0, isAllIdeasExpanded ? 6 : 3).map((idea, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3 flex flex-col justify-between hover:bg-white/[0.13] transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-400/30">
                      Idea 0{idx + 1}
                    </span>
                    {"platform" in idea && (
                      <span className="text-[10px] font-semibold text-slate-400 uppercase">
                        {PLATFORMS_DATA[idea.platform].name}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-white">{idea.title}</h4>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    {idea.hook}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Format:</span>
                    <span className="font-semibold text-white truncate max-w-[170px]">{idea.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Goal:</span>
                    <span className="font-semibold text-brand-200 truncate max-w-[170px]">
                      {"strategicGoal" in idea ? idea.strategicGoal : (idea as { objective?: string }).objective}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tailored Content Pillars (Stage 4) */}
        {strategy && strategy.contentPillars && strategy.contentPillars.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-brand-500/20 border border-brand-400/30 flex items-center justify-center text-brand-300">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Tailored Content Pillars
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Core messaging angles built to educate, build trust, and convert
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategy.contentPillars.map((pillar, idx) => {
                const pillarAccents = [
                  {
                    pill: "bg-brand-500/20 text-brand-300 border-brand-500/30",
                    border: "border-slate-700/80 hover:border-brand-500/60",
                    topGradient: "from-brand-500/20 via-transparent to-transparent",
                  },
                  {
                    pill: "bg-sky-500/20 text-sky-300 border-sky-500/30",
                    border: "border-slate-700/80 hover:border-sky-500/60",
                    topGradient: "from-sky-500/20 via-transparent to-transparent",
                  },
                  {
                    pill: "bg-amber-500/20 text-amber-300 border-amber-500/30",
                    border: "border-slate-700/80 hover:border-amber-500/60",
                    topGradient: "from-amber-500/20 via-transparent to-transparent",
                  },
                  {
                    pill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                    border: "border-slate-700/80 hover:border-emerald-500/60",
                    topGradient: "from-emerald-500/20 via-transparent to-transparent",
                  },
                ];
                const accent = pillarAccents[idx % pillarAccents.length];
                const platformInfo = PLATFORMS_DATA[pillar.recommendedPlatform];

                return (
                  <div
                    key={idx}
                    className={`relative overflow-hidden bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border ${accent.border} flex flex-col justify-between space-y-4 shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 group`}
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.topGradient}`} />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${accent.pill}`}>
                          Pillar 0{idx + 1}
                        </span>
                        
                        {platformInfo && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-slate-200 border border-white/10">
                            <SocialIcon platform={pillar.recommendedPlatform} size={11} className="text-white" />
                            <span>{platformInfo.name}</span>
                          </div>
                        )}
                      </div>

                      <h4 className="font-bold text-white text-sm sm:text-base leading-snug tracking-tight group-hover:text-brand-200 transition-colors">
                        {pillar.name}
                      </h4>

                      <p className="text-slate-300 text-xs leading-relaxed font-normal">
                        {pillar.purpose}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Target Channel</span>
                      <span className="font-semibold text-white">
                        {platformInfo?.name || "Multi-format"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LAYER 4: 30-Day Execution Timeline (3 Phases) */}
        <div className="space-y-4 pt-6 border-t border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                30-Day Milestone Timeline
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Phased roadmap to build momentum without operational overwhelm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.strategy30Day.roadmap.map((phase, idx) => {
              const phaseConfigs = [
                {
                  stepNumber: "01",
                  phaseBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                  timingBadge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
                  borderColor: "border-slate-700/80 hover:border-emerald-500/50",
                  iconColor: "text-emerald-400",
                  topGradient: "from-emerald-500/40 via-emerald-500/10 to-transparent",
                },
                {
                  stepNumber: "02",
                  phaseBadge: "bg-brand-500/20 text-brand-300 border-brand-500/30",
                  timingBadge: "bg-brand-500/15 text-brand-300 border-brand-500/30",
                  borderColor: "border-slate-700/80 hover:border-brand-500/50",
                  iconColor: "text-brand-300",
                  topGradient: "from-brand-500/40 via-brand-500/10 to-transparent",
                },
                {
                  stepNumber: "03",
                  phaseBadge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
                  timingBadge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
                  borderColor: "border-slate-700/80 hover:border-sky-500/50",
                  iconColor: "text-sky-300",
                  topGradient: "from-sky-500/40 via-sky-500/10 to-transparent",
                },
              ];
              const cfg = phaseConfigs[idx] || phaseConfigs[0];

              return (
                <div
                  key={idx}
                  className={`relative overflow-hidden bg-slate-900/85 backdrop-blur-md border ${cfg.borderColor} rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${cfg.topGradient}`} />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black border ${cfg.phaseBadge}`}>
                          {cfg.stepNumber}
                        </span>
                        <h4 className="font-bold text-white text-sm sm:text-base">{phase.phase}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.timingBadge}`}>
                        {phase.timing}
                      </span>
                    </div>

                    <div className="bg-white/5 rounded-xl px-3.5 py-2.5 border border-white/5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Core Focus
                      </span>
                      <p className="text-slate-200 text-xs font-medium leading-relaxed">
                        {phase.focus}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Execution Milestones
                    </span>
                    <ul className="space-y-2.5">
                      {phase.actions.slice(0, 3).map((act, actIdx) => (
                        <li key={actIdx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${cfg.iconColor}`} />
                          <span className="flex-1">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Metrics (Stage 4) */}
        {strategy && strategy.successMetrics && strategy.successMetrics.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Recommended Success Metrics (KPIs)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Key validation signals to measure real audience interest and ROI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategy.successMetrics.map((metric, idx) => {
                const kpiStyles = [
                  {
                    icon: <Target className="w-3.5 h-3.5 text-emerald-300" />,
                    iconBg: "bg-emerald-500/20 border-emerald-500/30",
                    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
                    border: "border-slate-700/80 hover:border-emerald-500/60",
                    topGradient: "from-emerald-500/20 via-transparent to-transparent",
                  },
                  {
                    icon: <Bookmark className="w-3.5 h-3.5 text-brand-300" />,
                    iconBg: "bg-brand-500/20 border-brand-500/30",
                    badge: "bg-brand-500/15 text-brand-300 border-brand-500/30",
                    border: "border-slate-700/80 hover:border-brand-500/60",
                    topGradient: "from-brand-500/20 via-transparent to-transparent",
                  },
                  {
                    icon: <MessageSquare className="w-3.5 h-3.5 text-amber-300" />,
                    iconBg: "bg-amber-500/20 border-amber-500/30",
                    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
                    border: "border-slate-700/80 hover:border-amber-500/60",
                    topGradient: "from-amber-500/20 via-transparent to-transparent",
                  },
                  {
                    icon: <TrendingUp className="w-3.5 h-3.5 text-sky-300" />,
                    iconBg: "bg-sky-500/20 border-sky-500/30",
                    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
                    border: "border-slate-700/80 hover:border-sky-500/60",
                    topGradient: "from-sky-500/20 via-transparent to-transparent",
                  },
                ];
                const style = kpiStyles[idx % kpiStyles.length];

                return (
                  <div
                    key={idx}
                    className={`relative overflow-hidden bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border ${style.border} flex flex-col justify-between space-y-3 shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.topGradient}`} />

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${style.iconBg}`}>
                          {style.icon}
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${style.badge}`}>
                          {metric.frequency}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm leading-snug tracking-tight">
                        {metric.kpi}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <p className="text-slate-300 text-xs leading-relaxed font-normal">
                        {metric.whyItMatters}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cleaner CTA Bar: 1 Strong Primary + 1 Subtle Secondary */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleRetakeQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <button
            onClick={() => setIsLeadModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold shadow-xl shadow-brand-500/20 transition-all hover:scale-105 active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Build My Social Strategy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-xl mx-auto">
          {results.disclaimer}
        </p>
      </section>

      {/* STAGE 5: INTERACTIVE AI CONSULTANT */}
      <AskAIConsultant
        business={
          business || {
            businessName: activeBusinessName,
            description: "Innovative commercial brand",
            industry: results.answers.industry,
            mainProduct: "Core Offering",
            targetGeo: "National",
          }
        }
        quizAnswers={results.answers}
        extension={
          extension || {
            businessModel: "b2b",
            currentPresence: "sporadic",
            marketingChallenge: "leads_sales",
            monthlyBudget: "zero",
          }
        }
        scoringResults={results}
        snapshot={
          snapshot || {
            positioning: `${activeBusinessName} delivers specialized value in ${activeIndustryLabel}.`,
            audienceProfile: results.answerLabels.audience,
            marketingObjective: results.answerLabels.goal,
            contentOpportunities: ["Client case studies", "Educational breakdowns"],
            mainConstraints: [`Bandwidth capped at ${results.strategy30Day.weeklyTimeBudget}`],
            verifiedFromWebsite: false,
          }
        }
        strategy={
          strategy || {
            strategicSummary: `${activeBusinessName} should prioritize ${primaryMeta.name} for 70% of creative distribution.`,
            primaryPlatformStrategy: {
              whyMain: `${primaryMeta.name} has the highest demographic overlap.`,
              supportsGoal: `Directly drives ${results.answerLabels.goal.toLowerCase()}.`,
              audienceReach: `High concentration of ideal buyers.`,
              formatsToPrioritize: ["Short videos", "Carousels"],
            },
            secondaryPlatformStrategy: {
              whyComplements: `${secondaryMeta.name} is a high-leverage syndication channel.`,
              repurposingApproach: "Direct 1-click cross-posting.",
              additionalValue: "Syndicated reach.",
            },
            strategicConsiderations: [],
            contentPillars: [],
            contentIdeas: [],
            successMetrics: [],
            isAIEnhanced: false,
            engineModelUsed: "Deterministic Strategy Engine",
          }
        }
        onStrategyUpdate={handleUpdateStrategy}
      />

      {/* Lead Capture Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        primaryPlatform={primaryResult.platformId}
        answers={results.answers}
      />
    </div>
  );
}
