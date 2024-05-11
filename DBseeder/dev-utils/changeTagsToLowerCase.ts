import { configDotenv } from "dotenv"
import * as path from "path"
const newPath = path.join(__dirname, "..", "..", ".env")
configDotenv({ path: newPath })
import mongoose from "mongoose"

import Blog from "../../models/blog"
import connectDB from "../../db/connect"

const changeTagsToLowerCase = async () => {
    try {
        const db = await connectDB(process.env.MONGO_URL as string)

        const blogs = await Blog.find({}).select("tags title")
        for (let blog of blogs) {
            console.log(blog._id)
            if (blog.title.length > 100) {
                blog.title = blog.title.slice(0, 100)
            }
            blog.tags.forEach((tag, index) => {
                blog.tags[index] = tag.toLowerCase()
            })
            await blog.save()
        }
        mongoose.connection.close()
        process.exit(0)
    } catch (error) {
        console.error(error)
    }
}

changeTagsToLowerCase()
