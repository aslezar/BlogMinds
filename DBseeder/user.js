const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var UserSchema = new mongoose.Schema(
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
            default: "https://placeholder.com/150",
        },
        blogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Blog",
            },
        ],
    },
    { timestamps: true },
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next() // If password field is not modified, move to the next middleware
    }

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        return next(error)
    }
})

UserSchema.methods.generateToken = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

UserSchema.methods.comparePassword = async function (pswrd) {
    const isMatch = await bcrypt.compare(pswrd, this.password)
    return isMatch
}

module.exports = new mongoose.model("User", UserSchema)
