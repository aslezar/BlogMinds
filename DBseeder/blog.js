const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide title."],
            minlength: 3,
        },
        description: String,
        content: String,
        img: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide author."],
        },
        tags: [String],
        views: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        likesCount: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
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

module.exports = new mongoose.model("Blog", BlogSchema)
