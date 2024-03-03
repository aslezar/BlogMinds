import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";

const authenticate = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer")) {
		throw new UnauthenticatedError("Authentication Invalid");
	}
	const token = header.split(" ")[1];
	try {
		const payload: jwt.JwtPayload = jwt.verify(
			token,
			process.env.JWT_SECRET as jwt.Secret
		) as jwt.JwtPayload;
		req.user = {
			userId: payload.userId,
		};
		next();
	} catch (error) {
		throw new UnauthenticatedError("Invalid Token");
	}
};

export default authenticate;
