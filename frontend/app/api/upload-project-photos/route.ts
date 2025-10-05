import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const metadata = formData.getAll("metadata") as string[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 },
      );
    }

    const uploadDir = path.join(process.cwd(), "uploads");

    // Ensure upload directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadPromises = files.map(async (file, index) => {
      const metaData = JSON.parse(metadata[index] || "{}");
      const filename = metaData.finalFilename || file.name;

      // Remove leading slash for file path
      const cleanFilename = filename.startsWith("/")
        ? filename.substring(1)
        : filename;
      const filePath = path.join(uploadDir, cleanFilename);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filePath, buffer);

      return {
        originalName: file.name,
        filename: filename, // Keep leading slash for database
        path: filePath,
        size: file.size,
      };
    });

    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: uploadResults,
      urls: uploadResults.map((result) => `/uploads${result.filename}`), // API endpoint URLs
      filenames: uploadResults.map((result) => result.filename),
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { message: "Failed to upload files" },
      { status: 500 },
    );
  }
}
