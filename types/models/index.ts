import { Schema, Types } from "mongoose";

export interface IBlog {
	title: string;
	description?: string;
	content?: string;
	img?: string;
	author: Types.ObjectId;
	comments: Types.Array<Schema.Types.ObjectId>;
	tags: Types.Array<string>;
	createdAt: Date;
	updatedAt: Date;
}

export interface IComment {
	message: string;
	author: Types.ObjectId;
	comments?: Types.Array<Schema.Types.ObjectId>;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IUser {
	name: string;
	email: string;
	password: string;
	bio?: string;
	profileImage?: {
		data: Buffer;
		contentType: string;
	};
	blogs: Types.Array<Schema.Types.ObjectId>;
	createdAt: Date;
	updatedAt: Date;
}
