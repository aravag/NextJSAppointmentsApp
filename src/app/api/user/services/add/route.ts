import { NextResponse } from "next/server";
import { updateUser, findUserByEmail } from "@lib/users";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, date } = body;

    const user = findUserByEmail(session.user.email);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newAppointment = {
        id: randomUUID(),
        title,
        date,
    };

    user.services = user.services || [];
    user.services.push(newAppointment);

    updateUser(user);

    return NextResponse.json({ success: true, appointment: newAppointment });
}
