import Blog from "../../models/blog";
import { connectToDB } from "../../../../utils/database";
export const DELETE = async (request) => {
  const { id } = await request.json();
  try {
    await connectToDB();
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return new Response("Blog not found", { status: 404 });
    }
    //Soft deletion
    existingBlog.isDeleted = true;
    await existingBlog.save();
    return new Response(JSON.stringify(existingBlog), { status: 200 });
  } catch (e) {
    return new Response("Failed to delete blog", { status: 500 });
  }
};
