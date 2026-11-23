import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json(
    dataStore.getUsers().map((u) => {
      const copy = { ...u } as Partial<typeof u>;
      delete copy.password;
      return copy;
    })
  );
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = dataStore.createUser(data);
    const safe = { ...user } as Partial<typeof user>;
    delete safe.password;
    return NextResponse.json(safe, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
