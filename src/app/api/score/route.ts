import { NextRequest, NextResponse } from "next/server";
import { QuizAnswersSchema } from "@/lib/quiz-schema";
import { calculatePlatformScores } from "@/lib/recommendation-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = QuizAnswersSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid or incomplete quiz answers",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const results = calculatePlatformScores(parseResult.data);
    return NextResponse.json(results, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to process scoring calculation", details: message },
      { status: 500 }
    );
  }
}
