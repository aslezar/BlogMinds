import User from "../models/user"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors"
import { Request, Response } from "express"
import mongoose from "mongoose"
import {
    uploadProfileImage as cloudinaryUploadProfileImage,
    deleteProfileImage as cloudinaryDeleteProfileImage,
    uploadAssetsImages as cloudinaryUploadAssetsImages,
    deleteAssetImages as cloudinaryDeleteAssestImages,
} from "../utils/imageHandlers/cloudinary"

const updateUser = async (
    userId: mongoose.Types.ObjectId,
    key: string,
    value: any,
) => {
    const user = await User.findById(userId)
    if (!user) throw new UnauthenticatedError("User Not Found")
    user.set({ [key]: value })
    await user.save()
}

const updateCompleteProfile = async (req: Request, res: Response) => {
    const { name, bio, myInterests } = req.body
    const userId = req.user.userId

    if (!name || !bio || !myInterests)
        throw new BadRequestError("Name, Bio or Interests are required")

    const user = await User.findByIdAndUpdate(userId, {
        name,
        bio,
        myInterests,
    })

    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Profile Updated Successfully",
    })
}

const updateProfileImage = async (req: Request, res: Response) => {
    const userId = req.user.userId
    if (!req.file) throw new BadRequestError("Image is required")

    const cloudinary_img_url = await cloudinaryUploadProfileImage(req)
    await updateUser(userId, "profileImage", cloudinary_img_url)

    res.status(StatusCodes.OK).json({
        data: { profileImage: cloudinary_img_url },
        success: true,
        msg: "Image Updated Successfully",
    })
}
const deleteProfileImage = async (req: Request, res: Response) => {
    const userId = req.user.userId

    const isDeleted: boolean = await cloudinaryDeleteProfileImage(userId as any)
    if (!isDeleted) throw new BadRequestError("Failed to delete image")
    await updateUser(userId, "profileImage", undefined)

    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Image Deleted Successfully",
    })
}
const getAllAssets = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const user = await User.findById(userId).select("myAssests")
    if (!user) throw new UnauthenticatedError("User Not Found")

    res.status(StatusCodes.OK).json({
        data: { assets: user.myAssests },
        success: true,
        msg: "All Assets Fetched Successfully",
    })
}

const uploadAssets = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const files = req.files
    if (!files) throw new BadRequestError("Files are required")

    //upload files to cloudinary
    const cloudinary_img_urls = await cloudinaryUploadAssetsImages(req)

    await User.findByIdAndUpdate(userId, {
        $push: { myAssests: { $each: cloudinary_img_urls } },
    })

    res.status(StatusCodes.OK).json({
        data: cloudinary_img_urls,
        success: true,
        msg: "Assets Uploaded Successfully",
    })
}

const deleteAsset = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { assets } = req.body
    if (!assets) throw new BadRequestError("Assets are required")

    const public_id = assets
        .split("/")
        .slice(-3)
        .join("/")
        .split(".")
        .slice(0, -1)
        .join(".")

    const userIdFromUrl = public_id.split("/")[1]

    if (userIdFromUrl != userId)
        throw new BadRequestError("You are not authorized to delete this asset")

    //delete assets from cloudinary
    const isDeleted: boolean = await cloudinaryDeleteAssestImages(public_id)
    if (!isDeleted) throw new BadRequestError("Failed to delete assets")
    await User.findByIdAndUpdate(userId, {
        $pull: { myAssests: assets },
    })

    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Assets Deleted Successfully",
    })
}

const followUnfollowUser = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { followId } = req.body

    if (!followId) throw new BadRequestError("FollowId is required")

    const user = await User.findById(userId)
    const followUser = await User.findById(followId)

    if (!user) throw new UnauthenticatedError("User Not Found")
    if (!followUser) throw new BadRequestError("Follow User Not Found")

    const isFollowing = user.following.includes(followId)
    const isFollower = followUser.followers.includes(userId)

    if (isFollowing && isFollower) {
        await User.findByIdAndUpdate(userId, {
            $pull: { following: followId },
        })
        await User.findByIdAndUpdate(followId, {
            $pull: { followers: userId },
        })
    }
    if (!isFollowing && !isFollower) {
        await User.findByIdAndUpdate(userId, {
            $push: { following: followId },
        })
        await User.findByIdAndUpdate(followId, {
            $push: { followers: userId },
        })
    }

    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Follow/Unfollow User Successfully",
    })
}

const isFollowing = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { followId } = req.body

    if (!followId) throw new BadRequestError("FollowId is required")

    const user = await User.findById(userId)
    const followUser = await User.findById(followId)

    if (!user) throw new UnauthenticatedError("User Not Found")
    if (!followUser) throw new BadRequestError("Follow User Not Found")

    const isFollowing = user.following.includes(followId)
    const isFollower = followUser.followers.includes(userId)

    res.status(StatusCodes.OK).json({
        data: { isFollowing: isFollowing && isFollower },
        success: true,
        msg: "Check Following Successfully",
    })
}

export {
    updateCompleteProfile,
    updateProfileImage,
    deleteProfileImage,
    getAllAssets,
    uploadAssets,
    deleteAsset,
    followUnfollowUser,
    isFollowing,
}
