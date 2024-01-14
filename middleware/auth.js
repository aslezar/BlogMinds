const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticate = (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
	const token = header.split(' ')[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = {
			userId: payload.userId,
		};
		next();
	} catch (error) {
		throw new UnauthenticatedError('Invalid Token');
	}
};

module.exports = authenticate;
