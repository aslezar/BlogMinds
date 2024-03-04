import User from "../models/user";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";
import { IUser } from "../types/models";
import { Response } from "express";

const sendUserData = (user:IUser, res:Response, msg:String) => {
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

const register = async (req:AuthenticatedRequest, res:Response) => {
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

const login = async (req:AuthenticatedRequest, res:Response) => {
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
const tokenLogin = async (req:AuthenticatedRequest, res:Response) => {
	const { token } = req.body;
	if (!token) {
		throw new BadRequestError("Please provide token");
	}
	try {
		// declare a variable to store the process.env.JWT_SECRET
		let decoded = jwt.verify(token, process.env.JWT_SECRET??"");
		if (typeof decoded === 'object' && 'userId' in decoded) {
			const user = await User.findById(decoded.userId);
			if (!user) {
				throw new UnauthenticatedError("Invalid Token");
			}
			sendUserData(user, res, "User Login Successfully");
		}
		else {
			throw new UnauthenticatedError("Invalid Token");
		}
	} catch (error) {
		throw new UnauthenticatedError("Invalid Token");
	}
};
const signOut = async (req:AuthenticatedRequest, res:Response) => {
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
