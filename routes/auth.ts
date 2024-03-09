import { Router } from "express"
import {
    register,
    login,
    verifyEmail,
    tokenLogin,
    signOut,
} from "../controllers/auth"
import authMiddleware from "../middleware/auth"

const router = Router()

router.route("/signup").post(register)
router.route("/signin").post(login)
router.route("/verify").post(verifyEmail)

router.use(authMiddleware)
router.route("/me").get(tokenLogin)
router.route("/signout").post(signOut)

export default router
