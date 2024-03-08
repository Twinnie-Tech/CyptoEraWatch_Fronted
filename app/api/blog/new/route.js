import Blog from "@models/blog";
import { connectToDB } from "@utils/database";
export const POST = async(request)=>{
const {title,content,tag,image,userId} = await request.json();
try{
    await connectToDB();
   const newBlog = new Blog({title,content,tag,image,author:userId}); 
   console.log(newBlog);
   await newBlog.save();
   return new Response(JSON.stringify(newBlog),{status:201});
}catch(e){
return new Response("Failed to create a new blog",{status:500});
}
}