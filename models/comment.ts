import { Schema, model, Types } from "mongoose";

interface IComment {
	message: string;
	author: Types.ObjectId;
	comments?: Types.Array<Schema.Types.ObjectId>;
	createdAt?: Date;
	updatedAt?: Date;
}

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
	{ timestamps: true }
);

const Comment = model<IComment>("Comment", CommentsSchema);
export default Comment;
