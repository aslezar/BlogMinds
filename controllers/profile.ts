import User from "../models/user"
import Blog from "../models/blog" // Import the Blog model
import { Request, Response } from "express"
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
            $lookup: {
                from: "blogs",
                localField: "blogs",
                foreignField: "_id",
                as: "blogs",
            },
        },
        {
            $project: {
                name: 1,
                bio: 1,
                profileImage: 1,
                followersCount: { $size: "$followers" },
                followingCount: { $size: "$following" },
                myInterests: 1,
                createdAt: 1,
                blogs: {
                    $map: {
                        input: "$blogs",
                        as: "blog",
                        in: {
                            title: "$$blog.title",
                            author: "$$blog.author",
                            img: "$$blog.img",
                            tags: "$$blog.tags",
                            likesCount: "$$blog.likesCount",
                            commentsCount: "$$blog.commentsCount",
                            views: "$$blog.views",
                            createdAt: "$$blog.createdAt",
                            description : "$$blog.description"
                        },
                    },
                },
            },
        },
    ])

    if (matchedUsers.length == 0) {
        throw new BadRequestError("User not found")
    }

    const user = matchedUsers[0]

    return res.status(StatusCodes.OK).json({
        data: {
            user,
        },
        success: true,
        msg: "User Fetched Successfully",
    })
}


export { getUserProfile }
