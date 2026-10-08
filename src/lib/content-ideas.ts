import { QuizAnswers, PlatformId } from "./quiz-schema";
import { getAnswerLabel } from "./recommendation-explanations";
import { PLATFORMS_DATA } from "./platforms";

export interface Strategy30Day {
  primaryPlatform: PlatformId;
  secondaryPlatform: PlatformId;
  sustainableFrequency: string;
  weeklyTimeBudget: string;
  cadenceSummary: string;
  primaryWhy: string;
  primaryEffort: string;
  secondaryWhy: string;
  secondaryEffort: string;
  personalizedIdeas: Array<{
    title: string;
    hook: string;
    format: string;
    objective: string;
  }>;
  roadmap: Array<{
    phase: string;
    timing: string;
    focus: string;
    actions: string[];
  }>;
  synergyStrategy: string;
}

export function determineSecondaryPlatform(
  primary: PlatformId,
  rankedPlatforms: PlatformId[],
  time: QuizAnswers["time"]
): PlatformId {
  const candidates = rankedPlatforms.filter((p) => p !== primary);

  // If time is under 2 hours, strictly exclude heavy-production platforms like YouTube
  if (time === "under_2_hours") {
    const lowMaintenanceCandidates = candidates.filter(
      (p) => p !== "youtube" && (primary === "tiktok" || p !== "tiktok")
    );

    if (lowMaintenanceCandidates.length > 0) {
      if (primary === "instagram") {
        return lowMaintenanceCandidates.find((p) => p === "pinterest" || p === "facebook") || lowMaintenanceCandidates[0];
      }
      if (primary === "linkedin") {
        return lowMaintenanceCandidates.find((p) => p === "facebook" || p === "instagram") || lowMaintenanceCandidates[0];
      }
      if (primary === "facebook") {
        return lowMaintenanceCandidates.find((p) => p === "linkedin" || p === "instagram") || lowMaintenanceCandidates[0];
      }
      if (primary === "pinterest") {
        return lowMaintenanceCandidates.find((p) => p === "instagram" || p === "facebook") || lowMaintenanceCandidates[0];
      }
      if (primary === "tiktok") {
        return lowMaintenanceCandidates.find((p) => p === "instagram") || lowMaintenanceCandidates[0];
      }
      return lowMaintenanceCandidates[0];
    }
  }

  // If 2 to 5 hours, avoid pairing two complex video platforms simultaneously
  if (time === "two_to_five_hours") {
    if (primary === "youtube") {
      return candidates.find((p) => p === "linkedin" || p === "facebook" || p === "pinterest") || candidates[0];
    }
    if (primary === "linkedin") {
      return candidates.find((p) => p === "facebook" || p === "instagram" || p === "youtube") || candidates[0];
    }
  }

  // Default: highest-ranked candidate providing natural cross-channel format synergy
  return candidates[0] || "instagram";
}

