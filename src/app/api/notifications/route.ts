import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET() {
  return NextResponse.json({
    notifications: dataStore.getNotifications(),
    unreadCount: dataStore.getUnreadNotificationCount(),
  });
}

export async function PUT(request: Request) {
  try {
    const { id, markAll } = await request.json();
    if (markAll) {
      dataStore.markAllNotificationsRead();
      return NextResponse.json({ success: true });
    }
    if (id) {
      const notification = dataStore.markNotificationRead(id);
      return NextResponse.json(notification);
    }
    return NextResponse.json({ error: "ID or markAll required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
