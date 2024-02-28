const router = require("express").Router();
const {
	getUserBlogs,
	createBlog,
	deleteBlog,
	updateBlog,
} = require("../controllers/blogs");

router.route("/").get(getUserBlogs).post(createBlog).delete(deleteBlog).patch(updateBlog);
// router.route("/update").patch(updateBlog);

module.exports = router;
