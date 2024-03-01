import { Router } from "express";
import {
	getUserBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
} from "../controllers/blogs";

const router = Router();

router
	.route("/")
	.get(getUserBlogs)
	.post(createBlog)
	.delete(deleteBlog)
	.patch(updateBlog);
// router.route("/update").patch(updateBlog);

export default router;
