import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Chat } from "@/models/Chat";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  await connectDB();
  const chats = await Chat.find({ userId }).sort({ updatedAt: -1 }).lean();
  return NextResponse.json({ chats });
}
