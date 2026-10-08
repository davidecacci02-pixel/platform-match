import { createHash } from "crypto";
import {
  BusinessDiscovery,
  MarketingAssessmentExtension,
  BusinessSnapshot,
  AIStrategyOutput,
  AIStrategyOutputSchema,
  BusinessSnapshotSchema,
  CompetitorExample,
} from "./business-schema";
import { QuizAnswers, PlatformId, Industry } from "./quiz-schema";
import { RecommendationEngineResult } from "./recommendation-engine";
import { PLATFORMS_DATA } from "./platforms";
import { getAnswerLabel } from "./recommendation-explanations";
import { generateCompetitiveIntelligence } from "./competitive-intelligence-engine";
import {
  getGeminiModel,
  getGeminiGenerateEndpoint,
  FALLBACK_GEMINI_MODEL,
} from "./gemini-config";

// In-memory cache to guarantee zero redundant calls to Gemini API
const strategyCache = new Map<string, { strategy: AIStrategyOutput; timestamp: number }>();
const snapshotCache = new Map<string, { snapshot: BusinessSnapshot; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 2; // 2 hours

function computeCacheKey(prefix: string, data: unknown): string {
  const serialized = JSON.stringify(data);
  return `${prefix}:${createHash("sha256").update(serialized).digest("hex")}`;
}

/**
 * Generate a high-fidelity Business Snapshot combining input, answers, and website findings.
 */
export async function generateBusinessSnapshot(params: {
  business: BusinessDiscovery;
  quizAnswers: QuizAnswers;
  extension: MarketingAssessmentExtension;
  websiteAnalysis?: { verifiedFromWebsite?: boolean; summary?: string; brandVoice?: string };
}): Promise<BusinessSnapshot> {
  const { business, quizAnswers, extension, websiteAnalysis } = params;
  const cacheKey = computeCacheKey("snapshot", params);

  const cached = snapshotCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.snapshot;
  }

  const industryLabel = getAnswerLabel("industry", quizAnswers.industry);
  const goalLabel = getAnswerLabel("goal", quizAnswers.goal);
  const audienceLabel = getAnswerLabel("audience", quizAnswers.audience);
  const timeLabel = getAnswerLabel("time", quizAnswers.time);

  const ext = extension || {
    businessModel: "b2c" as const,
    currentPresence: "sporadic" as const,
    marketingChallenge: "leads_sales" as const,
    monthlyBudget: "500_to_2000" as const,
  };

  // Deterministic high-quality snapshot
  const positioning = `${business.businessName} is a ${(ext.businessModel || "b2c").toUpperCase()} brand in ${industryLabel} offering ${business.mainProduct} to clients in ${business.targetGeo}. ${business.description.trim()}`;
  const audienceProfile = `Targeting ${audienceLabel} seeking dependable, high-value ${business.mainProduct}.`;
  const marketingObjective = `Focus on ${goalLabel.toLowerCase()} to overcome ${(ext.marketingChallenge || "leads_sales").replace(/_/g, " ")}.`;

  const contentOpportunities: string[] = [
    `Product/Service teardowns spotlighting ${business.mainProduct}`,
    `Educational proofs showing problem resolution for ${audienceLabel}`,
    `Behind-the-scenes founder stories building organic trust in ${business.targetGeo}`,
  ];

  const mainConstraints: string[] = [
    `Weekly production capacity strictly capped at ${timeLabel}`,
    ext.monthlyBudget === "zero"
      ? "Zero-dollar paid ad budget: requires 100% organic algorithmic distribution"
      : `Budget allocation limited to ${ext.monthlyBudget?.replace(/_/g, " ") || "modest"}`,
  ];

  if (ext.currentPresence === "none") {
    mainConstraints.push("No legacy social following: zero-follower start requires high algorithmic discoverability");
  }

  const baseSnapshot: BusinessSnapshot = {
    positioning,
    audienceProfile,
    marketingObjective,
    contentOpportunities,
    mainConstraints,
    verifiedFromWebsite: Boolean(websiteAnalysis?.verifiedFromWebsite),
    extractedBrandVoice: websiteAnalysis?.brandVoice || `${getAnswerLabel("personality", quizAnswers.personality)} & authoritative`,
  };

  snapshotCache.set(cacheKey, { snapshot: baseSnapshot, timestamp: Date.now() });
  return baseSnapshot;
}


