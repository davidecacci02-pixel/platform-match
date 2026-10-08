import { QuizAnswers } from "../lib/quiz-schema";
import { calculatePlatformScores } from "../lib/recommendation-engine";

export interface ProfileCase {
  id: string;
  name: string;
  answers: QuizAnswers;
  expectedTop: string;
  rationaleCheck: string;
}

export const TWENTY_PROFILES: ProfileCase[] = [
  {
    id: "p1",
    name: "B2B SaaS Startup",
    answers: {
      industry: "technology",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "two_to_five_hours",
    },
    expectedTop: "linkedin",
    rationaleCheck: "B2B leads with professional articles",
  },
  {
    id: "p2",
    name: "Solo Local Handyman / Contractor",
    answers: {
      industry: "professional_services",
      audience: "gen_x",
      goal: "lead_generation",
      content: "photos",
      personality: "educational",
      time: "under_2_hours",
    },
    expectedTop: "facebook",
    rationaleCheck: "Local Gen X homeowners with under 2 hours",
  },
  {
    id: "p3",
    name: "Gen Z DTC Streetwear Brand",
    answers: {
      industry: "fashion_beauty",
      audience: "gen_z",
      goal: "sales",
      content: "short_videos",
      personality: "fun",
      time: "five_to_ten_hours",
    },
    expectedTop: "tiktok",
    rationaleCheck: "Gen Z fashion sales with short video",
  },
  {
    id: "p4",
    name: "Boutique Wedding Cake Bakery",
    answers: {
      industry: "food_beverage",
      audience: "millennials",
      goal: "brand_awareness",
      content: "photos",
      personality: "premium",
      time: "two_to_five_hours",
    },
    expectedTop: "instagram",
    rationaleCheck: "Aesthetic culinary imagery for millennials",
  },
  {
    id: "p5",
    name: "Executive Leadership Coach",
    answers: {
      industry: "education",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "under_2_hours",
    },
    expectedTop: "linkedin",
    rationaleCheck: "B2B coach with articles and under 2 hours",
  },
  {
    id: "p6",
    name: "Online Fitness Trainer",
    answers: {
      industry: "lifestyle",
      audience: "millennials",
      goal: "community_building",
      content: "short_videos",
      personality: "fun",
      time: "five_to_ten_hours",
    },
    expectedTop: "instagram",
    rationaleCheck: "Millennial fitness community with reels",
  },
  {
    id: "p7",
    name: "Retirement Wealth Management",
    answers: {
      industry: "professional_services",
      audience: "fifty_five_plus",
      goal: "lead_generation",
      content: "articles",
      personality: "professional",
      time: "two_to_five_hours",
    },
    expectedTop: "facebook",
    rationaleCheck: "55+ demographic high-trust finance",
  },
  {
    id: "p8",
    name: "Indie Video Game Studio",
    answers: {
      industry: "technology",
      audience: "gen_z",
      goal: "community_building",
      content: "short_videos",
      personality: "creative",
      time: "five_to_ten_hours",
    },
    expectedTop: "tiktok",
    rationaleCheck: "Gen Z game devs with viral clips",
  },
  {
    id: "p9",
    name: "Home Decor & Interior Architecture",
    answers: {
      industry: "lifestyle",
      audience: "millennials",
      goal: "website_traffic",
      content: "photos",
      personality: "creative",
      time: "two_to_five_hours",
    },
    expectedTop: "pinterest",
    rationaleCheck: "Visual decor traffic with curated photos",
  },
  {
    id: "p10",
    name: "Coding Bootcamp / STEM Academy",
    answers: {
      industry: "education",
      audience: "millennials",
      goal: "lead_generation",
      content: "long_videos",
      personality: "educational",
      time: "more_than_10_hours",
    },
    expectedTop: "youtube",
    rationaleCheck: "Deep-dive tutorials with 10+ hours",
  },
  {
    id: "p11",
    name: "Artisan Coffee Roastery",
    answers: {
      industry: "food_beverage",
      audience: "millennials",
      goal: "sales",
      content: "short_videos",
      personality: "creative",
      time: "two_to_five_hours",
    },
    expectedTop: "instagram",
    rationaleCheck: "Millennial food/beverage commerce",
  },
  {
    id: "p12",
    name: "Corporate Law Firm",
    answers: {
      industry: "professional_services",
      audience: "business_professionals",
      goal: "brand_awareness",
      content: "articles",
      personality: "professional",
      time: "under_2_hours",
    },
    expectedTop: "linkedin",
    rationaleCheck: "Corporate legal thought leadership",
  },
  {
    id: "p13",
    name: "Local Senior Assisted Care",
    answers: {
      industry: "lifestyle",
      audience: "fifty_five_plus",
      goal: "community_building",
      content: "photos",
      personality: "educational",
      time: "under_2_hours",
    },
    expectedTop: "facebook",
    rationaleCheck: "55+ community photos & local events",
  },
  {
    id: "p14",
    name: "Luxury Fine Jewelry Atelier",
    answers: {
      industry: "fashion_beauty",
      audience: "gen_x",
      goal: "sales",
      content: "photos",
      personality: "premium",
      time: "two_to_five_hours",
    },
    expectedTop: "instagram",
    rationaleCheck: "High-ticket visual jewelry for Gen X",
  },
  {
    id: "p15",
    name: "Executive Online MBA Program",
    answers: {
      industry: "education",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "mixed",
      personality: "educational",
      time: "five_to_ten_hours",
    },
    expectedTop: "linkedin",
    rationaleCheck: "Professional executive education leads",
  },
  {
    id: "p16",
    name: "Budget Travel & City Guides",
    answers: {
      industry: "lifestyle",
      audience: "gen_z",
      goal: "website_traffic",
      content: "graphics",
      personality: "fun",
      time: "two_to_five_hours",
    },
    expectedTop: "pinterest",
    rationaleCheck: "Travel referral traffic with infographics",
  },
  {
    id: "p17",
    name: "Clean Organic Skincare",
    answers: {
      industry: "fashion_beauty",
      audience: "millennials",
      goal: "sales",
      content: "short_videos",
      personality: "creative",
      time: "five_to_ten_hours",
    },
    expectedTop: "instagram",
    rationaleCheck: "Millennial beauty ecommerce with short video",
  },
  {
    id: "p18",
    name: "B2B Freight & Logistics",
    answers: {
      industry: "professional_services",
      audience: "business_professionals",
      goal: "lead_generation",
      content: "graphics",
      personality: "professional",
      time: "under_2_hours",
    },
    expectedTop: "linkedin",
    rationaleCheck: "B2B supply chain with infographics",
  },
  {
    id: "p19",
    name: "Woodworking & Maker Channel",
    answers: {
      industry: "education",
      audience: "broad_audience",
      goal: "brand_awareness",
      content: "long_videos",
      personality: "educational",
      time: "more_than_10_hours",
    },
    expectedTop: "youtube",
    rationaleCheck: "Maker education long-form with 10+ hours",
  },
  {
    id: "p20",
    name: "Vegan Street Food Pop-up",
    answers: {
      industry: "food_beverage",
      audience: "gen_z",
      goal: "brand_awareness",
      content: "short_videos",
      personality: "fun",
      time: "two_to_five_hours",
    },
    expectedTop: "tiktok",
    rationaleCheck: "Gen Z viral culinary pop-up clips",
  },
];

export function runSimulation() {
  const results = TWENTY_PROFILES.map((p) => {
    const calc = calculatePlatformScores(p.answers);
    const top3 = calc.rankedPlatforms.slice(0, 3).map((r) => ({
      platform: r.platformId,
      score: r.score,
      rank: r.rank,
    }));
    return {
      profile: p.name,
      id: p.id,
      expectedTop: p.expectedTop,
      actualTop: calc.primaryPlatform,
      secondary: calc.secondaryPlatform,
      top3,
      sustainableFrequency: calc.strategy30Day.sustainableFrequency,
      top1Explanation: calc.rankedPlatforms[0].explanation.headlineFit,
      time: p.answers.time,
      content: p.answers.content,
    };
  });
  return results;
}
