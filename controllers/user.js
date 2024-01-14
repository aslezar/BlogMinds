const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const updateUser = async (userId, key, value) => {
	const user = await User.findById(userId);
	if (!user) {
		throw new UnauthenticatedError("User Not Found");
	}
	if (key === "name") {
		for (let i = 0; i < user.rooms.length; i++) {
			const room = await Room.findById(user.rooms[i].roomId);
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

const updateName = async (req, res) => {
	const { userId } = req.user;
	const { name } = req.body;
	if (!name) {
		throw new BadRequestError("Name is required");
	}

	await updateUser(userId, "name", name);
	res.status(StatusCodes.OK).json({
		data: { name },
		success: true,
		msg: "Name Updated Successfully",
	});
};
const updateBio = async (req, res) => {
	const { userId } = req.user;
	const { bio } = req.body;
	if (!bio) {
		throw new BadRequestError("Bio is required");
	}
	if (bio.length > 150) {
		throw new BadRequestError("Bio should be less than 150 characters");
	}
	await updateUser(userId, "bio", bio);
	res.status(StatusCodes.OK).json({
		data: { bio },
		success: true,
		msg: "Bio Updated Successfully",
	});
};
const updateImage = async (req, res) => {
	const { userId } = req.user;
	if (!req.file) {
		throw new BadRequestError("Image is required");
	}

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

module.exports = {
	updateName,
	updateBio,
	updateImage,
};
