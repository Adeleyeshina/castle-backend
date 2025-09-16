import mongoose, { Schema } from "mongoose";

const agentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Agent = mongoose.model("Agent", agentSchema)

export default Agent