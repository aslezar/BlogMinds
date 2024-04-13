import { Request, Response, NextFunction } from "express"
import { UnauthenticatedError } from "../errors"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { BadRequestError } from "../errors"
import { UserPayload } from "../types/express"

interface TempUserPayload {
    userId: string
}

const getId = (id: string) => {
    try {
        return new mongoose.Types.ObjectId(id)
    } catch (e) {
        throw new BadRequestError("Id is not a valid Object")
    }
}

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer")) {
        throw new UnauthenticatedError("Authentication Invalid")
    }
    const token = header.split(" ")[1]
    const tempUserPayload = jwt.verify(
        token,
        process.env.JWT_SECRET as jwt.Secret,
    ) as TempUserPayload
    const userPayload: UserPayload = {
        userId: getId(tempUserPayload.userId),
    }
    // Type assertion to convert req object to Request
    ;(req as Request).user = userPayload
    next()
}

export default authenticate
