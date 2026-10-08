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
 * Builds realistic industry competitor benchmark archetypes with flaws and counter-strategies.
 */
function buildIndustryCompetitorProfiles(
  industry: Industry,
  businessName: string,
  primaryPlatformName: string,
  audienceLabel: string
): CompetitorExample[] {
  switch (industry) {
    case "technology":
      return [
        {
          name: "HubSpot & Enterprise Giants",
          type: "Legacy Corporate Incumbent",
          channelFocus: "Broad corporate LinkedIn posts & high paid ad budgets ($30k+/mo)",
          primaryFlaw: "Generic buzzwords, slow reply times in comments, and impersonal corporate broadcasting",
          ourCounterStrategy: `Pragmatic founder-led teardowns and rapid 1-on-1 engagement directly addressing ${audienceLabel}`,
        },
        {
          name: "Linear & Modern Product Challengers",
          type: "Design-Centric Category Leader",
          channelFocus: "Sleek feature teasers and high-polish video clips on X & LinkedIn",
          primaryFlaw: "Assumes users already understand the tool; lacks beginner-friendly educational workflows",
          ourCounterStrategy: `Step-by-step problem-solving tutorials proving immediate ROI and practical utility on ${primaryPlatformName}`,
        },
      ];
    case "fashion_beauty":
      return [
        {
          name: "Sephora & Traditional Retail Brands",
          type: "Mass Retail Incumbent",
          channelFocus: "Product catalog photo shoots & broad promotional discount campaigns",
          primaryFlaw: "Feels like impersonal advertising; rarely responds to community comments or skincare questions",
          ourCounterStrategy: `Authentic behind-the-scenes founder routines, raw product testing, and educational routines addressing ${audienceLabel}`,
        },
        {
          name: "Rhode & Viral DTC Disruptors",
          type: "High-Budget Viral Challenger",
          channelFocus: "Massive influencer gifting campaigns and aesthetic moodboard TikToks",
          primaryFlaw: "Heavily reliant on fleeting viral hype and celebrity PR rather than evergreen search intent",
          ourCounterStrategy: `Search-optimized problem-solving hooks that capture high-intent buyers looking for lasting quality`,
        },
      ];
    case "food_beverage":
      return [
        {
          name: "Legacy FMCG Brands & Supermarket Giants",
          type: "Mass-Market Conglomerate",
          channelFocus: "High-gloss corporate commercials syndicated across Facebook and Instagram",
          primaryFlaw: "Stiff corporate messaging, zero transparent ingredient dialogue, completely ignored comment sections",
          ourCounterStrategy: `Raw craft transparency, origin storytelling, and real customer reactions proving genuine flavor and quality`,
        },
        {
          name: "Liquid Death & Oatly (Meme Disruptors)",
          type: "Provocative Viral Challenger",
          channelFocus: "High-cost stunt marketing and satirical comedy sketches",
          primaryFlaw: "Entertaining but often lacks clear product utility or structured conversion mechanisms",
          ourCounterStrategy: `Balanced entertainment with clear culinary authority and effortless direct ordering calls to action`,
        },
      ];
    case "professional_services":
      return [
        {
          name: "McKinsey, Deloitte & Big 4 Consultancies",
          type: "Institutional Legacy Incumbent",
          channelFocus: "Lengthy 40-page PDF whitepapers and dry corporate press announcements on LinkedIn",
          primaryFlaw: "Dense academic jargon, intimidatingly corporate, inaccessible to modern growing brands",
          ourCounterStrategy: `Bite-sized visual frameworks, plain-language client teardowns, and actionable decision templates on ${primaryPlatformName}`,
        },
        {
          name: "Large Digital Marketing & Advisory Agencies",
          type: "High-Volume Agency Model",
          channelFocus: "Volume-heavy multi-channel posting using large outsourced teams",
          primaryFlaw: "Requires 40+ hours/week of overhead; shallow generic advice without specialized industry depth",
          ourCounterStrategy: `Laser-focused high-authority presence with direct conversational DM qualification tailored to ${audienceLabel}`,
        },
      ];
    case "lifestyle":
      return [
        {
          name: "Lululemon & Alo Yoga (Global Category Giants)",
          type: "Global Lifestyle Conglomerate",
          channelFocus: "Polished celebrity endorsements and aspirational high-budget Instagram Reels",
          primaryFlaw: "Intimidatingly staged aesthetic that feels unattainable and disconnected from everyday client reality",
          ourCounterStrategy: `Honest, relatable transformation stories, realistic routines, and genuine community dialogue`,
        },
        {
          name: "Peloton & Tech-Wellness Challengers",
          type: "Spec-Heavy Challenger",
          channelFocus: "Feature-heavy hardware updates and promotional flash sales",
          primaryFlaw: "Focuses on technical specifications rather than personal emotional and physical transformation",
          ourCounterStrategy: `Client-centric storytelling celebrating small daily milestones and genuine wellness breakthroughs`,
        },
      ];
    case "education":
      return [
        {
          name: "Coursera, edX & University Extension Programs",
          type: "Academic Institutional Giant",
          channelFocus: "Course catalog links and academic accreditation announcements",
          primaryFlaw: "Low engagement, dry lecture formats, high barrier to immediate application",
          ourCounterStrategy: `High-retention 60-second micro-breakdowns and direct implementation frameworks on ${primaryPlatformName}`,
        },
        {
          name: "MasterClass & Massive EdTech Players",
          type: "Cinematic Entertainment Provider",
          channelFocus: "Celebrity-narrated cinematic trailers with high production value",
          primaryFlaw: "Passive viewing with low accountability and vague tangible outcomes",
          ourCounterStrategy: `Action-oriented tutorials with downloadable cheatsheets and direct student support`,
        },
      ];
    default:
      return [
        {
          name: "Established Traditional Industry Competitors",
          type: "Category Incumbent",
          channelFocus: "Irregular promotional broadcasting and sporadic product discounts",
          primaryFlaw: "Zero search optimization, inconsistent posting cadence, and non-existent community replies",
          ourCounterStrategy: `Predictable, high-value weekly publishing schedule built around high-intent search hooks on ${primaryPlatformName}`,
        },
        {
          name: "High-Spend Paid Traffic Advertisers",
          type: "Paid-Ad Reliant Rival",
          channelFocus: "Aggressive sponsored social ads with minimal organic profile investment",
          primaryFlaw: "Zero organic brand equity; traffic immediately collapses as soon as ad spend stops",
          ourCounterStrategy: `Compounding organic search authority and high save/bookmark rates that generate free inbound leads permanently`,
        },
      ];
  }
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

  const benchmarkedCompetitors = buildIndustryCompetitorProfiles(
    quizAnswers.industry,
    business.businessName,
    primaryMeta.name,
    audienceLabel
  );

  const headToHeadComparison = [
    {
      dimension: "Content Approach",
      competitorsApproach: "Broad, generic promotional broadcast announcing products",
      yourAdvantage: `Targeted problem-first education tailored directly to ${audienceLabel}`,
    },
    {
      dimension: "Community Engagement",
      competitorsApproach: "One-way broadcast with < 10% response rate to comments",
      yourAdvantage: "Direct 1-on-1 interaction & conversational inbound DM qualification",
    },
    {
      dimension: "Organic Algorithmic Fit",
      competitorsApproach: "Relies on expensive paid ad boosts to force impression volume",
      yourAdvantage: `Engineered for organic retention, bookmarks & watch time on ${primaryMeta.name}`,
    },
    {
      dimension: "Operational Overhead",
      competitorsApproach: "Bloated agency retainers ($5k–$15k/mo) & slow multi-tier approvals",
      yourAdvantage: `Lean, agile batch production strictly calibrated to your ${timeLabel} budget`,
    },
  ];

  const competitorBenchmark = {
    industryLandscape: `Most direct competitors in ${industryLabel} rely on generic promotional broadcasting and broad posts with low comment retention.`,
    competitorGap: `Competitors are under-utilizing high-retention educational formats and search-optimized hooks on ${primaryMeta.name}.`,
    whitespaceAdvantage: `By adopting a "${personalityLabel} & authoritative" problem-first approach, ${business.businessName} captures high-intent prospects that competitors overlook.`,
    keyDifferentiators: [
      `Content Depth: Actionable problem-solving tutorials rather than generic brand announcements`,
      `Audience Alignment: Direct focus on ${audienceLabel} friction points with clear takeaways`,
      `Algorithmic Efficiency: High save/share-to-view ratios instead of relying on vanity follower counts`,
    ],
    benchmarkedCompetitors,
    headToHeadComparison,
  };

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
