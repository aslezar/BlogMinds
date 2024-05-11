import { Router } from "express"
import { likeBlog, commentBlog } from "../controllers/blogs"

const router = Router()

router.route("/like/:blogId").post(likeBlog)
router.route("/comment/:blogId").post(commentBlog)

export default router
