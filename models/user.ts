import Express from "express";
import { Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "../types/models";

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Please Provide Name."],
			minlength: 3,
			maxlength: 50,
		},
		email: {
			type: String,
			required: [true, "Please provide email."],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please provide valid email.",
			],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please provide password."],
			minlength: 8,
		},
		bio: {
			type: String,
			maxlength: 150,
		},
		profileImage: {
			data: Buffer,
			contentType: String,
		},
		blogs: [
			{
				type: Schema.Types.ObjectId,
				ref: "Blog",
			},
		],
	},
	{ timestamps: true }
);

// UserSchema.pre("save", async function (next: Express.NextFunction) {
// 	if (!this.isModified("password")) {
// 		return next(); // If password field is not modified, move to the next middleware
// 	}

// 	try {
// 		const salt = await bcrypt.genSalt(10);
// 		this.password = await bcrypt.hash(this.password, salt);
// 		next();
// 	} catch (error) {
// 		return next(error);
// 	}
// });

UserSchema.methods.generateToken = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as jwt.Secret, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePassword = async function (pswrd: IUser["password"]) {
	const isMatch = await bcrypt.compare(pswrd, this.password);
	return isMatch;
};
const User = model<IUser>("User", UserSchema);
export default User;
