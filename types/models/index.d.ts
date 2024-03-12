import { Schema, Types, Model } from "mongoose"

export interface IBlog {
    title: string
    description: string
    content: string
    img?: string
    author: Schema.Types.ObjectId
    tags: Types.Array<string>
    views: number
    likes: Types.Array<Schema.Types.ObjectId>
    likesCount: number
    comments: Types.Array<Schema.Types.ObjectId>
    commentsCount: number
    createdAt: Date
    updatedAt: Date
}

export interface IComment {
    message: string
    author: Types.ObjectId
    comments?: Types.Array<Schema.Types.ObjectId>
    createdAt?: Date
    updatedAt?: Date
}

export interface OTP {
    value: string
    expires: Date
}

export interface IUser {
    _id?: Types.ObjectId
    name: string
    email: string
    password: string
    bio?: string
    profileImage: string
    blogs: Types.Array<Schema.Types.ObjectId>
    myInterests: Types.Array<string>
    readArticles: Types.Array<Schema.Types.ObjectId>
    following: Types.Array<Schema.Types.ObjectId>
    followers: Types.Array<Schema.Types.ObjectId>
    createdAt: Date
    updatedAt: Date
    status: string
    otp: OTP | undefined
    isModified: (field: string) => boolean
    generateToken: () => string
    comparePassword: (pswrd: string) => boolean
    compareOtp: (otp: OTP) => boolean
}
