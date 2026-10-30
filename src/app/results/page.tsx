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
import { RecommendationEngineResult } from "@/lib/recommendation-engine";
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
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#002D72", "#FFB81C", "#10B981", "#3B82F6"],
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
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FAF9F6]">
        <div className="animate-spin w-9 h-9 border-4 border-[#002D72] border-t-transparent rounded-full" />
      </div>
    );
  }

  // Graceful empty/invalid session state
  if (!results || !results.rankedPlatforms || results.rankedPlatforms.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF9F6]">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#002D72]/10 text-[#002D72] flex items-center justify-center mx-auto shadow-sm">
            <Info className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">No Active Consultation Session</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              We couldn&apos;t find your diagnostic data in this session. Complete the 3-minute business
              discovery to get your tailored AI social media roadmap.
            </p>
          </div>
          <Link
            href="/quiz"
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#002D72] hover:bg-[#001C48] text-white font-black text-sm rounded-full shadow-lg transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-[#FFB81C]" />
            <span>Start Consultation Quiz</span>
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
    <div className="flex-1 flex flex-col py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12 bg-[#FAF9F6] text-slate-900">
      
      {/* =====================================================================
          HEADER BANNER & PERSONALIZED HEADLINE (Linktree Aesthetic)
          ===================================================================== */}
      <section className="space-y-5 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-slate-200 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-[#002D72] text-xs font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB81C]" />
              <span>Pace Marketing Lab • Strategic Report</span>
            </div>
            {isAIEnhanced ? (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#002D72]/10 text-[#002D72] border border-[#002D72]/20 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[#002D72]" />
                <span>AI Enhanced ({strategy?.engineModelUsed || "Gemini Free Tier"})</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200 flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Deterministic Scoring Engine</span>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Strategic Roadmap for{" "}
            <span className="text-[#002D72] underline decoration-[#FFB81C] decoration-4 underline-offset-4">
              {activeBusinessName}
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Custom calibrated for <strong className="text-slate-900 font-bold">{results.answerLabels.audience}</strong> with a core focus on{" "}
            <strong className="text-slate-900 font-bold">{results.answerLabels.goal}</strong> within a{" "}
            <strong className="text-slate-900 font-bold">{results.strategy30Day.weeklyTimeBudget}</strong> weekly execution bandwidth.
          </p>
        </div>

        <button
          onClick={handleRetakeQuiz}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-950 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] self-center sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#002D72]" />
          <span>Retake Quiz</span>
        </button>
      </section>

      {/* =====================================================================
          BUSINESS POSITIONING SNAPSHOT (Linktree-Style Rounded Bento Card)
          ===================================================================== */}
      {snapshot && (
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#002D72]/10 text-[#002D72] flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-950">
                  Business Positioning Profile
                </h2>
                <span className="text-xs text-slate-500 font-semibold">
                  {activeBusinessName} • {activeIndustryLabel}
                </span>
              </div>
            </div>

            {snapshot.verifiedFromWebsite && (
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Website Verified</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 space-y-1.5">
              <span className="font-black text-slate-400 uppercase tracking-wider text-[10px] block">
                Brand Positioning
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{snapshot.positioning}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 space-y-1.5">
              <span className="font-black text-slate-400 uppercase tracking-wider text-[10px] block">
                Target Buyer Profile
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{snapshot.audienceProfile}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-slate-200/80 space-y-1.5">
              <span className="font-black text-slate-400 uppercase tracking-wider text-[10px] block">
                Primary Marketing Goal
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">{snapshot.marketingObjective}</p>
            </div>
          </div>
        </section>
      )}

      {/* Strategic Considerations Callout */}
      {strategy && strategy.strategicConsiderations && strategy.strategicConsiderations.length > 0 && (
        <section className="bg-white rounded-[2rem] border border-slate-200 p-6 text-xs sm:text-sm text-slate-700 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-[#002D72] font-black text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#002D72]" />
            <span>AI Strategic Considerations</span>
          </div>
          <ul className="space-y-2 pl-1">
            {strategy.strategicConsiderations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed font-medium">
                <span className="w-2 h-2 rounded-full bg-[#002D72] mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* =====================================================================
          TOP 3 RECOMMENDATION CARDS (Linktree Bento Layout)
          ===================================================================== */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002D72]/10 text-[#002D72] font-bold text-xs uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Algorithmic Matching Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Top Ranked Platform Matches
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Computed deterministically by demographic overlap, algorithmic intent, and your weekly time budget.
          </p>
        </div>

        {/* Primary Platform Hero Card (#1) */}
        <div className="bg-white rounded-[2.5rem] border-2 border-[#002D72] shadow-xl p-7 sm:p-10 space-y-7 relative overflow-hidden group">
          {/* Top Pill Badge */}
          <div className="absolute top-0 right-0">
            <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-bl-3xl bg-[#002D72] text-white font-black text-xs tracking-wider uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB81C]" />
              Primary Growth Engine • #1 Match
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-3">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                style={{ backgroundColor: primaryMeta.brandColor }}
              >
                <SocialIcon platform={primaryResult.platformId} size={32} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {primaryMeta.name}
                  </h3>
                  <span className="px-3 py-0.5 rounded-full bg-[#002D72]/10 text-[#002D72] border border-[#002D72]/20 text-xs font-bold">
                    Primary Engine
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">{primaryMeta.tagline}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1.5 sm:justify-end">
                <span className="text-4xl sm:text-5xl font-black text-[#002D72]">
                  {primaryResult.score}%
                </span>
                <span className="text-xs text-slate-400 font-black uppercase">Compatibility</span>
              </div>
              <div className="w-44 mt-1.5 sm:ml-auto">
                <ScoreProgressBar score={primaryResult.score} />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#002D72]">
              Why {primaryMeta.name} is Your #1 Channel
            </h4>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
              {primaryResult.explanation.detailedRationale}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700 font-black text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strategic Advantages</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {primaryResult.explanation.topMatchingAttributes.map((attr, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                    <span className="font-medium">{attr}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-800 font-black text-xs">
                <Clock className="w-4 h-4 text-[#002D72]" />
                <span>Sustainable Cadence</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {primaryResult.explanation.suggestedFrequency}
              </p>
              <div className="pt-1.5 text-[11px] text-amber-700 font-bold bg-amber-50 p-2 rounded-xl border border-amber-200">
                <strong>Limitation to manage:</strong> {primaryResult.explanation.limitations[0]}
              </div>
            </div>
          </div>
        </div>

        {/* Secondary (#2) & Tertiary (#3) Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Rank #2 */}
          <div className="bg-white rounded-[2.2rem] border border-slate-200/90 shadow-md hover:shadow-xl p-7 space-y-5 flex flex-col justify-between transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: secondaryMeta.brandColor }}
                  >
                    <SocialIcon platform={secondaryResult.platformId} size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-950">{secondaryMeta.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
                        Rank #2 • Synergy
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{secondaryMeta.tagline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-950">{secondaryResult.score}%</span>
                </div>
              </div>

              <ScoreProgressBar score={secondaryResult.score} heightClass="h-2" />

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {secondaryResult.explanation.detailedRationale}
              </p>

              <div className="p-3.5 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Suggested Rhythm:</span>
                <p className="text-slate-600 font-medium">{secondaryResult.explanation.suggestedFrequency}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Top Strength:</span>
              <span className="font-bold text-slate-900 truncate max-w-[200px]">
                {secondaryResult.explanation.topMatchingAttributes[0].split(":")[0]}
              </span>
            </div>
          </div>

          {/* Rank #3 */}
          <div className="bg-white rounded-[2.2rem] border border-slate-200/90 shadow-md hover:shadow-xl p-7 space-y-5 flex flex-col justify-between transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                    style={{ backgroundColor: tertiaryMeta.brandColor }}
                  >
                    <SocialIcon platform={tertiaryResult.platformId} size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-950">{tertiaryMeta.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
                        Rank #3
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{tertiaryMeta.tagline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-950">{tertiaryResult.score}%</span>
                </div>
              </div>

              <ScoreProgressBar score={tertiaryResult.score} heightClass="h-2" />

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {tertiaryResult.explanation.detailedRationale}
              </p>

              <div className="p-3.5 bg-[#FAF9F6] border border-slate-200 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Suggested Rhythm:</span>
                <p className="text-slate-600 font-medium">{tertiaryResult.explanation.suggestedFrequency}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Top Strength:</span>
              <span className="font-bold text-slate-900 truncate max-w-[200px]">
                {tertiaryResult.explanation.topMatchingAttributes[0].split(":")[0]}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMPLETE 6-PLATFORM RANKING ACCORDION
          ===================================================================== */}
      <section className="space-y-4 bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-md">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-slate-950">
            Complete 6-Platform Compatibility Rankings
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Compare all evaluated networks. Click any platform to view its dimensional breakdown and operational trade-offs.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {results.rankedPlatforms.map((item) => {
            const meta = PLATFORMS_DATA[item.platformId];
            const isExpanded = expandedPlatform === item.platformId;

            return (
              <div key={item.platformId} className="py-3.5">
                <div
                  onClick={() =>
                    setExpandedPlatform((curr) => (curr === item.platformId ? null : item.platformId))
                  }
                  className="flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 p-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 text-center font-black text-sm text-slate-400">
                      #{item.rank}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: meta.brandColor }}
                    >
                      <SocialIcon platform={item.platformId} size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-950 text-sm sm:text-base">
                          {meta.name}
                        </span>
                        {item.isPrimary && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black">
                            Primary
                          </span>
                        )}
                        {item.isSecondary && !item.isPrimary && (
                          <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-black">
                            Synergy
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 hidden sm:inline-block font-medium">
                        {meta.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-24 sm:w-32 hidden xs:block">
                      <ScoreProgressBar score={item.score} heightClass="h-1.5" />
                    </div>
                    <span className="font-black text-slate-950 text-base sm:text-lg min-w-[48px] text-right">
                      {item.score}%
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 p-5 bg-[#FAF9F6] border border-slate-200 rounded-2xl space-y-3 text-xs text-slate-700 animate-fade-in">
                    <p className="leading-relaxed font-medium">{item.explanation.detailedRationale}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Audience Fit</span>
                        <span className="font-black text-slate-900 text-sm">{item.dimensionScores.audience}/100</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Goal Fit</span>
                        <span className="font-black text-slate-900 text-sm">{item.dimensionScores.goal}/100</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Content Fit</span>
                        <span className="font-black text-slate-900 text-sm">{item.dimensionScores.content}/100</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 font-medium">
                      <strong className="text-slate-700">Operational limitations to note:</strong> {item.explanation.limitations.join(" • ")}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          COMPETITIVE LANDSCAPE & STRATEGIC BENCHMARK (Linktree Style)
          ===================================================================== */}
      {strategy?.competitorBenchmark && (
        <section className="bg-white text-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8 relative overflow-hidden">
          {/* Top ambient accent strip */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#FFB81C] via-[#002D72] to-emerald-500" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#FFB81C]/20 text-[#855B00] flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#855B00] bg-[#FFB81C]/25 px-2.5 py-0.5 rounded-full">
                    Competitor Intelligence
                  </span>
                  <span className="text-xs text-slate-500 font-bold">• {activeIndustryLabel}</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight mt-1">
                  Competitive Landscape &amp; Strategic Benchmark
                </h2>
              </div>
            </div>

            <span className="self-start sm:self-auto px-4 py-1.5 rounded-full text-xs font-bold bg-[#FAF9F6] text-slate-700 border border-slate-200 flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Industry-Based Benchmark</span>
            </span>
          </div>

          {/* A. COMPETITIVE LANDSCAPE: ARCHETYPE CARDS */}
          {strategy.competitorBenchmark.benchmarkedCompetitors &&
            strategy.competitorBenchmark.benchmarkedCompetitors.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#002D72]" />
                    <span>Competitive Landscape: Industry Archetypes</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Diagnosing competitor patterns, structural blind spots, and differentiation vectors
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {strategy.competitorBenchmark.benchmarkedCompetitors.map((comp, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF9F6] border border-slate-200 hover:border-slate-300 rounded-[2rem] p-6 space-y-4 flex flex-col justify-between shadow-sm transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#855B00] px-2.5 py-0.5 rounded-full bg-[#FFB81C]/25 border border-[#FFB81C]/40">
                              {comp.type}
                            </span>
                            <h4 className="text-base font-black text-slate-950 tracking-tight mt-1.5">
                              {comp.name}
                            </h4>
                          </div>
                          <span className="text-[10px] font-black text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                            Archetype 0{idx + 1}
                          </span>
                        </div>

                        <div className="text-xs text-slate-700 bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1">
                          <span className="text-slate-400 font-black block text-[10px] uppercase tracking-wider">
                            Typical Competitor Approach:
                          </span>
                          <span className="text-slate-800 leading-relaxed block font-medium">
                            {comp.behaviorSummary || comp.channelFocus}
                          </span>
                        </div>

                        {comp.contentStrategy && (
                          <div className="text-xs text-slate-700 bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1">
                            <span className="text-slate-400 font-black block text-[10px] uppercase tracking-wider">
                              Content Strategy Pattern:
                            </span>
                            <span className="text-slate-800 leading-relaxed block font-medium">
                              {comp.contentStrategy}
                            </span>
                          </div>
                        )}

                        {/* Weakness */}
                        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 space-y-1">
                          <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Strategic Limitation / Weakness</span>
                          </div>
                          <p className="text-xs text-rose-900 leading-relaxed font-medium">
                            {comp.limitations || comp.primaryFlaw}
                          </p>
                        </div>
                      </div>

                      {/* How Brand Differentiates */}
                      <div className="pt-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                          <Zap className="w-3.5 h-3.5 text-emerald-600" />
                          <span>How {activeBusinessName} Differentiates</span>
                        </div>
                        <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                          {comp.differentiation || comp.ourCounterStrategy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* B. HEAD-TO-HEAD COMPARISON MATRIX */}
          {strategy.competitorBenchmark.headToHeadComparison &&
            strategy.competitorBenchmark.headToHeadComparison.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Head-to-Head Comparison: Competitor Norms vs. Recommended Strategy</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Evaluating tactical differences across content, audience engagement, and conversion
                  </span>
                </div>

                <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-black text-slate-600 uppercase tracking-wider">
                        <th className="py-3.5 px-5">Strategic Dimension</th>
                        <th className="py-3.5 px-5 text-rose-700">Typical Competitor Approach</th>
                        <th className="py-3.5 px-5 text-[#002D72] bg-[#002D72]/5">
                          Recommended Approach for {activeBusinessName}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {strategy.competitorBenchmark.headToHeadComparison.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">
                            {row.dimension}
                          </td>
                          <td className="py-4 px-5 text-slate-600 leading-relaxed font-medium">
                            <div className="flex items-start gap-2">
                              <span className="text-rose-600 font-black mt-0.5">✕</span>
                              <span>{row.competitorsApproach}</span>
                            </div>
                          </td>
                          <td className="py-4 px-5 text-slate-900 font-semibold leading-relaxed bg-[#002D72]/[0.02]">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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

          {/* C. THREE SPECIFIC MARKET OPPORTUNITIES */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Actionable Market Opportunities
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                Strategic openings derived from archetype behavior analysis
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#855B00] px-2.5 py-0.5 rounded-full bg-[#FFB81C]/25 border border-[#FFB81C]/40">
                  Opportunity 01
                </span>
                <h4 className="text-sm font-black text-slate-900">1. Competitor Pattern</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {strategy.competitorBenchmark.marketOpportunities?.pattern || strategy.competitorBenchmark.industryLandscape}
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-200">
                  Opportunity 02
                </span>
                <h4 className="text-sm font-black text-slate-900">2. Potential Market Gap</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {strategy.competitorBenchmark.marketOpportunities?.marketGap || strategy.competitorBenchmark.competitorGap}
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                  Opportunity 03
                </span>
                <h4 className="text-sm font-black text-slate-900">3. Your Brand Whitespace</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {strategy.competitorBenchmark.marketOpportunities?.brandOpportunity || strategy.competitorBenchmark.whitespaceAdvantage}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-2 font-medium">
              Strategic benchmark calculated from industry archetypes, target buyer behaviors, and operational limits.
            </p>
          </div>
        </section>
      )}

      {/* =====================================================================
          4-LAYER 30-DAY GROWTH ROADMAP (Linktree Light Aesthetic)
          ===================================================================== */}
      <section className="bg-white text-slate-900 rounded-[2.5rem] p-6 sm:p-10 space-y-9 border border-slate-200/90 shadow-xl relative overflow-hidden">
        {/* Top ambient accent strip */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#002D72] via-[#FFB81C] to-emerald-500" />

        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#002D72]/10 text-[#002D72] text-xs font-bold border border-[#002D72]/20">
            <Calendar className="w-3.5 h-3.5 text-[#002D72]" />
            <span>Tactical Playbook</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            30-Day Growth Roadmap
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl leading-relaxed font-medium">
            A high-leverage execution roadmap calibrated to your team&apos;s available hours.
          </p>
        </div>

        {/* LAYER 1: At-a-Glance Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-slate-200 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Primary Platform
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: PLATFORMS_DATA[results.strategy30Day.primaryPlatform].brandColor }}
              >
                <SocialIcon platform={results.strategy30Day.primaryPlatform} size={15} className="text-white" />
              </div>
              <span className="font-black text-sm sm:text-base text-slate-900 truncate">
                {PLATFORMS_DATA[results.strategy30Day.primaryPlatform].name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-800">
                #1
              </span>
            </div>
          </div>

          <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-slate-200 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Secondary Platform
            </span>
            <div className="flex items-center gap-2 mt-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].brandColor }}
              >
                <SocialIcon platform={results.strategy30Day.secondaryPlatform} size={15} className="text-white" />
              </div>
              <span className="font-black text-sm sm:text-base text-slate-900 truncate">
                {PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-sky-100 text-sky-800">
                Synergy
              </span>
            </div>
          </div>

          <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-slate-200 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Weekly Cadence
            </span>
            <div className="mt-2">
              <span className="font-black text-sm sm:text-base text-slate-900 block truncate">
                {results.strategy30Day.cadenceSummary}
              </span>
              <p className="text-[10px] text-slate-500 font-semibold">Sustainable Pace</p>
            </div>
          </div>

          <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-slate-200 flex flex-col justify-between shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Time Budget
            </span>
            <div className="mt-2">
              <span className="font-black text-sm sm:text-base text-slate-900 block truncate">
                {results.strategy30Day.weeklyTimeBudget.split("/")[0]}
              </span>
              <p className="text-[10px] text-slate-500 font-semibold">Weekly Hours</p>
            </div>
          </div>
        </div>

        {/* LAYER 2: Platform Strategy (Two Compact Cards) */}
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Dual-Channel Strategy &amp; Effort Allocation
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Primary Platform Card */}
            <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between shadow-sm">
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
                      <h3 className="font-black text-base text-slate-950">
                        {PLATFORMS_DATA[results.strategy30Day.primaryPlatform].name}
                      </h3>
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                        Primary Growth Engine
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    70% Effort
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {results.strategy30Day.primaryWhy}
                </p>
              </div>
              <div className="pt-2.5 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Core Focus:</span>
                <span className="text-slate-900 font-bold">{results.strategy30Day.primaryEffort}</span>
              </div>
            </div>

            {/* Secondary Platform Card */}
            <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between shadow-sm">
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
                      <h3 className="font-black text-base text-slate-950">
                        {PLATFORMS_DATA[results.strategy30Day.secondaryPlatform].name}
                      </h3>
                      <span className="text-[10px] font-black text-sky-700 uppercase tracking-wider">
                        Syndication Channel
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-200">
                    30% Effort
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {results.strategy30Day.secondaryWhy}
                </p>
              </div>
              <div className="pt-2.5 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Core Focus:</span>
                <span className="text-slate-900 font-bold">{results.strategy30Day.secondaryEffort}</span>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 3: Content Ideas (3 Featured + View All 6+ Ideas) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
              Ready-to-Execute Content Concepts
            </div>
            <button
              onClick={() => setIsAllIdeasExpanded(!isAllIdeasExpanded)}
              className="inline-flex items-center gap-1 text-[11px] text-[#002D72] hover:text-[#001C48] font-bold transition-colors"
            >
              <span>{isAllIdeasExpanded ? "Collapse to Top 3" : "View All 6 Concepts"}</span>
              {isAllIdeasExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(isAllIdeasExpanded && strategy && strategy.contentIdeas
              ? strategy.contentIdeas
              : results.strategy30Day.personalizedIdeas
            ).slice(0, isAllIdeasExpanded ? 6 : 3).map((idea, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#002D72]/10 text-[#002D72] border border-[#002D72]/20">
                      Concept 0{idx + 1}
                    </span>
                    {"platform" in idea && (
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        {PLATFORMS_DATA[idea.platform].name}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-950">{idea.title}</h4>
                  <p className="text-xs text-slate-600 italic leading-relaxed font-normal">
                    &ldquo;{idea.hook}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Format:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[170px]">{idea.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Goal:</span>
                    <span className="font-bold text-[#002D72] truncate max-w-[170px]">
                      {"strategicGoal" in idea ? idea.strategicGoal : (idea as { objective?: string }).objective}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tailored Content Pillars */}
        {strategy && strategy.contentPillars && strategy.contentPillars.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#002D72]/10 flex items-center justify-center text-[#002D72]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Tailored Content Pillars
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Core messaging angles built to educate, build trust, and convert
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategy.contentPillars.map((pillar, idx) => {
                const platformInfo = PLATFORMS_DATA[pillar.recommendedPlatform];

                return (
                  <div
                    key={idx}
                    className="bg-[#FAF9F6] rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white border border-slate-200 text-slate-700 shadow-sm">
                          Pillar 0{idx + 1}
                        </span>
                        
                        {platformInfo && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-[10px] font-bold text-slate-700 border border-slate-200">
                            <SocialIcon platform={pillar.recommendedPlatform} size={11} className="text-slate-800" />
                            <span>{platformInfo.name}</span>
                          </div>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-950 text-sm sm:text-base leading-snug group-hover:text-[#002D72] transition-colors">
                        {pillar.name}
                      </h4>

                      <p className="text-slate-600 text-xs leading-relaxed font-medium">
                        {pillar.purpose}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Target Channel</span>
                      <span className="font-bold text-slate-900">
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
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#002D72]/10 flex items-center justify-center text-[#002D72]">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                30-Day Milestone Timeline
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Phased roadmap to build momentum without operational overwhelm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.strategy30Day.roadmap.map((phase, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black bg-[#002D72] text-white">
                        0{idx + 1}
                      </span>
                      <h4 className="font-bold text-slate-950 text-sm sm:text-base">{phase.phase}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200 shadow-sm">
                      {phase.timing}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl px-3.5 py-2.5 border border-slate-200">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                      Core Objective
                    </span>
                    <p className="text-slate-800 text-xs font-semibold leading-relaxed">
                      {phase.focus}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Weekly Action Items
                  </span>
                  <ul className="space-y-2">
                    {phase.actions.slice(0, 3).map((act, actIdx) => (
                      <li key={actIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-600" />
                        <span className="flex-1">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics (Stage 4) */}
        {strategy && strategy.successMetrics && strategy.successMetrics.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Recommended Success Metrics (KPIs)
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Key validation signals to measure real audience response and conversion
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategy.successMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Target className="w-3.5 h-3.5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white border border-slate-200 text-slate-700">
                        {metric.frequency}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-950 text-sm leading-snug">
                      {metric.kpi}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                      {metric.whyItMatters}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cleaner CTA Bar: 1 Strong Primary + 1 Subtle Secondary */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleRetakeQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <button
            onClick={() => setIsLeadModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-sm font-black shadow-xl shadow-[#002D72]/20 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#FFB81C]" />
            <span>Get Personalized Agency Help</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Academic Disclaimer */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-xl mx-auto font-medium">
          {results.disclaimer}
        </p>
      </section>

      {/* =====================================================================
          STAGE 5: INTERACTIVE AI CONSULTANT (Clean Light Integration)
          ===================================================================== */}
      <AskAIConsultant
        business={
          business || {
            businessName: activeBusinessName,
            description: "Emerging commercial brand",
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
