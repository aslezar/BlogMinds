import { Router } from "express"
import upload from "../utils/imageHandlers/multer"
import {
    // getMyProfile,
    updateCompleteProfile,
    updateProfileImage,
    deleteProfileImage,
    getAllAssets,
    uploadAssets,
    deleteAsset,
    followUnfollowUser,
    isFollowing,
} from "../controllers/user"
import userBlogRouter from "./userBlog"

const router = Router()

// router.get("/my-profile", getMyProfile)
router.use("/blog", userBlogRouter)
router.patch("/update-profile", updateCompleteProfile)
router
    .route("/image")
    .patch(upload.single("profileImage"), updateProfileImage)
    .delete(deleteProfileImage)
router
    .route("/assets")
    .get(getAllAssets)
    .post(upload.array("assetFiles", 5), uploadAssets)
    .delete(deleteAsset)
router.post("/follow-unfollow", followUnfollowUser)
router.get("/is-following", isFollowing)

export default router
