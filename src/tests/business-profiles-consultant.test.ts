import { describe, it, expect } from "vitest";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { generateAIStrategy, generateBusinessSnapshot } from "@/lib/ai-strategy-service";
import { chatWithAIConsultant } from "@/lib/ai-consultant-service";
import { QuizAnswers } from "@/lib/quiz-schema";
import { BusinessDiscovery, MarketingAssessmentExtension } from "@/lib/business-schema";

describe("Evaluation Across 6 Specific Business Profiles & Consultant Capabilities", () => {
  // Profile 1: Gen Z Fashion Brand
  it("Profile 1 (Gen Z Fashion): recommends TikTok / Instagram with short video strategy", async () => {
    const business: BusinessDiscovery = {
      businessName: "Aethel Streetwear",
      description: "Oversized minimalist hoodies and accessories targeted at college youth.",
      industry: "fashion_beauty",
      mainProduct: "Graphic Hoodies",
      targetGeo: "Global",
    };
    const quizAnswers: QuizAnswers = {
      industry: "fashion_beauty",
      audience: "gen_z",
      goal: "brand_awareness",
      content: "short_videos",
      personality: "creative",
      time: "five_to_ten_hours",
    };
    const extension: MarketingAssessmentExtension = {
      businessModel: "b2c",
      currentPresence: "sporadic",
      marketingChallenge: "differentiation",
      monthlyBudget: "under_500",
    };

    const scores = calculatePlatformScores(quizAnswers);
    expect(["tiktok", "instagram"]).toContain(scores.primaryPlatform);
    expect(scores.rankedPlatforms[0].score).toBeGreaterThanOrEqual(85);

    const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
    const strategy = await generateAIStrategy({ business, quizAnswers, extension, scoringResults: scores, snapshot });
    expect(strategy.primaryPlatformStrategy.formatsToPrioritize.length).toBeGreaterThan(0);
  });

  // Profile 2: B2B Consulting Company
  it("Profile 2 (B2B Consulting): decisively recommends LinkedIn as Primary Growth Engine", async () => {
    const business: BusinessDiscovery = {
      businessName: "Stratagem Partners",
      description: "Management consulting for mid-tier enterprise supply chain logistics.",
      industry: "professional_services",
      mainProduct: "Supply Chain Optimization",
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
    const extension: MarketingAssessmentExtension = {
      businessModel: "b2b",
      currentPresence: "active",
      marketingChallenge: "leads_sales",
      monthlyBudget: "500_to_2000",
    };

    const scores = calculatePlatformScores(quizAnswers);
    expect(scores.primaryPlatform).toBe("linkedin");
    expect(scores.rankedPlatforms[0].score).toBeGreaterThanOrEqual(90);

    const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
    const strategy = await generateAIStrategy({ business, quizAnswers, extension, scoringResults: scores, snapshot });
    expect(strategy.primaryPlatformStrategy.whyMain).toContain("LinkedIn");
  });

  // Profile 3: Local Restaurant
  it("Profile 3 (Local Restaurant): prioritizes high-visual, geo-relevant discovery (Instagram / Facebook)", async () => {
    const business: BusinessDiscovery = {
      businessName: "Trattoria Da Marco",
      description: "Authentic handmade pasta and wood-fired Neapolitan pizza in downtown.",
      industry: "food_beverage",
      mainProduct: "Handmade Pasta & Wine",
      targetGeo: "Local Metro",
    };
    const quizAnswers: QuizAnswers = {
      industry: "food_beverage",
      audience: "millennials",
      goal: "community_building",
      content: "photos",
      personality: "fun",
      time: "two_to_five_hours",
    };
    const extension: MarketingAssessmentExtension = {
      businessModel: "b2c",
      currentPresence: "sporadic",
      marketingChallenge: "consistent_content",
      monthlyBudget: "under_500",
    };

    const scores = calculatePlatformScores(quizAnswers);
    expect(["instagram", "facebook"]).toContain(scores.primaryPlatform);
    expect(scores.rankedPlatforms.find((p) => p.platformId === "linkedin")?.rank).toBeGreaterThanOrEqual(4);
  });

  // Profile 4: Online Education Business
  it("Profile 4 (Online Education): pairs YouTube or LinkedIn with deep-dive value", async () => {
    const business: BusinessDiscovery = {
      businessName: "NextGen Cloud Academy",
      description: "Hands-on tutorials and certification bootcamps for AWS & GCP cloud engineers.",
      industry: "education",
      mainProduct: "Cloud DevOps Certification Course",
      targetGeo: "Global",
    };
    const quizAnswers: QuizAnswers = {
      industry: "education",
      audience: "broad_audience",
      goal: "brand_awareness",
      content: "long_videos",
      personality: "educational",
      time: "more_than_10_hours",
    };
    const extension: MarketingAssessmentExtension = {
      businessModel: "both",
      currentPresence: "none",
      marketingChallenge: "differentiation",
      monthlyBudget: "zero",
    };

    const scores = calculatePlatformScores(quizAnswers);
    expect(["youtube", "linkedin"]).toContain(scores.primaryPlatform);
    expect(scores.primaryPlatform).toBe("youtube"); // Long videos + education
  });

  // Profile 5: Beauty E-Commerce Brand
  it("Profile 5 (Beauty E-Commerce): leads with visual inspiration (Instagram / Pinterest / TikTok)", async () => {
    const business: BusinessDiscovery = {
      businessName: "Lumiere Botanicals",
      description: "Cruelty-free vitamin C glow oil and barrier creams.",
      industry: "fashion_beauty",
      mainProduct: "Vitamin C Glow Serum",
      targetGeo: "US & Canada",
    };
    const quizAnswers: QuizAnswers = {
      industry: "fashion_beauty",
      audience: "millennials",
      goal: "sales",
      content: "short_videos",
      personality: "premium",
      time: "five_to_ten_hours",
    };
    const extension: MarketingAssessmentExtension = {
      businessModel: "b2c",
      currentPresence: "active",
      marketingChallenge: "leads_sales",
      monthlyBudget: "500_to_2000",
    };

    const scores = calculatePlatformScores(quizAnswers);
    expect(["instagram", "tiktok"]).toContain(scores.primaryPlatform);
    expect(scores.rankedPlatforms[0].score).toBeGreaterThan(85);
  });

  // Profile 6: Small Business with < 2 Hours/Week
  it("Profile 6 (<2h/week): guarantees lean, low-maintenance solo strategy without burnout", async () => {
    const business: BusinessDiscovery = {
      businessName: "Northside Mobile Locksmith",
      description: "Emergency lockout services and residential lock rekeying.",
      industry: "other",
      mainProduct: "Emergency Locksmith Service",
      targetGeo: "Local Metro",
    };
    const quizAnswers: QuizAnswers = {
      industry: "other",
      audience: "broad_audience",
      goal: "lead_generation",
      content: "mixed",
      personality: "professional",
      time: "under_2_hours",
    };
    const extension: MarketingAssessmentExtension = {
      businessModel: "both",
      currentPresence: "none",
      marketingChallenge: "limited_time",
      monthlyBudget: "zero",
    };

    const scores = calculatePlatformScores(quizAnswers);
    expect(scores.strategy30Day.weeklyTimeBudget).toBe("Under 2 hours / week");
    expect(scores.strategy30Day.sustainableFrequency).toContain("1 core high-impact post/week");

    const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
    const strategy = await generateAIStrategy({ business, quizAnswers, extension, scoringResults: scores, snapshot });
    expect(strategy.secondaryPlatformStrategy.isSoloRecommended).toBe(true);
  });

  // Consultant Conversational Context & Strategy Revision
  it("AI Consultant maintains context and detects strategy revision proposals", async () => {
    const business: BusinessDiscovery = {
      businessName: "Alpha Capital Advisory",
      description: "Private wealth strategy.",
      industry: "professional_services",
      mainProduct: "Wealth Consulting",
      targetGeo: "US",
    };
    const quizAnswers: QuizAnswers = {
      industry: "professional_services",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "two_to_five_hours",
    };
    const extension: MarketingAssessmentExtension = {
      businessModel: "b2b",
      currentPresence: "active",
      marketingChallenge: "leads_sales",
      monthlyBudget: "500_to_2000",
    };

    const scores = calculatePlatformScores(quizAnswers);
    const snapshot = await generateBusinessSnapshot({ business, quizAnswers, extension });
    const strategy = await generateAIStrategy({ business, quizAnswers, extension, scoringResults: scores, snapshot });

    // 1. Regular question
    const reply1 = await chatWithAIConsultant({
      userMessage: "How should I start if I have zero followers?",
      history: [],
      business,
      quizAnswers,
      extension,
      scoringResults: scores,
      strategy,
      snapshot,
    });
    expect(reply1.reply).toContain("followers");

    // 2. Strategy revision request: "focus on sales"
    const reply2 = await chatWithAIConsultant({
      userMessage: "Can you make this strategy more focused on sales and revenue?",
      history: [{ id: "1", role: "assistant", content: reply1.reply, timestamp: new Date().toISOString() }],
      business,
      quizAnswers,
      extension,
      scoringResults: scores,
      strategy,
      snapshot,
    });

    expect(reply2.proposedRevision).toBeDefined();
    expect(reply2.proposedRevision?.summary).toContain("Sales");
    expect(reply2.proposedRevision?.changes.length).toBeGreaterThanOrEqual(2);
  });
});
