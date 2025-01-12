import { connectToDB } from "@utils/database";
import Blog from "./models/blog";
import mongoose from "mongoose";

const updateExistingDocs = async () => {
    try {
        console.log("testing connections");
        // const result = await Blog.updateMany(
        //     { isDeleted: { $exists: false } },
        //     { $set: { isDeleted: false } }
        // );
        // console.log(`Updated ${result.modifiedCount} documents`);

        await Blog.updateMany(
            { isDeleted: false },
            {
              $set: {
                comments: [
                  {
                    content: "Great insights on this topic!",
                    author: {
                        _id: "664cbaccecf7d38fd952a68e", 
                        username: "samuelkamotho",
                        image: "https://lh3.googleusercontent.com/a/ACg8ocKcoq60qzZ1X_5O0HztGiNlmfgKpkpxtrf_QBKqWji3V4M18n0=s96-c"
                      },
                    createdAt: new Date()
                  },
                  {
                    content: "Thanks for sharing this valuable information",
                    author: {
                        _id: "664cbaccecf7d38fd952a68e", 
                        username: "samuelkamotho",
                        image: "https://lh3.googleusercontent.com/a/ACg8ocKcoq60qzZ1X_5O0HztGiNlmfgKpkpxtrf_QBKqWji3V4M18n0=s96-c"
                      },
                    createdAt: new Date()
                  }
                ]
              }
            }
          );
      
          // Fetch updated blogs with populated author
          const blogs = await Blog.find({ isDeleted: false })
            .populate("author")
            .populate("comments.author");
      
          return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (e) {
        console.error('Error updating documents', e);
    } finally {
        mongoose.connection.close();
    }
};

export default updateExistingDocs;