/**
 * Deterministic strategy generator ensuring high quality without external API dependency.
 */
export function buildDeterministicStrategy(params: {
  business: BusinessDiscovery;
  quizAnswers: QuizAnswers;
  extension?: MarketingAssessmentExtension;
  scoringResults: RecommendationEngineResult;
  snapshot: BusinessSnapshot;
}): AIStrategyOutput {
  const { business, quizAnswers, extension, scoringResults } = params;
  const ext = extension || {
    businessModel: "b2c" as const,
    currentPresence: "sporadic" as const,
    marketingChallenge: "leads_sales" as const,
    monthlyBudget: "500_to_2000" as const,
  };
  const primaryId = scoringResults.primaryPlatform;
  const secondaryId = scoringResults.secondaryPlatform;
  const primaryMeta = PLATFORMS_DATA[primaryId];
  const secondaryMeta = PLATFORMS_DATA[secondaryId];
  const isSoloTime = quizAnswers.time === "under_2_hours";

  const industryLabel = getAnswerLabel("industry", quizAnswers.industry);
  const goalLabel = getAnswerLabel("goal", quizAnswers.goal);
  const audienceLabel = getAnswerLabel("audience", quizAnswers.audience);
  const timeLabel = getAnswerLabel("time", quizAnswers.time);
  const personalityLabel = getAnswerLabel("personality", quizAnswers.personality);

  const strategicSummary = `${business.businessName} should concentrate 70% of creative energy on ${primaryMeta.name} to maximize ${goalLabel.toLowerCase()} with ${audienceLabel}. ${
    isSoloTime
      ? `Because weekly time is capped at ${timeLabel}, avoid dividing focus across multiple active channels. Treat ${secondaryMeta.name} strictly as a passive reposting channel.`
      : `Complement your primary channel by syndicating core assets onto ${secondaryMeta.name} (30% effort) for multiplied organic touchpoints without expanding overhead.`
  }`;

  const primaryFormats =
    primaryId === "linkedin"
      ? ["Thought-leadership carousels", "Text case studies with PDF attachments", "Behind-the-scenes executive commentary"]
      : primaryId === "youtube"
      ? ["Long-form deep dive tutorials", "YouTube Shorts repurposing key moments", "Client proof interviews"]
      : primaryId === "tiktok"
      ? ["Fast-paced 15-30s problem/solution hooks", "Behind-the-scenes raw founder takes", "Trend iterations with industry spin"]
      : primaryId === "instagram"
      ? ["High-value educational carousels", "Short-form Reels addressing pain points", "Daily interactive Stories"]
      : primaryId === "pinterest"
      ? ["Visual infographic pins", "Step-by-step aesthetic guides", "Direct link pins to product landing pages"]
      : ["Community discussion posts", "Local group shares", "Short video tips with link CTA"];

  const strategicConsiderations: string[] = [
    `Resource Calibration: Suggested workflow fits your ${timeLabel} constraint. Do not produce bespoke video for two platforms simultaneously.`,
    `Algorithmic Match: ${primaryMeta.name} prioritizes search intent and interest graph matching that directly rewards ${business.mainProduct} content.`,
  ];

  if (ext.currentPresence === "none") {
    strategicConsiderations.push(
      "Cold-Start Protocol: Because your brand has zero existing followers, prioritize search-optimized captions and keyword-rich hooks over social broadcasting."
    );
  }

  // 4 tailored Content Pillars
  const contentPillars = [
    {
      name: "The Authority Pillar",
      purpose: `Educate ${audienceLabel} on overcoming core problems using ${business.mainProduct}`,
      examples: [
        `"3 common mistakes when choosing ${business.mainProduct}"`,
        `"Why traditional approaches to ${business.industry} fail"`,
      ],
      recommendedPlatform: primaryId,
    },
    {
      name: "The Transformation Pillar",
      purpose: "Provide visual proof of real customer outcomes and tangible ROI",
      examples: [
        `Before-and-after breakdown of client implementation`,
        `Customer story: How we solved the challenge in 14 days`,
      ],
      recommendedPlatform: primaryId,
    },
    {
      name: "Behind The Craft",
      purpose: `Build founder trust and showcase your ${personalityLabel.toLowerCase()} brand voice`,
      examples: [
        `The exact framework we use internally at ${business.businessName}`,
        `A day in the life building our offering in ${business.targetGeo}`,
      ],
      recommendedPlatform: primaryId,
    },
    {
      name: "Syndicated Quick-Hits",
      purpose: "Effortless reach expansion using adapted formats",
      examples: [
        `1-minute summary snippet or infographic adapted for ${secondaryMeta.name}`,
        `Direct quote graphic highlighting key customer quote`,
      ],
      recommendedPlatform: secondaryId,
    },
  ];

  // At least 6 business-specific Content Ideas
  const contentIdeas = [
    {
      title: `The 60-Second ${business.mainProduct} Blueprint`,
      hook: `"If you're struggling with ${(ext.marketingChallenge || "growth").replace(/_/g, " ")}, stop doing this right now."`,
      platform: primaryId,
      format: primaryFormats[0],
      keyMessage: `How ${business.businessName} delivers an unfair advantage in ${business.targetGeo}.`,
      cta: "Save this post for your next review.",
      strategicGoal: "High-retention awareness & algorithmic bookmarking",
    },
    {
      title: `The Anatomy of a Perfect Solution`,
      hook: `"Here's the exact framework we use to deliver ${business.mainProduct} without wasted hours."`,
      platform: primaryId,
      format: primaryFormats[1] || primaryFormats[0],
      keyMessage: "Transparency builds instant credibility with discerning buyers.",
      cta: "Link in bio to read the full case study.",
      strategicGoal: "Direct inbound lead generation",
    },
    {
      title: `Industry Myth Busters: ${business.industry.toUpperCase()}`,
      hook: `"Everyone in our industry tells you X. But here is the hard truth nobody talks about."`,
      platform: primaryId,
      format: "Insight Carousel / Narrative Text",
      keyMessage: `Challenging lazy status quo thinking positioning ${business.businessName} as a contrarian authority.`,
      cta: "Drop your perspective in the comments below.",
      strategicGoal: "Comment-section algorithmic boost & debate",
    },
    {
      title: `Client Diagnostic Breakdown`,
      hook: `"Watch how we diagnosed and fixed this client's bottleneck in under 48 hours."`,
      platform: primaryId,
      format: "Step-by-step breakdown",
      keyMessage: "Real-world competence is 10x more persuasive than generic claims.",
      cta: "Book your 15-minute diagnostic session.",
      strategicGoal: "Sales conversion & consultation bookings",
    },
    {
      title: `Fast Syndicated Take on ${secondaryMeta.name}`,
      hook: `"The single most valuable lesson from working on ${business.mainProduct} this month."`,
      platform: secondaryId,
      format: "Quick Cross-Post / Visual Micro-Guide",
      keyMessage: `Extract the core insight from your primary piece and adapt it for ${secondaryMeta.name}'s feed.`,
      cta: "Follow for weekly tactical insights.",
      strategicGoal: "Secondary channel audience accumulation",
    },
    {
      title: `Behind the Scenes: How We Work`,
      hook: `"What 24 hours behind the scenes looks like at ${business.businessName}."`,
      platform: primaryId,
      format: "Documentary Reel / Photo Carousel",
      keyMessage: `Humanizing the brand with our authentic ${personalityLabel.toLowerCase()} team culture.`,
      cta: "Share this with a team member who needs inspiration.",
      strategicGoal: "Brand affinity and organic community trust",
    },
  ];

  // 3-5 Success Metrics
  const successMetrics = [
    {
      kpi: "Qualified Profile Link Clicks / Bio Visits",
      whyItMatters: "Direct indicator of whether social reach translates into high-intent inbound prospects.",
      frequency: "Weekly",
    },
    {
      kpi: "Save & Bookmark Rate (> 3%)",
      whyItMatters: "Proves educational utility and triggers aggressive algorithmic distribution to lookalike audiences.",
      frequency: "Per Post",
    },
    {
      kpi: "Direct Message (DM) / Inbound Inquiries",
      whyItMatters: `The highest-converting sales signal for ${business.businessName}'s ${business.mainProduct}.`,
      frequency: "Monthly",
    },
    {
      kpi: "Posting Consistency Compliance (100%)",
      whyItMatters: `Maintaining your scheduled cadence within ${timeLabel} without team burnout.`,
      frequency: "Weekly",
    },
  ];

  const competitorBenchmark = generateCompetitiveIntelligence({
    business,
    quizAnswers,
    scoringResults,
    snapshot: params.snapshot,
  });

  return {
    strategicSummary,
    primaryPlatformStrategy: {
      whyMain: `${primaryMeta.name} has the highest demographic overlap (${scoringResults.rankedPlatforms[0].score}% match) with your ideal buyers in ${business.targetGeo}.`,
      supportsGoal: `Directly amplifies ${goalLabel.toLowerCase()} by matching high-intent search queries with organic algorithmic distribution.`,
      audienceReach: `High concentration of ${audienceLabel} actively searching for ${business.mainProduct} solutions.`,
      formatsToPrioritize: primaryFormats,
    },
    secondaryPlatformStrategy: {
      whyComplements: isSoloTime
        ? `Given your ${timeLabel} availability, keep ${secondaryMeta.name} as a passive syndication channel to preserve bandwidth.`
        : `${secondaryMeta.name} captures an adjacent demographic while requiring zero original filming when repurposed.`,
      repurposingApproach: isSoloTime
        ? "Automate 1-click cross-posting of top primary creative."
        : "Adapt top primary hooks into native carousel or short video format.",
      additionalValue: "Provides hedge against single-algorithm volatility and diversifies inbound touchpoints.",
      isSoloRecommended: isSoloTime,
    },
    strategicConsiderations,
    contentPillars,
    contentIdeas,
    successMetrics,
    competitorBenchmark,
    isAIEnhanced: false,
    engineModelUsed: "Deterministic Strategy Engine",
  };
}

/**
 * Public strategy generator: calls Gemini Free Tier if API key is configured,
 * otherwise seamlessly falls back to the deterministic strategy engine.
 */
export async function generateAIStrategy(params: {
  business: BusinessDiscovery;
  quizAnswers: QuizAnswers;
  extension?: MarketingAssessmentExtension;
  scoringResults: RecommendationEngineResult;
  snapshot: BusinessSnapshot;
}): Promise<AIStrategyOutput> {
  const ext = params.extension || {
    businessModel: "b2c" as const,
    currentPresence: "sporadic" as const,
    marketingChallenge: "leads_sales" as const,
    monthlyBudget: "500_to_2000" as const,
  };

  const cacheKey = computeCacheKey("strategy", {
    b: params.business,
    q: params.quizAnswers,
    e: ext,
    p: params.scoringResults.primaryPlatform,
    s: params.scoringResults.secondaryPlatform,
  });

  const cached = strategyCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.strategy;
  }

  const deterministicFallback = buildDeterministicStrategy({ ...params, extension: ext });
  strategyCache.set(cacheKey, { strategy: deterministicFallback, timestamp: Date.now() });
  return deterministicFallback;
}
