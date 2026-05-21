import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import sendEmail from "@/lib/sendEmail";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 404 }
      );
    }

    // create token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // reset link
    const resetUrl =
      `${process.env.NEXTAUTH_URL}/auth/reset-password/${resetToken}`;

    // send email
    sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Password Reset</h2>

        <p>Click below link to reset password:</p>

        <a href="${resetUrl}">
          Reset Password
        </a>
      `,
    });

    return Response.json({
      success: true,
      message: "Reset email sent",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}