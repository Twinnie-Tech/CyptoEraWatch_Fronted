import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    eventDate: {
        type: Date,
        required: [true, 'eventDate is required']
    },
    expiresOn: {
        type: Date,
        required: [true, 'Event registration  expiring is required']
    },
    eventImage: {
        type: String,
        required: [true, 'eventImage is required']
    },
    registered: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
});
const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;