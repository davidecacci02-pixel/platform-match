"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  RotateCcw,
  Sparkles,
  Compass,
  Layers,
  Clock,
  CheckCircle2,
  Swords,
  ShieldCheck,
} from "lucide-react";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { QuizAnswers } from "@/lib/quiz-schema";
import { QuizIcon } from "@/components/QuizIcon";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { buildDeterministicStrategy } from "@/lib/ai-strategy-service";
import { getAnswerLabel } from "@/lib/recommendation-explanations";
import {
  BusinessDiscovery,
  MarketingAssessmentExtension,
  BusinessSnapshot,
} from "@/lib/business-schema";
import {
  loadStoredAnswers,
  saveStoredAnswers,
  loadStoredStep,
  saveStoredStep,
  saveStoredResults,
  saveStoredStrategy,
  saveStoredBusiness,
  saveStoredExtension,
  saveStoredSnapshot,
  clearQuizSession,
  isQuizComplete,
} from "@/lib/session";

const ANALYSIS_STAGES = [
  {
    title: "Audience & Demographics Profiling",
    desc: "Cross-referencing target audience behavior and market benchmarks",
    icon: Compass,
  },
  {
    title: "Competitive Landscape & Benchmarking",
    desc: "Analyzing top industry competitor strategies, content saturation, and differentiation gaps",
    icon: Swords,
  },
  {
    title: "Channel Algorithm Compatibility",
    desc: "Testing format affinity across YouTube, Instagram, LinkedIn, TikTok & more",
    icon: Layers,
  },
  {
    title: "Capacity & Cadence Calibration",
    desc: "Optimizing weekly hours to ensure consistent execution without burnout",
    icon: Clock,
  },
  {
    title: "Synthesizing 30-Day Growth Roadmap",
    desc: "Structuring tailored content pillars, milestone timeline, and core KPIs",
    icon: Sparkles,
  },
];

