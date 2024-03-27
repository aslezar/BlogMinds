// Import required libraries
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const BlogModel = require("./blog")
const UserModel = require("./user")
const CommentModel = require("./comment")

const { blogData, userData, convertNumberToId } = require("./dataGenerator")

dotenv.config("../.env")

const randomComments = [
    "I don't agree with this",
    "I agree with this",
    "This is a great article",
    "This is a bad article",
    "I don't understand this",
    "This is too complicated",
    "This is too simple",
    "I don't like this",
    "I like this",
    "I don't know what to say",
    "This is a great read",
    "I don't understand this",
    "This is too complicated",
]

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

// function to return a random number between a and b
function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

async function seeder() {
    console.log("Connected to MongoDB")

    await userSeeder()
    await blogSeeder()
    // get all users and assign some blogs to them
    const users = await UserModel.find({})
    const blogs = await BlogModel.find({})

    // assign 5 random blogs to each user
    // store already assigned blogs to avoid duplicate assignment
    let assignedBlogs = {}
    for (const user of users) {
        for (let i = 0; i < randomInt(5, 10); i++) {
            let randomBlogInd = randomInt(0, blogs.length - 1)
            while (assignedBlogs[randomBlogInd]) {
                randomBlogInd = randomInt(0, blogs.length - 1)
            }
            const randomBlog = blogs[randomBlogInd]
            assignedBlogs[randomBlogInd] = true
            user.blogs.push(randomBlog)
            // change the author of the blog
            randomBlog.author = user._id
        }
        // add some random blogs to readArticles of each user
        for (let i = 0; i < randomInt(40, 160); i++) {
            const randomBlog = blogs[randomInt(0, blogs.length - 1)]
            randomBlog.views += 1
            const comment = await CommentModel.create({
                message:
                    randomComments[randomInt(0, randomComments.length - 1)],
                author: user._id,
            })
            randomBlog.comments.push(comment)
            user.readArticles.push(randomBlog)
        }
    }

    // make random users follow each other
    for (const user of users) {
        for (let i = 0; i < 5; i++) {
            const randomUser = users[randomInt(0, users.length - 1)]
            if (randomUser._id.toString() !== user._id.toString()) {
                user.following.push(randomUser)
                randomUser.followers.push(user)
            }
        }
    }

    // save all users
    await Promise.all(users.map((user) => user.save()))
    console.log("All users updated successfully.")
    // save all blogs
    await Promise.all(blogs.map((blog) => blog.save()))

    mongoose.connection.close()
    process.exit()
}

async function blogSeeder() {
    //delete old data
    try {
        await BlogModel.deleteMany({})
        console.log("Old blog data deleted successfully.")
    } catch (error) {
        console.error("Error deleting old blog data:", error)
    }
    try {
        // example of a 24 character hex string
        // const exampleHex = "5f5d5f5d5f5d5f5d5f5d5f5d"
        let blogs = []
        let j = 0
        for (const blog of blogData) {
            let newBlog = { ...blog }
            j++
            newBlog._id = convertNumberToId(j, "blog")
            blogs.push(newBlog)
        }
        await BlogModel.insertMany(blogs)
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
