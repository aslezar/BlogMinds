import { Router } from "express"
import authMiddleware from "../middleware/auth"
import {
    getBlogByCategoty,
    getBlog,
    commentBlog,
    commentOnComment,
} from "../controllers/blogs"

const router = Router()

router.route("/category/:category").get(getBlogByCategoty)
router.route("/:blogId").get(getBlog)

router.use(authMiddleware)

router.route("/:blogId/comment").post(commentBlog)
router.route("/:blogId/comment/:commentId").post(commentOnComment)

export default router
