import { Response, Request } from "express"
import mongoose from "mongoose"

export interface UserPayload {
    userId: mongoose.Schema.Types.ObjectId
}

declare global {
    namespace Express {
        export interface Request {
            user: UserPayload
            file: any
            pagination: {
                skip: number
                limit: number
                page: number
            }
        }
    }
}
