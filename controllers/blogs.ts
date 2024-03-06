import mongoose, { Types, Schema } from "mongoose";
import User from "../models/user";
import Blog from "../models/blog";
import Comment from "../models/comment";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { Request, Response } from "express";
import { IBlog } from "../types/models";

//UTITLIY FUNCTIONS

//Remember: You can not throw error in non-async function
//why? because it will not be caught by the error handling middleware

const getId = (id: string) => {
	try {
		// const mongoId = new mongoose.Types.ObjectId(id);
		const mongoId = new mongoose.Schema.Types.ObjectId(id);
		return mongoId;
	} catch (e) {
		throw new BadRequestError("Invalid Blog Id");
	}
};

const getBlogId = (req: Request) => {
	return getId(req.params.blogId);
};
const getCommentId = (req: Request) => {
	return getId(req.params.commentId);
};

const getUserId = (req: Request) => {
	return req.user.userId;
};

//UTILITY FUNCTIONS END

const getBlogByCategoty = async (req: Request, res: Response) => {
	const category = req.params.category;
	// tag is array of category field, and category is a string
	const blogs = await Blog.find({ tags: { $in: [category] } }).select(
		"title description img author"
	);
	if (!blogs) {
		throw new BadRequestError("No blogs found");
	}
	res.status(StatusCodes.OK).json({
		data: { blogs },
		success: true,
		msg: "Data Fetched Successfully",
	});
};

const getBlog = async (req: Request, res: Response) => {
	const blogId = getBlogId(req);

	const blog: IBlog | null = await Blog.findById(blogId);
	if (!blog) {
		throw new BadRequestError("Blog not found");
	}
	res.status(StatusCodes.OK).json({
		data: { blog },
		success: true,
		msg: "Blog Fetched Successfully",
	});
};

const commentBlog = async (req: Request, res: Response) => {
	const userId = getUserId(req);
	const blogId = getBlogId(req);

	const { message } = req.body;
	if (!message) {
		throw new BadRequestError("Message is required");
	}
	const comment = await Comment.create({
		message,
		author: userId,
	});
	const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
		$push: { comments: comment },
	});
	if (!updatedBlog) {
		throw new BadRequestError("Error commenting on blog");
	}
	res.status(StatusCodes.OK).json({
		success: true,
		msg: "Commented Successfully",
	});
};

const commentOnComment = async (req: Request, res: Response) => {
	const userId = getUserId(req);
	// const commentId: Types.ObjectId = await checkId(req.body.commentId);
	const commentId = getCommentId(req);
	const { message } = req.body;

	if (!message) {
		throw new BadRequestError("Message is required");
	}
	const comment = await Comment.create({
		message,
		author: userId,
	});
	const updatedcomment = await Comment.findByIdAndUpdate(commentId, {
		$push: { comments: comment },
	});
	if (!updatedcomment) {
		await comment.deleteOne();
		throw new BadRequestError("Error commenting on comment");
	}
	res.status(StatusCodes.OK).json({
		success: true,
		msg: "Commented Successfully",
	});
};

const getUserBlogs = async (req: Request, res: Response) => {
	//populate title description content img author
	const userId = getUserId(req);
	const userBlogs = await User.findById(userId).select("blogs").populate({
		path: "blogs",
		select: "title description img",
	});

	if (!userBlogs) {
		throw new UnauthenticatedError("User Not Found");
	}
	res.status(StatusCodes.OK).json({
		data: { blogs: userBlogs.blogs },
		success: true,
		msg: "Data Fetched Successfully",
	});
};

const createBlog = async (req: Request, res: Response) => {
	const userId = getUserId(req);
	const { title, description, content, img } = req.body;
	if (!title || !description || !content) {
		throw new BadRequestError("Please provide all details");
	}

	const blog = await Blog.create({
		title,
		description,
		content,
		img,
		author: userId,
	});
	if (!blog) {
		throw new BadRequestError("Error creating blog");
	}
	const user = await User.findByIdAndUpdate(userId, {
		$push: { blogs: blog._id },
	});
	res.status(StatusCodes.CREATED).json({
		data: { blog },
		success: true,
		msg: "Blog Created Successfully",
	});
};

const deleteBlog = async (req: Request, res: Response) => {
	const userId = getUserId(req);
	const blogId = getBlogId(req);

	const userBlogs = await User.findById(userId).select("blogs");
	if (!userBlogs) {
		throw new UnauthenticatedError("User Not Found");
	}
	const blogIndex = userBlogs.blogs.indexOf(blogId);

	if (blogIndex === -1) {
		return res.status(404).json({ error: "Blog not found in user blogs." });
	}

	//delete blog
	let blog: IBlog | null = await Blog.findByIdAndDelete(blogId);
	if (!blog) {
		throw new BadRequestError("Error deleting blog");
	}

	//delete blog from user blogs
	userBlogs.blogs.splice(blogIndex, 1);

	await userBlogs.save();
	res.status(StatusCodes.OK).json({
		success: true,
		msg: `Successfully deleted blog.`,
	});
};

const updateBlog = async (req: Request, res: Response) => {
	const userId = getUserId(req);
	const blogId = getBlogId(req);
	const { title, description, content, img } = req.body;

	const userBlogs = await User.findOne({ _id: userId, blogs: blogId });
	if (!userBlogs) {
		throw new UnauthenticatedError(
			"You are not authorized to update this blog"
		);
	}

	//update blog
	const blog = await Blog.findByIdAndUpdate(
		blogId,
		{ title, description, content, img },
		{ new: true }
	);
	if (!blog) {
		throw new BadRequestError("Error updating blog");
	}

	res.status(StatusCodes.OK).json({
		data: { blog },
		success: true,
		msg: `Successfully updated blog.`,
	});
};
export {
	getBlogByCategoty,
	getBlog,
	commentBlog,
	commentOnComment,
	getUserBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
};
