import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { memberId, imageBase64, members } = body;

    const rosterPath = path.join(process.cwd(), "src", "data", "team-roster.json");

    // Case 1: Photo upload provided
    if (memberId && imageBase64 && imageBase64.startsWith("data:image/")) {
      const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
        const buffer = Buffer.from(matches[2], "base64");

        const safeMemberId = memberId.replace(/[^a-zA-Z0-9_-]/g, "");
        const fileName = `team-${safeMemberId}.${ext}`;
        const publicImagesDir = path.join(process.cwd(), "public", "images");
        const filePath = path.join(publicImagesDir, fileName);

        let fileWritten = false;
        try {
          if (!fs.existsSync(publicImagesDir)) {
            fs.mkdirSync(publicImagesDir, { recursive: true });
          }
          fs.writeFileSync(filePath, buffer);
          fileWritten = true;
        } catch (writeErr) {
          console.warn("Could not write file to public/images:", writeErr);
        }

        const publicUrl = `/images/${fileName}`;

        // Save updated roster array to team-roster.json
        if (Array.isArray(members)) {
          try {
            const updatedRoster = members.map((m: any) =>
              m.id === memberId ? { ...m, image: fileWritten ? publicUrl : m.image } : m
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
      }
    }

    // Case 2: Metadata / text updates (name, role, bio, links)
    if (Array.isArray(members)) {
      try {
        fs.writeFileSync(rosterPath, JSON.stringify(members, null, 2), "utf-8");
        return NextResponse.json({
          success: true,
          rosterSaved: true,
        });
      } catch (err: any) {
        console.warn("Could not save team-roster.json:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Roster updated in client storage",
    });
  } catch (error: any) {
    console.error("Error saving team data:", error);
    return NextResponse.json(
      { error: "Failed to process team update", details: error?.message },
      { status: 500 }
    );
  }
}
