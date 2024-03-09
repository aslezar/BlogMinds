// const mongoose = require("mongoose");
import { Schema, model, Types } from "mongoose"
import { IBlog } from "../types/models"

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: [true, "Please provide title."],
            minlength: 3,
        },
        description: {
            type: String,
            required: [true, "Please provide description "],
            minlength: [10, "Description should be at least 10 characters."],
        },
        content: {
            type: String,
            required: [true, "Please provide content."],
            minlength: [50, "Content should be at least 50 characters."],
        },
        img: String,
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
        tags: [String],
        views: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        likesCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
)

const Blog = model<IBlog>("Blog", BlogSchema)

export default Blog
