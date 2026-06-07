import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Chat } from "@/models/Chat";
import { getCurrentUserId } from "@/lib/auth";

export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  await connectDB();
  const chat = await Chat.create({ userId, name: "New Chat", messages: [] });
  return NextResponse.json({
    chat: { _id: chat._id.toString(), name: chat.name, messages: [] },
  });
}
