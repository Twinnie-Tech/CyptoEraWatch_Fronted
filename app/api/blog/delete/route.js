import Blog from "../../models/blog";
import { connectToDB } from "../../../../utils/database";
export const DELETE = async (request) => {
  const { id } = await request.json();
  console.log(id);
  try {
    await connectToDB();
    const existingBlog = await Blog.findById(id);
    console.log(existingBlog);
    if (!existingBlog) {
      return new Response("Blog not found", { status: 404 });
    }
    //Soft deletion
    existingBlog.isDeleted = true;
    await existingBlog.save();
    console.log(existingBlog);
    return new Response(JSON.stringify(existingBlog), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Failed to delete blog", { status: 500 });
  }
};
