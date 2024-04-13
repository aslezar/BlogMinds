const mongoose_1 = require("mongoose")
const CommentsSchema = new mongoose_1.Schema(
    {
        message: {
            type: String,
            required: [true, "Please provide message."],
        },
        author: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide author."],
        },
    },
    { timestamps: true },
)
module.exports = new mongoose_1.model("Comment", CommentsSchema)
