import { Router } from "express"
import { getUserProfile } from "../controllers/profile"
import authMiddleware from "../middleware/auth"

const router = Router()

router.get("/:userId", getUserProfile)

export default router
