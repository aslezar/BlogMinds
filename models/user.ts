import { Schema, model, Types } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { IUser } from "../types/models"

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Please Provide Name."],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, "Please provide email."],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide valid email.",
            ],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide password."],
            minlength: 8,
        },
        bio: {
            type: String,
            maxlength: 150,
        },
        profileImage: {
            type: String,
            default:
                "https://res.cloudinary.com/blogmind/image/upload/v1709974103/blogmind/m7ndwlipeesy1jmab7la.png",
        },
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog",
            },
        ],
        myInterests: [
            {
                type: String,
            },
        ],
        readArticles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog",
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "inactive",
        },
        otp: {
            value: {
                type: String,
            },
            expires: {
                type: Date,
            },
        },
        myAssests: [
            {
                type: String,
                default: [],
            },
        ],
    },
    { timestamps: true },
)

UserSchema.index({ name: 1 })

const preSave = async function (this: any, next: (err?: Error) => void) {
    if (!this.isModified("password")) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(5)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error: any) {
        return next(error)
    }
}

UserSchema.pre("save", preSave)

UserSchema.methods.generateToken = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET as jwt.Secret,
        {
            expiresIn: process.env.JWT_LIFETIME,
        },
    )
}

UserSchema.methods.comparePassword = async function (pswrd: IUser["password"]) {
    const isMatch = await bcrypt.compare(pswrd, this.password)
    return isMatch
}
const User = model<IUser>("User", UserSchema)
export default User
