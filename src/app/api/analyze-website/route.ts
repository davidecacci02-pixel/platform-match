import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeWebsiteUrl } from "@/lib/website-analyzer";

const RequestSchema = z.object({
  url: z.string().min(1, "URL is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = RequestSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: "A valid website URL is required.", details: parse.error.format() },
        { status: 400 }
      );
    }

    const result = await analyzeWebsiteUrl(parse.data.url);

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error || "Website analysis failed",
          verifiedFromWebsite: false,
          url: result.url,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: "Failed to process website analysis request", details: message },
      { status: 500 }
    );
  }
}
