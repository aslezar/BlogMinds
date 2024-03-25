import { Request } from "express"
import { v2 as cloudinary } from "cloudinary"
import sharp from "sharp"

// configure cloudinary
//config cloudinary using url
// cloudinary.config({
cloudinary.config({
    cloud: process.env.CLOUDINARY_URL,
    secure: true,
})

// upload image to cloudinary and return the url
const uploadProfileImage = async (req: Request) => {
    const webpImg = await sharp(req.file.buffer)
        .webp({ quality: 80 })
        .toBuffer()

    //delete prev image if exists
    // const prevImg = await cloudinary.search
    //     .expression(`folder:blogmind/${req.user.userId}/profile`)
    //     .execute()
    // if (prevImg.resources.length > 0) {
    //     await cloudinary.uploader.destroy(prevImg.resources[0].public_id)
    // }

    const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${webpImg.toString("base64")}`,
        {
            folder: "blogmind",
            public_id: `${req.user.userId}/profile`,
            overwrite: true,
        },
    )
    return result.secure_url
}

const uploadAssetsImages = async (req: Request) => {
    const files = req.files as Express.Multer.File[]
    const urls: string[] = []

    for (const file of files) {
        const webpImg = await sharp(file.buffer)
            .webp({ quality: 80 })
            .toBuffer()

        const originalName = file.originalname.split(".")[0] // remove original extension
        const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${webpImg.toString("base64")}`,
            {
                folder: "blogmind",
                public_id: `${req.user.userId}/${originalName}`,
            },
        )
        urls.push(result.secure_url)
    }
    return urls
}

export { uploadProfileImage, uploadAssetsImages }
