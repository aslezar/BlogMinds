const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
	getTextSuggestion,
	getParaSuggestion,
	getImageSuggestionPrompt,
	getCoverImageSuggestion,
} = require("../controllers/ai");

router.route("/suggest/text").post(getTextSuggestion);
router.route("/suggest/para").post(getParaSuggestion);
router.route("/suggest/image").post(getImageSuggestionPrompt);
router.route("/suggest/cover-image").post(getCoverImageSuggestion);

module.exports = router;
