import {
  Industry,
  Audience,
  Goal,
  ContentType,
  Personality,
  WeeklyTime,
} from "./quiz-schema";
import {
  CompetitorBenchmark,
  CompetitorExample,
  BusinessDiscovery,
  BusinessSnapshot,
} from "./business-schema";
import { RecommendationEngineResult } from "./recommendation-engine";
import { PLATFORMS_DATA } from "./platforms";
import { getAnswerLabel } from "./recommendation-explanations";

export interface CompetitorArchetypeDefinition {
  id: string;
  industry: Industry;
  category: string;
  name: string;
  typicalBehavior: string;
  contentStrategy: string;
  strategicLimitations: string;
  differentiationOpportunities: string;
  /**
   * Deterministic scoring function (0-100) determining relevance to user's profile
   */
  scoreRelevance: (profile: {
    audience: Audience;
    goal: Goal;
    content: ContentType;
    personality: Personality;
    time: WeeklyTime;
    primaryPlatform: string;
  }) => number;
}

/**
 * Structured Database of Industry Competitor Archetypes.
 * Covers all 7 industries with at least 3 distinct, realistic archetypes each.
 * Uses plausible strategic operating models (no fabricated real-company claims).
 */
export const INDUSTRY_COMPETITOR_DATABASE: Record<Industry, CompetitorArchetypeDefinition[]> = {
  fashion_beauty: [
    {
      id: "fb_catalog_retailer",
      industry: "fashion_beauty",
      category: "Legacy Catalog Retailer",
      name: "Traditional Mass Catalog Operator",
      typicalBehavior: "High-volume static product drops and sterile photo dumps with low comment interaction",
      contentStrategy: "Studio-shot lookbooks, price-tag announcements, and impersonal seasonal sales banners",
      strategicLimitations: "Zero vertical video retention, feels like cold corporate advertising, ignores consumer questions",
      differentiationOpportunities: "Unfiltered founder routine videos, honest wear-tests, and active community dialogue in comments and DMs",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.content === "short_videos") score += 25;
        if (p.audience === "millennials" || p.audience === "gen_x") score += 20;
        if (p.personality === "fun" || p.personality === "creative") score += 15;
        return score;
      },
    },
    {
      id: "fb_trend_chaser",
      industry: "fashion_beauty",
      category: "Fast-Trend Chaser",
      name: "Hyper-Viral Trend Replicator",
      typicalBehavior: "Jumping indiscriminately on every viral audio and fleeting meme format",
      contentStrategy: "Low-effort rapid video clips, shock hooks, and continuous flash discounts",
      strategicLimitations: "Dilutes brand identity, fosters zero lasting customer loyalty, highly vulnerable to algorithm dips",
      differentiationOpportunities: "Curated aesthetic identity, repeatable educational styling pillars, and search-optimized problem-solving hooks",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.audience === "gen_z") score += 30;
        if (p.personality === "premium" || p.personality === "educational") score += 25;
        if (p.goal === "brand_awareness") score += 15;
        return score;
      },
    },
    {
      id: "fb_luxury_atelier",
      industry: "fashion_beauty",
      category: "Aspirational Luxury Atelier",
      name: "High-Gloss Exclusive Atelier",
      typicalBehavior: "Infrequent, hyper-polished editorial imagery maintaining an aloof distance",
      contentStrategy: "Runway-inspired slow-motion clips, cryptic artistic moodboards, and minimal explanatory text",
      strategicLimitations: "Intimidatingly inaccessible, offers zero practical everyday styling utility, poor search discovery",
      differentiationOpportunities: "Transparent material craftsmanship teardowns, accessible sizing guides, and conversational direct messaging",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "premium") score += 30;
        if (p.goal === "sales" || p.goal === "lead_generation") score += 20;
        if (p.content === "photos" || p.content === "mixed") score += 15;
        return score;
      },
    },
  ],

  food_beverage: [
    {
      id: "fb_mass_commercial",
      industry: "food_beverage",
      category: "Mass Commercial Broadcaster",
      name: "Commercial Packshot Broadcaster",
      typicalBehavior: "Syndicating generic promotional graphics and static flyers across all social channels",
      contentStrategy: "Stock food photography, aggressive discount coupon codes, and corporate announcement posts",
      strategicLimitations: "Neglected comment sections, zero ingredient transparency, lacks genuine culinary enthusiasm",
      differentiationOpportunities: "Raw kitchen craftsmanship, origin storytelling, real unscripted customer taste reactions, and behind-the-scenes prep",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "fun" || p.personality === "creative") score += 25;
        if (p.audience === "broad_audience" || p.audience === "millennials") score += 20;
        if (p.content === "short_videos") score += 15;
        return score;
      },
    },
    {
      id: "fb_stunt_operator",
      industry: "food_beverage",
      category: "Viral Stunt Operator",
      name: "Shock-Value Novelty Creator",
      typicalBehavior: "Producing exaggerated shock-value food stunts and meme comedy sketches",
      contentStrategy: "Extreme sensory spectacle videos engineered purely for fleeting view counts",
      strategicLimitations: "High view volume with low repeat local footfall or purchase conversion, obscures actual culinary quality",
      differentiationOpportunities: "Balanced sensory visual hooks paired with clear menu highlights, straightforward pricing, and frictionless ordering CTAs",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.goal === "sales" || p.goal === "lead_generation") score += 30;
        if (p.audience === "gen_z") score += 20;
        if (p.personality === "premium" || p.personality === "educational") score += 20;
        return score;
      },
    },
    {
      id: "fb_passive_local",
      industry: "food_beverage",
      category: "Passive Local Operator",
      name: "Silent Traditional Operator",
      typicalBehavior: "Posting once a month only when holiday hours change or prices increase",
      contentStrategy: "Low-lighting photos of dishes with no engaging caption hooks or community interaction",
      strategicLimitations: "Invisible to new neighborhood residents, zero geo-targeted search discoverability on Instagram and TikTok",
      differentiationOpportunities: "Consistent weekly visual showcases, chef spotlights, and active local geo-tagging capturing weekend dining demand",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.time === "under_2_hours" || p.time === "two_to_five_hours") score += 25;
        if (p.goal === "brand_awareness" || p.goal === "community_building") score += 20;
        if (p.audience === "gen_x" || p.audience === "fifty_five_plus") score += 15;
        return score;
      },
    },
  ],

  technology: [
    {
      id: "tech_enterprise_jargonist",
      industry: "technology",
      category: "Corporate Enterprise Jargonist",
      name: "Enterprise Jargon Incumbent",
      typicalBehavior: "Promoting dense 40-page gated whitepapers and formal corporate conference announcements on LinkedIn",
      contentStrategy: "Stock photos of handshakes, abstract enterprise diagrams, and generic industry buzzwords",
      strategicLimitations: "Intimidating corporate jargon, zero human founder voice, slow comment response (>48 hours)",
      differentiationOpportunities: "Plain-language product teardowns, honest build-in-public insights, and rapid 1-on-1 prospect dialogue",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.audience === "business_professionals") score += 30;
        if (p.personality === "fun" || p.personality === "creative") score += 20;
        if (p.goal === "lead_generation" || p.goal === "sales") score += 15;
        return score;
      },
    },
    {
      id: "tech_changelog_broadcaster",
      industry: "technology",
      category: "Feature Changelog Broadcaster",
      name: "Inward-Looking Tool Builder",
      typicalBehavior: "Broadcasting software version release notes and UI screenshots with technical specs",
      contentStrategy: "Feature-focused screen recordings that assume prospects already know why the tool matters",
      strategicLimitations: "Fails to connect features to client revenue or time savings, unengaging for non-technical buyers",
      differentiationOpportunities: "Outcome-first use cases demonstrating before-and-after operational savings and tangible workflow breakthroughs",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.goal === "sales" || p.goal === "website_traffic") score += 25;
        if (p.personality === "educational") score += 20;
        if (p.content === "short_videos" || p.content === "mixed") score += 15;
        return score;
      },
    },
    {
      id: "tech_generic_growth_hacker",
      industry: "technology",
      category: "Superficial Tip Aggregator",
      name: "Surface-Level Tip Curators",
      typicalBehavior: "High-frequency generic carousel checklists and AI-generated productivity hacks",
      contentStrategy: "Recycled generic advice lists without proprietary code examples or verified customer benchmarks",
      strategicLimitations: "Low domain authority, highly commoditized brand perception, attracts unengaged vanity followers",
      differentiationOpportunities: "Deep proprietary architecture breakdowns, real client transformation case studies, and opinionated strategic viewpoints",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "premium" || p.personality === "professional") score += 30;
        if (p.content === "long_videos" || p.content === "articles") score += 20;
        if (p.audience === "business_professionals") score += 15;
        return score;
      },
    },
  ],

  professional_services: [
    {
      id: "ps_institutional_whitepaper",
      industry: "professional_services",
      category: "Institutional Advisory Firm",
      name: "Legacy Institutional Incumbent",
      typicalBehavior: "Formal partner headshots, corporate awards, and legal compliance disclaimers",
      contentStrategy: "Dense academic text extracts, formal firm announcements, and sterile boardroom photography",
      strategicLimitations: "Stiff and unapproachable, zero conversational rapport, fails to engage modern mobile decision-makers",
      differentiationOpportunities: "Conversational diagnostic teardowns, pragmatic client decision checklists, and relatable video consultations",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "fun" || p.personality === "creative") score += 30;
        if (p.audience === "business_professionals") score += 20;
        if (p.content === "short_videos" || p.content === "graphics") score += 15;
        return score;
      },
    },
    {
      id: "ps_hard_pitcher",
      industry: "professional_services",
      category: "Aggressive Hard-Pitcher",
      name: "High-Pressure Funnel Seller",
      typicalBehavior: "Demanding 15-minute discovery call bookings under every post and through unsolicited cold messages",
      contentStrategy: "Boastful revenue screenshots, urgent booking countdowns, and high-friction sales pitches",
      strategicLimitations: "Triggers prospect skepticism, damages peer referral equity, produces low bookmark and share rates",
      differentiationOpportunities: "Generous un-gated diagnostic value, consultative advisory frameworks, and organic conversational DM qualification",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "professional" || p.personality === "premium") score += 25;
        if (p.goal === "lead_generation" || p.goal === "sales") score += 20;
        if (p.content === "articles" || p.content === "long_videos") score += 15;
        return score;
      },
    },
    {
      id: "ps_inactive_referral",
      industry: "professional_services",
      category: "Passive Word-of-Mouth Operator",
      name: "Silent Referral Relier",
      typicalBehavior: "Posting once every quarter and treating social channels as an inactive digital business card",
      contentStrategy: "Generic holiday greetings and sporadic office anniversary notices without thought leadership",
      strategicLimitations: "Leaves high-intent searchers to book competitors, zero predictable inbound pipeline generated",
      differentiationOpportunities: "Disciplined weekly thought leadership cadence strictly calibrated to available hours, establishing visible domain authority",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.time === "under_2_hours" || p.time === "two_to_five_hours") score += 30;
        if (p.goal === "brand_awareness" || p.goal === "community_building") score += 20;
        if (p.personality === "educational") score += 15;
        return score;
      },
    },
  ],

  lifestyle: [
    {
      id: "ls_staged_luxury",
      industry: "lifestyle",
      category: "Hyper-Staged Luxury Influencer",
      name: "Staged Perfectionist Influencer",
      typicalBehavior: "Curating flawless, heavily edited lifestyle vignettes depicting unattainable daily perfection",
      contentStrategy: "Aesthetic luxury product placements, exotic retreats, and abstract motivational quotes",
      strategicLimitations: "Produces audience fatigue and skepticism, lacks actionable practical guidance for everyday routines",
      differentiationOpportunities: "Raw, relatable habit breakdowns, transparent everyday struggles, and realistic sustainable wellness routines",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "educational" || p.personality === "fun") score += 30;
        if (p.audience === "millennials" || p.audience === "broad_audience") score += 20;
        if (p.content === "short_videos") score += 15;
        return score;
      },
    },
    {
      id: "ls_generic_wellness",
      industry: "lifestyle",
      category: "Generic Wellness Aggregator",
      name: "Commoditized Quote Repurposer",
      typicalBehavior: "Re-posting third-party quotes and stock nature b-roll with zero personal point of view",
      contentStrategy: "Inspirational soundbites and generic wellness tips with no proprietary training structure",
      strategicLimitations: "Completely commoditized, generates zero personal connection with creator or business",
      differentiationOpportunities: "Distinct signature voice, proprietary step-by-step transformation frameworks, and authentic client case studies",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "creative" || p.personality === "premium") score += 25;
        if (p.goal === "community_building" || p.goal === "sales") score += 20;
        if (p.audience === "gen_z") score += 15;
        return score;
      },
    },
    {
      id: "ls_trend_hopper",
      industry: "lifestyle",
      category: "Impulsive Trend Hopper",
      name: "Disjointed Fad Chaser",
      typicalBehavior: "Jumping erratically on every new workout challenge, dance trend, or diet fad",
      contentStrategy: "A chaotic mix of unrelated lifestyle niches that continuously confuses prospective clients",
      strategicLimitations: "Attracts fleeting curiosity views rather than committed clients, high follower churn",
      differentiationOpportunities: "Laser-focused niche authority around a single defined transformation outcome, backed by structured weekly pillars",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.goal === "lead_generation" || p.goal === "sales") score += 25;
        if (p.personality === "professional" || p.personality === "premium") score += 25;
        if (p.time === "under_2_hours" || p.time === "two_to_five_hours") score += 15;
        return score;
      },
    },
  ],

  education: [
    {
      id: "edu_academic_lecturer",
      industry: "education",
      category: "Traditional Academic Lecturer",
      name: "Academic Monologue Lecturer",
      typicalBehavior: "Formal announcements of syllabus modules, textbook titles, and academic dates",
      contentStrategy: "Monotone lecture video clips and dense slide decks without engaging digital pacing",
      strategicLimitations: "Extremely low video completion rates, dry presentation, high cognitive friction for busy learners",
      differentiationOpportunities: "Engaging 60-second micro-breakdowns, visual decision trees, and immediate practical implementation exercises",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.content === "short_videos") score += 30;
        if (p.personality === "fun" || p.personality === "creative") score += 25;
        if (p.audience === "gen_z" || p.audience === "millennials") score += 20;
        return score;
      },
    },
    {
      id: "edu_hype_coach",
      industry: "education",
      category: "High-Hype Guru Model",
      name: "Over-Promising Hype Coach",
      typicalBehavior: "Broadcasting aggressive scarcity countdowns and flashy lifestyle claims",
      contentStrategy: "High-energy lifestyle imagery promising instant breakthroughs with minimal educational substance",
      strategicLimitations: "High refund requests, negative community feedback, rapid loss of algorithmic recommendation",
      differentiationOpportunities: "Transparent curriculum proofs, step-by-step student case studies, and realistic measured progress expectations",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.personality === "professional" || p.personality === "premium") score += 30;
        if (p.goal === "sales" || p.goal === "lead_generation") score += 20;
        if (p.audience === "business_professionals") score += 15;
        return score;
      },
    },
    {
      id: "edu_silent_portal",
      industry: "education",
      category: "Passive Course Host",
      name: "Silent Course Portal",
      typicalBehavior: "Treating social accounts strictly as outbound link repositories to external checkout portals",
      contentStrategy: "Infrequent course discount flyers with zero standalone value offered natively on feed",
      strategicLimitations: "Social algorithms heavily penalize off-platform link posts, leads to near-zero organic reach",
      differentiationOpportunities: "Native platform-optimized mini-lessons that deliver a complete 'aha!' moment before inviting learners to enroll",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.goal === "community_building" || p.goal === "brand_awareness") score += 25;
        if (p.time === "under_2_hours" || p.time === "two_to_five_hours") score += 20;
        if (p.content === "graphics" || p.content === "articles") score += 15;
        return score;
      },
    },
  ],

  other: [
    {
      id: "other_broadcast_flyer",
      industry: "other",
      category: "Broadcast Flyer Distributor",
      name: "Static Digital Flyer Operator",
      typicalBehavior: "Uploading printed graphic flyers and event brochures directly to digital feeds",
      contentStrategy: "Text-heavy static banners with small typography and generic stock graphics",
      strategicLimitations: "Severely penalized by mobile-first video algorithms, poor readability, low click-through rates",
      differentiationOpportunities: "Mobile-first native video hooks, dynamic multi-slide carousels, and relatable problem-first storytelling",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.content === "short_videos") score += 30;
        if (p.personality === "creative" || p.personality === "fun") score += 20;
        if (p.audience === "gen_z" || p.audience === "millennials") score += 15;
        return score;
      },
    },
    {
      id: "other_paid_reliant",
      industry: "other",
      category: "Paid Traffic Reliant Operator",
      name: "Ad-Dependent Competitor",
      typicalBehavior: "Funneling budget into sponsored ad placements while leaving organic social profile deserted",
      contentStrategy: "Aggressive direct-response ads with no organic social proof or active community backing",
      strategicLimitations: "Steep customer acquisition costs; prospects who inspect profile find zero organic credibility",
      differentiationOpportunities: "Active organic profile acting as a trust anchor that compounds conversion rates across all inbound traffic",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.goal === "lead_generation" || p.goal === "sales") score += 25;
        if (p.personality === "premium" || p.personality === "professional") score += 20;
        if (p.time === "under_2_hours") score += 15;
        return score;
      },
    },
    {
      id: "other_irregular_poster",
      industry: "other",
      category: "Irregular Solo Broadcaster",
      name: "Sporadic Motivation Broadcaster",
      typicalBehavior: "Publishing 4 posts during one week of motivation followed by 3 weeks of total silence",
      contentStrategy: "An unfocused mix of personal updates, random product links, and generic memes",
      strategicLimitations: "Destroys algorithmic distribution signals; audience forgets brand positioning",
      differentiationOpportunities: "Strict weekly publishing consistency strictly calibrated to your available time budget, utilizing batch production",
      scoreRelevance: (p) => {
        let score = 50;
        if (p.time === "under_2_hours" || p.time === "two_to_five_hours") score += 30;
        if (p.goal === "brand_awareness") score += 20;
        if (p.personality === "educational") score += 15;
        return score;
      },
    },
  ],
};

