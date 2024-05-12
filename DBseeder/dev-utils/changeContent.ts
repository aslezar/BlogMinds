import { configDotenv } from "dotenv"
import * as path from "path"
const newPath = path.join(__dirname, "..", "..", ".env")
configDotenv({ path: newPath })
import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

import Blog from "../../models/blog"
import connectDB from "../../db/connect"

const changeContent = async () => {
    try {
        const db = await connectDB(process.env.MONGO_URL as string)

        const blogs = await Blog.find({}).select("content")
        for (let blog of blogs) {
            if (blog._id.toString().slice(0, 8) !== "bbbbbbbb") continue
            console.log(blog._id)
            const text = JSON.parse(blog.content)
                .blocks.map((block: any) => block.data.text)
                .join("\n\n")
            blog.content = JSON.stringify({
                time: 1550476186479,
                blocks: text.split("\n\n").map((paragraph: any) => ({
                    id: uuidv4(),
                    type: "paragraph",
                    data: {
                        text: paragraph.trim(),
                    },
                })),
                version: "2.8.1",
            })
            await blog.save()
        }
        mongoose.connection.close()
    } catch (error) {
        console.error(error)
    }
}

changeContent()
