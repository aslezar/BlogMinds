import { Router } from "express"
import upload from "../utils/imageHandlers/multer"
import {
    getMyProfile,
    updateCompleteProfile,
    updateName,
    updateBio,
    updateProfileImage,
    deleteProfileImage,
    getAllAssests,
    uploadAssets,
    deleteAssest,
    followUnfollowUser,
} from "../controllers/user"
import userblogRouter from "./userblog"

const router = Router()

router.get("/my-profile", getMyProfile)
router.use("/blog", userblogRouter)
router.patch("/update-profile", updateCompleteProfile)
router.patch("/name", updateName)
router.patch("/bio", updateBio)
router
    .route("/image")
    .patch(upload.single("profileImage"), updateProfileImage)
    .delete(deleteProfileImage)
router
    .route("/assets")
    .get(getAllAssests)
    .post(upload.array("assetFiles", 5), uploadAssets)
    .delete(deleteAssest)
router.post("/follow-unfollow", followUnfollowUser)

export default router
