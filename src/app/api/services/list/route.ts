import { NextResponse } from "next/server";
import { readServices } from "@lib/services";

export async function GET() {
    const services = readServices();
    return NextResponse.json({ services });
} 