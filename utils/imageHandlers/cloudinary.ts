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
        },
    )
    return result.secure_url
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

export { uploadProfileImage, uploadAssetsImages }
