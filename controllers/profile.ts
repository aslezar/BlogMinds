import User from "../models/user"
import { Request, Response } from "express"
import { IUser } from "../types/models"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors"
import mongoose from "mongoose"


const getId = (id: string) => {
    try {
        return new mongoose.Types.ObjectId(id)
    } catch (e) {
        throw new BadRequestError("Id is not a valid Object")
    }
}

const getUserProfile = async (req: Request, res: Response) => {
    const { userId } = req.params
    
    const matchedUsers = await User.aggregate([
        { $match: { _id: getId(userId) } },
        {
            $project: {
                name: 1,
                bio: 1,
                profileImage: 1,
                blogs: { $size: "$blogs" },
                followersCount: { $size: "$followers" },
                followingCount: { $size: "$following" },
                myInterests: 1,
            },
        },
    ])
    if (matchedUsers.length == 0) {
        throw new BadRequestError("User not found")
    }
    const user=matchedUsers[0]
    return res.status(StatusCodes.OK).json({ ...user })
}

export { getUserProfile }
