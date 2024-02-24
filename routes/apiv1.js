const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/blog", require("./blog"));
router.use("/user", require("../middleware/auth"), require("./user"));
router.use("/ai", require("./ai"));
//localhost:5000/api/v1/ai

module.exports = router;
