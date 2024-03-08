import {Schema,model,models} from "mongoose";
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
        type: Schema.Types.ObjectId,
        ref: "Comment"
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
    }]
})
const Blog = models.Blog || model("blog",BlogSchema);
export default Blog;