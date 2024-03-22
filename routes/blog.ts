import { Router } from "express"
import authMiddleware from "../middleware/auth"
import {
    getBlogById,
    getTrendingBlogs,
    getRecommendedBlogs,
    getBlogByCategory,
    likeBlog,
    commentBlog,
} from "../controllers/blogs"

const router = Router()

router.route("/trending").get(getTrendingBlogs)
router.route("/recommended").get(getRecommendedBlogs)
router.route("/category").get(getBlogByCategory)
router.route("/:blogId").get(getBlogById)

router.use(authMiddleware)

router.route("/:blogId/like").patch(likeBlog)
router.route("/:blogId/comment").post(commentBlog)

export default router
