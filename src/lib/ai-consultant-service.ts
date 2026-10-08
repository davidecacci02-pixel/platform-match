import {
  BusinessDiscovery,
  MarketingAssessmentExtension,
  BusinessSnapshot,
  AIStrategyOutput,
  ConsultantMessage,
} from "./business-schema";
import { QuizAnswers } from "./quiz-schema";
import { RecommendationEngineResult } from "./recommendation-engine";
import { PLATFORMS_DATA } from "./platforms";
import {
  getGeminiModel,
  getGeminiGenerateEndpoint,
  FALLBACK_GEMINI_MODEL,
} from "./gemini-config";

export interface ConsultantChatRequest {
  userMessage: string;
  history: ConsultantMessage[];
  business: BusinessDiscovery;
  quizAnswers: QuizAnswers;
  extension: MarketingAssessmentExtension;
  scoringResults: RecommendationEngineResult;
  strategy: AIStrategyOutput;
  snapshot: BusinessSnapshot;
}

export interface ConsultantChatResponse {
  reply: string;
  proposedRevision?: {
    summary: string;
    changes: string[];
    revisedStrategy?: Partial<AIStrategyOutput>;
  };
}

/**
 * Fast, deterministic internal consultation engine that responds instantly (<30ms)
 * without external API dependencies, timeouts, or quota limits.
 */
