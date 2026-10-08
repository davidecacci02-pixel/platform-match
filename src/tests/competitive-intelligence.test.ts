import { describe, it, expect } from "vitest";
import {
  INDUSTRY_COMPETITOR_DATABASE,
  selectTopCompetitorArchetypes,
  generateCompetitiveIntelligence,
} from "@/lib/competitive-intelligence-engine";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { generateBusinessSnapshot, generateAIStrategy } from "@/lib/ai-strategy-service";
import { QuizAnswers, Industry } from "@/lib/quiz-schema";
import { BusinessDiscovery, CompetitorBenchmarkSchema } from "@/lib/business-schema";
import { TWENTY_PROFILES } from "./simulate-20-profiles";

describe("Competitive Intelligence Engine: Industry Archetypes & Consistency", () => {
  const supportedIndustries: Industry[] = [
    "fashion_beauty",
    "food_beverage",
    "technology",
    "professional_services",
    "lifestyle",
    "education",
    "other",
  ];

  it("defines at least 3 realistic competitor archetypes for every supported industry", () => {
    for (const ind of supportedIndustries) {
      const archetypes = INDUSTRY_COMPETITOR_DATABASE[ind];
      expect(
        archetypes,
        `Industry '${ind}' must have a defined archetypes list`
      ).toBeDefined();
      expect(
        archetypes.length,
        `Industry '${ind}' must have at least 3 archetypes`
      ).toBeGreaterThanOrEqual(3);

      // Verify each archetype structure
      for (const arch of archetypes) {
        expect(arch.id).toBeTruthy();
        expect(arch.category).toBeTruthy();
        expect(arch.name).toBeTruthy();
        expect(arch.typicalBehavior.length).toBeGreaterThan(15);
        expect(arch.contentStrategy.length).toBeGreaterThan(15);
        expect(arch.strategicLimitations.length).toBeGreaterThan(15);
        expect(arch.differentiationOpportunities.length).toBeGreaterThan(15);
        expect(typeof arch.scoreRelevance).toBe("function");

        // Verify plausible strategic scenario without naming real companies or making fake factual claims
        expect(arch.typicalBehavior).not.toMatch(/\$\d+M|\b(Apple|Google|Nike|Sephora|McKinsey)\b/i);
      }
    }
  });

  it("deterministically selects the top 2 most relevant distinct archetypes", () => {
    const archetypes = selectTopCompetitorArchetypes("technology", {
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "two_to_five_hours",
      primaryPlatform: "linkedin",
    });

    expect(archetypes.length).toBe(2);
    expect(archetypes[0].id).not.toBe(archetypes[1].id);
  });

  describe("Verification Across 7 Key Benchmark Business Profiles", () => {
    const keyProfiles: Array<{
      name: string;
      business: BusinessDiscovery;
      quiz: QuizAnswers;
    }> = [
      {
        name: "Gen Z fashion brand",
        business: {
          businessName: "Nova Streetwear",
          websiteUrl: "https://novastreetwear.com",
          description: "Eco-conscious oversized street apparel made from upcycled denim.",
          industry: "fashion_beauty",
          mainProduct: "Recycled Cargo Pants",
          targetGeo: "Global / US",
        },
        quiz: {
          industry: "fashion_beauty",
          audience: "gen_z",
          goal: "sales",
          content: "short_videos",
          personality: "fun",
          time: "five_to_ten_hours",
        },
      },
      {
        name: "B2B technology startup",
        business: {
          businessName: "CloudPulse Systems",
          websiteUrl: "https://cloudpulse.io",
          description: "Real-time Kubernetes cost monitoring and anomaly detection engine.",
          industry: "technology",
          mainProduct: "Cloud Cost Intelligence",
          targetGeo: "North America & EU",
        },
        quiz: {
          industry: "technology",
          audience: "business_professionals",
          goal: "lead_generation",
          content: "articles",
          personality: "professional",
          time: "two_to_five_hours",
        },
      },
      {
        name: "Local restaurant",
        business: {
          businessName: "Osteria Bella",
          websiteUrl: "https://osteriabella.it",
          description: "Family-owned traditional trattoria specializing in handmade pasta and natural wines.",
          industry: "food_beverage",
          mainProduct: "Artisanal Tasting Menu",
          targetGeo: "Local Metro Area",
        },
        quiz: {
          industry: "food_beverage",
          audience: "broad_audience",
          goal: "brand_awareness",
          content: "photos",
          personality: "creative",
          time: "under_2_hours",
        },
      },
      {
        name: "Premium beauty brand",
        business: {
          businessName: "Lumière Botanique",
          websiteUrl: "https://lumierebotanique.com",
          description: "High-concentration peptide serums formulated with rare alpine botanical extracts.",
          industry: "fashion_beauty",
          mainProduct: "Radiance Cellular Elixir",
          targetGeo: "International",
        },
        quiz: {
          industry: "fashion_beauty",
          audience: "millennials",
          goal: "sales",
          content: "photos",
          personality: "premium",
          time: "two_to_five_hours",
        },
      },
      {
        name: "Professional consulting agency",
        business: {
          businessName: "Apex Strategy Group",
          websiteUrl: "https://apexstrategy.com",
          description: "Executive advisory firm helping mid-market enterprises execute digital transformations.",
          industry: "professional_services",
          mainProduct: "Turnaround Advisory",
          targetGeo: "National",
        },
        quiz: {
          industry: "professional_services",
          audience: "business_professionals",
          goal: "lead_generation",
          content: "articles",
          personality: "professional",
          time: "under_2_hours",
        },
      },
      {
        name: "Educational business",
        business: {
          businessName: "DataSprint Academy",
          websiteUrl: "https://datasprint.edu",
          description: "Intensive 8-week cohort courses for data analysts transitioning to ML engineering.",
          industry: "education",
          mainProduct: "Applied ML Certification",
          targetGeo: "Global Remote",
        },
        quiz: {
          industry: "education",
          audience: "business_professionals",
          goal: "sales",
          content: "long_videos",
          personality: "educational",
          time: "five_to_ten_hours",
        },
      },
      {
        name: "Lifestyle creator business",
        business: {
          businessName: "Wanderlust Journal",
          websiteUrl: "https://wanderlustjournal.co",
          description: "Curated slow travel itineraries and digital nomad gear guides.",
          industry: "lifestyle",
          mainProduct: "Quarterly Travel Guides",
          targetGeo: "Global",
        },
        quiz: {
          industry: "lifestyle",
          audience: "gen_z",
          goal: "community_building",
          content: "short_videos",
          personality: "creative",
          time: "two_to_five_hours",
        },
      },
    ];

    it.each(keyProfiles)(
      "generates consistent, non-contradictory competitive intelligence for: $name",
      async ({ business, quiz }) => {
        const scoring = calculatePlatformScores(quiz);
        const snapshot = await generateBusinessSnapshot({
          business,
          quizAnswers: quiz,
          extension: {
            businessModel: quiz.audience === "business_professionals" ? "b2b" : "b2c",
            currentPresence: "sporadic",
            marketingChallenge: "leads_sales",
            monthlyBudget: "500_to_2000",
          },
        });

        const compIntel = generateCompetitiveIntelligence({
          business,
          quizAnswers: quiz,
          scoringResults: scoring,
          snapshot,
        });

        // 1. Check schema validity
        const parsed = CompetitorBenchmarkSchema.safeParse(compIntel);
        expect(parsed.success).toBe(true);

        // 2. Exactly 2 archetype cards
        expect(compIntel.benchmarkedCompetitors.length).toBe(2);
        expect(compIntel.benchmarkedCompetitors[0].name).not.toBe(
          compIntel.benchmarkedCompetitors[1].name
        );

        // 3. Head-to-Head Comparison has the 4 required dimensions
        const dims = compIntel.headToHeadComparison.map((r) => r.dimension);
        expect(dims).toEqual([
          "Content Strategy",
          "Audience Engagement",
          "Platform Selection",
          "Conversion Approach",
        ]);

        // 4. Platform Selection in comparison references top platform
        const platformRow = compIntel.headToHeadComparison.find(
          (r) => r.dimension === "Platform Selection"
        );
        expect(platformRow).toBeDefined();
        const topPlatform = scoring.primaryPlatform;
        expect(platformRow?.yourAdvantage.toLowerCase()).toContain(topPlatform.toLowerCase());

        // 5. Weekly time feasibility respected
        if (quiz.time === "under_2_hours") {
          expect(platformRow?.yourAdvantage).toMatch(/under 2 hours/i);
        }

        // 6. 3 Market Opportunities populated
        expect(compIntel.marketOpportunities).toBeDefined();
        expect(compIntel.marketOpportunities?.pattern.length).toBeGreaterThan(20);
        expect(compIntel.marketOpportunities?.marketGap.length).toBeGreaterThan(20);
        expect(compIntel.marketOpportunities?.brandOpportunity.length).toBeGreaterThan(20);
      }
    );
  });

  describe("Validation Across 20 Diverse Business Profiles", () => {
    it("dynamically varies competitor archetypes and opportunities across 20 diverse profiles without contradictions", async () => {
      const distinctArchetypesSeen = new Set<string>();
      const distinctGapsSeen = new Set<string>();

      for (const p of TWENTY_PROFILES) {
        const business: BusinessDiscovery = {
          businessName: p.name,
          websiteUrl: `https://${p.id}.example.com`,
          description: `Comprehensive operations for ${p.name} catering to specific audience needs.`,
          industry: p.answers.industry,
          mainProduct: `${p.name} Core Service`,
          targetGeo: "Regional & Online",
        };

        const scoring = calculatePlatformScores(p.answers);
        const snapshot = await generateBusinessSnapshot({
          business,
          quizAnswers: p.answers,
          extension: {
            businessModel: p.answers.audience === "business_professionals" ? "b2b" : "b2c",
            currentPresence: "sporadic",
            marketingChallenge: "leads_sales",
            monthlyBudget: "500_to_2000",
          },
        });

        const compIntel = generateCompetitiveIntelligence({
          business,
          quizAnswers: p.answers,
          scoringResults: scoring,
          snapshot,
        });

        // Record diversity metrics
        compIntel.benchmarkedCompetitors.forEach((c) => {
          distinctArchetypesSeen.add(`${p.answers.industry}:${c.name}`);
        });
        if (compIntel.marketOpportunities?.marketGap) {
          distinctGapsSeen.add(compIntel.marketOpportunities.marketGap);
        }

        // Verify head to head 4 dimensions
        expect(compIntel.headToHeadComparison.length).toBe(4);
        expect(compIntel.headToHeadComparison[0].dimension).toBe("Content Strategy");
        expect(compIntel.headToHeadComparison[1].dimension).toBe("Audience Engagement");
        expect(compIntel.headToHeadComparison[2].dimension).toBe("Platform Selection");
        expect(compIntel.headToHeadComparison[3].dimension).toBe("Conversion Approach");

        // Verify full strategy integration
        const fullStrategy = await generateAIStrategy({
          business,
          quizAnswers: p.answers,
          scoringResults: scoring,
          snapshot,
        });

        expect(fullStrategy.competitorBenchmark.benchmarkedCompetitors.length).toBe(2);
        expect(fullStrategy.competitorBenchmark.headToHeadComparison.length).toBe(4);
      }

      // Ensure that across 20 profiles, the system doesn't produce identical monolithic outputs
      expect(distinctArchetypesSeen.size).toBeGreaterThanOrEqual(10);
      expect(distinctGapsSeen.size).toBeGreaterThanOrEqual(5);
    });
  });
});
