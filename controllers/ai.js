const mongoose = require("mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");


const getBlogs = async (req, res) => {
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

module.exports = {
	getBlogs,
};
