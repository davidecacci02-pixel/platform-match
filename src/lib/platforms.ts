import { PlatformId } from "./quiz-schema";

export interface PlatformMetadata {
  id: PlatformId;
  name: string;
  tagline: string;
  brandColor: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
  gradient: string;
  primaryDemographics: string;
  coreFormats: string[];
  bestFor: string;
  inherentLimitations: string[];
  defaultFrequency: string;
}

export const PLATFORMS_DATA: Record<PlatformId, PlatformMetadata> = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    tagline: "Visual storytelling, aesthetic brand building & social commerce",
    brandColor: "#E1306C",
    badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
    badgeText: "text-pink-600",
    borderAccent: "border-pink-300 hover:border-pink-400",
    gradient: "from-pink-500 via-rose-500 to-amber-500",
    primaryDemographics: "Millennials & Gen Z (Ages 18–34)",
    coreFormats: ["Reels", "Carousel Posts", "Stories", "Broadcast Channels"],
    bestFor: "Lifestyle branding, visual products, e-commerce, and high engagement",
    inherentLimitations: [
      "No clickable links in standard post captions (requires link-in-bio or Story stickers)",
      "High competition requiring consistent aesthetic quality and video editing",
    ],
    defaultFrequency: "3–4 Reels + 2 Carousels per week, daily Stories",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    tagline: "Viral short-form video discovery & culture-driven trends",
    brandColor: "#000000",
    badgeBg: "bg-slate-100 text-slate-900 border-slate-300",
    badgeText: "text-slate-900",
    borderAccent: "border-slate-400 hover:border-slate-600",
    gradient: "from-cyan-500 via-slate-900 to-rose-500",
    primaryDemographics: "Gen Z & Young Millennials (Ages 16–30)",
    coreFormats: ["Vertical Short-Form Video (15s–60s)", "Duets/Stitches", "TikTok Live"],
    bestFor: "Hyper-organic reach, personality-first storytelling, and trend-jacking",
    inherentLimitations: [
      "Content decay is rapid (videos usually peak within 48–72 hours)",
      "Demands constant on-camera authenticity and trend monitoring",
    ],
    defaultFrequency: "4–6 short videos per week for algorithmic momentum",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    tagline: "B2B authority, executive networking & high-value client acquisition",
    brandColor: "#0A66C2",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    badgeText: "text-blue-600",
    borderAccent: "border-blue-300 hover:border-blue-400",
    gradient: "from-blue-600 to-indigo-700",
    primaryDemographics: "Business Professionals, Executives, B2B Decision Makers (25–55)",
    coreFormats: ["Document/PDF Carousels", "Thought Leadership Text", "Industry Newsletters"],
    bestFor: "High-ticket sales, corporate partnerships, recruiting, and B2B lead generation",
    inherentLimitations: [
      "Lower organic engagement for purely casual or low-ticket retail items",
      "Tone requires authentic domain expertise; hard selling generates immediate pushback",
    ],
    defaultFrequency: "3–4 structured thought leadership posts per week",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    tagline: "Long-term search authority, deep education & loyal subscriber intent",
    brandColor: "#FF0000",
    badgeBg: "bg-red-50 text-red-700 border-red-200",
    badgeText: "text-red-600",
    borderAccent: "border-red-300 hover:border-red-400",
    gradient: "from-red-600 to-rose-600",
    primaryDemographics: "Broad Multi-generational Audience (Ages 18–60+)",
    coreFormats: ["In-depth Landscape Video (8–20 mins)", "YouTube Shorts", "Community Polls"],
    bestFor: "Evergreen search traffic, comprehensive tutorials, high trust, and product teardowns",
    inherentLimitations: [
      "Steeper production curve (requires scripting, audio quality, editing, thumbnail design)",
      "Channel compounding takes several months before strong algorithmic recommendation",
    ],
    defaultFrequency: "1 high-value long-form video + 2 Shorts per week",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    tagline: "Mature demographic targeting, local communities & paid amplification",
    brandColor: "#1877F2",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    badgeText: "text-sky-600",
    borderAccent: "border-sky-300 hover:border-sky-400",
    gradient: "from-sky-600 to-blue-700",
    primaryDemographics: "Gen X, Boomers & Local Audiences (Ages 35–65+)",
    coreFormats: ["Native Video", "Community Groups", "Curated Articles & Event Links"],
    bestFor: "Local services, mature customer acquisition, community groups, and targeted paid ads",
    inherentLimitations: [
      "Organic business page reach is very limited without active Facebook Groups or paid ads",
      "Struggles to capture Gen Z interest organically",
    ],
    defaultFrequency: "2–3 discussion posts + weekly Group moderation",
  },
  pinterest: {
    id: "pinterest",
    name: "Pinterest",
    tagline: "High-intent visual discovery, evergreen search & lifestyle shopping",
    brandColor: "#E60023",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    badgeText: "text-rose-600",
    borderAccent: "border-rose-300 hover:border-rose-400",
    gradient: "from-red-600 to-pink-600",
    primaryDemographics: "Women & Intent-Driven Shoppers (Ages 22–55)",
    coreFormats: ["Vertical Standard Pins (2:3)", "Idea Pins / Video Pins", "Product Rich Pins"],
    bestFor: "E-commerce, home decor, fashion, recipes, weddings, and referral blog traffic",
    inherentLimitations: [
      "Conversion lifecycle is longer; users pin to boards for planning before buying",
      "Less suited for fast-breaking news, B2B services, or text-heavy thought pieces",
    ],
    defaultFrequency: "5–10 fresh pins per week (easily batch-scheduled)",
  },
};

export const ALL_PLATFORM_IDS: PlatformId[] = [
  "instagram",
  "tiktok",
  "facebook",
  "linkedin",
  "youtube",
  "pinterest",
];
