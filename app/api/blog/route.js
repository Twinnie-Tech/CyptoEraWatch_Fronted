import Blog from "@app/api/models/blog";
import { connectToDB } from "@utils/database";
export const GET = async (req) => {
  try {
    await connectToDB();
    const blogs = await Blog.find({ isDeleted: false }).populate("author");
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch all blogs", { status: 500 });
  }
};
