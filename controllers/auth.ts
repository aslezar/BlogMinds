import User from "../models/user"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors"
import jwt from "jsonwebtoken"
import { IUser } from "../types/models"
import { Request, Response } from "express"

const sendUserData = (user: IUser, res: Response, msg: String) => {
    const token = user.generateToken()

    const { _id: userId, name, email, bio, profileImage } = user

    res.status(StatusCodes.CREATED).json({
        data: {
            userId,
            name,
            email,
            bio,
            profileImage,
            token,
        },
        success: true,
        msg,
    })
}

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError("Please provide all details")
    }
    const userExist = await User.findOne({ email }) // Using findOne

    if (userExist) {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            msg: "User with this email already exists",
        }) // Conflict status
    }
    const user = await User.create({ name, email, password })
    sendUserData(user, res, "User Registered Successfully")
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email && !password) {
        throw new BadRequestError("Please provide email and password")
    } else if (!email) {
        throw new BadRequestError("Please provide email")
    } else if (!password) {
        throw new BadRequestError("Please provide password")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError("Email Not Registered.")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Password.")
    }

    sendUserData(user, res, "User Login Successfully")
}
const tokenLogin = async (req: Request, res: Response) => {
    const user = await User.findById(req.user.userId)
    if (!user) {
        throw new UnauthenticatedError("User Not Found")
    }
    sendUserData(user, res, "User Login Successfully")
}
const signOut = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "User Logout Successfully",
    })
}

export { register, login, tokenLogin, signOut }
