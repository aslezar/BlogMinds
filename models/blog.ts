// const mongoose = require("mongoose");
import { Schema, model } from "mongoose"
import { IBlog } from "../types/models"

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: [true, "Please provide title."],
            minlength: [6, "Title should be at least 10 characters."],
            maxlength: [100, "Title should be less than 100 characters."],
        },
        description: {
            type: String,
            required: [true, "Please provide description "],
            minlength: [10, "Description should be at least 10 characters."],
            maxlength: [250, "Description should be less than 250 characters."],
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

        tags: {
            type: [String],
            required: [true, "Please provide tags."],
            enum: [
                "technology",
                "science",
                "programming",
                "health",
                "business",
                "entertainment",
                "sports",
                "education",
                "lifestyle",
            ],
        },
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
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        commentsCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
)

BlogSchema.index({ tags: 1 })

const Blog = model<IBlog>("Blog", BlogSchema)

export default Blog
