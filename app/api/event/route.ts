import Event from "../models/event";
import { connectToDB } from "@utils/database";
export const GET = async () => {
    try {
        await connectToDB();
        const events = await Event.find({});
        return new Response(JSON.stringify(events), { status: 200 });
    } catch (e) {
        return new Response("Failed to fetch all blogs", { status: 500 });
    }
}