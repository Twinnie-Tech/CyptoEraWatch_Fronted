import mongoose from "mongoose";
const {Schema} = mongoose;
mongoose.Promise = global.Promise;
const BlogSchema = new Schema({
    title:{
        type: String,
        required:[true,'title is required']
    },
    content:{
        type: String,
        required:[true,'content is required']
    },
    tag:{
        type: String,
        required:[true,'tag is required']
    },
    status:{
        type: String,
        enum:["approved","pending","rejected"],
        default:"pending"
    },
    image:[{
        type: String,
    }],
    date:{
        type: Date,
        default: Date.now
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required:[true,'author is required']
    },
    comments:[{
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes:[{
        type: Schema.Types.ObjectId,
        ref: "Like"
    }],
    dislikes:[{
        type: Schema.Types.ObjectId,
        ref: "Dislike"
    }],
    reposts:[{
        type: Schema.Types.ObjectId,
        ref: "Reposts"
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
})
const Blog = mongoose.models.Blog || mongoose.model("Blog",BlogSchema);
export default Blog;