import axios from "axios"
import mongoose from "mongoose"
import { StatusCodes } from "http-status-codes"

import User from "../models/user"
import Blog from "../models/blog"
import Comment from "../models/comment"

import { Request, Response } from "express"
import { BadRequestError, UnauthenticatedError } from "../errors"
import trendingCache from "../utils/cache"

//UTITLIY FUNCTIONS

const getId = (id: string) => {
    try {
        return new mongoose.Types.ObjectId(id)
    } catch (e) {
        throw new BadRequestError("Id is not a valid Object")
    }
}

const getBlogId = (req: Request) => {
    return getId(req.params.blogId)
}
const getUserId = (req: Request) => {
    return req.user.userId
}

//UTILITY FUNCTIONS END

const getRecommendedBlogs = async (req: Request, res: Response) => {
    const userId = req.query.userId

    if (!userId) {
        console.log("No user id found")
        req.params.tags = "all"
        await getBlogByCategory(req, res)
        return
    }

    axios
        .get(`${process.env.PYTHON_SERVER}/get_blogs`, {
            params: {
                user_id: userId,
                page: req.pagination.page,
                page_size: req.pagination.limit,
            },
        })
        .then((response) => {
            console.log("Data fetched from python server")

            const blogs = response.data.top_recommendations
            res.status(StatusCodes.OK).json({
                data: {
                    blogs: blogs,
                    page: req.pagination.page,
                    limit: req.pagination.limit,
                },
                success: true,
                msg: "Data Fetched Successfully",
            })
        })
        .catch((error) => {
            console.log("Error fetching data from python server")
            req.query.tags = "all"
            getBlogByCategory(req, res)
            return
        })
}

const getBlogByCategory = async (req: Request, res: Response) => {
    const tags = req.query.tags
    // tag is array of category field, and category is a string

    let query = {}
    if (tags !== "all") query = { tags: { $in: [tags] } }

    const blogs = await Blog.find(query)
        .skip(req.pagination.skip)
        .limit(req.pagination.limit)
        .sort({ createdAt: -1 })
        .select(
            "title description img author tags views likesCount commentsCount createdAt updatedAt",
        )
        .populate({
            path: "author",
            select: "name profileImage",
        })

    if (blogs.length === 0) throw new BadRequestError("No more blogs found")

    res.status(StatusCodes.OK).json({
        data: { blogs, page: req.pagination.page, limit: req.pagination.limit },
        success: true,
        msg: "Data Fetched Successfully",
    })
}

const getBlogById = async (req: Request, res: Response) => {
    const blogId = getBlogId(req)

    const blog = await Blog.findById(blogId)
        .populate({
            path: "author",
            select: "name profileImage",
        })
        .populate({
            path: "comments",
            options: { sort: { createdAt: -1 } }, // Sort comments in descending order by createdAt field
            populate: {
                path: "author",
                select: "name profileImage",
            },
        })
    if (!blog) throw new BadRequestError("Blog not found")

    let isLiked = false
    if (req.query.userId)
        isLiked = blog.likes.some((id) => id.toString() === req.query.userId)

    res.status(StatusCodes.OK).json({
        data: { blog, isLiked },
        success: true,
        msg: "Blog Fetched Successfully",
    })
}

const likeBlog = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const blogId = getBlogId(req)

    const blog = await Blog.findById(blogId).select("title likes likesCount")
    if (!blog) throw new BadRequestError("Blog not found")
    const isLiked = blog.likes.includes(userId)
    if (isLiked) {
        blog.likes.remove(userId)
        blog.likesCount = blog.likesCount - 1
    } else {
        blog.likes.push(userId)
        blog.likesCount = blog.likesCount + 1
    }
    await blog.save()
    res.status(StatusCodes.OK).json({
        success: true,
        msg: isLiked ? `${blog.title} Unliked` : `${blog.title} Liked`,
    })
}

const commentBlog = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const blogId = getBlogId(req)

    const { message } = req.body
    if (!message) throw new BadRequestError("Message is required")

    const comment = await Comment.create({
        message,
        author: userId,
    })
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
        $push: { comments: comment },
        $inc: { commentsCount: 1 },
    })
    if (!updatedBlog) {
        await comment.deleteOne()
        throw new BadRequestError("Error commenting on blog")
    }
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Commented Successfully",
    })
}

const getUserBlogs = async (req: Request, res: Response) => {
    //populate title description content img author
    const userId = getUserId(req)
    const userBlogs = await Blog.find({ author: userId })
        .skip(req.pagination.skip)
        .limit(req.pagination.limit)
        .sort({ createdAt: -1 })
        .select("title description img tags")

    if (!userBlogs) throw new UnauthenticatedError("User Not Found")
    res.status(StatusCodes.OK).json({
        data: {
            blogs: userBlogs,
            page: req.pagination.page,
            limit: req.pagination.limit,
        },
        success: true,
        msg: "Data Fetched Successfully",
    })
}

const getUserBlogById = async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const blogId = getBlogId(req)

    const blog = await Blog.findOne({ _id: blogId, author: userId })
    if (!blog)
        throw new BadRequestError("Blog not found or you are not authorized")

    res.status(StatusCodes.OK).json({
        data: { blog },
        success: true,
        msg: "Blog Fetched Successfully",
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
    let blog = await Blog.findByIdAndDelete(blogId)
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
        success: true,
        msg: "Successfully updated blog.",
    })
}

const getTrendingBlogs = async (req: Request, res: Response) => {
    const cachedData = trendingCache.get("trendingPosts")
    if (cachedData) {
        return res.status(StatusCodes.OK).json({
            data: { blogs: cachedData },
            success: true,
            msg: "Data Fetched Successfully",
        })
    } else {
        //use one week ago date
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const trendingBlogs = await Blog.aggregate([
            { $match: { createdAt: { $gte: oneWeekAgo } } },
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
            data: { blogs: trendingBlogs },
            success: true,
            msg: "Data Fetched Successfully",
        })
    }
}
export {
    getBlogById,
    getTrendingBlogs,
    getRecommendedBlogs,
    getBlogByCategory,
    likeBlog,
    commentBlog,
    getUserBlogs,
    getUserBlogById,
    createBlog,
    deleteBlog,
    updateBlog,
}
