import { Router } from "express";
import {
	getUserBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
} from "../controllers/blogs";

const router = Router();

router.route("/").get(getUserBlogs).post(createBlog);
router.route("/:blogId").delete(deleteBlog).patch(updateBlog);

export default router;
