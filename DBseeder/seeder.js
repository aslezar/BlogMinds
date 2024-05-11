// Import required libraries
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const BlogModel = require("./blog")
const UserModel = require("./user")
const CommentModel = require("./comment")

const { blogData, userData, commentData } = require("./dataGenerator")

dotenv.config("../.env")

const serverSelectionTimeoutMS =
    Number(process.env.SERVER_SELECTION_TIMEOUT_MS) || 5000
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS,
    })
    .then(seeder)
    .catch((err) => console.error("Error connecting to MongoDB:", err))

console.log(new Date().toLocaleString())

async function seeder() {
    console.log("Connected to MongoDB")

    await userSeeder()
    await commentSeeder()
    await blogSeeder()

    mongoose.connection.close()
}

async function blogSeeder() {
    try {
        await BlogModel.deleteMany({})
        console.log("Old blog data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old blog data:", error.message)
    }
    try {
        await BlogModel.insertMany(blogData)
        console.log("All blog data inserted successfully.")
    } catch (error) {
        console.error("Error inserting blog data:", error.message)
    }
}

async function userSeeder() {
    try {
        await UserModel.deleteMany({})
        console.log("Old user data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old user data:", error)
    }
    try {
        await UserModel.insertMany(userData)
        console.log("All user data inserted successfully.")
    } catch (error) {
        console.error("Error inserting user data:", error.message)
    }
}
async function commentSeeder() {
    try {
        await CommentModel.deleteMany({})
        console.log("Old comment data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old comment data:", error.message)
    }
    try {
        await CommentModel.insertMany(commentData)
        console.log("All comment data inserted successfully.")
    } catch (error) {
        console.error("Error inserting comment data:", error.message)
    }
}
