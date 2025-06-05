import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
    const { filename } = params;
    const filePath = path.join(process.cwd(), "src", "data", "images", filename);

    try {
        const fileBuffer = await readFile(filePath);
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "image/jpeg",
                "Cache-Control": "no-store",
            },
        });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}
