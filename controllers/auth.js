const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const sendUserData = (user, res, msg) => {
	const token = user.generateToken();

	//check if profile image is set or not
	const profileImage =
		user.profileImage && user.profileImage.data && user.profileImage.contentType
			? {
					base64Image: user.profileImage.data.toString("base64"),
					contentType: user.profileImage.contentType,
			  }
			: null;

	res.status(StatusCodes.CREATED).json({
		data: {
			userId: user._id,
			name: user.name,
			email: user.email,
			bio: user.bio,
			profileImage,
			token,
		},
		success: true,
		msg,
	});
};

const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		throw new BadRequestError("Please provide all details");
	}
	const userExist = await User.findOne({ email }); // Using findOne

	if (userExist) {
		return res.status(StatusCodes.CONFLICT).json({
			success: false,
			msg: "User with this email already exists",
		}); // Conflict status
	}
	const user = await User.create({ name, email, password });
	sendUserData(user, res, "User Registered Successfully");
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email && !password) {
		throw new BadRequestError("Please provide email and password");
	} else if (!email) {
		throw new BadRequestError("Please provide email");
	} else if (!password) {
		throw new BadRequestError("Please provide password");
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError("Email Not Registered.");
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid Password.");
	}

	sendUserData(user, res, "User Login Successfully");
};
const tokenLogin = async (req, res) => {
	const { token } = req.body;
	if (!token) {
		throw new BadRequestError("Please provide token");
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(decoded);

		const user = await User.findById(decoded.userId);
		if (!user) {
			throw new UnauthenticatedError("Invalid Token");
		}
		sendUserData(user, res, "User Login Successfully");
	} catch (error) {
		throw new UnauthenticatedError("Invalid Token");
	}
};
const signOut = async (req, res) => {
	res.status(StatusCodes.OK).json({
		success: true,
		msg: "User Logout Successfully",
	});
};

export default {
	register,
	login,
	tokenLogin,
	signOut,
};
