import { CustomAPIError } from "../errors"
import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const errorHandlerMiddleware = (
    // err can be instance of Error or CustomAPIError or mongoose error
    err: Error | CustomAPIError | mongoose.Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (process.env.NODE_ENV === "development")
        console.error("ERROR: " + err.message)

    //These all are known error that why there is no need to log them

    // Custom Error
    if (err instanceof CustomAPIError) {
        // console.log(err)
        return res
            .status(err.statusCode)
            .json({ success: false, msg: err.message })
    }

    //JWT error
    if (err instanceof jwt.JsonWebTokenError) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                msg: "Session Expired. Please login again.",
            })
        }
        if (err instanceof jwt.NotBeforeError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                msg: "Login Expired. Please login again.",
            })
        }
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ success: false, msg: "Not authorized" })
    }

    // Handle CastError, ValidationError, ValidatorError separately
    if (err instanceof mongoose.Error.CastError) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            msg: `No item found with id : ${err.value}`,
        })
    }
    if (err instanceof mongoose.Error) {
        if (err instanceof mongoose.Error.ValidationError) {
            const messages = Object.values(err.errors)
                .map((item) => item.message)
                .join("\n")
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, msg: messages })
        } else if (
            err instanceof mongoose.Error.DocumentNotFoundError ||
            err instanceof mongoose.Error.DivergentArrayError ||
            err instanceof mongoose.Error.MissingSchemaError ||
            err instanceof mongoose.Error.MongooseServerSelectionError ||
            err instanceof mongoose.Error.OverwriteModelError ||
            err instanceof mongoose.Error.ParallelSaveError ||
            err instanceof mongoose.Error.StrictModeError ||
            err instanceof mongoose.Error.StrictPopulateError ||
            err instanceof mongoose.Error.VersionError
        ) {
            console.log(err)
            //Heavy error occured
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ success: false, msg: "Mongoose error: " + err.message })
        } else {
            console.log(err)
            //Unknown error occured
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Mongoose error: Something went wrong",
            })
        }
    }

    // Multer Error
    if (err.name === "MulterError") {
        // console.log(err.code)

        if (err.message === "File too large") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                msg: "File size is too large. Max limit is 4MB",
            })
        }
        console.log(err)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ success: false, msg: "Multer error: " + err.message })
    }

    //Unknown error occured, log it
    console.log(err)

    //Internal Server Error
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, msg: "Something went wrong" })
}

export default errorHandlerMiddleware
