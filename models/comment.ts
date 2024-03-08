import { Schema, model, Types } from "mongoose"
import { IComment } from "../types/models"

const CommentsSchema = new Schema<IComment>(
    {
        message: {
            type: String,
            required: [true, "Please provide message."],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide author."],
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true },
)

const Comment = model<IComment>("Comment", CommentsSchema)
export default Comment
