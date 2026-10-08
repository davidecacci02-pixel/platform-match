import { NextRequest, NextResponse } from "next/server";
import { LeadCaptureSchema } from "@/lib/quiz-schema";
import { saveLead } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = LeadCaptureSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid lead capture data",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const result = await saveLead(parseResult.data);
    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to submit lead", details: message },
      { status: 500 }
    );
  }
}
