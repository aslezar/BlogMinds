const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
	getBlog,
	commentBlog,
	commentOnComment,
} = require("../controllers/blogs");

router.route("/:blogId").get(getBlog);
router.route("/:blogId/comment").post(authMiddleware, commentBlog);
router
	.route("/:blogId/comment/:commentId")
	.post(authMiddleware, commentOnComment);

module.exports = router;
