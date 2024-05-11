import { Router } from "express"
import AuthMiddleware from "../middleware/auth"
import AuthRouter from "./auth"
import BlogPublicRouter from "./blogPublic"
import BlogUpdateRouter from "./blogUpdate"
import UserRouter from "./user"
import AIRouter from "./ai"
import SearchRouter from "./search"
import ProfileRouter from "./profile"

const router = Router()

router.use("/auth", AuthRouter)

router.use("/public/search", SearchRouter)
router.use("/public/profile", ProfileRouter)
router.use("/public/blog", BlogPublicRouter)

router.use(AuthMiddleware)

router.use("/blog", BlogUpdateRouter)
router.use("/user", UserRouter)
router.use("/ai", AIRouter)

export default router
