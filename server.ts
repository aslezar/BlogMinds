//Express App Imports
import express, { Express, Request, Response } from "express"
import path from "path"
import http from "http"
import fs from "fs"

import helmet from "helmet"
import cors from "cors"
import rateLimiter from "express-rate-limit"
import cookieParser from "cookie-parser"

import morgan from "morgan"

import "express-async-errors"
import dotenv from "dotenv"
dotenv.config()

import connectDB from "./db/connect"

//Import Routes
import ApiRoute from "./routes/apiv1"

//Import Middleware
import paginateMW from "./middleware/paginator"

//Import Error Handler
import errorHandler from "./middleware/error-handler"

//Start Express App
const app: Express = express()
const server: http.Server = http.createServer(app)

//Setting Environment
const PORT: string | number = process.env.PORT || 5000
app.set("trust proxy", 1)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "https://blogminds.onrender.com",
    "https://creativerse-tj.onrender.com",
]
const corsOptions = {
    origin: function (origin: string | undefined, callback: any) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg =
                "The CORS policy for this site does not allow access from the specified Origin."
            return callback(new Error(msg), false)
        }
        return callback(null, true)
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true,
}

//Security Middleware
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, //15 minutes
        max: 5000, //limit each IP to 100 requests per windowMs
    }),
)
app.use(cookieParser())
app.use(express.json())
// app.use(helmet()) //set security HTTP headers
app.use(cors(corsOptions)) //enable CORS

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

//Functionality Middleware
app.use(paginateMW)

//Routes
app.use("/", express.static("./client/dist"))
app.use("/assets", express.static("./client/dist/assets"))
app.use("/hello", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" })
})
app.use("/api/v1", ApiRoute)

//Define Routes Here
app.use("/*", express.static("./client/dist/index.html"))

//Error Handling Middleware
app.use(errorHandler)

//Function Start
async function start() {
    try {
        const db = await connectDB(process.env.MONGO_URL as string)
        console.log(`MongoDB Connected: ${db.connection.name}`)
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
