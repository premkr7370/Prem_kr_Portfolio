import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    const user = dataStore.getUserByEmail(email);
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    return NextResponse.json({
      token,
      user: { userId: user.id, email: user.email, role: user.role, name: user.name },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
