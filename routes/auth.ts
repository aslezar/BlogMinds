import { Router } from "express"
import {
    register,
    registerWithoutOtp,
    login,
    verifyEmail,
    tokenLogin,
    signOut,
} from "../controllers/auth"
import authMiddleware from "../middleware/auth"

const router = Router()

router.route("/signup").post(register)
if (process.env.NODE_ENV === "development") {
    router.route("/signup-without-otp").post(registerWithoutOtp)
}
router.route("/signin").post(login)
router.route("/verify").post(verifyEmail)
router.route("/signout").post(signOut)
router.route("/me").get(authMiddleware, tokenLogin)

export default router
