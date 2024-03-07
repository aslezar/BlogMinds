import { Schema, Types, Model } from "mongoose";

export interface IBlog {
	title: string;
	description?: string;
	content?: string;
	img?: string;
	author: Schema.Types.ObjectId;
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
	_id?: Types.ObjectId;
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
	isModified: (field: string) => boolean;
	generateToken: () => string;
	comparePassword: (pswrd: string) => boolean;
}
