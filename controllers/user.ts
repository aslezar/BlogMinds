const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
import { Request, Response } from "express";
import mongoose from "mongoose";

const updateUser = async (
	userId: mongoose.Schema.Types.ObjectId,
	key: string,
	value: any
) => {
	const user = await User.findById(userId);
	if (!user) throw new UnauthenticatedError("User Not Found");
	if (key === "name") {
		for (let i = 0; i < user.rooms.length; i++) {
			const room = await User.findById(user.rooms[i].roomId);
			if (!room) {
				continue;
			}
			for (let j = 0; j < room.users.length; j++) {
				if (room.users[j].userId.toString() === userId.toString()) {
					room.users[j].name = value;
					break;
				}
			}
			await room.save();
		}
	}
	user[key] = value;
	await user.save();
};

const updateName = async (req: Request, res: Response) => {
	const userId = req.user.userId;
	const { name } = req.body;
	if (!name) throw new BadRequestError("Name is required");

	await updateUser(userId, "name", name);
	res.status(StatusCodes.OK).json({
		data: { name },
		success: true,
		msg: "Name Updated Successfully",
	});
};
const updateBio = async (req: Request, res: Response) => {
	const userId = req.user.userId;
	const { bio } = req.body;
	if (!bio) throw new BadRequestError("Bio is required");

	if (bio.length > 150)
		throw new BadRequestError("Bio should be less than 150 characters");

	await updateUser(userId, "bio", bio);
	res.status(StatusCodes.OK).json({
		data: { bio },
		success: true,
		msg: "Bio Updated Successfully",
	});
};
const updateImage = async (req: Request, res: Response) => {
	const userId = req.user.userId;
	if (!req.file) throw new BadRequestError("Image is required");

	const profileImage = {
		data: req.file.buffer,
		contentType: req.file.mimetype,
	};

	await updateUser(userId, "profileImage", profileImage);

	res.status(StatusCodes.OK).json({
		success: true,
		msg: "Image Updated Successfully",
	});
};

export { updateName, updateBio, updateImage };
