import { z } from "zod";

export const IndustryEnum = z.enum([
  "fashion_beauty",
  "food_beverage",
  "technology",
  "professional_services",
  "lifestyle",
  "education",
  "other",
]);
export type Industry = z.infer<typeof IndustryEnum>;

export const AudienceEnum = z.enum([
  "gen_z",
  "millennials",
  "gen_x",
  "fifty_five_plus",
  "business_professionals",
  "broad_audience",
]);
export type Audience = z.infer<typeof AudienceEnum>;

export const GoalEnum = z.enum([
  "brand_awareness",
  "sales",
  "lead_generation",
  "community_building",
  "website_traffic",
]);
export type Goal = z.infer<typeof GoalEnum>;

export const ContentTypeEnum = z.enum([
  "short_videos",
  "long_videos",
  "photos",
  "articles",
  "graphics",
  "mixed",
]);
export type ContentType = z.infer<typeof ContentTypeEnum>;

export const PersonalityEnum = z.enum([
  "fun",
  "professional",
  "creative",
  "educational",
  "premium",
]);
export type Personality = z.infer<typeof PersonalityEnum>;

export const WeeklyTimeEnum = z.enum([
  "under_2_hours",
  "two_to_five_hours",
  "five_to_ten_hours",
  "more_than_10_hours",
]);
export type WeeklyTime = z.infer<typeof WeeklyTimeEnum>;

export const PlatformIdEnum = z.enum([
  "instagram",
  "tiktok",
  "facebook",
  "linkedin",
  "youtube",
  "pinterest",
]);
export type PlatformId = z.infer<typeof PlatformIdEnum>;

export const QuizAnswersSchema = z.object({
  industry: IndustryEnum,
  audience: AudienceEnum,
  goal: GoalEnum,
  content: ContentTypeEnum,
  personality: PersonalityEnum,
  time: WeeklyTimeEnum,
});

export type QuizAnswers = z.infer<typeof QuizAnswersSchema>;

export const LeadCaptureSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  challenge: z.string().min(5, "Please briefly describe your primary marketing challenge"),
  primaryPlatform: PlatformIdEnum.optional(),
  answers: QuizAnswersSchema.optional(),
});

export type LeadCaptureData = z.infer<typeof LeadCaptureSchema>;
