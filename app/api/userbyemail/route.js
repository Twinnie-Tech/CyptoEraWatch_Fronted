import User from "@app/api/models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { email } = await req.json();
  try {
    await connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch user", { status: 500 });
  }
};
