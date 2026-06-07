import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Chat } from "@/models/Chat";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { chatId } = await req.json();
  if (!chatId) return NextResponse.json({ message: "chatId is required" }, { status: 400 });

  await connectDB();
  await Chat.deleteOne({ _id: chatId, userId });
  return NextResponse.json({ ok: true });
}
