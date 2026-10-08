import {
  Industry,
  Audience,
  Goal,
  ContentType,
  Personality,
  WeeklyTime,
  PlatformId,
} from "./quiz-schema";

export const SCORING_WEIGHTS = {
  audience: 0.30,
  goal: 0.25,
  industry: 0.15,
  content: 0.15,
  personality: 0.10,
  time: 0.05,
} as const;

// Ensure weights sum to exactly 1.0 (100%)
export const TOTAL_WEIGHT = Object.values(SCORING_WEIGHTS).reduce(
  (sum, w) => sum + w,
  0
);

export type PlatformFitMap = Record<PlatformId, number>;

export const INDUSTRY_FIT_MATRIX: Record<Industry, PlatformFitMap> = {
  fashion_beauty: {
    instagram: 98,
    pinterest: 95,
    tiktok: 94,
    youtube: 70,
    facebook: 60,
    linkedin: 20,
  },
  food_beverage: {
    instagram: 96,
    tiktok: 93,
    pinterest: 88,
    youtube: 75,
    facebook: 72,
    linkedin: 18,
  },
  technology: {
    linkedin: 96,
    youtube: 90,
    facebook: 58,
    tiktok: 62,
    instagram: 48,
    pinterest: 22,
  },
  professional_services: {
    linkedin: 96,
    facebook: 80, // Essential for local home contractors, dentists, local accountants & consumer services
    youtube: 72,
    instagram: 45,
    tiktok: 25,
    pinterest: 25,
  },
  lifestyle: {
    instagram: 96,
    pinterest: 94,
    tiktok: 86,
    youtube: 82,
    facebook: 68,
    linkedin: 32,
  },
  education: {
    youtube: 98,
    linkedin: 88,
    tiktok: 72,
    instagram: 68,
    facebook: 65,
    pinterest: 52,
  },
  other: {
    instagram: 72,
    facebook: 72,
    linkedin: 68,
    youtube: 68,
    tiktok: 58,
    pinterest: 52,
  },
};

export const AUDIENCE_FIT_MATRIX: Record<Audience, PlatformFitMap> = {
  gen_z: {
    tiktok: 99,
    instagram: 92,
    youtube: 86,
    pinterest: 68,
    facebook: 28,
    linkedin: 32,
  },
  millennials: {
    instagram: 96,
    linkedin: 85,
    youtube: 86,
    tiktok: 78,
    pinterest: 78,
    facebook: 62,
  },
  gen_x: {
    facebook: 94,
    linkedin: 82,
    youtube: 80,
    instagram: 68,
    pinterest: 68,
    tiktok: 32,
  },
  fifty_five_plus: {
    facebook: 98, // Overwhelming demographic dominance for 55+ / retirees
    youtube: 78,
    linkedin: 42, // Non-working / senior retirees are not active on B2B LinkedIn
    pinterest: 56,
    instagram: 42,
    tiktok: 18,
  },
  business_professionals: {
    linkedin: 99,
    youtube: 76,
    facebook: 48,
    instagram: 44,
    tiktok: 22,
    pinterest: 18,
  },
  broad_audience: {
    youtube: 96,
    facebook: 86,
    instagram: 82,
    tiktok: 68,
    linkedin: 54,
    pinterest: 56,
  },
};

export const GOAL_FIT_MATRIX: Record<Goal, PlatformFitMap> = {
  brand_awareness: {
    tiktok: 97,
    instagram: 94,
    youtube: 90,
    facebook: 70,
    linkedin: 72,
    pinterest: 66,
  },
  sales: {
    instagram: 96,
    pinterest: 94,
    facebook: 82,
    tiktok: 78,
    youtube: 66,
    linkedin: 52,
  },
  lead_generation: {
    linkedin: 98,
    facebook: 84, // Strong for consumer, local, and B2C/mature client lead forms
    youtube: 76,
    instagram: 62,
    pinterest: 48,
    tiktok: 32,
  },
  community_building: {
    facebook: 96, // Industry standard for Groups & local discussions
    instagram: 88,
    youtube: 86,
    tiktok: 78,
    linkedin: 72,
    pinterest: 42,
  },
  website_traffic: {
    pinterest: 98, // Pins are direct outbound referral links
    youtube: 82,
    linkedin: 76,
    facebook: 72,
    instagram: 42, // No clickable links in feed posts
    tiktok: 32,
  },
};

