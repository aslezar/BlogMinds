"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
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
        data: Buffer,
        contentType: String,
    },
    blogs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
}, { timestamps: true });
// UserSchema.pre("save", async function (next: Express.NextFunction) {
// 	if (!this.isModified("password")) {
// 		return next(); // If password field is not modified, move to the next middleware
// 	}
// 	try {
// 		const salt = await bcrypt.genSalt(10);
// 		this.password = await bcrypt.hash(this.password, salt);
// 		next();
// 	} catch (error) {
// 		return next(error);
// 	}
// });
UserSchema.methods.generateToken = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
UserSchema.methods.comparePassword = async function (pswrd) {
    const isMatch = await bcryptjs_1.default.compare(pswrd, this.password);
    return isMatch;
};
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
