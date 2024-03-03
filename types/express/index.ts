import { Request } from "express";
import mongoose from "mongoose";

export interface UserPayload {
	userId: mongoose.Types.ObjectId;
}

export interface AuthenticatedRequest extends Request {
	user: UserPayload;
}
