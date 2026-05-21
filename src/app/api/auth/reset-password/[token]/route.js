import crypto from "crypto";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req, context) {
  try {
    await connectDB();

    const { token } = await context.params;

    const { password } = await req.json();

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;

    await user.save();

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}