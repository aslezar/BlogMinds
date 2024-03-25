import { Request } from "express"
import { v2 as cloudinary } from "cloudinary"
import { v4 as uuidv4 } from "uuid"
cloudinary.config({
    cloud: process.env.CLOUDINARY_URL,
    secure: true,
})

// upload image to cloudinary and return the url
const uploadProfileImage = async (req: Request) => {
    const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
            folder: `blogmind/${req.user.userId}`,
            public_id: "profile",
            overwrite: true,
            format: "webp",
            invalidate: true,
            width: 400,
            height: 400,
        },
    )
    return result.secure_url
}
const deleteProfileImage = async (userId: string): Promise<boolean> => {
    const result = await cloudinary.uploader.destroy(
        `blogmind/${userId}/profile`,
        { invalidate: true },
        (error, result) => {
            if (error) return false
            if (result.result === "ok") return true
            return false
        },
    )
    return result
}

const uploadAssetsImages = async (req: Request) => {
    const files = req.files as Express.Multer.File[]
    const urls: string[] = []

    for (const file of files) {
        const originalName = file.originalname.split(".")[0] + "_" + uuidv4()
        const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
                folder: `blogmind/${req.user.userId}`,
                public_id: originalName,
                overwrite: false,
                format: "webp",
            },
        )

        urls.push(result.secure_url)
    }
    return urls
}
const deleteAssestImages = async (public_id: string): Promise<boolean> => {
    const res = await cloudinary.uploader.destroy(
        public_id,
        { invalidate: true },
        (error, result) => {
            if (error) return false
            if (result.result === "ok") return true
            return false
        },
    )
    return res
}

export {
    uploadProfileImage,
    deleteProfileImage,
    uploadAssetsImages,
    deleteAssestImages,
}
