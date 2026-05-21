import User from "@/models/User";
import connectDB  from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const username = searchParams.get("username");

    const existingUser = await User.findOne({ username });

    return Response.json({
      exists: !!existingUser,
    });
  } catch (error) {
    return Response.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}