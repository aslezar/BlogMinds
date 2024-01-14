const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later.',
	};

	//Custom Error
	if (err instanceof CustomAPIError) {
		return res
			.status(customError.statusCode)
			.json({ success: false, msg: customError.msg, code: '001' });
	}

	//Mongoose Validation Error
	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	//Mongoose Duplicate Key Error
	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value.`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	//Mongoose Cast Error
	if (err.name === 'CastError') {
		customError.msg = `No item found with id : ${err.value}`;
		customError.statusCode = StatusCodes.NOT_FOUND;
	}
	console.log(err);
	return res
		.status(customError.statusCode)
		.json({ success: false, msg: customError.msg, code: '000' });
};

module.exports = errorHandlerMiddleware;
