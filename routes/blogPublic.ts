import { Router } from "express"
import {
    getBlogById,
    getTrendingBlogs,
    getOtherUserBlogs,
    getRecommendedBlogs,
    getBlogByCategory,
} from "../controllers/blogs"

const router = Router()

router.route("/trending").get(getTrendingBlogs)
router.route("/recommended").get(getRecommendedBlogs)
router.route("/category").get(getBlogByCategory)
router.route("/:blogId").get(getBlogById)
router.route("/blogsByUser/:userId").get(getOtherUserBlogs)

export default router
