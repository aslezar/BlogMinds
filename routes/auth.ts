import { Router } from "express";
import { register, login, tokenLogin, signOut } from "../controllers/auth";
import authMiddleware from "../middleware/auth";

const router = Router();

router.route("/signup").post(register);
router.route("/signin").post(login);
router.route("/signin/token").post(tokenLogin);
router.route("/signout").post(authMiddleware, signOut);

export default router;
