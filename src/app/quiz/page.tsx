"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { QuizAnswers, Industry } from "@/lib/quiz-schema";
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
  const [direction, setDirection] = useState<1 | -1>(1);
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

  // Handle smooth 6.5s analyzing countdown before navigating to results
  useEffect(() => {
    if (!isSubmitting) return;

    const totalDurationMs = 6500; // 6.5s total time
    const intervalMs = 50;
    const increment = (intervalMs / totalDurationMs) * 100;

    const interval = setInterval(() => {
      setSubmissionProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/results");
          }, 350);
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
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const selectedAnswer = answers[currentQ.field];
    if (!selectedAnswer) {
      setErrorMessage("Please select an answer choice to continue.");
      return;
    }
    setErrorMessage(null);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      // Completed all 6 questions -> Finalize & Launch Analysis
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    if (!isQuizComplete(answers)) {
      setErrorMessage("Please answer all questions to complete your assessment.");
      return;
    }

    try {
      // 1. Calculate deterministic platform compatibility scores
      const validAnswers = answers as QuizAnswers;
      const scoringResults = calculatePlatformScores(validAnswers);

      const industryLabel = getAnswerLabel("industry", validAnswers.industry);
      const audienceLabel = getAnswerLabel("audience", validAnswers.audience);
      const goalLabel = getAnswerLabel("goal", validAnswers.goal);
      const timeLabel = getAnswerLabel("time", validAnswers.time);
      const personalityLabel = getAnswerLabel("personality", validAnswers.personality);

      // 2. Setup baseline context
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

      // 3. Build comprehensive deterministic 30-day strategy
      const strategy = buildDeterministicStrategy({
        business: defaultBusiness,
        quizAnswers: validAnswers,
        extension: defaultExtension,
        scoringResults,
        snapshot: baseSnapshot,
      });

      // 4. Save to session storage
      saveStoredAnswers(validAnswers);
      saveStoredResults(scoringResults);
      saveStoredBusiness(defaultBusiness);
      saveStoredExtension(defaultExtension);
      saveStoredSnapshot(baseSnapshot);
      saveStoredStrategy(strategy);

      // 5. Trigger visual analysis state (runs for 6.5s)
      setSubmissionProgress(0);
      setIsSubmitting(true);
    } catch (err: unknown) {
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
      <div className="flex-1 flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  // Active 6.5s Response Analysis Screen
  if (isSubmitting) {
    const currentStage = Math.min(
      Math.floor((submissionProgress / 100) * ANALYSIS_STAGES.length),
      ANALYSIS_STAGES.length - 1
    );
    const ActiveIcon = ANALYSIS_STAGES[currentStage].icon;

    return (
      <div className="flex-1 flex flex-col justify-center items-center py-10 px-4 sm:px-6 bg-[#080B11] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full bg-[#0D121F]/90 rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-10 space-y-7 text-center relative overflow-hidden text-white"
        >
          {/* Top subtle decorative accent bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-400" />

          {/* Glowing Animated Icon */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-brand-500/20 animate-ping opacity-50" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/25 border border-white/10">
              <ActiveIcon className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          {/* Heading & Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" />
              <span>Analyzing Your Responses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculating Strategic Match...
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Processing your brand positioning, target audience, and top competitor benchmarks across 6 social algorithms.
            </p>
          </div>

          {/* Progress Bar & Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400">{ANALYSIS_STAGES[currentStage].title}</span>
              <span className="text-brand-300 font-extrabold">{Math.round(submissionProgress)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 rounded-full"
                style={{ width: `${submissionProgress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          {/* Step-by-Step Analysis Checklist */}
          <div className="bg-white/[0.02] rounded-xl p-4 sm:p-5 border border-white/[0.08] space-y-2.5 text-left">
            {ANALYSIS_STAGES.map((stage, idx) => {
              const isPast = idx < currentStage;
              const isCurrent = idx === currentStage;
              const isFuture = idx > currentStage;
              const StageIcon = stage.icon;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                    isCurrent
                      ? "bg-white/[0.05] shadow-sm border border-brand-500/30"
                      : isPast
                      ? "opacity-90"
                      : "opacity-40"
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isCurrent ? "text-brand-300" : isPast ? "text-slate-200" : "text-slate-500"
                        }`}
                      >
                        {stage.title}
                      </span>
                      {isPast && (
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          Ready
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider animate-pulse">
                          Processing
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug truncate mt-0.5">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assurance Note */}
          <div className="text-[11px] text-slate-500 font-medium">
            Generating customized 30-day playbook calibrated to your weekly capacity.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between py-8 md:py-12 bg-[#080B11] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {/* Navigation & Progress Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Strategic Assessment ({currentStep + 1} of {QUIZ_QUESTIONS.length})
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-2.5 shadow-sm">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
            <span>
              Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-slate-300 font-semibold">
              {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full"
              initial={false}
              animate={{
                width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 25 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentQ.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
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
                    className={`group text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      isSelected
                        ? "bg-brand-500/10 border-brand-500 shadow-[0_0_20px_rgba(139,92,246,0.15)] ring-1 ring-brand-500/40"
                        : "bg-[#0D121F]/80 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-brand-600 text-white shadow-md shadow-brand-500/30"
                          : "bg-white/[0.05] text-slate-400 group-hover:bg-white/[0.08] group-hover:text-white"
                      }`}
                    >
                      <QuizIcon name={opt.iconName} size={20} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-bold truncate ${
                            isSelected ? "text-white" : "text-slate-100"
                          }`}
                        >
                          {opt.label}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center justify-between pt-5 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 text-xs font-semibold transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-md transition-all hover:scale-[1.02] active:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Calculating Compatibility...</span>
                  </>
                ) : currentStep === QUIZ_QUESTIONS.length - 1 ? (
                  <>
                    <span>View My Results</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
