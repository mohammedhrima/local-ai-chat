import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ user: null });

  await connectDB();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({
    user: { id: user._id.toString(), name: user.name, email: user.email },
  });
}
