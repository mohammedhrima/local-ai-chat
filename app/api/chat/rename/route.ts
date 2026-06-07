import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Chat } from "@/models/Chat";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { chatId, name } = await req.json();
  if (!chatId || !name) {
    return NextResponse.json(
      { message: "chatId and name are required" },
      { status: 400 },
    );
  }

  await connectDB();
  await Chat.findOneAndUpdate({ _id: chatId, userId }, { name });
  return NextResponse.json({ ok: true });
}
