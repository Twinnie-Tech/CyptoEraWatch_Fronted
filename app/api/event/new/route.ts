import Event from "@app/api/models/event";
import { connectToDB } from "@utils/database";
export const Post = async(request:Request)=>{
    const {title,content,createdAt,eventDate,expiresOn,eventImage,registered} = await request.json();
    try{
await connectToDB();
const newEvent = new Event({
    title,
    content,
    createdAt,
    eventDate,
    expiresOn,
    eventImage,
    registered
})
await newEvent.save();
return new Response(JSON.stringify(newEvent),{status:201});
    }catch(error){
return new Response("Failed to create a new Event",{status:500});
    }
}