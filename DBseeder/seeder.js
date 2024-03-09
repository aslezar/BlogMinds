// Import required libraries
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const BlogModel = require("./blog")
const blogData = require("./blogData")
const randDesc = require("./random-strings")
const lines = require("./random-para")
const UserModel = require("./user")
const userData = require("./userData")

dotenv.config()

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("Connected to MongoDB")
        await userSeeder()
        await blogSeeder()
        // get all users and assign some blogs to them
        const users = await UserModel.find({})
        const blogs = await BlogModel.find({})
        for (const user of users) {
            for (let i = 0; i < 5; i++) {
                const randomBlog =
                    blogs[Math.floor(Math.random() * blogs.length)]
                user.blogs.push(randomBlog)
                // change the author of the blog
                randomBlog.author = user._id
                await randomBlog.save()
            }
            await user.save()
        }
        process.exit()
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err))

async function blogSeeder() {
    //delete old data
    try {
        await BlogModel.deleteMany({})
        console.log("Old blog data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old blog data:", error)
    }
    try {
        //
        let blogs = []
        for (let i = 0; i < 200; i++) {
            for (const blog of blogData) {
                let newBlog = { ...blog }
                const randomLine =
                    lines[Math.floor(Math.random() * lines.length)]
                newBlog.content = randomLine
                newBlog.description =
                    randDesc[Math.floor(Math.random() * randDesc.length)]
                blogs.push(newBlog)
            }
        }
        const newBlogs = await BlogModel.insertMany(blogs)
        console.log("All blog data inserted successfully.")
        return
    } catch (error) {
        console.error("Error inserting blog data:", error)
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
        return
    } catch (error) {
        console.error("Error inserting user data:", error)
    }
}
