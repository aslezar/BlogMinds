import { Router } from "express"
import upload from "../utils/imageHandlers/multer"
import {
    updateName,
    updateBio,
    updateImage,
    getAllAssests,
    uploadAssets,
    deleteAssest,
} from "../controllers/user"
import userblogRouter from "./userblog"

const router = Router()

router.use("/blog", userblogRouter)
router.patch("/name", updateName)
router.patch("/bio", updateBio)
router.patch("/image", upload.single("profileImage"), updateImage)

router
    .route("/assets")
    .get(getAllAssests)
    .post(upload.array("assetFiles", 5), uploadAssets)
    .delete(deleteAssest)

export default router
