const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
	getBlogByCategoty,
	getBlog,
	commentBlog,
	commentOnComment,
} = require("../controllers/blogs");

router.route("/category/:category").get(getBlogByCategoty);
router.route("/:blogId").get(getBlog);
router.route("/:blogId/comment").post(authMiddleware, commentBlog);
router
	.route("/:blogId/comment/:commentId")
	.post(authMiddleware, commentOnComment);

module.exports = router;
