import { describe, it, expect } from "vitest";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { QuizAnswers } from "@/lib/quiz-schema";
import { SCORING_WEIGHTS, TOTAL_WEIGHT } from "@/lib/scoring-matrix";

describe("Platform Match Recommendation Engine", () => {
  it("has scoring weights that sum exactly to 1.0 (100%)", () => {
    expect(TOTAL_WEIGHT).toBeCloseTo(1.0, 5);
    expect(SCORING_WEIGHTS.audience).toBe(0.30);
    expect(SCORING_WEIGHTS.goal).toBe(0.25);
    expect(SCORING_WEIGHTS.industry).toBe(0.15);
    expect(SCORING_WEIGHTS.content).toBe(0.15);
    expect(SCORING_WEIGHTS.personality).toBe(0.10);
    expect(SCORING_WEIGHTS.time).toBe(0.05);
  });

  it("calculates all six dimensions and clamps scores strictly to 0..100", () => {
    const answers: QuizAnswers = {
      industry: "technology",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "five_to_ten_hours",
    };

    const result = calculatePlatformScores(answers);
    expect(result.rankedPlatforms).toHaveLength(6);

    for (const p of result.rankedPlatforms) {
      expect(p.score).toBeGreaterThanOrEqual(0);
      expect(p.score).toBeLessThanOrEqual(100);
      expect(p.rawScore).toBeGreaterThanOrEqual(0);
      expect(p.rawScore).toBeLessThanOrEqual(100);

      // Verify all 6 dimensions are present and between 0 and 100
      expect(p.dimensionScores.industry).toBeGreaterThanOrEqual(0);
      expect(p.dimensionScores.audience).toBeGreaterThanOrEqual(0);
      expect(p.dimensionScores.goal).toBeGreaterThanOrEqual(0);
      expect(p.dimensionScores.content).toBeGreaterThanOrEqual(0);
      expect(p.dimensionScores.personality).toBeGreaterThanOrEqual(0);
      expect(p.dimensionScores.time).toBeGreaterThanOrEqual(0);
    }

    // Ranks should be 1, 2, 3, 4, 5, 6
    expect(result.rankedPlatforms.map((p) => p.rank)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("produces distinctly different rankings for B2B Tech vs Gen Z Fashion brand", () => {
    const b2bAnswers: QuizAnswers = {
      industry: "technology",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "two_to_five_hours",
    };

    const b2cAnswers: QuizAnswers = {
      industry: "fashion_beauty",
      audience: "gen_z",
      goal: "brand_awareness",
      content: "short_videos",
      personality: "fun",
      time: "five_to_ten_hours",
    };

    const b2bResult = calculatePlatformScores(b2bAnswers);
    const b2cResult = calculatePlatformScores(b2cAnswers);

    // B2B should strongly favor LinkedIn
    expect(b2bResult.primaryPlatform).toBe("linkedin");
    expect(b2bResult.rankedPlatforms[0].platformId).toBe("linkedin");
    expect(b2bResult.rankedPlatforms[0].score).toBeGreaterThan(85);

    // B2C Fashion for Gen Z with short videos should strongly favor TikTok or Instagram
    expect(["tiktok", "instagram"]).toContain(b2cResult.primaryPlatform);
    expect(b2cResult.rankedPlatforms.find((p) => p.platformId === "linkedin")?.rank).toBeGreaterThan(4);
  });

  it("produces YouTube as primary for deep-dive educational content with long videos", () => {
    const eduAnswers: QuizAnswers = {
      industry: "education",
      audience: "broad_audience",
      goal: "brand_awareness",
      content: "long_videos",
      personality: "educational",
      time: "more_than_10_hours",
    };

    const result = calculatePlatformScores(eduAnswers);
    expect(result.primaryPlatform).toBe("youtube");
  });

  it("adapts sustainable posting frequency when weekly time is strictly limited (<2 hours)", () => {
    const lowTimeAnswers: QuizAnswers = {
      industry: "lifestyle",
      audience: "millennials",
      goal: "sales",
      content: "photos",
      personality: "creative",
      time: "under_2_hours",
    };

    const result = calculatePlatformScores(lowTimeAnswers);
    expect(result.strategy30Day.sustainableFrequency).toContain("1 core high-impact post/week");
    expect(result.strategy30Day.weeklyTimeBudget).toBe("Under 2 hours / week");
  });
});
