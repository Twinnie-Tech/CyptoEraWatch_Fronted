import { connectToDB } from "@utils/database";
import Blog from "./models/blog";
import mongoose from "mongoose";

const updateExistingDocs = async () => {
    await connectToDB();
    try {
        const result = await Blog.updateMany(
            { isDeleted: { $exists: false } },
            { $set: { isDeleted: false } }
        );
        console.log(`Updated ${result.modifiedCount} documents`);
    } catch (e) {
        console.error('Error updating documents', e);
    } finally {
        mongoose.connection.close();
    }
};

export default updateExistingDocs;