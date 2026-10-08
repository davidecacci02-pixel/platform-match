import {
  Industry,
  Audience,
  Goal,
  ContentType,
  Personality,
  WeeklyTime,
} from "./quiz-schema";

export interface QuizOption<T extends string> {
  value: T;
  label: string;
  description: string;
  iconName: string;
}

export interface QuizQuestionConfig<T extends string> {
  step: number;
  id: string;
  field: "industry" | "audience" | "goal" | "content" | "personality" | "time";
  title: string;
  subtitle: string;
  options: QuizOption<T>[];
}

export const QUIZ_QUESTIONS: [
  QuizQuestionConfig<Industry>,
  QuizQuestionConfig<Audience>,
  QuizQuestionConfig<Goal>,
  QuizQuestionConfig<ContentType>,
  QuizQuestionConfig<Personality>,
  QuizQuestionConfig<WeeklyTime>
] = [
  {
    step: 1,
    id: "industry",
    field: "industry",
    title: "What industry best describes your brand?",
    subtitle: "Different platforms excel at specific industry verticals and buyer intentions.",
    options: [
      {
        value: "fashion_beauty",
        label: "Fashion & Beauty",
        description: "Apparel, cosmetics, skincare, luxury goods, and personal styling",
        iconName: "Sparkles",
      },
      {
        value: "food_beverage",
        label: "Food & Beverage",
        description: "Restaurants, culinary brands, packaged foods, and recipes",
        iconName: "Utensils",
      },
      {
        value: "technology",
        label: "Technology & Software",
        description: "SaaS products, consumer tech, web tools, and hardware",
        iconName: "Laptop",
      },
      {
        value: "professional_services",
        label: "Professional Services",
        description: "Consulting, legal, finance, agencies, and B2B corporate solutions",
        iconName: "Briefcase",
      },
      {
        value: "lifestyle",
        label: "Lifestyle & Wellness",
        description: "Fitness, interior design, travel, parenting, and self-care",
        iconName: "Compass",
      },
      {
        value: "education",
        label: "Education & Coaching",
        description: "Online courses, tutoring, authors, creators, and workshops",
        iconName: "GraduationCap",
      },
      {
        value: "other",
        label: "Other Sector",
        description: "Specialized commerce, non-profit, artistic crafts, or niche industries",
        iconName: "Layers",
      },
    ],
  },
  {
    step: 2,
    id: "audience",
    field: "audience",
    title: "Who is your primary target audience?",
    subtitle: "Platform demographics dictate where your prospective customers actually spend their screen time.",
    options: [
      {
        value: "gen_z",
        label: "Gen Z (Ages ~16–26)",
        description: "Digital natives looking for authenticity, humor, and rapid trend discovery",
        iconName: "Zap",
      },
      {
        value: "millennials",
        label: "Millennials (Ages ~27–42)",
        description: "Active lifestyle shoppers, digital consumers, and mid-career professionals",
        iconName: "Users",
      },
      {
        value: "gen_x",
        label: "Gen X (Ages ~43–58)",
        description: "High purchasing power, practical information seekers, and established households",
        iconName: "TrendingUp",
      },
      {
        value: "fifty_five_plus",
        label: "55+ (Baby Boomers & Seniors)",
        description: "Value connection, community updates, local news, and trusted legacy media",
        iconName: "Heart",
      },
      {
        value: "business_professionals",
        label: "Business Professionals & Leaders",
        description: "Founders, executives, B2B buyers, recruiters, and corporate decision-makers",
        iconName: "Building2",
      },
      {
        value: "broad_audience",
        label: "Broad / Multi-Generational Audience",
        description: "Appeals across diverse age demographics and general mass-market consumers",
        iconName: "Globe",
      },
    ],
  },
  {
    step: 3,
    id: "goal",
    field: "goal",
    title: "What is your primary marketing goal?",
    subtitle: "Different platform algorithms reward specific conversion funnels and user actions.",
    options: [
      {
        value: "brand_awareness",
        label: "Brand Awareness",
        description: "Maximize top-of-funnel reach, organic discovery, and cultural relevance",
        iconName: "Eye",
      },
      {
        value: "sales",
        label: "Direct Sales & E-commerce",
        description: "Drive immediate purchases, impulse buys, and visual product checkout",
        iconName: "ShoppingBag",
      },
      {
        value: "lead_generation",
        label: "Lead Generation",
        description: "Capture qualified inquiries, demo bookings, consultations, and B2B leads",
        iconName: "Target",
      },
      {
        value: "community_building",
        label: "Community Building",
        description: "Foster deep audience loyalty, interactive discussions, and brand advocates",
        iconName: "MessageCircle",
      },
      {
        value: "website_traffic",
        label: "Website & Blog Traffic",
        description: "Funnel organic readers to external articles, landing pages, and long-form sites",
        iconName: "ExternalLink",
      },
    ],
  },
  {
    step: 4,
    id: "content",
    field: "content",
    title: "What type of content can you produce best?",
    subtitle: "Choosing a platform aligned with your production strengths ensures long-term consistency.",
    options: [
      {
        value: "short_videos",
        label: "Short Videos",
        description: "Vertical 15–60s videos, phone-filmed clips, reaction reels, and micro-tips",
        iconName: "Video",
      },
      {
        value: "long_videos",
        label: "Long-Form Videos",
        description: "Deep-dive tutorials, widescreen YouTube videos, podcasts, and webinars",
        iconName: "Tv",
      },
      {
        value: "photos",
        label: "Curated Photos & Imagery",
        description: "High-resolution product photography, aesthetic lifestyle shots, and flat-lays",
        iconName: "Camera",
      },
      {
        value: "articles",
        label: "Written Articles & Text",
        description: "Thought leadership essays, analytical case studies, text posts, and summaries",
        iconName: "FileText",
      },
      {
        value: "graphics",
        label: "Infographics & Slide Carousels",
        description: "Visual data slides, Canva graphics, quotes, and bite-sized visual frameworks",
        iconName: "BarChart3",
      },
      {
        value: "mixed",
        label: "Mixed Media Capabilities",
        description: "Agile mix of video, photography, text, and graphics depending on the campaign",
        iconName: "Layers",
      },
    ],
  },
  {
    step: 5,
    id: "personality",
    field: "personality",
    title: "What is your brand's core personality?",
    subtitle: "Platform cultures vary dramatically; aligning your natural voice creates instant resonance.",
    options: [
      {
        value: "fun",
        label: "Fun & Playful",
        description: "Humorous, self-deprecating, trendy, witty, and conversational",
        iconName: "Smile",
      },
      {
        value: "professional",
        label: "Professional & Authoritative",
        description: "Polished, industry-leading, credible, metrics-driven, and trustworthy",
        iconName: "ShieldCheck",
      },
      {
        value: "creative",
        label: "Creative & Bold",
        description: "Design-forward, expressive, artistic, unconventional, and visionary",
        iconName: "Palette",
      },
      {
        value: "educational",
        label: "Educational & Helpful",
        description: "Informative, generous with insights, instructional, and actionable",
        iconName: "BookOpen",
      },
      {
        value: "premium",
        label: "Premium & Sophisticated",
        description: "Refined, minimalist, aspirational, elevated, and exclusive",
        iconName: "Gem",
      },
    ],
  },
  {
    step: 6,
    id: "time",
    field: "time",
    title: "How much time can your team dedicate weekly?",
    subtitle: "A sustainable strategy beats burnout. Different platforms demand different creation hours.",
    options: [
      {
        value: "under_2_hours",
        label: "Under 2 hours / week",
        description: "Lean bandwidth: requires high-leverage, batch-able, low-maintenance posting",
        iconName: "Clock",
      },
      {
        value: "two_to_five_hours",
        label: "2 to 5 hours / week",
        description: "Moderate bandwidth: solid rhythm for 1-2 focused platforms with light editing",
        iconName: "Timer",
      },
      {
        value: "five_to_ten_hours",
        label: "5 to 10 hours / week",
        description: "Dedicated creator bandwidth: room for regular original video and active engagement",
        iconName: "Flame",
      },
      {
        value: "more_than_10_hours",
        label: "More than 10 hours / week",
        description: "Full omnichannel engine: multi-format production, daily stories, and community moderation",
        iconName: "Rocket",
      },
    ],
  },
];

