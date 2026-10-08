import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  BusinessDiscoverySchema,
  MarketingAssessmentExtensionSchema,
  BusinessSnapshotSchema,
  AIStrategyOutputSchema,
} from "@/lib/business-schema";
import { QuizAnswersSchema } from "@/lib/quiz-schema";
import { calculatePlatformScores } from "@/lib/recommendation-engine";
import { chatWithAIConsultant } from "@/lib/ai-consultant-service";

const ChatRequestSchema = z.object({
  userMessage: z.string().min(1, "Message cannot be empty"),
  history: z
    .array(
      z.object({
        id: z.string(),
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
        timestamp: z.string(),
      })
    )
    .default([]),
  business: z.record(z.any()).default({}),
  quizAnswers: QuizAnswersSchema,
  extension: z.record(z.any()).optional().default({}),
  snapshot: z.record(z.any()).optional().default({}),
  strategy: z.record(z.any()).optional().default({}),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = ChatRequestSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid consultation chat request", details: parse.error.format() },
        { status: 400 }
      );
    }

    const { userMessage, history, business, quizAnswers, extension, snapshot, strategy } = parse.data;

    // Recalculate deterministic scores for grounded context
    const scoringResults = calculatePlatformScores(quizAnswers);

    const result = await chatWithAIConsultant({
      userMessage,
      history,
      business: business as any,
      quizAnswers,
      extension: extension as any,
      scoringResults,
      strategy: strategy as any,
      snapshot: snapshot as any,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to process AI consultant chat", details: message },
      { status: 500 }
    );
  }
}
