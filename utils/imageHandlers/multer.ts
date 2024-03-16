import multer, { MulterError } from "multer"
import { Request } from "express"

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
// Define a function to control which files are accepted
const fileFilter = function (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) {
    if (allowedFileTypes.includes(file.mimetype)) cb(null, true)
    else cb(new MulterError("LIMIT_UNEXPECTED_FILE"))
}

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 4 * 1024 * 1024, // 4 MB limit
    },
})

export default upload
