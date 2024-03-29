import { Request, Response, NextFunction } from "express"
import { UnauthenticatedError } from "../errors"
import jwt from "jsonwebtoken"
import { UserPayload } from "../types/express"

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
    const userPayload = jwt.verify(
        token,
        process.env.JWT_SECRET as jwt.Secret,
    ) as UserPayload

    // Type assertion to convert req object to Request
    ;(req as Request).user = userPayload
    next()
}

export default authenticate