export function generate30DayStrategy(
  answers: QuizAnswers,
  primary: PlatformId,
  secondary: PlatformId
): Strategy30Day {
  const primaryName = PLATFORMS_DATA[primary].name;
  const secondaryName = PLATFORMS_DATA[secondary].name;
  const industryLabel = getAnswerLabel("industry", answers.industry);
  const audienceLabel = getAnswerLabel("audience", answers.audience);
  const personalityLabel = getAnswerLabel("personality", answers.personality);
  const goalLabel = getAnswerLabel("goal", answers.goal);
  const timeLabel = getAnswerLabel("time", answers.time);

  // Sustainable frequency calibrated strictly to time budget
  let sustainableFrequency = "2–3 focused posts per week on Primary";
  let cadenceSummary = "2–3 posts / week";

  if (answers.time === "under_2_hours") {
    sustainableFrequency = `1 core high-impact post/week on ${primaryName} + 1 repurposed cross-post on ${secondaryName} (Batch 60–90 mins on Monday)`;
    cadenceSummary = "1 core post / week (batched)";
  } else if (answers.time === "two_to_five_hours") {
    sustainableFrequency = `2–3 primary weekly posts on ${primaryName} + 1–2 adapted cross-posts on ${secondaryName} (30 mins creation 3x/week)`;
    cadenceSummary = "2–3 posts / week";
  } else if (answers.time === "five_to_ten_hours") {
    sustainableFrequency = `3–4 polished posts on ${primaryName} with active Stories/engagement + 2 native iterations on ${secondaryName}`;
    cadenceSummary = "3–4 posts / week";
  } else {
    sustainableFrequency = `4–5 dedicated weekly posts on ${primaryName} with structured community interaction + multi-channel syndication to ${secondaryName}`;
    cadenceSummary = "4–5 posts / week";
  }

  // Concise Platform Strategy descriptions
  const primaryWhy = `Strongest density of ${audienceLabel} with native algorithmic momentum for ${goalLabel.toLowerCase()}.`;
  const primaryEffort = "70% Effort • Original Content Engine";

  const secondaryWhy =
    answers.time === "under_2_hours"
      ? `Zero extra filming: simple 1-click cross-posting or text adaptation.`
      : `High-leverage syndication channel to capture complementary audience reach.`;

  const secondaryEffort =
    answers.time === "under_2_hours"
      ? "30% Effort • Direct Re-posting"
      : "30% Effort • Format Adaptation";

  // Dynamic tailored content concepts matching industry, format, and personality
  const personalizedIdeas = getDynamicContentIdeas(answers, primaryName, secondaryName);

  // 3-Phase concise execution roadmap
  const roadmap = [
    {
      phase: "Phase 1: Setup",
      timing: "Days 1 – 7",
      focus: `Optimize profile conversion before publishing`,
      actions: [
        `Audit handle, avatar & bio with a clear value proposition for ${industryLabel}`,
        `Install trackable link or booking CTA aligned with ${goalLabel.toLowerCase()}`,
        `Define 3 core content pillars in your ${personalityLabel.toLowerCase()} voice`,
      ],
    },
    {
      phase: "Phase 2: Publish",
      timing: "Days 8 – 18",
      focus: `Establish a repeatable weekly creation rhythm`,
      actions: [
        `Batch-produce your first 4 assets in one focused production block`,
        `Publish consistently: ${cadenceSummary} on ${primaryName}`,
        `Syndicate top-performing concept directly onto ${secondaryName}`,
      ],
    },
    {
      phase: "Phase 3: Optimize",
      timing: "Days 19 – 30",
      focus: "Double down on algorithmic winners & inbound response",
      actions: [
        `Identify which hook generated the highest retention & save rate`,
        `Spend 10 mins/day answering comments and building community`,
        `Refine call-to-action wording based on actual leads and link clicks`,
      ],
    },
  ];

  let synergyStrategy = `Lead with ${primaryName} as your primary creative engine. Use ${secondaryName} as an effortless syndication channel—repurposing your top-performing concepts into its native format to multiply audience touchpoints without doubling your workload.`;

  if (answers.time === "under_2_hours") {
    synergyStrategy = `Because your weekly time is under 2 hours, prioritize 100% of creation effort on ${primaryName}. On ${secondaryName}, strictly copy-paste or schedule the identical concept adapted to its layout so you never spend extra creation time.`;
  }

  return {
    primaryPlatform: primary,
    secondaryPlatform: secondary,
    sustainableFrequency,
    weeklyTimeBudget: timeLabel,
    cadenceSummary,
    primaryWhy,
    primaryEffort,
    secondaryWhy,
    secondaryEffort,
    personalizedIdeas,
    roadmap,
    synergyStrategy,
  };
}

