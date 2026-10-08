import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  getGeminiModel,
  getGeminiGenerateEndpoint,
  DEFAULT_GEMINI_MODEL,
} from "@/lib/gemini-config";
import { generateAIStrategy, generateBusinessSnapshot } from "@/lib/ai-strategy-service";
import { chatWithAIConsultant } from "@/lib/ai-consultant-service";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { BusinessDiscovery, MarketingAssessmentExtension } from "@/lib/business-schema";
import { QuizAnswers } from "@/lib/quiz-schema";

// Auto-load .env.local for test runner if present
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    const keyMatch = content.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)["']?/);
    if (keyMatch && !process.env.GEMINI_API_KEY) {
      process.env.GEMINI_API_KEY = keyMatch[1];
    }
  }
} catch {
  // Safe ignore
}

describe("Gemini Integration & Model Verification", () => {
  it("defaults to supported Free Tier model gemini-3.8-flash", () => {
    expect(DEFAULT_GEMINI_MODEL).toBe("gemini-3.8-flash");
    const activeModel = getGeminiModel();
    expect(activeModel).toBe("gemini-3.8-flash");
  });

  it("constructs the correct REST endpoint for the configured model", () => {
    const endpoint = getGeminiGenerateEndpoint("gemini-3.8-flash");
    expect(endpoint).toBe(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent"
    );
  });

  it("respects GEMINI_MODEL override if provided via environment", () => {
    const originalEnv = process.env.GEMINI_MODEL;
    try {
      process.env.GEMINI_MODEL = "gemini-3.5-flash-lite";
      expect(getGeminiModel()).toBe("gemini-3.5-flash-lite");
      expect(getGeminiGenerateEndpoint()).toBe(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent"
      );
    } finally {
      if (originalEnv) {
        process.env.GEMINI_MODEL = originalEnv;
      } else {
        delete process.env.GEMINI_MODEL;
      }
    }
  });

  it("distinguishes AI-generated strategy from deterministic fallback when no API key is present", async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    try {
      delete process.env.GEMINI_API_KEY;

      const business: BusinessDiscovery = {
        businessName: "Clean Glow Lab",
        description: "Organic peptide skin repair formulas.",
        industry: "fashion_beauty",
        mainProduct: "Peptide Barrier Cream",
        targetGeo: "US",
      };

      const quizAnswers: QuizAnswers = {
        industry: "fashion_beauty",
        audience: "millennials",
        goal: "sales",
        content: "short_videos",
        personality: "premium",
        time: "two_to_five_hours",
      };

      const extension: MarketingAssessmentExtension = {
        businessModel: "b2c",
        currentPresence: "sporadic",
        marketingChallenge: "leads_sales",
        monthlyBudget: "under_500",
      };

      const scores = calculatePlatformScores(quizAnswers);
      const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
      const strategy = await generateAIStrategy({
        business,
        quizAnswers,
        extension,
        scoringResults: scores,
        snapshot,
      });

      // When API key is absent, isAIEnhanced must be false
      expect(strategy.isAIEnhanced).toBe(false);
      expect(strategy.engineModelUsed).toBe("Deterministic Strategy Engine");
      expect(strategy.contentIdeas.length).toBeGreaterThanOrEqual(6);
      expect(strategy.contentPillars.length).toBeGreaterThanOrEqual(3);
    } finally {
      if (originalKey) {
        process.env.GEMINI_API_KEY = originalKey;
      }
    }
  });

  it("verifies fast deterministic consultant responses across queries", async () => {
    const business: BusinessDiscovery = {
      businessName: "Aura Clean Skincare",
      description: "Direct-to-consumer organic sensitive skin remedies with clinical backing.",
      industry: "fashion_beauty",
      mainProduct: "Barrier Recovery Serum",
      targetGeo: "United States",
    };

    const quizAnswers: QuizAnswers = {
      industry: "fashion_beauty",
      audience: "millennials",
      goal: "sales",
      content: "short_videos",
      personality: "premium",
      time: "two_to_five_hours",
    };

    const extension: MarketingAssessmentExtension = {
      businessModel: "b2c",
      currentPresence: "sporadic",
      marketingChallenge: "leads_sales",
      monthlyBudget: "500_to_2000",
    };

    const scores = calculatePlatformScores(quizAnswers);
    const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
    const strategy = await generateAIStrategy({
      business,
      quizAnswers,
      extension,
      scoringResults: scores,
      snapshot,
    });

    const chatResponse = await chatWithAIConsultant({
      business,
      quizAnswers,
      extension,
      scoringResults: scores,
      strategy,
      snapshot,
      history: [],
      userMessage: "Can you change our primary strategy to focus more on sales?",
    });

    expect(chatResponse.reply).toBeDefined();
    expect(typeof chatResponse.reply).toBe("string");
    expect(chatResponse.reply.length).toBeGreaterThan(20);
    expect(chatResponse.proposedRevision).toBeDefined();
    expect(chatResponse.proposedRevision?.summary).toContain("Sales");
  });
});

