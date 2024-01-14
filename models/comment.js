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
		comments: [CommentsSchema],
	},
	{ timestamps: true }
);

module.exports = new mongoose.model("Comment", CommentsSchema);
