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
  TrendingUp,
  Swords,
  AlertTriangle,
  Award,
  Check,
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

type ResultsTab = "channels" | "competitors" | "roadmap";

export default function ResultsPage() {
  const router = useRouter();

  const [results, setResults] = useState<RecommendationEngineResult | null>(null);
  const [business, setBusiness] = useState<BusinessDiscovery | null>(null);
  const [extension, setExtension] = useState<MarketingAssessmentExtension | null>(null);
  const [snapshot, setSnapshot] = useState<BusinessSnapshot | null>(null);
  const [strategy, setStrategy] = useState<AIStrategyOutput | null>(null);

  const [activeTab, setActiveTab] = useState<ResultsTab>("channels");
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);
  const [isAllIdeasExpanded, setIsAllIdeasExpanded] = useState(false);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
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
          spread: 65,
          origin: { y: 0.55 },
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

  // Graceful empty state
  if (!results || !results.rankedPlatforms || results.rankedPlatforms.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF9F6]">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#002D72]/10 text-[#002D72] flex items-center justify-center mx-auto shadow-sm">
            <Info className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">No Active Session</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              We couldn&apos;t find your diagnostic data. Take the 3-minute quiz to generate your custom strategy.
            </p>
          </div>
          <Link
            href="/quiz"
            className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#002D72] hover:bg-[#001C48] text-white font-black text-sm rounded-full shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#FFB81C]" />
            <span>Start Diagnostic Quiz</span>
          </Link>
        </div>
      </div>
    );
  }

  const primaryResult = results.rankedPlatforms[0];
  const secondaryResult = results.rankedPlatforms[1];
  const primaryMeta = PLATFORMS_DATA[primaryResult.platformId];
  const secondaryMeta = PLATFORMS_DATA[secondaryResult.platformId];

  const activeBusinessName = business?.businessName || "Your Brand";
  const activeIndustryLabel = results.answerLabels.industry;

  return (
    <div className="flex-1 flex flex-col py-6 sm:py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 bg-[#FAF9F6] text-slate-900">
      
      {/* =====================================================================
          1. CLEAN EXECUTIVE HERO HEADER
          ===================================================================== */}
      <section className="bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002D72]/10 text-[#002D72] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#002D72]" />
              Pace Marketing Lab Report
            </span>
            <span className="text-xs font-bold text-slate-400">•</span>
            <span className="text-xs font-bold text-slate-600">{activeIndustryLabel}</span>
          </div>

          <button
            onClick={handleRetakeQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-bold transition-all self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#002D72]" />
            <span>Retake Quiz</span>
          </button>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Strategic Social Match for{" "}
            <span className="text-[#002D72]">
              {activeBusinessName}
            </span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Optimized for <strong className="text-slate-900">{results.answerLabels.audience}</strong> with a focus on{" "}
            <strong className="text-slate-900">{results.answerLabels.goal}</strong> within a{" "}
            <strong className="text-slate-900">{results.strategy30Day.weeklyTimeBudget}</strong> weekly execution limit.
          </p>
        </div>

        {/* Top 2 Platforms Executive Snapshot (Clean High-Contrast Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* #1 Primary Platform */}
          <div className="bg-[#FAF9F6] rounded-[2rem] p-5 sm:p-6 border-2 border-[#002D72] space-y-3 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: primaryMeta.brandColor }}
                >
                  <SocialIcon platform={primaryResult.platformId} size={24} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-lg sm:text-xl text-slate-950">{primaryMeta.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#002D72] text-white text-[10px] font-black uppercase">
                      #1 Primary
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">70% Effort • Original Content Engine</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-[#002D72]">{primaryResult.score}%</span>
                <span className="block text-[10px] text-emerald-700 font-bold uppercase">Optimal Fit</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2">
              {primaryResult.explanation.detailedRationale}
            </p>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Cadence: {primaryResult.explanation.suggestedFrequency.split(".")[0]}</span>
              <span className="text-[#002D72] font-black">Core Channel</span>
            </div>
          </div>

          {/* #2 Secondary Synergy Platform */}
          <div className="bg-[#FAF9F6] rounded-[2rem] p-5 sm:p-6 border border-slate-200 space-y-3 relative overflow-hidden shadow-sm">
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
                    <h3 className="font-black text-lg sm:text-xl text-slate-950">{secondaryMeta.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase">
                      #2 Synergy
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">30% Effort • Syndication Channel</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-slate-900">{secondaryResult.score}%</span>
                <span className="block text-[10px] text-sky-700 font-bold uppercase">High Synergy</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium leading-relaxed line-clamp-2">
              {secondaryResult.explanation.detailedRationale}
            </p>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Cadence: {secondaryResult.explanation.suggestedFrequency.split(".")[0]}</span>
              <span className="text-sky-700 font-black">Cross-Post</span>
            </div>
          </div>
        </div>

        {/* Commitment Badge */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#002D72]" />
            <span>
              Target schedule: <strong>{results.strategy30Day.cadenceSummary}</strong> ({results.strategy30Day.weeklyTimeBudget})
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Anti-burnout calibrated
          </span>
        </div>
      </section>

      {/* =====================================================================
          2. LINKTREE-STYLE SECTION SWITCHER (Tabs eliminate chaotic scrolling!)
          ===================================================================== */}
      <div className="flex items-center justify-center">
        <div className="p-1.5 bg-white rounded-full border border-slate-200 shadow-sm flex items-center gap-1 max-w-xl w-full">
          <button
            onClick={() => setActiveTab("channels")}
            className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === "channels"
                ? "bg-[#002D72] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Channel Fit (6)</span>
          </button>

          <button
            onClick={() => setActiveTab("competitors")}
            className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === "competitors"
                ? "bg-[#002D72] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Competitor Gaps</span>
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 ${
              activeTab === "roadmap"
                ? "bg-[#002D72] text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>30-Day Playbook</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: CHANNEL FIT & FULL 6-NETWORK RANKING
          ===================================================================== */}
      {activeTab === "channels" && (
        <div className="space-y-6 animate-fade-in">
          {/* Complete 6-Platform Ranking Accordion */}
          <section className="bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Complete 6-Platform Compatibility Rankings
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Click any platform to inspect dimensional audience, goal, and content scores.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">Deterministic algorithm</span>
            </div>

            <div className="divide-y divide-slate-100">
              {results.rankedPlatforms.map((item) => {
                const meta = PLATFORMS_DATA[item.platformId];
                const isExpanded = expandedPlatform === item.platformId;

                return (
                  <div key={item.platformId} className="py-3">
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
                              <span className="px-2 py-0.5 rounded-full bg-[#002D72] text-white text-[10px] font-black">
                                Primary
                              </span>
                            )}
                            {item.isSecondary && !item.isPrimary && (
                              <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black">
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
                          <ScoreProgressBar score={item.score} heightClass="h-2" />
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
                      <div className="mt-2 p-5 bg-[#FAF9F6] border border-slate-200 rounded-2xl space-y-3 text-xs text-slate-700 animate-fade-in">
                        <p className="leading-relaxed font-medium">{item.explanation.detailedRationale}</p>
                        
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                            <span className="text-slate-400 block text-[10px] font-bold uppercase">Audience</span>
                            <span className="font-black text-slate-900 text-sm">{item.dimensionScores.audience}/100</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                            <span className="text-slate-400 block text-[10px] font-bold uppercase">Goal</span>
                            <span className="font-black text-slate-900 text-sm">{item.dimensionScores.goal}/100</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                            <span className="text-slate-400 block text-[10px] font-bold uppercase">Content</span>
                            <span className="font-black text-slate-900 text-sm">{item.dimensionScores.content}/100</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                          <strong>Operational Trade-off:</strong> {item.explanation.limitations[0]}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Positioning Summary Card */}
          {snapshot && (
            <div className="bg-white rounded-[2.2rem] p-6 border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#002D72] uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Audience &amp; Positioning Anchor</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-400 text-[10px] uppercase">Positioning</span>
                  <p className="text-slate-800 font-medium leading-relaxed">{snapshot.positioning}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-400 text-[10px] uppercase">Buyer Profile</span>
                  <p className="text-slate-800 font-medium leading-relaxed">{snapshot.audienceProfile}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-black text-slate-400 text-[10px] uppercase">Marketing Goal</span>
                  <p className="text-slate-800 font-medium leading-relaxed">{snapshot.marketingObjective}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 2: COMPETITOR INTELLIGENCE (Clean, Scannable & Structured!)
          ===================================================================== */}
      {activeTab === "competitors" && strategy?.competitorBenchmark && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Clean Archetype Comparison Cards */}
          <section className="bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Industry Competitor Archetypes
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  How competitors typically market in {activeIndustryLabel}, and how {activeBusinessName} wins.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">Competitive Benchmark</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {strategy.competitorBenchmark.benchmarkedCompetitors?.map((comp, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] rounded-[2rem] p-6 border border-slate-200 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#855B00] px-2.5 py-0.5 rounded-full bg-[#FFB81C]/25">
                        {comp.type}
                      </span>
                      <h3 className="font-black text-base sm:text-lg text-slate-950 mt-1">
                        {comp.name}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Archetype 0{idx + 1}</span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {comp.behaviorSummary || comp.contentStrategy}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                    {/* Limitation */}
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-0.5">
                      <span className="text-[10px] font-black text-rose-800 uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Their Blindspot
                      </span>
                      <p className="text-rose-950 font-medium leading-relaxed">
                        {comp.limitations || comp.primaryFlaw}
                      </p>
                    </div>

                    {/* How We Differentiate */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-0.5">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-600" />
                        Your Unfair Advantage
                      </span>
                      <p className="text-emerald-950 font-medium leading-relaxed">
                        {comp.differentiation || comp.ourCounterStrategy}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clean Head-to-Head Comparison Table */}
          {strategy.competitorBenchmark.headToHeadComparison && (
            <section className="bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-950">
                Head-to-Head Strategic Differences
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-600 uppercase">
                      <th className="py-3 px-4">Dimension</th>
                      <th className="py-3 px-4 text-rose-700">Typical Competitor Approach</th>
                      <th className="py-3 px-4 text-[#002D72] bg-[#002D72]/5">Your Recommended Approach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {strategy.competitorBenchmark.headToHeadComparison.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{row.dimension}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium leading-relaxed">
                          <span className="text-rose-600 font-bold mr-1.5">✕</span>
                          {row.competitorsApproach}
                        </td>
                        <td className="py-3.5 px-4 text-slate-900 font-bold leading-relaxed bg-[#002D72]/[0.02]">
                          <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                          {row.yourAdvantage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 3 Actionable Market Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-sm">
              <span className="text-[10px] font-black text-[#855B00] uppercase bg-[#FFB81C]/25 px-2.5 py-0.5 rounded-full">
                01. Competitor Pattern
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {strategy.competitorBenchmark.marketOpportunities?.pattern || strategy.competitorBenchmark.industryLandscape}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-sm">
              <span className="text-[10px] font-black text-sky-800 uppercase bg-sky-100 px-2.5 py-0.5 rounded-full">
                02. Market Gap
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {strategy.competitorBenchmark.marketOpportunities?.marketGap || strategy.competitorBenchmark.competitorGap}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-sm">
              <span className="text-[10px] font-black text-emerald-800 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full">
                03. Your Whitespace
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {strategy.competitorBenchmark.marketOpportunities?.brandOpportunity || strategy.competitorBenchmark.whitespaceAdvantage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: 30-DAY GROWTH PLAYBOOK (Clean Execution Roadmap)
          ===================================================================== */}
      {activeTab === "roadmap" && (
        <div className="space-y-6 animate-fade-in">
          
          {/* 30-Day Execution Milestones (3 Phases) */}
          <section className="bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  30-Day Execution Timeline
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Step-by-step implementation milestones calibrated to your weekly time budget.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">{results.strategy30Day.weeklyTimeBudget}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.strategy30Day.roadmap.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-[#002D72] text-white flex items-center justify-center text-xs font-black">
                        0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                        {phase.timing}
                      </span>
                    </div>

                    <h3 className="font-black text-sm text-slate-950">{phase.phase}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {phase.focus}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-700">
                    {phase.actions.slice(0, 2).map((act, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-[11px]">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3 Ready-to-Use Content Concepts */}
          <section className="bg-white rounded-[2.5rem] p-6 sm:p-9 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  Ready-to-Execute Content Concepts
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  High-converting hooks and formats engineered for your top platform.
                </p>
              </div>
              <button
                onClick={() => setIsAllIdeasExpanded(!isAllIdeasExpanded)}
                className="text-xs font-bold text-[#002D72] hover:text-[#001C48]"
              >
                {isAllIdeasExpanded ? "Top 3" : "View All"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(isAllIdeasExpanded && strategy?.contentIdeas
                ? strategy.contentIdeas
                : results.strategy30Day.personalizedIdeas
              ).slice(0, isAllIdeasExpanded ? 6 : 3).map((idea, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#002D72]/10 text-[#002D72]">
                      Concept 0{idx + 1}
                    </span>
                    <h4 className="font-black text-sm text-slate-950">{idea.title}</h4>
                    <p className="text-xs text-slate-600 italic font-medium leading-relaxed">
                      &ldquo;{idea.hook}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Format:</span>
                    <span className="text-slate-900 font-bold truncate max-w-[170px]">{idea.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Validation Metrics (KPIs) */}
          {strategy?.successMetrics && strategy.successMetrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {strategy.successMetrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-1.5 shadow-sm">
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    {metric.frequency}
                  </span>
                  <h4 className="font-black text-xs text-slate-950">{metric.kpi}</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{metric.whyItMatters}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          3. INTERACTIVE AI CONSULTANT (Clean & Non-Intrusive)
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
            businessModel: "b2c",
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

      {/* =====================================================================
          4. ACTION BAR (Linktree-Style Pill Button)
          ===================================================================== */}
      <div className="p-6 bg-white rounded-[2.5rem] border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="font-black text-slate-950 text-sm">Want Our Student Lab to Execute This For You?</h4>
          <p className="text-xs text-slate-500 font-medium">Get hands-on help with video hooks, editorial schedules, and channel setup.</p>
        </div>

        <button
          onClick={() => setIsLeadModalOpen(true)}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-[#FFB81C]" />
          <span>Work With Our Team</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Academic Disclaimer */}
      <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-xl mx-auto font-medium">
        {results.disclaimer}
      </p>

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
