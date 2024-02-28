const mongoose = require("mongoose");
const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const axios = require("axios");
const fs = require("fs");

//UTITLIY FUNCTIONS

const checkId = (id) => {
	if (!mongoose.isValidObjectId(id)) throw new BadRequestError("Invalid ID");
	return id;
};
const getUserId = async (req) => {
	return checkId(req.user.userId);
};

//UTILITY FUNCTIONS END

const getTextSuggestion = async (req, res) => {
	const text = req.body.text;
	// const userId = getUserId(req);

	const response = await fetch(
		"https://api-inference.huggingface.co/models/google/gemma-7b",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
			},
			body: JSON.stringify({
				inputs: text,
			}),
			redirect: "follow",
		}
	);
	//if statusText is not ok, throw error
	if (response.statusText !== "OK")
		throw new Error(`API Error: ${response.statusText}`);

	const data = await response.json();
	const generated_text = data[0].generated_text;

	res.status(StatusCodes.OK).json({
		data: generated_text,
		success: true,
		// msg: "Data Fetched Successfully",
		msg: "This route is not implemented yet.",
	});
};
const getParaSuggestion = async (req, res) => {
	const para = req.body.paragraph;
	const userId = getUserId(req);

	res.status(StatusCodes.OK).json({
		data: { paragraph: para },
		success: true,
		// msg: "Data Fetched Successfully",
		msg: "This route is not implemented yet.",
	});
};
const getImageSuggestionPrompt = async (req, res) => {
	const prompt = req.body.prompt;
	// const userId = getUserId(req);

	const response = await axios({
		url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
		method: "post",
		headers: {
			Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
		},
		data: JSON.stringify({
			inputs: prompt,
		}),
		responseType: "stream",
	});

	if (response.statusText !== "OK")
		throw new Error(`API Error: ${response.statusText}`);

	//set headers
	res.set(response.headers);
	response.data.pipe(res);

	// res.status(StatusCodes.OK).json({
	// 	data: { prompt: prompt },
	// 	success: true,
	// 	// msg: "Data Fetched Successfully",
	// 	msg: "This route is not implemented yet.",
	// });
};
const getCoverImageSuggestion = async (req, res) => {
	const titlePrompt = req.body.titlePrompt;
	const userId = getUserId(req);

	res.status(StatusCodes.OK).json({
		data: { titlePrompt: titlePrompt },
		success: true,
		// msg: "Data Fetched Successfully",
		msg: "This route is not implemented yet.",
	});
};

module.exports = {
	getTextSuggestion,
	getParaSuggestion,
	getImageSuggestionPrompt,
	getCoverImageSuggestion,
};
