import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  const blogs = dataStore.getBlogPosts(true);
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const post = dataStore.createBlogPost(data);
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
