import User from "../models/user"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors"
import { Request, Response } from "express"
import mongoose from "mongoose"

import cloudinary from "../utils/cloudinary"
import sharp from "sharp"

const cloudinary = require("cloudinary").v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const updateUser = async (
    userId: mongoose.Schema.Types.ObjectId,
    key: string,
    value: any,
) => {
    const user = await User.findById(userId)
    if (!user) throw new UnauthenticatedError("User Not Found")
    user.set({ [key]: value })
    await user.save()
}

const updateName = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { name } = req.body
    if (!name) throw new BadRequestError("Name is required")

    await updateUser(userId, "name", name)
    res.status(StatusCodes.OK).json({
        data: { name },
        success: true,
        msg: "Name Updated Successfully",
    })
}
const updateBio = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { bio } = req.body
    if (!bio) throw new BadRequestError("Bio is required")

    if (bio.length > 150)
        throw new BadRequestError("Bio should be less than 150 characters")

    await updateUser(userId, "bio", bio)
    res.status(StatusCodes.OK).json({
        data: { bio },
        success: true,
        msg: "Bio Updated Successfully",
    })
}
const updateImage = async (req: Request, res: Response) => {
    const userId = req.user.userId
    if (!req.file) throw new BadRequestError("Image is required")
    // convert image to webp format
    // install sharp and cloudinary using npm install sharp cloudinary
    const webp = await sharp(req.file.buffer).webp().toBuffer()
    // save image to cloudinary
    const result = await cloudinary.uploader.upload(webp, {
        upload_preset: "social-media",
    })
    // save image url to database
    await updateUser(userId, "profileImage", result.secure_url)

    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Image Updated Successfully",
    })
}

export { updateName, updateBio, updateImage }