export const SMART_EXTENSION_QUESTIONS = [
  {
    id: "businessModel",
    field: "businessModel" as const,
    title: "What is your primary commercial model?",
    subtitle: "B2B and B2C buyer journeys require fundamentally different content funnels.",
    options: [
      {
        value: "b2c",
        label: "Direct-to-Consumer (B2C)",
        description: "Selling products, experiences, or consumer services directly to individuals",
        iconName: "ShoppingBag",
      },
      {
        value: "b2b",
        label: "Business-to-Business (B2B)",
        description: "Selling software, consulting, agencies, or corporate enterprise solutions",
        iconName: "Briefcase",
      },
      {
        value: "both",
        label: "Hybrid (Both B2B & B2C)",
        description: "Serving both individual end-consumers and commercial enterprise accounts",
        iconName: "Layers",
      },
    ],
  },
  {
    id: "currentPresence",
    field: "currentPresence" as const,
    title: "What is your current social media footprint?",
    subtitle: "Understanding your starting baseline dictates whether we focus on cold discovery or retention.",
    options: [
      {
        value: "none",
        label: "Starting from Scratch (0 Followers)",
        description: "No established channels or legacy following. Needs algorithmic search discovery.",
        iconName: "Zap",
      },
      {
        value: "sporadic",
        label: "Inconsistent / Sporadic Presence",
        description: "Accounts are set up, but posting is irregular without a consistent rhythm.",
        iconName: "Clock",
      },
      {
        value: "active",
        label: "Active but Growth Plateaued",
        description: "Posting regularly, but organic reach, engagement, or conversions have stalled.",
        iconName: "TrendingUp",
      },
    ],
  },
  {
    id: "marketingChallenge",
    field: "marketingChallenge" as const,
    title: "What is your #1 marketing bottleneck right now?",
    subtitle: "We calibrate recommendations to directly solve your most pressing commercial constraint.",
    options: [
      {
        value: "leads_sales",
        label: "Converting Reach into Qualified Inbound Sales",
        description: "Views and likes aren't converting into booked calls, DM inquiries, or orders.",
        iconName: "Target",
      },
      {
        value: "consistent_content",
        label: "Generating High-Quality Content Consistently",
        description: "Struggling with creative ideation, scriptwriting, or editing bottlenecks.",
        iconName: "Sparkles",
      },
      {
        value: "differentiation",
        label: "Standing Out from Competitors in a Crowded Feed",
        description: "Hard to highlight unique positioning against well-funded incumbents.",
        iconName: "Gem",
      },
      {
        value: "limited_time",
        label: "Severe Time & Resource Constraints",
        description: "Founders or small teams wearing too many hats with minimal weekly hours.",
        iconName: "Timer",
      },
      {
        value: "community",
        label: "Building True Brand Affinity & Community Trust",
        description: "Need loyal advocates and repeat customers rather than passive fleeting viewers.",
        iconName: "Heart",
      },
    ],
  },
  {
    id: "monthlyBudget",
    field: "monthlyBudget" as const,
    title: "What is your approximate monthly marketing budget? (Optional)",
    subtitle: "Guides whether we recommend purely organic zero-dollar playbooks or paid amplification.",
    options: [
      {
        value: "zero",
        label: "$0 / Month (100% Organic Distribution)",
        description: "Pure organic reach and algorithmic growth without ad spend.",
        iconName: "Flame",
      },
      {
        value: "under_500",
        label: "Under $500 / Month (Micro Testing)",
        description: "Occasional post boosting or micro-experimentation budget.",
        iconName: "Check",
      },
      {
        value: "500_to_2000",
        label: "$500 to $2,000 / Month (Targeted Scaling)",
        description: "Budget for paid retargeting and creative production tools.",
        iconName: "TrendingUp",
      },
      {
        value: "over_2000",
        label: "$2,000+ / Month (Growth Engine)",
        description: "Multi-channel paid campaigns, specialized editors, or influencer partnerships.",
        iconName: "Rocket",
      },
    ],
  },
];
