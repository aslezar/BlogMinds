import {isValidObjectId, Types} from "mongoose";
import User from "../models/user";
import Blog from "../models/blog";
import Comment from "../models/comment";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { AuthenticatedRequest } from "../types/express";
import { IBlog } from "../types/models";

const checkId = async (id:Types.ObjectId) => {
	if (!isValidObjectId(id))
		throw new BadRequestError("Invalid ID");
	return id;
};

const getBlogId = async (req:AuthenticatedRequest) => {
	let blogId:unknown = req.params.blogId;
	return await checkId(blogId as Types.ObjectId);
};

const getUserId = async (req:AuthenticatedRequest) => {
	return await checkId(req.user.userId);
};

const getBlogByCategoty = async (req:AuthenticatedRequest, res:Response) => {
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

const getBlog = async (req:AuthenticatedRequest, res:Response) => {
	const blogId = await getBlogId(req);

	const blog = null;
	// const blog = await Blog.findById(blogId);
	if (!blog) {
		throw new BadRequestError("Blog not found");
	}
	res.status(StatusCodes.OK).json({
		data: { blog },
		success: true,
		msg: "Blog Fetched Successfully",
	});
};

const commentBlog = async (req:AuthenticatedRequest, res:Response) => {
	const userId = await getUserId(req);
	const blogId = await getBlogId(req);

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

const commentOnComment = async (req:AuthenticatedRequest, res:Response) => {
	const userId = await getUserId(req);
	const commentId = await checkId(req.body.commentId);
	const { message } = req.body;

	if (!message) {
		throw new BadRequestError("Message is required");
	}
	const comment = await Comment.create({
		message,
		author: userId,
	});
	const updatedcomment = await findByIdAndUpdate(commentId, {
		$push: { comments: comment },
	});
	if (!updatedcomment) {
		await comment.remove();
		throw new BadRequestError("Error commenting on comment");
	}
	res.status(StatusCodes.OK).json({
		success: true,
		msg: "Commented Successfully",
	});
};

const getUserBlogs = async (req:AuthenticatedRequest, res:Response) => {
	//populate title description content img author
	const userId = await getUserId(req);
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

const createBlog = async (req:AuthenticatedRequest, res:Response) => {
	const { userId } = req.user;
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

const deleteBlog = async (req:AuthenticatedRequest, res:Response) => {
	const userId = await getUserId(req);
	const blogId = await getBlogId(req);

	const userBlogs = await User.findById(userId).select("blogs");
	if (!userBlogs) {
		throw new UnauthenticatedError("User Not Found");
	}
	const blogIndex = userBlogs.blogs.indexOf(blogId);

	if (blogIndex === -1) {
		return res.status(404).json({ error: "Blog not found in user blogs." });
	}

	//delete blog
	let blog:IBlog|null = await Blog.findByIdAndDelete(blogId);
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

const updateBlog = async (req:AuthenticatedRequest, res:Response) => {
	const { userId } = req.user;
	const blogId = await getBlogId(req);
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

module.exports = {
	getBlogByCategoty,
	getBlog,
	commentBlog,
	commentOnComment,
	getUserBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
};
