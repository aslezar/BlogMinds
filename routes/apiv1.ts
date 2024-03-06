import { Router } from "express";
import AuthRouter from "./auth";
import BlogRouter from "./blog";
import UserRouter from "./user";
import AIRouter from "./ai";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/blog", BlogRouter);
router.use("/user", UserRouter);
router.use("/ai", AIRouter);
//localhost:5000/api/v1/ai

export default router;
