const mongoose = require("mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const checkId = (id) => {
	if (!mongoose.isValidObjectId(id)) throw new BadRequestError("Invalid ID");
	return id;
};
const getBlogId = async (req) => {
	return checkId(req.body.blogId);
};
const getUserId = async (req) => {
	return checkId(req.user.userId);
};

const getBlogByCategoty = async (req, res) => {
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

const getBlog = async (req, res) => {
	const blogId = getBlogId(req);

	const blog = await Blog.findById(blogId);
	if (!blog) {
		throw new BadRequestError("Blog not found");
	}
	res.status(StatusCodes.OK).json({
		data: { blog },
		success: true,
		msg: "Blog Fetched Successfully",
	});
};
const commentBlog = async (req, res) => {
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
const commentOnComment = async (req, res) => {
	const userId = getUserId(req);
	const commentId = checkId(req.body.commentId);
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

const getUserBlogs = async (req, res) => {
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

const createBlog = async (req, res) => {
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

const deleteBlog = async (req, res) => {
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
	const Blog = await Blog.findByIdAndDelete(blogId);
	if (!Blog) {
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
const updateBlog = async (req, res) => {
	const { userId } = req.user;
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
