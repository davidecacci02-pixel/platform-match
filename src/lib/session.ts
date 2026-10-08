import { QuizAnswers, QuizAnswersSchema } from "./quiz-schema";
import { RecommendationEngineResult } from "./recommendation-engine";
import {
  BusinessDiscovery,
  MarketingAssessmentExtension,
  BusinessSnapshot,
  AIStrategyOutput,
  ConsultantMessage,
} from "./business-schema";

const QUIZ_STORAGE_KEY = "platform_match_answers";
const RESULTS_STORAGE_KEY = "platform_match_results";
const STEP_STORAGE_KEY = "platform_match_step";
const BUSINESS_STORAGE_KEY = "platform_match_business";
const EXTENSION_STORAGE_KEY = "platform_match_extension";
const SNAPSHOT_STORAGE_KEY = "platform_match_snapshot";
const STRATEGY_STORAGE_KEY = "platform_match_strategy";
const CHAT_STORAGE_KEY = "platform_match_chat";

export function loadStoredAnswers(): Partial<QuizAnswers> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveStoredAnswers(answers: Partial<QuizAnswers>): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(answers));
  } catch (err) {
    console.error("Failed to save answers to sessionStorage", err);
  }
}

export function loadStoredStep(): number {
  if (typeof window === "undefined") return 1;
  try {
    const raw = sessionStorage.getItem(STEP_STORAGE_KEY);
    const parsed = raw ? parseInt(raw, 10) : 1;
    return isNaN(parsed) || parsed < 1 ? 1 : parsed;
  } catch {
    return 1;
  }
}

export function saveStoredStep(step: number): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STEP_STORAGE_KEY, step.toString());
  } catch (err) {
    console.error("Failed to save step to sessionStorage", err);
  }
}

export function loadStoredResults(): RecommendationEngineResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RESULTS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.rankedPlatforms) && parsed.primaryPlatform) {
      return parsed as RecommendationEngineResult;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveStoredResults(results: RecommendationEngineResult): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(RESULTS_STORAGE_KEY, JSON.stringify(results));
  } catch (err) {
    console.error("Failed to save results to sessionStorage", err);
  }
}

// Business Discovery Storage
export function loadStoredBusiness(): Partial<BusinessDiscovery> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(BUSINESS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveStoredBusiness(business: Partial<BusinessDiscovery>): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(business));
  } catch (err) {
    console.error("Failed to save business info to sessionStorage", err);
  }
}

// Assessment Extension Storage
export function loadStoredExtension(): Partial<MarketingAssessmentExtension> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(EXTENSION_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveStoredExtension(extension: Partial<MarketingAssessmentExtension>): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(EXTENSION_STORAGE_KEY, JSON.stringify(extension));
  } catch (err) {
    console.error("Failed to save assessment extensions to sessionStorage", err);
  }
}

// Business Snapshot Storage
export function loadStoredSnapshot(): BusinessSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SNAPSHOT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStoredSnapshot(snapshot: BusinessSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(snapshot));
  } catch (err) {
    console.error("Failed to save snapshot to sessionStorage", err);
  }
}

// AI Strategy Storage
export function loadStoredStrategy(): AIStrategyOutput | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STRATEGY_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveStoredStrategy(strategy: AIStrategyOutput): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(strategy));
  } catch (err) {
    console.error("Failed to save strategy to sessionStorage", err);
  }
}

// Chat Storage
export function loadStoredChatHistory(): ConsultantMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredChatHistory(messages: ConsultantMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (err) {
    console.error("Failed to save chat history to sessionStorage", err);
  }
}

/**
 * Retake quiz: strictly clears prior answers, saved step, and stored results.
 */
export function clearQuizSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(QUIZ_STORAGE_KEY);
    sessionStorage.removeItem(RESULTS_STORAGE_KEY);
    sessionStorage.removeItem(STEP_STORAGE_KEY);
    sessionStorage.removeItem(BUSINESS_STORAGE_KEY);
    sessionStorage.removeItem(EXTENSION_STORAGE_KEY);
    sessionStorage.removeItem(SNAPSHOT_STORAGE_KEY);
    sessionStorage.removeItem(STRATEGY_STORAGE_KEY);
    sessionStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear quiz session", err);
  }
}

export function isQuizComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  const parse = QuizAnswersSchema.safeParse(answers);
  return parse.success;
}
