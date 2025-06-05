import { NextResponse } from "next/server";
import { findServiceById } from "@lib/services";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const service = findServiceById(params.id);
    return NextResponse.json({ service });
} 