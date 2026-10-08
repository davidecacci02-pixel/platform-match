import { describe, it, expect } from "vitest";
import { QuizAnswersSchema, LeadCaptureSchema } from "@/lib/quiz-schema";

describe("Runtime Validation Tests", () => {
  it("successfully validates complete, correct quiz answers", () => {
    const validData = {
      industry: "food_beverage",
      audience: "millennials",
      goal: "community_building",
      content: "short_videos",
      personality: "fun",
      time: "two_to_five_hours",
    };

    const parse = QuizAnswersSchema.safeParse(validData);
    expect(parse.success).toBe(true);
  });

  it("fails when any required question is missing", () => {
    const missingTime = {
      industry: "food_beverage",
      audience: "millennials",
      goal: "community_building",
      content: "short_videos",
      personality: "fun",
      // time missing
    };

    const parse = QuizAnswersSchema.safeParse(missingTime);
    expect(parse.success).toBe(false);
  });

  it("fails when an invalid enum option is passed", () => {
    const invalidOption = {
      industry: "crypto_blockchain_invalid",
      audience: "gen_z",
      goal: "sales",
      content: "photos",
      personality: "creative",
      time: "under_2_hours",
    };

    const parse = QuizAnswersSchema.safeParse(invalidOption);
    expect(parse.success).toBe(false);
  });

  it("validates lead capture fields properly", () => {
    const validLead = {
      name: "Sarah Chen",
      email: "sarah@growthstudio.com",
      company: "Aura Skincare",
      challenge: "Struggling to scale Reels with limited time budget",
      primaryPlatform: "instagram",
    };

    const parse = LeadCaptureSchema.safeParse(validLead);
    expect(parse.success).toBe(true);
  });

  it("rejects invalid email formats in lead capture", () => {
    const invalidEmailLead = {
      name: "John Doe",
      email: "not-an-email",
      company: "Acme Corp",
      challenge: "Need more leads",
    };

    const parse = LeadCaptureSchema.safeParse(invalidEmailLead);
    expect(parse.success).toBe(false);
  });
});
