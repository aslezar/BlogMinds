import { Router } from "express"
import {
    getUserBlogs,
    getUserBlogById,
    createBlog,
    deleteBlog,
    updateBlog,
} from "../controllers/blogs"

const router = Router()

router.route("/").get(getUserBlogs).post(createBlog)
router
    .route("/:blogId")
    .get(getUserBlogById)
    .delete(deleteBlog)
    .patch(updateBlog)

export default router