function buildDeterministicConsultantReply(req: ConsultantChatRequest): ConsultantChatResponse {
  const { userMessage, business, quizAnswers, scoringResults, strategy } = req;
  const lower = userMessage.toLowerCase();
  const primaryId = scoringResults.primaryPlatform;
  const secondaryId = scoringResults.secondaryPlatform;
  const primaryMeta = PLATFORMS_DATA[primaryId];
  const secondaryMeta = PLATFORMS_DATA[secondaryId];
  const primaryName = primaryMeta.name;
  const secondaryName = secondaryMeta.name;
  const primaryScore = scoringResults.rankedPlatforms[0].score;

  // 1. Revision detection: "focus on sales" / "more sales" / "lead gen"
  if (lower.includes("sales") || lower.includes("revenue") || lower.includes("conversion") || lower.includes("lead")) {
    const changes = [
      `Orient all 3 content pillars around commercial buyer proof and case studies`,
      `Shift primary CTA from community discussion to direct booking/checkout link`,
      `Incorporate a weekly diagnostic audit offer in bio`,
    ];
    return {
      reply: `I can certainly refocus your strategy on immediate sales and revenue generation. For **${business.businessName}**, this means shifting away from generic educational reach and dialing in high-converting buyer proof on **${primaryName}**.

### Recommended Conversion Tweaks:
1. **Direct Bio Funnel**: Swap generic links for a single, high-intent call to action (e.g. Free Consultation or Product Trial).
2. **Problem/Solution Posts**: Use customer case studies to illustrate tangible ROI.
3. **DM Automation / Clear CTAs**: Encourage direct messages for instant qualification.

Would you like me to apply these revisions to your active 30-Day Growth Roadmap?`,
      proposedRevision: {
        summary: "Refocus Strategy on Direct Sales & Inbound Conversion",
        changes,
        revisedStrategy: {
          strategicSummary: `${business.businessName} prioritizes high-intent buyer acquisition on ${primaryName}, directing traffic through clear conversion funnels and social proof demonstrations.`,
        },
      },
    };
  }

  // 2. Revision detection: "two hours" / "2 hours" / "less time" / "limited time"
  if (lower.includes("two hours") || lower.includes("2 hours") || lower.includes("less time") || lower.includes("no time") || lower.includes("schedule")) {
    const changes = [
      `Set posting frequency to 1 core post/week on ${primaryName} (batch-produced in 60 mins)`,
      `Deactivate active creative production on ${secondaryName} (repurpose strictly via automated cross-post)`,
      `Cap daily engagement at 5 minutes responding to incoming notifications`,
    ];
    return {
      reply: `Understood! With only 2 hours per week, splitting attention across multiple creative formats causes quality degradation and burnout.

I propose adjusting your plan to a **Solo-Platform Engine** focusing exclusively on **${primaryName}** with 1 high-leverage weekly post batch-produced in 60 minutes.

Review the proposed changes below and click **Apply Revisions** to update your roadmap.`,
      proposedRevision: {
        summary: "Downscale to Low-Bandwidth Solo Platform Cadence (<2 hrs/wk)",
        changes,
        revisedStrategy: {
          strategicSummary: `${business.businessName} operates on a lean, high-leverage solo channel strategy on ${primaryName}, maintaining 1 high-impact post weekly to fit strictly under 2 hours.`,
        },
      },
    };
  }

  // 3. Question: "Why is this platform best for my business?"
  if (
    lower.includes("why is this platform best") ||
    lower.includes("best for my business") ||
    lower.includes("why this platform") ||
    lower.includes("why is it #1") ||
    lower.includes("why #1")
  ) {
    const topPrimary = scoringResults.rankedPlatforms[0];
    const topReasons = topPrimary.explanation.topMatchingAttributes || [];
    return {
      reply: `**${primaryName}** is your #1 growth channel (**${primaryScore}% compatibility**) for three key strategic reasons:

1. **Audience Alignment**: Your target audience (${business.targetGeo} market) has the highest active density on ${primaryName}.
2. **Algorithm Mechanics**: ${topPrimary.explanation.detailedRationale}
3. **Key Synergy**: ${topReasons[0] || `Directly reinforces your primary marketing goal.`}

Compared to your #2 channel (${secondaryName} at ${scoringResults.rankedPlatforms[1]?.score}%), ${primaryName} provides the most predictable compounding return on your weekly production hours.`,
    };
  }

  // 4. Question: "Give me five high-converting Reel hooks" (or TikTok / video hooks)
  if (
    lower.includes("hook") ||
    lower.includes("reel") ||
    lower.includes("video hook") ||
    lower.includes("hooks")
  ) {
    return {
      reply: `Here are **5 high-converting, pattern-interrupt hooks** tailored for **${business.businessName}** on **${primaryName}**:

1. 🎯 *"If you're still doing [Common Industry Mistake], stop right now. Here's what the top 1% do instead."*
2. 💡 *"The single most expensive misconception about ${business.mainProduct || "our industry"}—and how to avoid it in under 60 seconds."*
3. ⚡ *"Steal our exact 3-step framework that solved [Core Customer Problem] without wasting thousands of dollars."*
4. 🔍 *"Everyone tells you to focus on [Trendy Metric]. But here is the hard truth nobody talks about..."*
5. 📊 *"Behind the scenes: what actually happens when we deliver ${business.mainProduct || "results"} for our clients."*

**Execution Tip**: Deliver the hook within the first 1.5 seconds with text on screen to immediately stop the scroll!`,
    };
  }

  // 5. Question: "zero followers" / "0 followers" / "starting from scratch"
  if (
    lower.includes("zero follower") ||
    lower.includes("0 follower") ||
    lower.includes("start with zero") ||
    lower.includes("starting out") ||
    lower.includes("scratch")
  ) {
    return {
      reply: `Starting with 0 followers on **${primaryName}** is actually an advantage if you leverage algorithmic search mechanics:

1. **Optimize for Search (SEO)**: Write keyword-rich captions. Cold prospects search for problem solutions (e.g. *"${business.mainProduct || "tailored solutions"}"*) rather than brand names.
2. **Borrow Audiences via Value Comments**: Leave 3 thoughtful, authoritative comments daily on top industry creator posts where your ideal clients already engage.
3. **Create 'Save-Worthy' Resources**: Formats like step-by-step frameworks and carousels earn bookmarks, which signal high retention to the algorithm.
4. **Resist Friends & Family Shares**: Let the algorithm index your content purely based on audience interest signals rather than legacy contacts.`,
    };
  }

  // 6. Question: "what to publish next monday" / "next post" / "monday"
  if (lower.includes("monday") || lower.includes("next post") || lower.includes("first post")) {
    const firstIdea = strategy?.contentIdeas?.[0] || {
      title: `The 60-Second ${business.mainProduct || "Service"} Teardown`,
      hook: `"If you're struggling with getting consistent results, here is the exact fix."`,
      format: "Insight Carousel / Micro-Video",
      keyMessage: `How ${business.businessName} solves bottlenecks with clarity.`,
      cta: "Save this post and follow for weekly tactical breakdowns.",
    };

    return {
      reply: `For your next post on **${primaryName}**, publish this exact concept:

- **Working Title**: ${firstIdea.title}
- **The Hook**: ${firstIdea.hook}
- **Format**: ${firstIdea.format}
- **Core Message**: ${firstIdea.keyMessage}
- **Call to Action**: ${firstIdea.cta}

🕒 **Optimal Timing**: Publish between 8:30 AM and 10:00 AM in your primary target time zone (${business.targetGeo}) to capture peak morning feed check-ins.`,
    };
  }

  // 7. Platform-specific breakdown questions
  for (const pid of ["instagram", "tiktok", "facebook", "linkedin", "youtube", "pinterest"] as const) {
    if (lower.includes(pid)) {
      const pResult = scoringResults.rankedPlatforms.find((p) => p.platformId === pid);
      if (pResult) {
        const pMeta = PLATFORMS_DATA[pid];
        return {
          reply: `In our compatibility analysis, **${pMeta.name}** scored **${pResult.score}%** (Rank #${pResult.rank}):

- **Strategic Fit**: ${pResult.explanation.detailedRationale}
- **Suggested Frequency**: ${pResult.explanation.suggestedFrequency}
- **Top Strength**: ${pResult.explanation.topMatchingAttributes[0] || "Consistent audience reach."}
- **Trade-Off**: ${pResult.explanation.limitations[0] || "Requires ongoing format adaptation."}

${
  pResult.isPrimary
    ? `Since **${pMeta.name}** is your #1 channel, allocate 70% of your production focus here.`
    : pResult.isSecondary
    ? `**${pMeta.name}** is your #2 channel—ideal for low-effort repurposing without filming from scratch.`
    : `Because **${pMeta.name}** ranks #${pResult.rank}, keep it in reserve until your primary channel gains repeatable traction.`
}`,
        };
      }
    }
  }

  // 8. Questions about metrics / KPIs / analytics
  if (lower.includes("kpi") || lower.includes("metric") || lower.includes("analytics") || lower.includes("measure")) {
    return {
      reply: `Here are the **3 metrics that actually matter** for **${business.businessName}** on **${primaryName}**:

1. 📌 **Save & Bookmark Rate (> 3%)**: The strongest algorithmic signal of evergreen authority. High saves prompt the algorithm to recommend your content to lookalike audiences.
2. 🔗 **Qualified Profile Visits & Bio Link Clicks**: Measures whether your viewers transition from casual content consumers into prospective clients.
3. 💬 **Inbound Direct Inquiries (DMs)**: For your offering (${business.mainProduct || "primary solution"}), conversational inquiries are the highest-converting sales indicators.

**Ignore**: Vanity views without watch-time or follower counts that don't convert into genuine buyer conversations.`,
    };
  }

  // 9. Generic thoughtful advice grounded in business data
  return {
    reply: `As your strategic marketing advisor for **${business.businessName}**, my primary recommendation is to maintain focused execution on **${primaryName}** (${primaryScore}% match).

Your offering (${business.mainProduct || "core service"}) benefits most from educational proof, transparent problem-solving, and consistent weekly cadence.

**Feel free to ask me:**
- *"Give me 5 Reel hooks"* for your next video
- *"How should I start with zero followers?"*
- *"Can you adjust the strategy for only 2 hours/week?"*
- *"What should I publish next Monday?"*`,
  };
}

/**
 * Public handler for the internal consultation chat.
 * Runs instantly (<30ms) with zero external network dependencies.
 */
export async function chatWithAIConsultant(req: ConsultantChatRequest): Promise<ConsultantChatResponse> {
  return buildDeterministicConsultantReply(req);
}

