import { Router } from "express"
import authMiddleware from "../middleware/auth"
import { getTextSuggestion, getImageSuggestionPrompt } from "../controllers/ai"

const router = Router()

router.route("/suggest/text").get(getTextSuggestion)
router.route("/suggest/image").get(getImageSuggestionPrompt)

export default router
