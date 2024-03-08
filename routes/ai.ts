import { Router } from "express"
import authMiddleware from "../middleware/auth"
import {
    getTextSuggestion,
    getParaSuggestion,
    getImageSuggestionPrompt,
    getCoverImageSuggestion,
} from "../controllers/ai"

const router = Router()

router.route("/suggest/text").post(getTextSuggestion)
router.route("/suggest/para").post(getParaSuggestion)
router.route("/suggest/image").post(getImageSuggestionPrompt)
router.route("/suggest/cover-image").post(getCoverImageSuggestion)

export default router