export default function QuizPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const savedAnswers = loadStoredAnswers();
    const savedStep = loadStoredStep();

    if (savedAnswers && Object.keys(savedAnswers).length > 0) {
      setAnswers(savedAnswers);
    }

    if (savedStep && savedStep >= 1 && savedStep <= QUIZ_QUESTIONS.length) {
      setCurrentStep(savedStep - 1);
    }

    setIsInitialized(true);
  }, []);

  // Save answers & step to sessionStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    saveStoredAnswers(answers);
    saveStoredStep(currentStep + 1);
  }, [answers, currentStep, isInitialized]);

  // Fast, responsive 2.2s analyzing countdown before navigating to results (snappy & responsive)
  useEffect(() => {
    if (!isSubmitting) return;

    const totalDurationMs = 2200; // Snappy 2.2s duration (fast, no lag)
    const intervalMs = 40;
    const increment = (intervalMs / totalDurationMs) * 100;

    const interval = setInterval(() => {
      setSubmissionProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/results");
          }, 200);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isSubmitting, router]);

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (value: string) => {
    setErrorMessage(null);
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [currentQ.field]: value,
      };
      saveStoredAnswers(updated);
      return updated;
    });
  };

  const handleBack = () => {
    setErrorMessage(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const selectedAnswer = answers[currentQ.field];
    if (!selectedAnswer) {
      setErrorMessage("Please select an option to continue.");
      return;
    }
    setErrorMessage(null);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    if (!isQuizComplete(answers)) {
      setErrorMessage("Please answer all questions to complete your assessment.");
      return;
    }

    try {
      const validAnswers = answers as QuizAnswers;
      const scoringResults = calculatePlatformScores(validAnswers);

      const industryLabel = getAnswerLabel("industry", validAnswers.industry);
      const audienceLabel = getAnswerLabel("audience", validAnswers.audience);
      const goalLabel = getAnswerLabel("goal", validAnswers.goal);
      const timeLabel = getAnswerLabel("time", validAnswers.time);
      const personalityLabel = getAnswerLabel("personality", validAnswers.personality);

      const defaultBusiness: BusinessDiscovery = {
        businessName: "Your Brand",
        websiteUrl: "",
        description: `Brand operating in ${industryLabel} serving ${audienceLabel}.`,
        industry: validAnswers.industry,
        mainProduct: "Core Offering",
        targetGeo: "National",
      };

      const defaultExtension: MarketingAssessmentExtension = {
        businessModel: "b2c",
        currentPresence: "sporadic",
        marketingChallenge: "leads_sales",
        monthlyBudget: "500_to_2000",
      };

      const baseSnapshot: BusinessSnapshot = {
        positioning: `Targeting ${audienceLabel} in ${industryLabel} with high-leverage channel distribution.`,
        audienceProfile: audienceLabel,
        marketingObjective: goalLabel,
        contentOpportunities: [
          `Authority teardowns spotlighting core offerings`,
          `Educational breakdowns solving key pain points for ${audienceLabel}`,
          `Behind-the-scenes authenticity building organic trust`,
        ],
        mainConstraints: [
          `Weekly creation capacity: ${timeLabel}`,
          `Sustainable execution avoiding multi-channel burnout`,
        ],
        verifiedFromWebsite: false,
        extractedBrandVoice: `${personalityLabel} & engaging`,
      };

      const strategy = buildDeterministicStrategy({
        business: defaultBusiness,
        quizAnswers: validAnswers,
        extension: defaultExtension,
        scoringResults,
        snapshot: baseSnapshot,
      });

      saveStoredAnswers(validAnswers);
      saveStoredResults(scoringResults);
      saveStoredBusiness(defaultBusiness);
      saveStoredExtension(defaultExtension);
      saveStoredSnapshot(baseSnapshot);
      saveStoredStrategy(strategy);

      setSubmissionProgress(0);
      setIsSubmitting(true);
    } catch {
      setIsSubmitting(false);
      setErrorMessage("An error occurred while calculating results. Please try again.");
    }
  };

  const handleRestart = () => {
    clearQuizSession();
    setAnswers({});
    setCurrentStep(0);
    setSubmissionProgress(0);
    setIsSubmitting(false);
    setErrorMessage(null);
  };

  if (!isInitialized) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-[#FAF9F6]">
        <Loader2 className="w-8 h-8 text-[#002D72] animate-spin" />
      </div>
    );
  }

  // =========================================================================
  // PROCESSING / ANALYZING SCREEN (Clean Light Linktree + Pace Design)
  // =========================================================================
  if (isSubmitting) {
    const currentStage = Math.min(
      Math.floor((submissionProgress / 100) * ANALYSIS_STAGES.length),
      ANALYSIS_STAGES.length - 1
    );
    const ActiveIcon = ANALYSIS_STAGES[currentStage].icon;

    return (
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 bg-[#FAF9F6] text-slate-900">
        <div className="max-w-xl w-full bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-7 sm:p-10 space-y-7 text-center relative overflow-hidden animate-fade-in">
          {/* Top Pace Accent Bar */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#002D72] via-[#FFB81C] to-emerald-500" />

          {/* Glowing Animated Icon */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-[#002D72]/10 animate-ping opacity-60" />
            <div className="relative w-16 h-16 rounded-2xl bg-[#002D72] flex items-center justify-center text-white shadow-xl shadow-[#002D72]/20 border border-[#002D72]/30">
              <ActiveIcon className="w-8 h-8 text-[#FFB81C] animate-pulse" />
            </div>
          </div>

          {/* Heading & Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#002D72]/10 text-[#002D72] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#002D72] animate-spin" />
              <span>Analyzing Your Responses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Calculating Strategic Match...
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-normal">
              Processing your brand positioning, target audience, and top competitor benchmarks across 6 social algorithms.
            </p>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600">{ANALYSIS_STAGES[currentStage].title}</span>
              <span className="text-[#002D72] font-black text-sm">{Math.round(submissionProgress)}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-[#002D72] via-[#0A4694] to-[#FFB81C] rounded-full transition-all duration-100 ease-out"
                style={{ width: `${submissionProgress}%` }}
              />
            </div>
          </div>

          {/* Step-by-Step Analysis Checklist */}
          <div className="bg-[#FAF9F6] rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2 text-left">
            {ANALYSIS_STAGES.map((stage, idx) => {
              const isPast = idx < currentStage;
              const isCurrent = idx === currentStage;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-white shadow-sm border border-[#002D72]/30"
                      : isPast
                      ? "opacity-90"
                      : "opacity-40"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-[#002D72] animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isCurrent ? "text-[#002D72]" : isPast ? "text-slate-900" : "text-slate-500"
                        }`}
                      >
                        {stage.title}
                      </span>
                      {isPast && (
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                          Ready
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-black text-[#002D72] uppercase tracking-wider animate-pulse">
                          Processing
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug truncate mt-0.5">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Calibrated to your available weekly hours. Zero spam.</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // QUIZ QUESTIONS SCREEN (Clean Light Linktree + Pace Design)
  // =========================================================================
  return (
    <div className="flex-1 flex flex-col justify-between py-8 md:py-12 bg-[#FAF9F6] text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-6">
        
        {/* Navigation & Progress Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-extrabold text-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#002D72] animate-pulse" />
            <span>Strategic Diagnostic ({currentStep + 1} of {QUIZ_QUESTIONS.length})</span>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#002D72]" />
            <span>Reset</span>
          </button>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold">{errorMessage}</div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>
              Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-[#002D72] font-black">
              {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#002D72] to-[#0A4694] rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div key={currentQ.id} className="space-y-6 animate-fade-in">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {currentQ.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {currentQ.subtitle}
            </p>
          </div>

          {/* Option Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.field] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectOption(opt.value)}
                  className={`group text-left p-5 rounded-[1.8rem] border transition-all flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-white border-2 border-[#002D72] shadow-lg ring-2 ring-[#002D72]/15 -translate-y-0.5"
                      : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? "bg-[#002D72] text-white shadow-md shadow-[#002D72]/20"
                        : "bg-slate-100 text-slate-600 group-hover:bg-[#002D72]/10 group-hover:text-[#002D72]"
                    }`}
                  >
                    <QuizIcon name={opt.iconName} size={20} />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-black truncate ${
                          isSelected ? "text-[#002D72]" : "text-slate-900"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#002D72] text-white flex items-center justify-center text-[10px] shadow-sm">
                          <Check className="w-3 h-3 text-[#FFB81C]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white text-slate-700 text-xs font-bold transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#002D72] hover:bg-[#001C48] text-white text-sm font-black shadow-lg shadow-[#002D72]/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Calculating...</span>
                </>
              ) : currentStep === QUIZ_QUESTIONS.length - 1 ? (
                <>
                  <span>View My Results</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
