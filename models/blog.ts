// const mongoose = require("mongoose");
import { Schema, model, Types } from "mongoose";
import { IBlog } from "../types/models";

const BlogSchema = new Schema<IBlog>(
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
	},
	{ timestamps: true }
);

const Blog = model<IBlog>("Blog", BlogSchema);

export default Blog;
