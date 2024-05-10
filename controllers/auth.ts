import User from "../models/user"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors"
import { IUser } from "../types/models"
import { Request, Response } from "express"
import SendMail from "../utils/sendMail"
import { OTP } from "../types/models"
const { OAuth2Client } = require("google-auth-library")
const client = new OAuth2Client()

const setTokenCookie = (res: Response, user: IUser) => {
    const token = user.generateToken()

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(
            Date.now() +
                parseInt(process.env.JWT_LIFETIME as string) *
                    1000 *
                    24 *
                    60 *
                    60,
        ),
    })
}

const sendUserData = (user: IUser, res: Response, msg: String) => {
    const token = user.generateToken()

    const sendUser = {
        userId: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
        myInterests: user.myInterests,
        followingCount: user.following.length,
        followersCount: user.followers.length,
    }

    // const { _id: userId, name, email, bio, profileImage,myInterests } = user

    setTokenCookie(res, user)

    res.status(StatusCodes.CREATED).json({
        data: {
            ...sendUser,
        },
        success: true,
        msg,
    })
}

const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body
    const name = firstName + " " + lastName
    if (!name || !email) throw new BadRequestError("Please provide all details")
    if (!password) throw new BadRequestError("Please provide password")
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
        text: `Thank you for registering with Blogmind! Your OTP (One-Time Password) is ${otpCode}. Please use this code to verify your email.`,
        html: `<h1>Thank you for registering with Blogmind!</h1><p>Your OTP (One-Time Password) is <strong>${otpCode}</strong>. Please use this code to verify your email.</p>`,
    })

    res.status(StatusCodes.CREATED).json({
        data: {
            userId: user?._id,
        },
        success: true,
        msg: "OTP sent to your email. Please verify your email.",
    })
}

const forgotPasswordSendOtp = async (req: Request, res: Response) => {
    const { email } = req.body
    if (!email) throw new BadRequestError("Please provide email")
    const user = await User.findOne({ email })
    if (!user) throw new UnauthenticatedError("Email Not Registered.")
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const otp: OTP = {
        value: otpCode,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    }
    user.otp = otp
    await user.save()
    await SendMail({
        from: process.env.SMTP_EMAIL_USER,
        to: email,
        subject: "Blogmind: Reset Password",
        text: `Your OTP (One-Time Password) is ${otpCode}. Please use this code to reset your password.`,
        html: `<h1>Your OTP (One-Time Password) is <strong>${otpCode}</strong>. Please use this code to reset your password.</h1>`,
    })
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "OTP sent to your email. Please verify your email.",
    })
}

const forgotPasswordVerifyOtp = async (req: Request, res: Response) => {
    const { otp, email, password } = req.body as {
        otp: string
        email: string
        password: string
    }
    if (!otp) throw new BadRequestError("Please provide OTP")
    const user = await User.findOne({ email, "otp.value": otp })
    if (!user) throw new UnauthenticatedError("Invalid OTP.")
    if (user.otp && user.otp.expires < new Date()) {
        user.otp = undefined
        throw new UnauthenticatedError("OTP Expired.Please try again.")
    }
    user.otp = undefined
    user.password = password
    await user.save()
    setTokenCookie(res, user)
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "Password Changed Successfully",
    })
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
    setTokenCookie(res, user)
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "User Registered Successfully",
    })
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

    if (!user.password)
        throw new UnauthenticatedError(
            "Please login with Google.\nOr Reset Password.",
        )

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Password.")

    setTokenCookie(res, user)
    res.status(StatusCodes.CREATED).json({
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
    //clear all cookies
    for (const cookie in req.cookies) {
        res.clearCookie(cookie)
    }
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "User Logout Successfully",
    })
}

const continueWithGoogle = async (req: Request, res: Response) => {
    const tokenId = req.body.tokenId

    let payload: any = null

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        })
        payload = ticket.getPayload()
    } catch (error) {
        console.log(error)
        throw new BadRequestError("Invalid Token")
    }

    const { email, name, picture } = payload
    let user = await User.findOne({ email })
    if (user) {
        if (user.status === "blocked")
            throw new UnauthenticatedError("User is blocked.")
    } else {
        user = await User.create({
            email,
            name,
            profileImage: picture,
            status: "active",
        })
    }
    setTokenCookie(res, user)
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "Google Login Successfully",
    })
}

export {
    register,
    login,
    continueWithGoogle,
    verifyEmail,
    tokenLogin,
    signOut,
    forgotPasswordSendOtp,
    forgotPasswordVerifyOtp,
}
