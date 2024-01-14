const router = require("express").Router();
const {
	getBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
} = require("../controllers/blogs");

router.route("/").get(getBlogs).post(createBlog).delete(deleteBlog);
router.route("/update").patch(updateBlog);

module.exports = router;
