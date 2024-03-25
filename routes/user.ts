import { Router } from "express"
import upload from "../utils/imageHandlers/multer"
import {
    updateName,
    updateBio,
    updateImage,
    getAllAssests,
} from "../controllers/user"
import userblogRouter from "./userblog"

const router = Router()

router.use("/blog", userblogRouter)
router.patch("/name", updateName)
router.patch("/bio", updateBio)
router.patch("/image", upload.single("profileImage"), updateImage)

router.route("/assets").get(getAllAssests)

export default router
