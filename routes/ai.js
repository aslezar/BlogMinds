const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
	getBlogs,
} = require("../controllers/ai");

router.route("/blogId").get(getBlogs);

module.exports = router;
