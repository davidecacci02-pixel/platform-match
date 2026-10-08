import { z } from "zod";
import {
  IndustryEnum,
  AudienceEnum,
  GoalEnum,
  ContentTypeEnum,
  PersonalityEnum,
  WeeklyTimeEnum,
  PlatformIdEnum,
  QuizAnswersSchema,
} from "./quiz-schema";

// Stage 1: Business Discovery
export const BusinessDiscoverySchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters").max(100),
  websiteUrl: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        try {
          const parsed = new URL(val.startsWith("http") ? val : `https://${val}`);
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: "Please enter a valid website URL or leave blank" }
    )
    .optional(),
  description: z
    .string()
    .min(10, "Please provide at least 10 characters describing your business")
    .max(800),
  industry: IndustryEnum,
  mainProduct: z.string().min(2, "Please state your main product or service").max(150),
  targetGeo: z.string().min(2, "Please specify your target market or region").max(100),
});

export type BusinessDiscovery = z.infer<typeof BusinessDiscoverySchema>;

// Stage 2: Smart Marketing Assessment Extensions
export const BusinessModelEnum = z.enum(["b2b", "b2c", "both"]);
export type BusinessModel = z.infer<typeof BusinessModelEnum>;

export const CurrentPresenceEnum = z.enum(["none", "sporadic", "active"]);
export type CurrentPresence = z.infer<typeof CurrentPresenceEnum>;

export const MarketingChallengeEnum = z.enum([
  "leads_sales",
  "consistent_content",
  "differentiation",
  "limited_time",
  "community",
]);
export type MarketingChallenge = z.infer<typeof MarketingChallengeEnum>;

export const MonthlyBudgetEnum = z.enum([
  "zero",
  "under_500",
  "500_to_2000",
  "over_2000",
]);
export type MonthlyBudget = z.infer<typeof MonthlyBudgetEnum>;

export const MarketingAssessmentExtensionSchema = z.object({
  businessModel: BusinessModelEnum,
  currentPresence: CurrentPresenceEnum,
  marketingChallenge: MarketingChallengeEnum,
  monthlyBudget: MonthlyBudgetEnum.optional(),
});

export type MarketingAssessmentExtension = z.infer<
  typeof MarketingAssessmentExtensionSchema
>;

// Combined full assessment input
export const FullConsultationInputSchema = z.object({
  business: BusinessDiscoverySchema,
  quizAnswers: QuizAnswersSchema,
  assessmentExtension: MarketingAssessmentExtensionSchema,
});

export type FullConsultationInput = z.infer<typeof FullConsultationInputSchema>;

// Stage 3: Business Snapshot
export const BusinessSnapshotSchema = z.object({
  positioning: z.string().min(5),
  audienceProfile: z.string().min(5),
  marketingObjective: z.string().min(5),
  contentOpportunities: z.array(z.string()).min(2),
  mainConstraints: z.array(z.string()).min(1),
  verifiedFromWebsite: z.boolean().default(false),
  extractedBrandVoice: z.string().optional(),
});

export type BusinessSnapshot = z.infer<typeof BusinessSnapshotSchema>;

// Stage 4: AI Structured Strategy Output
export const ContentPillarSchema = z.object({
  name: z.string(),
  purpose: z.string(),
  examples: z.array(z.string()).min(1),
  recommendedPlatform: PlatformIdEnum,
});
export type ContentPillar = z.infer<typeof ContentPillarSchema>;

export const StructuredContentIdeaSchema = z.object({
  title: z.string(),
  hook: z.string(),
  platform: PlatformIdEnum,
  format: z.string(),
  keyMessage: z.string(),
  cta: z.string(),
  strategicGoal: z.string(),
});
export type StructuredContentIdea = z.infer<typeof StructuredContentIdeaSchema>;

export const SuccessMetricSchema = z.object({
  kpi: z.string(),
  whyItMatters: z.string(),
  frequency: z.string(),
});
export type SuccessMetric = z.infer<typeof SuccessMetricSchema>;

export const CompetitorExampleSchema = z.object({
  name: z.string(),
  type: z.string(),
  channelFocus: z.string(),
  primaryFlaw: z.string(),
  ourCounterStrategy: z.string(),
});
export type CompetitorExample = z.infer<typeof CompetitorExampleSchema>;

export const CompetitorBenchmarkSchema = z.object({
  industryLandscape: z.string(),
  competitorGap: z.string(),
  whitespaceAdvantage: z.string(),
  keyDifferentiators: z.array(z.string()).min(2),
  benchmarkedCompetitors: z.array(CompetitorExampleSchema).optional(),
  headToHeadComparison: z
    .array(
      z.object({
        dimension: z.string(),
        competitorsApproach: z.string(),
        yourAdvantage: z.string(),
      })
    )
    .optional(),
});
export type CompetitorBenchmark = z.infer<typeof CompetitorBenchmarkSchema>;

export const AIStrategyOutputSchema = z.object({
  strategicSummary: z.string().max(750),
  primaryPlatformStrategy: z.object({
    whyMain: z.string(),
    supportsGoal: z.string(),
    audienceReach: z.string(),
    formatsToPrioritize: z.array(z.string()),
  }),
  secondaryPlatformStrategy: z.object({
    whyComplements: z.string(),
    repurposingApproach: z.string(),
    additionalValue: z.string(),
    isSoloRecommended: z.boolean().optional(),
  }),
  strategicConsiderations: z.array(z.string()).default([]),
  contentPillars: z.array(ContentPillarSchema).min(3).max(5),
  contentIdeas: z.array(StructuredContentIdeaSchema).min(6),
  successMetrics: z.array(SuccessMetricSchema).min(3).max(5),
  competitorBenchmark: CompetitorBenchmarkSchema.optional(),
  isAIEnhanced: z.boolean().default(false),
  engineModelUsed: z.string().default("Deterministic Rule Engine"),
});

export type AIStrategyOutput = z.infer<typeof AIStrategyOutputSchema>;

// Stage 5: Conversational AI Consultant Types
export interface ConsultantMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  proposedRevision?: {
    summary: string;
    changes: string[];
    revisedStrategy?: Partial<AIStrategyOutput>;
  };
}
