import { Router } from "express"
import { getUserProfile } from "../controllers/profile"

const router = Router()

router.get("/:userId", getUserProfile)

export default router
