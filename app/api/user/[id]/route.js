import User from "@app/api/models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch user", { status: 500 });
  }
};
