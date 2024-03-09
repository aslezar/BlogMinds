// Import required libraries
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("Connected to MongoDB")
        await userSeeder()
        await blogSeeder()
        process.exit()
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err))

async function blogSeeder() {
    const BlogModel = require("./blog")
    const blogData = require("./blogData")
    console.log(blogData)
    //delete old data
    try {
        await BlogModel.deleteMany({})
        console.log("Old blog data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old blog data:", error)
    }
    try {
        for (const blog of blogData) {
            const newBlog = await BlogModel.create(blog)
            console.log("Blog data inserted:", newBlog)
        }
        console.log("All blog data inserted successfully.")
        // process.exit()
        return
    } catch (error) {
        console.error("Error inserting blog data:", error)
    }
}

async function userSeeder() {
    const UserModel = require("./user")
    const userData = require("./userData")
    console.log(userData)
    //delete old data
    try {
        await UserModel.deleteMany({})
        console.log("Old user data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old user data:", error)
    }
    try {
        for (const user of userData) {
            const newUser = await UserModel.create(user)
            console.log("User data inserted:", newUser)
        }
        console.log("All user data inserted successfully.")
        const users = await UserModel.find({})
        console.log("Users:", users)
        // process.exit()
        return
    } catch (error) {
        console.error("Error inserting user data:", error)
    }
}
