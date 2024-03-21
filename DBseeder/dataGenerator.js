const blogs = require("./data.json")
const fs = require("fs")
const mongoose = require("mongoose")
const { faker } = require("@faker-js/faker")

function replaceSingleQuotesWithDoubleQuotes(inputString) {
    return inputString.replace(/'/g, '"')
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function convertNumberToId(number, userOrBlog = "user") {
    let startHex = "aaaaaaaaaaaaaaaaaaaaaaaa"
    if(userOrBlog === "blog") {
        startHex = "bbbbbbbbbbbbbbbbbbbbbbbb"
    }
    return new mongoose.Types.ObjectId(
        startHex.slice(0, 24 - number.toString().length) + number.toString()
    )
}

console.log("Generating data...")
let userIdName = new Map()
let tags = new Set()

const filteredBlogs = blogs
    .map((blog) => {
        let { title, text, authors, timestamp, tags } = blog

        let authorArray = replaceSingleQuotesWithDoubleQuotes(authors)
        authors = JSON.parse(authorArray)

        let tagsArray = replaceSingleQuotesWithDoubleQuotes(tags)
        tags = JSON.parse(tagsArray)
        tags = tags.map((tag) => tag.toLowerCase())

        return {
            title,
            //first 100 words of text as
            description: text
                .split(" ")
                .slice(0, generateRandomNumber(30, 50))
                .join(" "),
            content: text,
            img: `https://picsum.photos/id/${generateRandomNumber(10, 1000)}/800/450`,
            author: authors[0] || null,
            tags,
            views: generateRandomNumber(0, 1000),
            likesCount: generateRandomNumber(0, 500),
            commentsCount: generateRandomNumber(0, 100),
            createdAt: faker.date.past(),
        }
    })
    .filter((blog) => {
        if (blog.author !== null) {
            if (!userIdName.has(blog.author)) {
                const id = convertNumberToId(userIdName.size + 1,"user")
                userIdName.set(blog.author, id)
            }
            blog.author = userIdName.get(blog.author)
            //push all tags to set
            blog.tags.forEach((tag) => tags.add(tag.toLowerCase()))
        }
        return blog.author !== null
    })

const tagArray = [...tags]
// console.log(tagArray)

const userData = []
let noofUsersToPush = 50
for (let [name, id] of userIdName) {
    if (noofUsersToPush === 0) break
    noofUsersToPush--
    const email = faker.internet.email()
    const profileImage = faker.image.avatar()
    //choose some random tags
    const myInterests = tagArray
        .sort(() => 0.5 - Math.random())
        .slice(0, generateRandomNumber(1, 5))
    userData.push({
        _id: id,
        name,
        email,
        password: "password",
        profileImage,
        blogs: [],
        myInterests,
    })
}

userData.push({
    _id: convertNumberToId(999,"user"),
    name: "Helo",
    email: "hello@hello.com",
    password: "hello@hello.com",
    blogs: [],
    myInterests: ["programming", "technology", "science"],
})

console.log("Data generated")

module.exports = {
    blogData: filteredBlogs,
    userData,
    convertNumberToId,
}
