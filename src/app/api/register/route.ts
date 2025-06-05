import { NextResponse } from "next/server";
import { addUser, findUserByEmail } from "@lib/users";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const { email, password, name, role = 'user' } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });

    if (findUserByEmail(email)) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = {
        id: randomUUID(),
        email,
        name,
        password: await hash(password, 10),
        role,
        ...(role === "company" ? { companyId: randomUUID() } : {}),
        services: [],
    };

    addUser(newUser);
    return NextResponse.json({ success: true });
}
