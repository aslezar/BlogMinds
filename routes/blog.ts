import { Router } from "express"
import authMiddleware from "../middleware/auth"
import {
    getBlogById,
    getTrendingBlogs,
    getBlogByCategory,
    likeBlog,
    commentBlog,
} from "../controllers/blogs"

const router = Router()

router.route("/trending").get(getTrendingBlogs)
router.route("/category/:category").get(getBlogByCategory)
router.route("/:blogId").get(getBlogById)

router.use(authMiddleware)

router.route("/:blogId/like").post(likeBlog)
router.route("/:blogId/comment").post(commentBlog)

export default router