function getDynamicContentIdeas(
  answers: QuizAnswers,
  primaryName: string,
  secondaryName: string
): Array<{ title: string; hook: string; format: string; objective: string }> {
  const industry = answers.industry;
  const content = answers.content;
  const goal = answers.goal;

  let formatLabel1 = "Slide Deck Carousel";
  let formatLabel2 = "Single Visual / Infographic";
  let formatLabel3 = "Narrative Case Post";

  if (content === "short_videos") {
    formatLabel1 = "15–30s Vertical Reel / TikTok";
    formatLabel2 = "Transformation / Teardown Clip";
    formatLabel3 = "Talking-Head Reaction / Mythbuster";
  } else if (content === "long_videos") {
    formatLabel1 = "10-min Deep-Dive Guide";
    formatLabel2 = "Screen-Share Tutorial";
    formatLabel3 = "Case Study Q&A";
  } else if (content === "photos") {
    formatLabel1 = "Curated High-Res Photo Carousel";
    formatLabel2 = "In-Action Behind-the-Scenes";
    formatLabel3 = "Product / Service Showcase";
  } else if (content === "graphics") {
    formatLabel1 = "5-Slide Educational Framework";
    formatLabel2 = "Visual Cheat Sheet / Data Card";
    formatLabel3 = "Contrarian Quote Card";
  } else if (content === "articles") {
    formatLabel1 = "In-Depth Case Study Breakdown";
    formatLabel2 = "Actionable Checklist & Workflow";
    formatLabel3 = "Executive Thought Essay";
  }

  switch (industry) {
    case "technology":
      return [
        {
          title: "The Architecture Teardown",
          hook: '"Why 80% of tech teams overcomplicate this workflow—and the 3-step fix:"',
          format: formatLabel1,
          objective: goal === "lead_generation" ? "Inbound demo bookings" : "Technical authority",
        },
        {
          title: "The ROI Case Study",
          hook: '"How we saved 14 hours/week on operations without new enterprise tooling:"',
          format: formatLabel2,
          objective: "High buyer conviction",
        },
        {
          title: "The Industry Prediction",
          hook: '"An unpopular opinion on where our sector is heading in 12 months:"',
          format: formatLabel3,
          objective: "High comment debates & shares",
        },
      ];

    case "fashion_beauty":
      return [
        {
          title: "The Wearable Styling Guide",
          hook: '"3 ways to elevate your everyday look using pieces you already own:"',
          format: formatLabel1,
          objective: goal === "sales" ? "Direct checkout & saves" : "Viral reach & saves",
        },
        {
          title: "The Crafting / Formulation Table",
          hook: '"The ingredient / material we deliberately refused to compromise on:"',
          format: formatLabel2,
          objective: "Premium positioning & trust",
        },
        {
          title: "The Common Routine Mistake",
          hook: '"Stop making this 1 critical mistake with your daily routine:"',
          format: formatLabel3,
          objective: "High bookmark & save rate",
        },
      ];

    case "food_beverage":
      return [
        {
          title: "The Secret Kitchen Technique",
          hook: '"The 1 subtle adjustment that makes this recipe unforgettable:"',
          format: formatLabel1,
          objective: "Viral save & share rate",
        },
        {
          title: "Origins & The Honest Taste-Test",
          hook: '"We tested 7 variations of this dish before finding our customers\' favorite:"',
          format: formatLabel2,
          objective: "Local community trust",
        },
        {
          title: "The Must-Order Teardown",
          hook: '"If you only try 1 thing from our menu this weekend, make it this:"',
          format: formatLabel3,
          objective: goal === "sales" ? "Orders & reservations" : "Brand loyalty",
        },
      ];

    case "professional_services":
      return [
        {
          title: "The Diagnostic Breakdown",
          hook: '"The #1 hidden costly mistake clients make before hiring our firm:"',
          format: formatLabel1,
          objective: "Lead qualification & trust",
        },
        {
          title: "The 15-Minute Audit Checklist",
          hook: '"A practical 5-point checklist to audit your situation today:"',
          format: formatLabel2,
          objective: "Inbound consultation requests",
        },
        {
          title: "Real Client Win & Lessons",
          hook: '"How we helped a client navigate a complex hurdle in 30 days:"',
          format: formatLabel3,
          objective: "Demonstrated competence",
        },
      ];

    case "education":
      return [
        {
          title: "The Concept in 60 Seconds",
          hook: '"The simplest way to understand this core concept without jargon:"',
          format: formatLabel1,
          objective: "Broad discovery & bookmarks",
        },
        {
          title: "The 10-Minute Daily Practice",
          hook: '"Try this exact 10-minute daily exercise to build real competence:"',
          format: formatLabel2,
          objective: "Course & email signups",
        },
        {
          title: "Debunking the Major Myth",
          hook: '"Why conventional advice in this subject is slowing your progress:"',
          format: formatLabel3,
          objective: "Authority & discussion",
        },
      ];

    default:
      return [
        {
          title: "The Core Value Breakdown",
          hook: '"Why traditional approaches in our space fall short—and what works:"',
          format: formatLabel1,
          objective: "Domain credibility",
        },
        {
          title: "The Actionable Solution Guide",
          hook: '"Here are 3 frameworks we use every week to achieve predictable outcomes:"',
          format: formatLabel2,
          objective: "High saves & referral traffic",
        },
        {
          title: "The Honest Brand Principle",
          hook: '"Why we built our brand against the grain of typical shortcuts:"',
          format: formatLabel3,
          objective: "Community advocacy",
        },
      ];
  }
}