/**
 * Selects the 2 most relevant competitor archetypes for the user's business profile.
 * Deterministic and rule-based: scores each archetype in the industry against user answers.
 */
export function selectTopCompetitorArchetypes(
  industry: Industry,
  profile: {
    audience: Audience;
    goal: Goal;
    content: ContentType;
    personality: Personality;
    time: WeeklyTime;
    primaryPlatform: string;
  }
): [CompetitorArchetypeDefinition, CompetitorArchetypeDefinition] {
  const archetypes = INDUSTRY_COMPETITOR_DATABASE[industry] || INDUSTRY_COMPETITOR_DATABASE.other;
  const scored = archetypes.map((arch) => ({
    archetype: arch,
    score: arch.scoreRelevance(profile),
  }));

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return [scored[0].archetype, scored[1].archetype];
}

/**
 * Builds dynamically generated, personalized competitive intelligence:
 * A. Competitive Landscape (2 archetype cards with tailored counter-strategies)
 * B. Head-to-Head Comparison (across 4 dimensions: Content Strategy, Audience Engagement, Platform Selection, Conversion Approach)
 * C. Market Opportunities (Competitor Pattern, Potential Market Gap, Your Brand Opportunity)
 */
export function generateCompetitiveIntelligence(params: {
  business: BusinessDiscovery;
  quizAnswers: {
    industry: Industry;
    audience: Audience;
    goal: Goal;
    content: ContentType;
    personality: Personality;
    time: WeeklyTime;
  };
  scoringResults: RecommendationEngineResult;
  snapshot: BusinessSnapshot;
}): CompetitorBenchmark {
  const { business, quizAnswers, scoringResults } = params;
  const primaryId = scoringResults.primaryPlatform;
  const secondaryId = scoringResults.secondaryPlatform;
  const primaryMeta = PLATFORMS_DATA[primaryId];
  const secondaryMeta = PLATFORMS_DATA[secondaryId];

  const industryLabel = getAnswerLabel("industry", quizAnswers.industry);
  const audienceLabel = getAnswerLabel("audience", quizAnswers.audience);
  const goalLabel = getAnswerLabel("goal", quizAnswers.goal);
  const contentLabel = getAnswerLabel("content", quizAnswers.content);
  const personalityLabel = getAnswerLabel("personality", quizAnswers.personality);
  const timeLabel = getAnswerLabel("time", quizAnswers.time);

  // 1. Select the 2 most relevant archetypes
  const [arch1, arch2] = selectTopCompetitorArchetypes(quizAnswers.industry, {
    audience: quizAnswers.audience,
    goal: quizAnswers.goal,
    content: quizAnswers.content,
    personality: quizAnswers.personality,
    time: quizAnswers.time,
    primaryPlatform: primaryId,
  });

  // 2. Personalize the 2 competitor benchmark cards
  const benchmarkedCompetitors: CompetitorExample[] = [
    {
      name: arch1.name,
      type: arch1.category,
      channelFocus: arch1.typicalBehavior,
      primaryFlaw: arch1.strategicLimitations,
      ourCounterStrategy: `Position ${business.businessName} with a "${personalityLabel}" tone on ${primaryMeta.name}, replacing generic broadcasting with high-relevance ${contentLabel} addressing ${audienceLabel}.`,
      behaviorSummary: arch1.typicalBehavior,
      contentStrategy: arch1.contentStrategy,
      limitations: arch1.strategicLimitations,
      differentiation: arch1.differentiationOpportunities,
    },
    {
      name: arch2.name,
      type: arch2.category,
      channelFocus: arch2.typicalBehavior,
      primaryFlaw: arch2.strategicLimitations,
      ourCounterStrategy: `Differentiate through consistent weekly execution strictly within your ${timeLabel} budget, creating authoritative ${contentLabel} that solves real prospect objections.`,
      behaviorSummary: arch2.typicalBehavior,
      contentStrategy: arch2.contentStrategy,
      limitations: arch2.strategicLimitations,
      differentiation: arch2.differentiationOpportunities,
    },
  ];

  // 3. Dynamic Head-to-Head Comparison across the 4 required dimensions
  const headToHeadComparison = [
    {
      dimension: "Content Strategy",
      competitorsApproach: `Generic promotional broadcasts and low-retention ${quizAnswers.industry === "fashion_beauty" || quizAnswers.industry === "lifestyle" ? "aesthetic photo dumps" : "corporate announcements"}`,
      yourAdvantage: `High-retention, problem-first ${contentLabel} engineered for organic algorithmic distribution on ${primaryMeta.name}`,
    },
    {
      dimension: "Audience Engagement",
      competitorsApproach: "One-way broadcasting with automated or neglected comment sections (< 15% reply rate)",
      yourAdvantage: `Active 1-on-1 community dialogue and conversational qualification tailored directly to ${audienceLabel}`,
    },
    {
      dimension: "Platform Selection",
      competitorsApproach: "Spreading thin across 4–5 disjointed channels without focused repurposing workflows",
      yourAdvantage: `Laser-focused distribution: 70% effort on #1 ${primaryMeta.name} + strategic syndication to ${secondaryMeta.name}, strictly under ${timeLabel}`,
    },
    {
      dimension: "Conversion Approach",
      competitorsApproach: quizAnswers.goal === "sales" || quizAnswers.goal === "lead_generation"
        ? "Aggressive immediate hard-pitching or broken link funnels with high abandonment"
        : "Passive bio links with zero clear value proposition or diagnostic hook",
      yourAdvantage: `Trust-first value delivery driving qualified inbound inquiries for ${business.mainProduct || "your core offering"}`,
    },
  ];

  // 4. Personalized Market Opportunities
  const competitorPattern = `In ${industryLabel}, typical competitors over-rely on broad promotional messaging and generic announcements without tailoring hooks to ${audienceLabel}.`;
  
  const potentialMarketGap = `There is a clear shortage of accessible, "${personalityLabel}" authority on ${primaryMeta.name} that combines high-retention ${contentLabel} with rapid 1-on-1 prospect interaction.`;
  
  const yourBrandOpportunity = `By anchoring ${business.businessName}'s presence on ${primaryMeta.name} and repurposing to ${secondaryMeta.name}, you capture high-intent ${audienceLabel} while respecting your ${timeLabel} operational limit.`;

  const keyDifferentiators = [
    `Content Depth: Focused ${contentLabel} solving real buyer friction rather than vanity broadcasting`,
    `Audience Alignment: Direct engagement calibrated to ${audienceLabel} values and preferred tone (${personalityLabel})`,
    `Resource Efficiency: Sustainable dual-channel engine designed specifically for your ${timeLabel} capacity`,
  ];

  return {
    industryLandscape: competitorPattern,
    competitorGap: potentialMarketGap,
    whitespaceAdvantage: yourBrandOpportunity,
    keyDifferentiators,
    benchmarkedCompetitors,
    headToHeadComparison,
    marketOpportunities: {
      pattern: competitorPattern,
      marketGap: potentialMarketGap,
      brandOpportunity: yourBrandOpportunity,
    },
  };
}
