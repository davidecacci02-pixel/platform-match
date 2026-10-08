import { describe, it, expect } from "vitest";
import {
  BusinessDiscoverySchema,
  MarketingAssessmentExtensionSchema,
  BusinessSnapshotSchema,
  AIStrategyOutputSchema,
} from "@/lib/business-schema";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { generateAIStrategy, generateBusinessSnapshot } from "@/lib/ai-strategy-service";
import { QuizAnswers } from "@/lib/quiz-schema";

describe("Business Schemas, Validation & Time-Budget Feasibility", () => {
  it("validates valid business discovery inputs", () => {
    const valid = {
      businessName: "Aura Botanicals",
      websiteUrl: "https://aurabotanicals.com",
      description: "Handcrafted organic skincare formulated for sensitive skin types.",
      industry: "fashion_beauty",
      mainProduct: "Barrier Repair Serum",
      targetGeo: "National (US)",
    };

    const parse = BusinessDiscoverySchema.safeParse(valid);
    expect(parse.success).toBe(true);
  });

  it("rejects business discovery with missing required fields or overly short description", () => {
    const invalid = {
      businessName: "A", // too short
      description: "Short", // < 10 chars
      industry: "fashion_beauty",
      mainProduct: "",
      targetGeo: "",
    };

    const parse = BusinessDiscoverySchema.safeParse(invalid);
    expect(parse.success).toBe(false);
  });

  it("validates marketing assessment extension schema", () => {
    const ext = {
      businessModel: "b2b",
      currentPresence: "sporadic",
      marketingChallenge: "leads_sales",
      monthlyBudget: "500_to_2000",
    };

    const parse = MarketingAssessmentExtensionSchema.safeParse(ext);
    expect(parse.success).toBe(true);
  });

  it("validates Business Snapshot schema strictly", () => {
    const snapshot = {
      positioning: "B2B SaaS leader in cloud performance analytics",
      audienceProfile: "DevOps leads and engineering directors",
      marketingObjective: "Accelerate qualified demo requests",
      contentOpportunities: ["Technical teardowns", "Benchmark studies"],
      mainConstraints: ["Limited internal creator bandwidth"],
      verifiedFromWebsite: true,
      extractedBrandVoice: "Authoritative & data-driven",
    };

    const parse = BusinessSnapshotSchema.safeParse(snapshot);
    expect(parse.success).toBe(true);
  });

  it("ensures deterministic strategy adheres strictly to AIStrategyOutputSchema", async () => {
    const business = {
      businessName: "Veloce Advisory",
      websiteUrl: "https://veloceadvisory.com",
      description: "Corporate restructuring and financial consulting for mid-market manufacturing.",
      industry: "professional_services" as const,
      mainProduct: "M&A Advisory",
      targetGeo: "North America",
    };

    const quizAnswers: QuizAnswers = {
      industry: "professional_services",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "two_to_five_hours",
    };

    const extension = {
      businessModel: "b2b" as const,
      currentPresence: "sporadic" as const,
      marketingChallenge: "leads_sales" as const,
      monthlyBudget: "zero" as const,
    };

    const scoringResults = calculatePlatformScores(quizAnswers);
    const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
    const strategy = await generateAIStrategy({ business, quizAnswers, extension, scoringResults, snapshot });

    const validation = AIStrategyOutputSchema.safeParse(strategy);
    expect(validation.success).toBe(true);
    expect(strategy.contentPillars.length).toBeGreaterThanOrEqual(3);
    expect(strategy.contentIdeas.length).toBeGreaterThanOrEqual(6);
    expect(strategy.successMetrics.length).toBeGreaterThanOrEqual(3);
  });

  it("enforces mathematically feasible time commitments for users with < 2 hours/week", async () => {
    const business = {
      businessName: "Solo Woodcraft",
      description: "Custom artisan furniture built to order.",
      industry: "lifestyle" as const,
      mainProduct: "Dining Tables",
      targetGeo: "Local Metro",
    };

    const lowTimeAnswers: QuizAnswers = {
      industry: "lifestyle",
      audience: "millennials",
      goal: "sales",
      content: "photos",
      personality: "creative",
      time: "under_2_hours",
    };

    const extension = {
      businessModel: "b2c" as const,
      currentPresence: "none" as const,
      marketingChallenge: "limited_time" as const,
      monthlyBudget: "zero" as const,
    };

    const scoringResults = calculatePlatformScores(lowTimeAnswers);
    const snapshot = await generateBusinessSnapshot({ business, quizAnswers: lowTimeAnswers, extension });
    const strategy = await generateAIStrategy({ business, quizAnswers: lowTimeAnswers, extension, scoringResults, snapshot });

    // Must recommend solo or low-overhead syndication
    expect(strategy.secondaryPlatformStrategy.isSoloRecommended).toBe(true);
    expect(scoringResults.strategy30Day.weeklyTimeBudget).toBe("Under 2 hours / week");
    expect(scoringResults.strategy30Day.sustainableFrequency).toContain("1 core high-impact post/week");
    // Verify no daily burnout requirement is suggested
    expect(scoringResults.strategy30Day.sustainableFrequency).not.toContain("daily");
  });
});
