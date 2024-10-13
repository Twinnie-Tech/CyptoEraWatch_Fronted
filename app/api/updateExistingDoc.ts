import { connectToDB } from "@utils/database";
import Blog from "./models/blog";
import mongoose from "mongoose";

const updateExistingDocs = async () => {
    await connectToDB();
    try {
        const result = await Blog.updateMany({}, { $set: { status: "pending" } });
    } catch (e) {
        console.error('Error updating documents', e);
    } finally {
        mongoose.connection.close();
    }
};
export default updateExistingDocs;
