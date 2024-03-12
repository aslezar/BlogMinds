import User from "../models/user"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors"
import { IUser } from "../types/models"
import { Request, Response } from "express"
import SendMail from "../utils/sendMail"
import { OTP } from "../types/models"

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
        },
        token,
        success: true,
        msg,
    })
}

const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    const name = firstName + " " + lastName
    if (!name || !email || !password)
        throw new BadRequestError("Please provide all details")
    const userExist: IUser | null = await User.findOne({ email }) // Using findOne

    if (userExist && userExist.status === "active") {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            msg: "User with this email already exists",
        }) // Conflict status
    }
    if (userExist && userExist.status === "blocked") {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            msg: "User with this email is blocked.",
        }) // Forbidden status
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

    const otp: OTP = {
        value: otpCode,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    }

    let user: IUser | null = null

    if (userExist && userExist.status === "inactive") {
        user = await User.findByIdAndUpdate(userExist._id, {
            name,
            email,
            password,
            otp,
        })
    } else {
        user = await User.create({
            name,
            email,
            password,
            status: "inactive",
            otp,
        })
    }

    await SendMail({
        from: process.env.SMTP_EMAIL_USER,
        to: email,
        subject: "Blogmind: Email Verification",
        text: `Your OTP is ${otpCode}`,
    })

    res.status(StatusCodes.CREATED).json({
        data: {
            userId: user?._id,
        },
        success: true,
        msg: "OTP sent to your email. Please verify your email.",
    })
}

// only for development environment
const registerWithoutOtp = async (req: Request, res: Response) => {
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
    const user = await User.create({ name, email, password, status: "active" })
    sendUserData(user, res, "User Registered Successfully")
}

const verifyEmail = async (req: Request, res: Response) => {
    const { otp, userId } = req.body as { otp: string; userId: string }
    if (!otp) throw new BadRequestError("Please provide OTP")

    const user = await User.findById(userId)
    if (!user) throw new UnauthenticatedError("User Not Found")

    if (user.status === "active")
        throw new UnauthenticatedError("User is already active.")

    if (user.status === "blocked")
        throw new UnauthenticatedError(
            "User is blocked. Please Reach out to support.",
        )

    if (!user.otp) throw new UnauthenticatedError("OTP Not Found")
    if (user.otp.value !== otp.toString())
        throw new UnauthenticatedError("Wrong OTP.")

    if (user.otp && user.otp.expires < new Date()) {
        user.otp = undefined
        throw new UnauthenticatedError("OTP Expired.Please register again.")
    }
    user.status = "active"
    user.otp = undefined
    await user.save()
    res.status(StatusCodes.CREATED).json({
        token: user.generateToken(),
        success: true,
        msg: "User Registered Successfully",
    })
    // sendUserData(user, res, "User Registered Successfully")
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email && !password)
        throw new BadRequestError("Please provide email and password")
    else if (!email) throw new BadRequestError("Please provide email")
    else if (!password) throw new BadRequestError("Please provide password")

    const user = await User.findOne({ email })

    if (!user) throw new UnauthenticatedError("Email Not Registered.")
    if (user.status === "inactive")
        throw new UnauthenticatedError("User is inactive.")
    if (user.status === "blocked")
        throw new UnauthenticatedError("User is blocked.")

    const isPasswordCorrect = user.comparePassword(password)
    if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Password.")

    // sendUserData(user, res, "User Login Successfully")
    res.status(StatusCodes.CREATED).json({
        token: user.generateToken(),
        success: true,
        msg: "User Login Successfully",
    })
}
const tokenLogin = async (req: Request, res: Response) => {
    const user = await User.findById(req.user.userId)
    if (!user) throw new UnauthenticatedError("User Not Found")
    if (user.status === "blocked")
        throw new UnauthenticatedError("User is blocked.")
    if (user.status === "inactive")
        throw new UnauthenticatedError("User is inactive.")

    sendUserData(user, res, "User Login Successfully")
}
const signOut = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "User Logout Successfully",
    })
}

export { register, registerWithoutOtp, login, verifyEmail, tokenLogin, signOut }
