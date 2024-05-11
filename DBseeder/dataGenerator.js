const blogs = require("./data.json")
const mongoose = require("mongoose")
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcryptjs")

const maxUsersToPush = 200
// const maxUsersToPush = 5000

function replaceSingleQuotesWithDoubleQuotes(inputString) {
    return inputString.replace(/'/g, '"')
}

function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function convertNumberToId(number, userOrBlog = "user") {
    let startHex = "aaaaaaaaaaaaaaaaaaaaaaaa"
    if (userOrBlog === "blog") {
        startHex = "bbbbbbbbbbbbbbbbbbbbbbbb"
    }
    if (userOrBlog === "comment") {
        startHex = "cccccccccccccccccccccccc"
    }
    return new mongoose.Types.ObjectId(
        startHex.slice(0, 24 - number.toString().length) + number.toString(),
    )
}

console.log("Generating data...")
let userIdName = new Map()
userIdName.set("Hello", convertNumberToId(1, "user"))
let tags = new Set()

console.time("executionTime")
const filteredBlogs = blogs
    .map((blog, index) => {
        let { title, text, authors, timestamp, tags } = blog

        let authorArray = replaceSingleQuotesWithDoubleQuotes(authors)
        authors = JSON.parse(authorArray)

        let tagsArray = replaceSingleQuotesWithDoubleQuotes(tags)
        tags = JSON.parse(tagsArray)
        tags = tags.map((tag) => tag.toLowerCase())

        const content = JSON.stringify({
            time: 1550476186479,
            blocks: [
                {
                    id: "zbGZFPM-iI",
                    type: "paragraph",
                    data: {
                        text: text,
                    },
                },
            ],
            version: "2.8.1",
        })

        return {
            _id: convertNumberToId(index + 1, "blog"),
            title,
            description: text.slice(0, randomInt(200, 250)),
            content: content,
            img: `https://picsum.photos/id/${randomInt(10, 1000)}/800/450`,
            author: authors[0] || null,
            tags,
            views: 0,
            likes: [],
            likesCount: 0,
            comments: [],
            commentsCount: 0,
            createdAt: faker.date.past(),
        }
    })
    .filter((blog) => {
        if (!blog.title || blog.title.length < 6 || blog.title.length >= 100)
            return false
        if (!blog.author || blog.author.length < 3) return false
        if (userIdName.size >= maxUsersToPush) {
            //select random author
            let randomIndex = randomInt(0, userIdName.size - 1)
            let randomAuthor = Array.from(userIdName.values())[randomIndex]
            blog.author = randomAuthor
        } else {
            if (!userIdName.has(blog.author))
                userIdName.set(
                    blog.author,
                    convertNumberToId(userIdName.size + 1, "user"),
                )
            blog.author = userIdName.get(blog.author)
        }
        blog.tags.forEach((tag) => tags.add(tag.toLowerCase()))
        return true
    })
console.timeLog("executionTime", "Filtering blogs")

const tagArray = [...tags]
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
const bioData = [
    "Passionate about technology and innovation.",
    "Enthusiastic learner always seeking to expand my knowledge.",
    "Experienced in web development with expertise in HTML, CSS, and JavaScript.",
    "Adept at problem-solving and troubleshooting.",
    "Creative thinker with a keen eye for design.",
    "Dedicated team player with excellent communication skills.",
    "Experienced in Agile methodologies and project management.",
    "Driven by a passion for creating meaningful user experiences.",
    "Constantly exploring new tools and frameworks to enhance development workflows.",
    "Fascinated by artificial intelligence and its applications.",
    "Strong background in data analysis and visualization.",
    "Skilled in utilizing various APIs to integrate third-party services.",
    "Passionate advocate for accessibility and inclusive design practices.",
    "Experienced in working with cross-functional teams to deliver high-quality software.",
    "Proactive problem-solver with a knack for finding elegant solutions.",
    "Detail-oriented with a focus on writing clean, maintainable code.",
    "Experienced in optimizing web applications for performance and scalability.",
    "Passionate about open-source software and contributing to the community.",
    "Adaptable and quick to learn new technologies and methodologies.",
    "Effective communicator with a knack for simplifying complex concepts.",
    "Driven by a desire to make a positive impact through technology.",
    "Experienced in building responsive and mobile-friendly web applications.",
    "Skilled in version control using Git and GitHub.",
    "Continuously seeking feedback to improve and grow as a developer.",
    "Passionate about user-centered design principles and UX/UI best practices.",
    "Eager to collaborate with others and share knowledge within the tech community.",
    "Experienced in optimizing SEO strategies for web content.",
    "Proficient in front-end frameworks such as React and Angular.",
    "Experienced in building and deploying cloud-based applications.",
    "Strong problem-solving skills with a focus on efficiency and scalability.",
    "Committed to delivering high-quality, user-friendly software solutions.",
    "Skilled in conducting usability tests and gathering user feedback.",
    "Passionate about staying up-to-date with the latest trends and technologies.",
    "Experienced in developing cross-platform applications for web and mobile.",
    "Eager to tackle new challenges and push the boundaries of what's possible.",
    "Detail-oriented with a passion for crafting pixel-perfect designs.",
    "Experienced in working with databases such as MySQL, MongoDB, and PostgreSQL.",
    "Skilled in implementing security best practices to protect against cyber threats.",
    "Passionate about continuous learning and personal development.",
    "Experienced in developing e-commerce solutions with payment gateway integration.",
    "Strong analytical skills with a data-driven approach to problem-solving.",
    "Committed to delivering projects on time and within budget constraints.",
    "Experienced in conducting code reviews and providing constructive feedback.",
    "Passionate about using technology for social good and community empowerment.",
    "Skilled in building responsive and adaptive user interfaces.",
    "Enthusiastic about exploring emerging technologies and their potential impact.",
    "Experienced in building RESTful APIs for seamless integration with client applications.",
    "Detail-oriented with a focus on delivering polished and user-friendly experiences.",
    "Committed to fostering a collaborative and inclusive work environment.",
    "Experienced in working with CI/CD pipelines for automated deployment.",
    "Passionate about mentorship and helping others grow in their careers.",
    "Skilled in performance optimization techniques for web applications.",
    "Eager to take on leadership roles and drive team success.",
    "Experienced in implementing authentication and authorization mechanisms.",
    "Strong communication skills with a knack for explaining technical concepts.",
    "Passionate about building scalable and resilient distributed systems.",
    "Experienced in containerization using Docker and Kubernetes.",
    "Detail-oriented with a focus on writing clean and maintainable code.",
    "Committed to delivering exceptional user experiences across all platforms.",
    "Skilled in implementing responsive designs for mobile and tablet devices.",
    "Eager to collaborate with cross-functional teams to deliver innovative solutions.",
    "Experienced in building real-time applications using WebSocket technology.",
    "Passionate about accessibility and ensuring products are usable by all.",
    "Enthusiastic about experimenting with new technologies and frameworks.",
    "Experienced in conducting user research to inform product decisions.",
    "Detail-oriented with a focus on building intuitive and user-friendly interfaces.",
    "Committed to staying up-to-date with the latest industry trends and best practices.",
    "Skilled in optimizing web applications for speed and performance.",
    "Passionate about leveraging data to drive business insights and decision-making.",
    "Eager to collaborate with designers to create visually stunning interfaces.",
    "Experienced in building scalable and resilient microservices architectures.",
    "Strong problem-solving skills with a focus on delivering robust solutions.",
    "Committed to writing clean, maintainable, and well-documented code.",
    "Skilled in debugging and troubleshooting complex technical issues.",
    "Passionate about building products that have a positive impact on people's lives.",
    "Enthusiastic about exploring new technologies and pushing the boundaries of what's possible.",
    "Experienced in implementing secure authentication and authorization mechanisms.",
    "Detail-oriented with a focus on delivering high-quality user experiences.",
    "Committed to continuous improvement and learning new skills.",
    "Skilled in building responsive and accessible web applications.",
    "Eager to collaborate with stakeholders to understand and address user needs.",
    "Passionate about building inclusive and diverse tech communities.",
    "Experienced in working with cloud platforms such as AWS, Azure, and Google Cloud.",
    "Strong analytical skills with a data-driven approach to problem-solving.",
    "Committed to delivering solutions that meet both user and business objectives.",
    "Skilled in optimizing front-end performance for fast loading times.",
    "Detail-oriented with a focus on writing clean and maintainable code.",
    "Experienced in building scalable and distributed systems.",
    "Passionate about building products that make a positive impact on society.",
    "Enthusiastic about collaborating with cross-functional teams to solve complex problems.",
    "Experienced in designing and implementing relational and non-relational databases.",
    "Eager to mentor junior developers and help them grow in their careers.",
    "Skilled in agile development methodologies and iterative product development.",
    "Committed to delivering reliable and scalable software solutions.",
    "Strong problem-solving skills with a focus on delivering elegant solutions.",
    "Passionate about building user-centric products that delight and inspire.",
    "Detail-oriented with a focus on crafting intuitive and seamless user experiences.",
    "Experienced in building responsive and adaptive web applications.",
    "Skilled in optimizing web applications for speed and performance.",
    "Eager to collaborate with designers to create visually stunning interfaces.",
    "Passionate about leveraging data to drive informed decision-making.",
    "Enthusiastic about exploring emerging technologies and their potential applications.",
    "Experienced in building scalable and resilient backend systems.",
    "Committed to writing clean, modular, and maintainable code.",
    "Skilled in implementing authentication and authorization mechanisms.",
    "Detail-oriented with a focus on delivering pixel-perfect designs.",
    "Experienced in conducting usability tests and gathering user feedback.",
    "Passionate about creating products that have a positive impact on people's lives.",
    "Strong communication skills with a knack for explaining technical concepts.",
]
const userData = []
const blogData = filteredBlogs
const commentData = []

console.timeLog("executionTime", "Varibles created")
for (let [name, id] of userIdName) {
    let readArticles = []
    for (let i = 0; i < randomInt(20, 100); i++) {
        const randomBlog = blogData[randomInt(0, blogData.length - 1)]
        commentData.push({
            _id: convertNumberToId(commentData.length + 1, "comment"),
            message: randomComments[randomInt(0, randomComments.length - 1)],
            author: id,
        })
        randomBlog.views += 1
        readArticles.push(randomBlog._id)

        randomBlog.comments.push(commentData[commentData.length - 1]._id)
        randomBlog.commentsCount++
    }
    for (let i = 0; i < randomInt(50, 1000); i++) {
        const randomBlog = blogData[randomInt(0, blogData.length - 1)]
        randomBlog.views += 1
        readArticles.push(randomBlog._id)
        randomBlog.likes.push(id)
        randomBlog.likesCount++
    }
    let myBlogs = blogData
        .filter((blog) => blog.author === id)
        .map((blog) => blog._id)
    let myInterests = []

    for (let i = 0; i < randomInt(1, 5); i++) {
        myInterests.push(tagArray[randomInt(0, tagArray.length - 1)])
    }

    userData.push({
        _id: id,
        name,
        email: faker.internet.email({ firstName: name }),
        password: bcrypt.hashSync("password", 5),
        profileImage: faker.image.avatar(),
        bio: bioData[randomInt(0, bioData.length - 1)],
        blogs: myBlogs,
        myInterests,
        readArticles,
        following: [],
        followers: [],
    })
}
console.timeLog("executionTime", "User data created")

//change pass and email for account Hello
userData[0].email = "hello@hello.com"
userData[0].password = bcrypt.hashSync("hello@hello.com", 10)

for (user of userData) {
    for (let i = 0; i < randomInt(2, 100); i++) {
        const randomUser = userData[randomInt(0, userData.length - 1)]
        user.following.push(randomUser._id)
        randomUser.followers.push(user._id)
    }
}

console.timeLog("executionTime", "Followers and following created")

console.log("Data generated")

console.timeEnd("executionTime")

module.exports = {
    blogData,
    userData,
    commentData,
}
