//Express App Imports
import express, { Express, Request, Response } from "express"
import path from "path"
import http from "http"
import fs from "fs"

import helmet from "helmet"
import cors from "cors"
import rateLimiter from "express-rate-limit"

import morgan from "morgan"

import "express-async-errors"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "./db/connect"

//Import Routes
import ApiRoute from "./routes/apiv1"

//Import Error Handler
import errorHandler from "./middleware/error-handler"

//Start Express App
const app: Express = express()
const server: http.Server = http.createServer(app)

//Setting Environment
const PORT: string | number = process.env.PORT || 5000
app.set("trust proxy", 1)

//Security Middleware
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, //15 minutes
        max: 100, //limit each IP to 100 requests per windowMs
    }),
)
app.use(express.json())
app.use(helmet()) //set security HTTP headers
app.use(cors()) //enable CORS

//Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

const logDir: string = path.join(__dirname, "./log")
//create dir if not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}
app.use(
    morgan("common", {
        stream: fs.createWriteStream(
            path.join(__dirname, "./log/httpReqs.log"),
            {
                flags: "a",
            },
        ),
    }),
)

//Routes
app.use("/", express.static("../client/dist"))
app.use("/assests", express.static("../client/dist/assests"))
app.use("/hello", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" })
})
app.use("/api/v1", ApiRoute)

//Define Routes Here
app.get("/*", (req: Request, res: Response) => {
    if (fs.existsSync(path.join(__dirname, "../client/dist/index.html"))) {
        res.sendFile(
            path.join(__dirname, "../client/dist/index.html"),
            (err: Error) => {
                throw new Error("Error sending file: index.html")
            },
        )
    }
    return res.status(404).json({ message: "Page Not Found" })
})

//Error Handling Middleware
app.use(errorHandler)

//Function Start
async function start() {
    try {
        await connectDB(process.env.MONGO_URL as string)
        console.log("Connected to the DataBase Sucessfully")
        server.listen(PORT, () => {
            console.log(
                `⚡️[server]: Server is listening on http://localhost:${PORT}`,
            )
        })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}
start()
