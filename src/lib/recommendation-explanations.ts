import { QuizAnswers, PlatformId } from "./quiz-schema";
import { QUIZ_QUESTIONS } from "./quiz-data";

export interface PlatformExplanation {
  headlineFit: string;
  detailedRationale: string;
  topMatchingAttributes: string[];
  contentRecommendations: string[];
  suggestedFrequency: string;
  practicalTip: string;
  limitations: string[];
}

export function getAnswerLabel(field: keyof QuizAnswers, value: string): string {
  const q = QUIZ_QUESTIONS.find((item) => item.field === field);
  const opt = q?.options.find((o) => o.value === value);
  return opt ? opt.label : value;
}

export function generatePlatformExplanation(
  platformId: PlatformId,
  answers: QuizAnswers,
  score: number,
  dimensionScores: {
    industry: number;
    audience: number;
    goal: number;
    content: number;
    personality: number;
    time: number;
  }
): PlatformExplanation {
  const industryLabel = getAnswerLabel("industry", answers.industry);
  const audienceLabel = getAnswerLabel("audience", answers.audience);
  const goalLabel = getAnswerLabel("goal", answers.goal);
  const contentLabel = getAnswerLabel("content", answers.content);
  const personalityLabel = getAnswerLabel("personality", answers.personality);
  const timeLabel = getAnswerLabel("time", answers.time);

  // Dynamic frequency tailored strictly to weekly time
  const getDynamicFrequency = (platform: PlatformId): string => {
    switch (answers.time) {
      case "under_2_hours":
        if (platform === "linkedin") return "1–2 high-impact thought leadership posts per week (batch 60 mins on Monday) + 10 mins weekly comments";
        if (platform === "facebook") return "1–2 community updates or photo posts weekly (easily batched in 45 mins)";
        if (platform === "pinterest") return "5–8 scheduled visual pins weekly (batch created in 45 mins via Canva templates)";
        if (platform === "instagram") return "1–2 curated feed posts or carousels per week (prioritize batch-scheduling over daily stories)";
        if (platform === "tiktok") return "2 quick unpolished smartphone clips weekly (record in one 40-min session with minimal editing)";
        if (platform === "youtube") return "1 focused YouTube Short weekly (keep long-form production on hold until bandwidth expands)";
        return "1 core post per week";

      case "two_to_five_hours":
        if (platform === "linkedin") return "2–3 structured posts per week + active participation in top industry discussion threads";
        if (platform === "instagram") return "2 Reels + 1 save-worthy Carousel per week with casual story updates";
        if (platform === "facebook") return "2–3 discussion posts weekly + active Facebook Group interactions";
        if (platform === "tiktok") return "3–4 short native videos per week to build algorithmic momentum";
        if (platform === "youtube") return "1 structured pillar video every 10–14 days + 2 complementary Shorts";
        if (platform === "pinterest") return "10–15 fresh pins weekly across 3–4 keyword-optimized boards";
        return "2–3 posts per week";

      case "five_to_ten_hours":
        if (platform === "linkedin") return "3–4 polished thought leadership posts + weekly newsletter + direct message outreach";
        if (platform === "instagram") return "3–4 Reels + 2 Carousels per week, backed by regular interactive Stories";
        if (platform === "facebook") return "3–4 community-focused posts weekly + weekly live stream or customer Q&A";
        if (platform === "tiktok") return "4–6 native short videos weekly with trend participation";
        if (platform === "youtube") return "1 high-quality edited long-form video per week + 2–3 YouTube Shorts";
        if (platform === "pinterest") return "15–20 keyword-rich pins weekly covering primary product categories";
        return "4–5 posts per week";

      case "more_than_10_hours":
      default:
        if (platform === "linkedin") return "Daily structured insights, weekly LinkedIn audio events, and multi-team advocacy";
        if (platform === "instagram") return "Daily multi-format presence: 4–5 Reels weekly, daily Stories, and collaborative Broadcast Channel";
        if (platform === "facebook") return "Daily active posting, dedicated Facebook Group management, and integrated Meta ads";
        if (platform === "tiktok") return "Daily short-form video publishing with active TikTok Live streaming";
        if (platform === "youtube") return "1–2 polished weekly long-form videos with dedicated thumbnail A/B testing and daily Shorts";
        if (platform === "pinterest") return "25+ scheduled pins weekly across comprehensive lifestyle and shopping categories";
        return "Daily active publishing";
    }
  };

  // Dynamic content playbook recommendations connecting user content format & platform
  const getDynamicContentRecs = (platform: PlatformId): string[] => {
    switch (platform) {
      case "linkedin":
        if (answers.content === "articles") {
          return [
            `Long-form case study breakdowns converting client results in ${industryLabel} into actionable step-by-step frameworks`,
            `Founder point-of-view commentary on industry news, written in a clear, ${personalityLabel.toLowerCase()} tone`,
            `In-depth text posts utilizing structured whitespace and strong 2-line opening hooks before the 'see more' cutoff`,
          ];
        }
        if (answers.content === "graphics") {
          return [
            `Multi-page PDF document carousels condensing complex ${industryLabel} concepts into 6–8 swipeable slides`,
            `Visual decision frameworks, benchmark checklists, and high-contrast infographics`,
            `Bite-sized data diagrams paired with brief analytical executive takeaways`,
          ];
        }
        if (answers.content === "short_videos") {
          return [
            `45-second phone-filmed executive takes directly addressing common client misunderstandings in ${industryLabel}`,
            `Candid behind-the-scenes decision moments and event keynotes filmed vertically`,
            `Micro-tutorials highlighting 1 specific operational efficiency with on-screen captions`,
          ];
        }
        return [
          `Behind-the-scenes teardowns & case studies highlighting how you solved a real problem in ${industryLabel}`,
          `Actionable carousel slides converting complex domain knowledge into digestible takeaways`,
          `Leadership commentary on emerging market shifts and lessons learned`,
        ];

      case "instagram":
        if (answers.content === "photos") {
          return [
            `High-aesthetic photo carousels showcasing ${industryLabel} products or environments in natural, aspirational lighting`,
            `Curated flat-lays and detail shots telling the story of quality craftsmanship and brand values`,
            `Behind-the-scenes photography highlighting your team's creative process with reflective story captions`,
          ];
        }
        if (answers.content === "short_videos") {
          return [
            `High-retention 15–30s Reels demonstrating instant transformations, product highlights, or quick ${industryLabel} tips`,
            `Trending audio micro-skits reflecting your ${personalityLabel.toLowerCase()} voice without compromising brand reputation`,
            `Side-by-side 'Expectation vs Reality' clips illustrating common pain points your brand solves`,
          ];
        }
        if (answers.content === "articles") {
          return [
            `Slide carousels that repurpose your written articles into clean, high-contrast text slides with a bold cover hook`,
            `Highlighting key quotes and contrarian principles in aesthetic serif/sans-serif slide graphics`,
            `Caption-heavy feed posts with a single striking minimalist visual driving readers to save the post`,
          ];
        }
        return [
          `High-retention Reels demonstrating instant transformations or quick ${industryLabel} tips`,
          `Educational save-worthy carousel posts with a strong visual cover slide`,
          `Behind-the-scenes Stories using poll and question stickers to qualify buyer interest`,
        ];

      case "tiktok":
        if (answers.content === "short_videos") {
          return [
            `Rapid 'Problem-Agitation-Solution' clips filmed naturally on a smartphone in under 30 seconds`,
            `Relatable industry commentary, myth-busting, and honest reactions to trending topics in ${industryLabel}`,
            `Unfiltered process breakdowns showing raw, unpolished creation moments that build authentic credibility`,
          ];
        }
        return [
          `Fast 20-second punchy videos introducing one counter-intuitive fact about ${industryLabel}`,
          `Engaging green-screen commentary reacting to industry headlines with a ${personalityLabel.toLowerCase()} perspective`,
          `Direct-to-camera storytelling explaining the hardest lesson your brand experienced`,
        ];

      case "youtube":
        if (answers.content === "long_videos") {
          return [
            `Comprehensive pillar guides addressing high-search-volume beginner and advanced queries in ${industryLabel}`,
            `In-depth comparison teardowns, software/product walkthroughs, and step-by-step blueprints`,
            `Client interviews and deep-dive case studies explaining the entire journey from problem to resolution`,
          ];
        }
        if (answers.content === "short_videos") {
          return [
            `Search-optimized YouTube Shorts answering specific 'How-To' queries in under 55 seconds`,
            `Punchy, high-retention clips repurposing the most striking moments from your ${industryLabel} projects`,
            `Bite-sized mythbusters with clear visual graphics and prominent on-screen text`,
          ];
        }
        return [
          `Comprehensive evergreen guides addressing high-search-intent queries in ${industryLabel}`,
          `Side-by-side comparisons, honest teardowns, and actionable workflows with downloadable resources`,
          `YouTube Shorts repurposing the most striking insights into bite-sized discovery clips`,
        ];

      case "facebook":
        if (answers.content === "articles") {
          return [
            `Thoughtful community discussion essays addressing common real-world challenges faced by ${audienceLabel}`,
            `Direct links to comprehensive blog articles and case studies inside relevant Facebook Groups`,
            `Local news commentary and practical advice tailored to homeowners, families, or business owners`,
          ];
        }
        return [
          `Engaging discussion prompts and local stories designed to spark comment threads and shares`,
          `Value-first posts inside niche Facebook Groups addressing common challenges in ${industryLabel}`,
          `High-touch photo and video updates showcasing real customer testimonials and milestone celebrations`,
        ];

      case "pinterest":
        if (answers.content === "photos" || answers.content === "graphics") {
          return [
            `Vertical 2:3 graphic pins with bold typography overlays linking directly to solution pages for ${industryLabel}`,
            `Inspirational visual moodboards, product collections, and step-by-step visual guides`,
            `Rich Product Pins displaying real-time pricing and availability for direct commerce conversion`,
          ];
        }
        return [
          `Vertical 2:3 infographic pins translating your ${contentLabel.toLowerCase()} into visual steps`,
          `High-contrast problem-solving pins leading directly to your website or booking pages`,
          `Checklist pins and blueprint graphics optimized for high save and board-sharing rates`,
        ];
    }
  };

  switch (platformId) {
    case "linkedin":
      return {
        headlineFit: `Unmatched reach for ${audienceLabel} in ${industryLabel}`,
        detailedRationale: `Because your objective is ${goalLabel.toLowerCase()} with a ${personalityLabel.toLowerCase()} voice, LinkedIn is your strongest commercial growth engine. Decision-makers and professionals actively consume ${contentLabel.toLowerCase()} here with high commercial intent rather than for passive leisure.`,
        topMatchingAttributes: [
          `Audience alignment (${dimensionScores.audience}%): Concentrated density of ${audienceLabel}`,
          `Objective execution (${dimensionScores.goal}%): Algorithmic priority for measurable ${goalLabel.toLowerCase()}`,
          `Format synergy (${dimensionScores.content}%): Exceptional performance for ${contentLabel.toLowerCase()}`,
        ],
        contentRecommendations: getDynamicContentRecs("linkedin"),
        suggestedFrequency: getDynamicFrequency("linkedin"),
        practicalTip:
          "Open your post with a sharp 2-line hook before the 'see more' cutoff, and reply to every comment within the first 60 minutes to trigger secondary distribution.",
        limitations: [
          "Organic reach rewards native text & document carousels; outbound links in post copy diminish algorithmic distribution",
          "Hard sales pitches without demonstrated value will trigger immediate unfollows",
        ],
      };

    case "instagram":
      return {
        headlineFit: `Prime visual hub for ${industryLabel} engaging ${audienceLabel}`,
        detailedRationale: `Instagram directly caters to ${audienceLabel} who evaluate brands through visual aesthetics and social proof. With your focus on ${goalLabel.toLowerCase()} and ${contentLabel.toLowerCase()}, Instagram's blend of feed discoverability and story retention creates a complete conversion funnel.`,
        topMatchingAttributes: [
          `Visual industry fit (${dimensionScores.industry}%): Ideal aesthetic showcase for ${industryLabel}`,
          `Demographic match (${dimensionScores.audience}%): Concentrated daily usage across ${audienceLabel}`,
          `Format readiness (${dimensionScores.content}%): Native tools for ${contentLabel.toLowerCase()}`,
        ],
        contentRecommendations: getDynamicContentRecs("instagram"),
        suggestedFrequency: getDynamicFrequency("instagram"),
        practicalTip:
          "Always design carousel covers and Reels with a hook that promises an immediate solution or aesthetic payoff in under 2 seconds.",
        limitations: [
          "Post captions do not support clickable external links; requires clear CTA to link-in-bio or automated DM keywords",
          "Competitive feed algorithms penalize inconsistent posting and low watch completion rates",
        ],
      };

    case "tiktok":
      return {
        headlineFit: `Hyper-viral discovery engine tailored for ${personalityLabel} brands`,
        detailedRationale: `TikTok's Interest Graph doesn't require a pre-existing follower count to deliver massive visibility to ${audienceLabel}. For a brand emphasizing a ${personalityLabel.toLowerCase()} tone and ${contentLabel.toLowerCase()}, the algorithm rapidly tests and scales resonant content to relevant consumers.`,
        topMatchingAttributes: [
          `Organic discovery (${dimensionScores.goal}%): Explosive top-of-funnel reach for ${goalLabel.toLowerCase()}`,
          `Youth & trend velocity (${dimensionScores.audience}%): Dominant platform for ${audienceLabel}`,
          `Tone compatibility (${dimensionScores.personality}%): Perfectly embraces ${personalityLabel.toLowerCase()} storytelling`,
        ],
        contentRecommendations: getDynamicContentRecs("tiktok"),
        suggestedFrequency: getDynamicFrequency("tiktok"),
        practicalTip:
          "Keep intros under 1.5 seconds. Start speaking in media res and use bold on-screen native captions to retain silent scrollers.",
        limitations: [
          "Fast content lifecycle: videos peak within 48 hours and require ongoing creation cadence",
          "Audience attention is volatile; demands strong hook discipline and personality-first delivery",
        ],
      };

    case "youtube":
      return {
        headlineFit: `Long-term search compounder & trust builder for ${industryLabel}`,
        detailedRationale: `Unlike feeds that vanish after 24 hours, YouTube is the world's second-largest search engine. When targeting ${goalLabel.toLowerCase()} with a ${personalityLabel.toLowerCase()} identity, your videos will continue generating targeted leads and views 12 to 24 months after publishing.`,
        topMatchingAttributes: [
          `Search authority (${dimensionScores.goal}%): Unmatched compounding asset longevity`,
          `Educational depth (${dimensionScores.content}%): Supreme format for ${contentLabel.toLowerCase()}`,
          `Broad demographic trust (${dimensionScores.audience}%): Deep engagement across ${audienceLabel}`,
        ],
        contentRecommendations: getDynamicContentRecs("youtube"),
        suggestedFrequency: getDynamicFrequency("youtube"),
        practicalTip:
          "Invest 40% of production effort into the thumbnail and title before filming a single minute. The best content fails without click-through intent.",
        limitations: [
          "Steeper production learning curve regarding lighting, audio, and pacing",
          "Initial subscriber and view growth compounds slowly over several months before hitting algorithmic stride",
        ],
      };

    case "pinterest":
      return {
        headlineFit: `High-intent visual discovery & evergreen referral engine`,
        detailedRationale: `Pinterest functions as a visual search and future planning tool rather than a traditional social network. For ${industryLabel} brands targeting ${audienceLabel} with an emphasis on ${contentLabel.toLowerCase()}, users actively bookmark pins with direct commercial purchasing intent.`,
        topMatchingAttributes: [
          `E-commerce & web referral (${dimensionScores.goal}%): Direct click-through links on every pin`,
          `Visual aesthetic match (${dimensionScores.industry}%): Ideal for inspirational ${industryLabel}`,
          `Low maintenance leverage (${dimensionScores.time}%): Evergreen pins drive traffic for months`,
        ],
        contentRecommendations: getDynamicContentRecs("pinterest"),
        suggestedFrequency: getDynamicFrequency("pinterest"),
        practicalTip:
          "Include high-search keywords in your pin titles and board descriptions. Unlike Instagram, Pinterest users search specifically for solutions to buy.",
        limitations: [
          "Purchasing cycles are often deliberate; users pin to boards for weeks before final purchase",
          "Not well suited for time-sensitive news, purely text-based thought pieces, or B2B contracts",
        ],
      };

    case "facebook":
      return {
        headlineFit: `Broad demographic reach & community-centric group retention`,
        detailedRationale: `Facebook remains the dominant platform for ${audienceLabel} and hyper-local commercial discovery. If your brand aims for ${goalLabel.toLowerCase()} and relies on ${contentLabel.toLowerCase()}, Facebook's pairing of organic Groups and targeted distribution provides steady conversion.`,
        topMatchingAttributes: [
          `Demographic density (${dimensionScores.audience}%): Reliable penetration among ${audienceLabel}`,
          `Community engagement (${dimensionScores.goal}%): Strong infrastructure for ${goalLabel.toLowerCase()}`,
          `Multi-media flexibility (${dimensionScores.content}%): Seamlessly handles ${contentLabel.toLowerCase()}`,
        ],
        contentRecommendations: getDynamicContentRecs("facebook"),
        suggestedFrequency: getDynamicFrequency("facebook"),
        practicalTip:
          "Prioritize building or actively participating in a dedicated Facebook Group; standard Business Page organic feed reach is intentionally constrained by Meta.",
        limitations: [
          "Extremely low organic distribution for standard business page posts without shares or group activity",
          "Significant audience drop-off among demographic cohorts under age 25",
        ],
      };
  }
}
