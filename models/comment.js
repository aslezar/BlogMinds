const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: [true, "Please provide message."],
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Comment", CommentsSchema);
