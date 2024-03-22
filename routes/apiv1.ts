import { Router } from "express"
import AuthMiddleware from "../middleware/auth"
import AuthRouter from "./auth"
import BlogRouter from "./blog"
import UserRouter from "./user"
import AIRouter from "./ai"
import SearchRouter from "./search"
import ProfileRouter from "./profile"

const router = Router()

router.use("/auth", AuthRouter)
router.use("/blog", BlogRouter)
router.use("/search", SearchRouter)
router.use("/user", AuthMiddleware, UserRouter)
router.use("/public/profile", ProfileRouter)
router.use("/ai", AuthMiddleware, AIRouter)
//localhost:5000/api/v1/ai

export default router
