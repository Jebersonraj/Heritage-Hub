import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { email, password, firstName, lastName } = await req.json();

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUsers = (await query("SELECT * FROM users WHERE email = ?", [
            email,
        ])) as any[];
        if (existingUsers.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await query(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, firstName, lastName]
        );

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}