const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/blog", require("./blog"));
router.use("/user", require("../middleware/auth"), require("./user"));

module.exports = router;
