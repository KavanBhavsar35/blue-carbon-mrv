import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ filename: string[] }> },
) {
  const params = await props.params;

  try {
    const filename = params.filename.join("/");
    const filePath = path.join(process.cwd(), "uploads", filename);

    console.log("checking at ", filePath);
    if (!existsSync(filePath)) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();

    let contentType = "application/octet-stream";

    switch (ext) {
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".webp":
        contentType = "image/webp";
        break;
    }

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("File serve error:", error);

    return NextResponse.json(
      { message: "Failed to serve file" },
      { status: 500 },
    );
  }
}
