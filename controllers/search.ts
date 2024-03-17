import User from "../models/user"
import Blogs from "../models/blog"
import { Request, Response } from "express"
import { BadRequestError } from "../errors"
import { StatusCodes } from "http-status-codes"

const search = async (req: Request, res: Response) => {
    const { type, query } = req.query
    if (!query) throw new BadRequestError("Query is required")

    switch (type) {
        case "user":
            const users = await User.find({
                name: { $regex: query, $options: "i" },
            })
                .select("name email profileImage")
                .skip(req.pagination.skip)
                .limit(req.pagination.limit)
                .sort({ createdAt: -1 })

            return res.status(StatusCodes.OK).json({
                data: users,
                page: req.pagination.page,
                limit: req.pagination.limit,
                success: true,
                msg: "Users Fetched Successfully",
            })
        case "blog":
            const { tags } = req.query

            const queryObject: any = {
                title: { $regex: query, $options: "i" },
            }

            if (tags) queryObject.tags = { $in: [tags] }

            const blogs = await Blogs.find(queryObject)
                .select(
                    "title description img author tags views likesCount commentsCount createdAt updatedAt",
                )
                .skip(req.pagination.skip)
                .limit(req.pagination.limit)
                .sort({ createdAt: -1 })
            return res.status(StatusCodes.OK).json({
                data: blogs,
                page: req.pagination.page,
                limit: req.pagination.limit,
                success: true,
                msg: "Blogs Fetched Successfully",
            })
        default:
            throw new BadRequestError(
                "Invalid type, accepted types are 'user' and 'blog'",
            )
    }
}

export { search }
