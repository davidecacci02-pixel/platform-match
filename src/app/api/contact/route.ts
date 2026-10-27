import { NextRequest, NextResponse } from "next/server";
import { ContactMessageSchema } from "@/lib/contact-schema";
import { saveContactMessage } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parseResult = ContactMessageSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid contact form data",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const result = await saveContactMessage(parseResult.data);
    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to process contact message", details: message },
      { status: 500 }
    );
  }
}
