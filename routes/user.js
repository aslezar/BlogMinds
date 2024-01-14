const router = require("express").Router();
const upload = require("../multer");
const { updateName, updateBio, updateImage } = require("../controllers/user");

router.use("/blog", require("./userblog"));
router.route("/updatename").patch(updateName);
router.route("/updatebio").patch(updateBio);
router.route("/updateimage").patch(upload.single("profileImage"), updateImage);

module.exports = router;
