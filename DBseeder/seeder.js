// Import required libraries
const mongoose = require("mongoose")
const BlogModel = require("./blog")
const dotenv = require("dotenv")
dotenv.config()

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        pushData(blogData)
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err))

const blogData = require("./blogData")
console.log(blogData)
async function pushData(blogData) {
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
        process.exit()
    } catch (error) {
        console.error("Error inserting blog data:", error)
    }
}
