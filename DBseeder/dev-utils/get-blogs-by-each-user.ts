import { configDotenv } from "dotenv"
import * as path from "path"
const newPath = path.join(__dirname, "..", "..", ".env")
configDotenv({ path: newPath })

import Blog from "../../models/blog"
import User from "../../models/user"
import connectDB from "../../db/connect"
import { Schema, Types } from "mongoose"

const getBlogsByEachUser = async () => {
    try {
        const db = await connectDB(process.env.MONGO_URL as string)

        const blogs = await Blog.find({})

        // count blogs by author
        let acc: { [key: string]: number } = {}
        const blogsByAuthor = blogs.reduce(
            (acc, blog) => {
                const author = blog.author.toString()
                if (!acc[author]) {
                    acc[author] = 0
                }
                acc[author]++
                return acc
            },
            {} as { [key: string]: number },
        ) // Add index signature to acc object

        // sort on the basis of count
        const sortedBlogsByAuthor = Object.entries(blogsByAuthor).sort(
            (a, b) => b[1] - a[1],
        ) // sort in descending order

        console.log(sortedBlogsByAuthor.slice(0, 5)) // top 5 authors with most blogs
        // process.exit(0)
    } catch (error) {
        console.error(error)
    }
}

const changeBlogAuthor = async () => {
    try {
        const db = await connectDB(process.env.MONGO_URL as string)

        const blogs = await Blog.find({})

        // change author of 40 blogs to "aaaaaaaaaaaaaaaaaaaaaaa1"
        const blogsToUpdate = blogs.slice(0, 40)
        await Promise.all(
            blogsToUpdate.map(async (blog) => {
                blog.author = new Types.ObjectId(
                    "aaaaaaaaaaaaaaaaaaaaaaa1",
                ) as any as Schema.Types.ObjectId
                await blog.save()
            }),
        )
        const user = await User.findById("aaaaaaaaaaaaaaaaaaaaaaa1")
        if (!user) {
            console.log("User not found")
            process.exit(0)
        }
        console.log("User found")
        const updatedBlogs = await Blog.find({ author: user._id })
        console.log(updatedBlogs.length)
        // empty user.blogs array
        user.set(
            "blogs",
            updatedBlogs.map((blog) => blog._id),
        )
        await user.save()
        console.log(user)

        console.log("Author changed successfully")
        process.exit(0)
    } catch (error) {
        console.error(error)
    }
}

getBlogsByEachUser()
changeBlogAuthor()
