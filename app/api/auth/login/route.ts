import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { setAuthCookie, signToken, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    await setAuthCookie(await signToken(user._id.toString()));
    return NextResponse.json({
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
