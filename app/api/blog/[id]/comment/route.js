import Blog from "@app/api/models/blog";
import { connectToDB } from "@utils/database";
export const POST = async (req, { params }) => {
  const { content, authorId, createdAt } = await req.json();
  try {
    await connectToDB();
    const blog = await Blog.findById(params.id);
    if (!blog) return new Response("Blog not found", { status: 404 });
    blog.comments.push({ content, author: authorId, createdAt });

    await blog.save();

    const updatedBlog = await Blog.findById(params.id)
      .populate("author")
      .populate("comments.author");

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch all blogs", { status: 500 });
  }
};
