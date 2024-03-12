import mongoose, { Types, Schema } from "mongoose"
import User from "../models/user"
import Blog from "../models/blog"
import Comment from "../models/comment"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnauthenticatedError } from "../errors"
import { Request, Response } from "express"
import { IBlog } from "../types/models"
import trendingCache from "../utils/cache"

//UTITLIY FUNCTIONS

//Remember: You can not throw error in non-async function
//why? because it will not be caught by the error handling middleware

const getId = (id: string) => {
    try {
        return new mongoose.Types.ObjectId(id)
    } catch (e) {
        throw new BadRequestError("Invalid Blog Id")
    }
}

const getBlogId = (req: Request) => {
    return getId(req.params.blogId)
}
const getCommentId = (req: Request) => {
    return getId(req.params.commentId)
}

const getUserId = (req: Request) => {
    return req.user.userId
}

//UTILITY FUNCTIONS END

const getBlogByCategory = async (req: Request, res: Response) => {
    const category = req.params.category
    // tag is array of category field, and category is a string

    let query = {}
    if (category !== "all") query = { tags: { $in: [category] } }

    const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(req.pagination.skip)
        .limit(req.pagination.limit)
        .select("title description img author tags")
        .populate({
            path: "author",
            select: "name profileImage",
        })

    if (blogs.length === 0) throw new BadRequestError("No More blogs to show")

    res.status(StatusCodes.OK).json({
        data: blogs,
        success: true,
        msg: "Data Fetched Successfully",
    })
}

const getBlogById = async (req: Request, res: Response) => {
    const blogId = getBlogId(req)

    const blog: IBlog | null = await Blog.findById(blogId)
    if (!blog) {
        throw new BadRequestError("Blog not found")
    }
    res.status(StatusCodes.OK).json({
        data: blog,
        success: true,
        msg: "Blog Fetched Successfully",
    })
}

const commentBlog = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const blogId = getBlogId(req)

    const { message } = req.body
    if (!message) {
        throw new BadRequestError("Message is required")
    }
    const comment = await Comment.create({
        message,
        author: userId,
    })
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
        $push: { comments: comment },
    })
    if (!updatedBlog) {
        throw new BadRequestError("Error commenting on blog")
    }
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Commented Successfully",
    })
}

const commentOnComment = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    // const commentId: Types.ObjectId = await checkId(req.body.commentId);
    const commentId = getCommentId(req)
    const { message } = req.body

    if (!message) {
        throw new BadRequestError("Message is required")
    }
    const comment = await Comment.create({
        message,
        author: userId,
    })
    const updatedcomment = await Comment.findByIdAndUpdate(commentId, {
        $push: { comments: comment },
    })
    if (!updatedcomment) {
        await comment.deleteOne()
        throw new BadRequestError("Error commenting on comment")
    }
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Commented Successfully",
    })
}

const getUserBlogs = async (req: Request, res: Response) => {
    //populate title description content img author
    const userId = getUserId(req)
    const userBlogs = await User.findById(userId).select("blogs").populate({
        path: "blogs",
        select: "title description img tags",
    })

    if (!userBlogs) {
        throw new UnauthenticatedError("User Not Found")
    }
    res.status(StatusCodes.OK).json({
        data: userBlogs.blogs,
        success: true,
        msg: "Data Fetched Successfully",
    })
}

const createBlog = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const { title, description, content, img, tags } = req.body

    if (!Array.isArray(tags))
        throw new BadRequestError("Tags should be an array of valid strings")

    const blog = await Blog.create({
        title,
        description,
        content,
        img,
        tags,
        author: userId,
    })
    const user = await User.findByIdAndUpdate(userId, {
        $push: { blogs: blog._id },
    })
    res.status(StatusCodes.CREATED).json({
        data: blog,
        success: true,
        msg: "Blog Created Successfully",
    })
}

const deleteBlog = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const blogId = getBlogId(req)

    //check if blogId is valid

    const userBlogs = await User.findById(userId).select("blogs")
    if (!userBlogs) throw new UnauthenticatedError("User Not Found")

    const blogIndex = userBlogs.blogs.indexOf(blogId as any)

    if (blogIndex === -1)
        return res.status(404).json({ error: "Blog not found in user blogs." })

    //delete blog
    let blog: IBlog | null = await Blog.findByIdAndDelete(blogId)
    if (!blog) throw new BadRequestError("Error deleting blog")

    //delete blog from user blogs
    userBlogs.blogs.splice(blogIndex, 1)

    await userBlogs.save()
    res.status(StatusCodes.OK).json({
        success: true,
        msg: `Successfully deleted blog.`,
    })
}

const updateBlog = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const blogId = getBlogId(req)
    const { title, description, content, img, tags } = req.body

    if (tags && !Array.isArray(tags))
        throw new BadRequestError("Tags should be an array of valid strings")

    //update blog
    const blog = await Blog.findOneAndUpdate(
        {
            _id: blogId,
            author: userId,
        },
        { title, description, content, img, tags },
        { new: true },
    )

    if (!blog)
        throw new BadRequestError(
            "You are not authorized to update this blog or the blog does not exist",
        )

    res.status(StatusCodes.OK).json({
        data: blog,
        success: true,
        msg: "Successfully updated blog.",
    })
}

const getTrendingBlogs = async (req: Request, res: Response) => {
    const cachedData = trendingCache.get("trendingPosts")
    if (cachedData) {
        return res.status(StatusCodes.OK).json({
            data: cachedData,
            success: true,
            msg: "Data Fetched Successfully",
        })
    } else {
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

        const trendingBlogs = await Blog.aggregate([
            { $match: { createdAt: { $gte: oneYearAgo } } },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorInfo",
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    totalScore: {
                        $add: ["$views", "$likesCount", "$commentsCount"],
                    },
                    authorInfo: {
                        $arrayElemAt: ["$authorInfo", 0],
                    },
                },
            },
            {
                $addFields: {
                    "author._id": "$authorInfo._id",
                    "author.name": "$authorInfo.name",
                    "author.profileImage": "$authorInfo.profileImage",
                },
            },
            {
                $unset: ["authorInfo"],
            },
            { $sort: { totalScore: -1 } },
            { $limit: 5 },
        ])

        trendingCache.set("trendingPosts", trendingBlogs)
        res.status(StatusCodes.OK).json({
            data: trendingBlogs,
            success: true,
            msg: "Data Fetched Successfully",
        })
    }
}
export {
    getBlogById,
    getTrendingBlogs,
    getBlogByCategory,
    commentBlog,
    commentOnComment,
    getUserBlogs,
    createBlog,
    deleteBlog,
    updateBlog,
}
