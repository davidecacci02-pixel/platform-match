import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  BusinessDiscoverySchema,
  MarketingAssessmentExtensionSchema,
  BusinessSnapshotSchema,
} from "@/lib/business-schema";
import { QuizAnswersSchema } from "@/lib/quiz-schema";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import {
  generateBusinessSnapshot,
  generateAIStrategy,
} from "@/lib/ai-strategy-service";

const GenerateStrategyRequestSchema = z.object({
  business: BusinessDiscoverySchema,
  quizAnswers: QuizAnswersSchema,
  extension: MarketingAssessmentExtensionSchema,
  websiteAnalysis: z
    .object({
      verifiedFromWebsite: z.boolean().optional(),
      summary: z.string().optional(),
      brandVoice: z.string().optional(),
    })
    .optional(),
  customSnapshot: BusinessSnapshotSchema.optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = GenerateStrategyRequestSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid consultation inputs", details: parse.error.format() },
        { status: 400 }
      );
    }

    const { business, quizAnswers, extension, websiteAnalysis, customSnapshot } = parse.data;

    // 1. Compute deterministic platform compatibility scores
    const scoringResults = calculatePlatformScores(quizAnswers);

    // 2. Generate or use user-reviewed snapshot
    const snapshot =
      customSnapshot ||
      (await generateBusinessSnapshot({
        business,
        quizAnswers,
        extension,
        websiteAnalysis,
      }));

    // 3. Generate structured AI strategy
    const strategy = await generateAIStrategy({
      business,
      quizAnswers,
      extension,
      scoringResults,
      snapshot,
    });

    return NextResponse.json(
      {
        scoringResults,
        snapshot,
        strategy,
        business,
        extension,
        calculatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to generate social strategy", details: message },
      { status: 500 }
    );
  }
}
