import { Router } from "express";
import authMiddleware from "../middleware/auth";
import {
	getBlogByCategoty,
	getBlog,
	commentBlog,
	commentOnComment,
} from "../controllers/blogs";

const router = Router();

router.route("/category/:category").get(getBlogByCategoty);
router.route("/:blogId").get(getBlog);
router.route("/:blogId/comment").post(authMiddleware, commentBlog);
router
	.route("/:blogId/comment/:commentId")
	.post(authMiddleware, commentOnComment);

export default router;