export const CONTENT_FIT_MATRIX: Record<ContentType, PlatformFitMap> = {
  short_videos: {
    tiktok: 99,
    instagram: 96,
    youtube: 88, // YouTube Shorts
    facebook: 68,
    pinterest: 62,
    linkedin: 42,
  },
  long_videos: {
    youtube: 100, // Definite king of deep long-form
    facebook: 62,
    linkedin: 50,
    instagram: 35,
    tiktok: 30,
    pinterest: 20,
  },
  photos: {
    instagram: 98,
    pinterest: 96,
    facebook: 86,
    linkedin: 45,
    tiktok: 35,
    youtube: 20,
  },
  articles: {
    linkedin: 99,
    facebook: 78,
    pinterest: 58, // Blog post graphic pins driving to articles
    youtube: 25, // YouTube cannot host written text articles
    instagram: 28,
    tiktok: 12,
  },
  graphics: {
    linkedin: 94, // PDF carousel decks perform exceptionally well
    pinterest: 92,
    instagram: 90,
    facebook: 68,
    youtube: 35,
    tiktok: 22,
  },
  mixed: {
    instagram: 94,
    youtube: 92,
    linkedin: 90,
    facebook: 86,
    tiktok: 82,
    pinterest: 80,
  },
};

export const PERSONALITY_FIT_MATRIX: Record<Personality, PlatformFitMap> = {
  fun: {
    tiktok: 98,
    instagram: 88,
    youtube: 76,
    facebook: 64,
    pinterest: 60,
    linkedin: 28,
  },
  professional: {
    linkedin: 99,
    youtube: 82,
    facebook: 68,
    instagram: 50,
    pinterest: 34,
    tiktok: 22,
  },
  creative: {
    instagram: 96,
    pinterest: 96,
    tiktok: 92,
    youtube: 82,
    facebook: 52,
    linkedin: 42,
  },
  educational: {
    youtube: 98,
    linkedin: 92,
    tiktok: 76,
    instagram: 72,
    facebook: 68,
    pinterest: 62,
  },
  premium: {
    instagram: 98,
    pinterest: 92,
    linkedin: 82,
    youtube: 72,
    facebook: 45,
    tiktok: 32,
  },
};

export const TIME_FIT_MATRIX: Record<WeeklyTime, PlatformFitMap> = {
  under_2_hours: {
    pinterest: 95, // High leverage: batch 10 pins in 45 mins using scheduling tools
    linkedin: 90,  // Fast: 1 text/image post takes 30 mins
    facebook: 85,  // Fast: community update or photo takes 20 mins
    instagram: 55, // Needs aesthetic consistency or stories
    tiktok: 25,    // Filming, lighting, editing requires continuous rhythm
    youtube: 10,   // Video scripting, filming, audio & editing in <2h leads to instant burnout
  },
  two_to_five_hours: {
    linkedin: 92,
    instagram: 86,
    pinterest: 88,
    facebook: 84,
    tiktok: 65,
    youtube: 48,
  },
  five_to_ten_hours: {
    instagram: 96,
    tiktok: 92,
    youtube: 86,
    linkedin: 88,
    facebook: 82,
    pinterest: 82,
  },
  more_than_10_hours: {
    youtube: 98,
    tiktok: 96,
    instagram: 96,
    linkedin: 90,
    facebook: 86,
    pinterest: 85,
  },
};

/**
 * Stable tie-breaking fallback priority order:
 * 1. goal-fit score
 * 2. audience-fit score
 * 3. stable predefined order
 */
export const STABLE_PLATFORM_PRIORITY: PlatformId[] = [
  "linkedin",
  "instagram",
  "youtube",
  "tiktok",
  "facebook",
  "pinterest",
];
