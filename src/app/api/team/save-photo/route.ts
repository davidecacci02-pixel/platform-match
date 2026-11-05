import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { memberId, imageBase64, members } = body;

    if (!memberId || !imageBase64) {
      return NextResponse.json({ error: "Missing memberId or imageBase64" }, { status: 400 });
    }

    // Match base64 data prefix: data:image/(jpeg|png|webp);base64,...
    const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json({ error: "Invalid base64 image data" }, { status: 400 });
    }

    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const buffer = Buffer.from(matches[2], "base64");

    const safeMemberId = memberId.replace(/[^a-zA-Z0-9_-]/g, "");
    const fileName = `team-${safeMemberId}.${ext}`;
    const publicImagesDir = path.join(process.cwd(), "public", "images");
    const filePath = path.join(publicImagesDir, fileName);

    // Try writing to public/images (works in local Node environment)
    let fileWritten = false;
    try {
      if (!fs.existsSync(publicImagesDir)) {
        fs.mkdirSync(publicImagesDir, { recursive: true });
      }
      fs.writeFileSync(filePath, buffer);
      fileWritten = true;
    } catch (writeErr) {
      console.warn("Could not write file to public/images (read-only environment or serverless):", writeErr);
    }

    const publicUrl = `/images/${fileName}`;

    // Update src/data/team-roster.json if members array was sent
    if (fileWritten && Array.isArray(members)) {
      try {
        const rosterPath = path.join(process.cwd(), "src", "data", "team-roster.json");
        const updatedRoster = members.map((m: any) =>
          m.id === memberId ? { ...m, image: publicUrl } : m
        );
        fs.writeFileSync(rosterPath, JSON.stringify(updatedRoster, null, 2), "utf-8");
      } catch (rosterErr) {
        console.warn("Could not write team-roster.json:", rosterErr);
      }
    }

    return NextResponse.json({
      success: true,
      fileWritten,
      url: fileWritten ? publicUrl : imageBase64,
      fileName,
    });
  } catch (error: any) {
    console.error("Error saving team photo:", error);
    return NextResponse.json(
      { error: "Failed to process photo", details: error?.message },
      { status: 500 }
    );
  }
}
