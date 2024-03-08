import { Router } from "express";
import {
	getUserBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
} from "../controllers/blogs";
import authMiddleware from "../middleware/auth";
import express from "express";

const router = Router();

router
	.use(authMiddleware)
	.route("/")
	.get(getUserBlogs)
	.post(createBlog)
	.delete(deleteBlog)
	.patch(updateBlog);

export default router;
