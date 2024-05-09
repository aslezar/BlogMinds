import { Router } from "express"
import {
    register,
    login,
    continueWithGoogle,
    verifyEmail,
    tokenLogin,
    signOut,
    forgotPasswordSendOtp,
    forgotPasswordVerifyOtp,
} from "../controllers/auth"
import authMiddleware from "../middleware/auth"

const router = Router()

router.route("/sign-up").post(register)
router.route("/sign-in").post(login)
router.route("/sign-in/google").post(continueWithGoogle)
router.route("/forgot-password/send-otp").post(forgotPasswordSendOtp)
router.route("/forgot-password/verify-otp").post(forgotPasswordVerifyOtp)
router.route("/verify").post(verifyEmail)
router.route("/sign-out").post(signOut)
router.route("/me").get(authMiddleware, tokenLogin)

export default router
