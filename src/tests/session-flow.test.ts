import { describe, it, expect, beforeEach } from "vitest";
import {
  isQuizComplete,
  loadStoredAnswers,
  saveStoredAnswers,
  clearQuizSession,
  loadStoredResults,
  saveStoredResults,
} from "@/lib/session";
import { QuizAnswers } from "@/lib/quiz-schema";
import { RecommendationEngineResult } from "@/lib/recommendation-engine";

// Polyfill minimal sessionStorage for node test environment
class MockSessionStorage {
  private store: Record<string, string> = {};
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = value;
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe("Session Flow & State Lifecycle", () => {
  beforeEach(() => {
    (global as unknown as { window: { sessionStorage: MockSessionStorage } }).window = { sessionStorage: new MockSessionStorage() };
    (global as unknown as { sessionStorage: MockSessionStorage }).sessionStorage = new MockSessionStorage();
  });

  it("identifies incomplete vs complete answers correctly", () => {
    const incomplete: Partial<QuizAnswers> = {
      industry: "food_beverage",
      audience: "gen_z",
      goal: "sales",
    };
    expect(isQuizComplete(incomplete)).toBe(false);

    const complete: QuizAnswers = {
      industry: "food_beverage",
      audience: "gen_z",
      goal: "sales",
      content: "short_videos",
      personality: "fun",
      time: "two_to_five_hours",
    };
    expect(isQuizComplete(complete)).toBe(true);
  });

  it("saves answers and restores them from session storage", () => {
    const partial: Partial<QuizAnswers> = {
      industry: "technology",
      audience: "business_professionals",
    };
    saveStoredAnswers(partial);
    const restored = loadStoredAnswers();
    expect(restored).toEqual(partial);
  });

  it("retake quiz clears previous results and answers completely", () => {
    saveStoredAnswers({ industry: "education" });
    const mockResult: Partial<RecommendationEngineResult> = {
      primaryPlatform: "youtube",
      rankedPlatforms: [],
    };
    saveStoredResults(mockResult as RecommendationEngineResult);

    expect(loadStoredAnswers()).toEqual({ industry: "education" });
    expect(loadStoredResults()?.primaryPlatform).toBe("youtube");

    clearQuizSession();

    expect(loadStoredAnswers()).toEqual({});
    expect(loadStoredResults()).toBeNull();
  });
});
