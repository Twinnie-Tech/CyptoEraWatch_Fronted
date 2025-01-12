import Blog from "../../models/blog";
import { connectToDB } from "../../../../utils/database";
export const PATCH = async (request) => {
  const { id, title, content, tag, image, status } = await request.json();
  try {
    await connectToDB();
    const existingBlog = await Blog.findById(id);
    console.log(existingBlog);
    console.log(status);
    if (!existingBlog) {
      return new Response("Blog not found", { status: 404 });
    }
    existingBlog.title = title;
    existingBlog.content = content;
    existingBlog.tag = tag;
    existingBlog.image = image;
    existingBlog.status = status;
    await existingBlog.save();
    return new Response(JSON.stringify(existingBlog), { status: 200 });
  } catch (e) {
    return new Response("Failed to update blog", { status: 500 });
  }
};
