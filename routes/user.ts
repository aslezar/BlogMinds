import { Router } from "express";
import upload from "../multer";
import { updateName, updateBio, updateImage } from "../controllers/user";
import userblogRouter from "./userblog";

const router = Router();

router.use("/blog", userblogRouter);
router.patch("/updatename", updateName);
router.patch("/updatebio", updateBio);
router.patch("/updateimage", upload.single("profileImage"), updateImage);

export default router;
