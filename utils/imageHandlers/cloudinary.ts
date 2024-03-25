import { Request } from "express"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud: process.env.CLOUDINARY_URL,
    secure: true,
})

// upload image to cloudinary and return the url
const uploadProfileImage = async (req: Request) => {
    const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
            folder: "blogmind",
            public_id: `${req.user.userId}/profile`,
            overwrite: true,
            format: "webp",
        },
    )
    return result.secure_url
}

const uploadAssetsImages = async (req: Request) => {
    const files = req.files as Express.Multer.File[]
    const urls: string[] = []

    for (const file of files) {
        const originalName = file.originalname.split(".")[0] // remove original extension
        const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
                folder: "blogmind",
                public_id: `${req.user.userId}/${originalName}`,
                format: "webp",
            },
        )
        urls.push(result.secure_url)
    }
    return urls
}

export { uploadProfileImage, uploadAssetsImages }
