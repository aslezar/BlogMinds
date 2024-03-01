//Express App Imports
import express, { Express, Request, Response } from "express";
import path from "path";
import http from "http";
import fs from "fs";

import helmet from "helmet";
import cors from "cors";
// import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

import morgan from "morgan";

import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect";

//Start Express App
const app: Express = express();
const server: http.Server = http.createServer(app);

//Setting Environment
const PORT: string | number = process.env.PORT || 5000;
app.set("trust proxy", 1);

//Security Middleware
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, //15 minutes
		max: 100, //limit each IP to 100 requests per windowMs
	})
);
app.use(express.json());
app.use(helmet()); //set security HTTP headers
app.use(cors()); //enable CORS
// app.use(xss()); //prevent XSS attacks

//Logger
//create dir if not exist
const logDir: string = path.join(__dirname, "./log");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}
app.use(
	morgan("dev", {
		skip: function (req: Request, res: Response) {
			return res.statusCode < 400;
		},
	})
);
// log all requests to access.log
app.use(
	morgan("common", {
		stream: fs.createWriteStream(path.join(__dirname, "./log/httpReqs.log"), {
			flags: "a",
		}),
	})
);

//Routes
// app.use("/api/v1", require("./routes/apiv1"));
app.use("/", express.static("../client/dist"));
app.use("/assests", express.static("../client/dist/assests"));

//Define Routes Here

app.get("/*", (req: Request, res: Response) => {
	res.sendFile(
		path.join(__dirname, "../client/dist/index.html"),
		(err: Error) => {
			if (err) {
				console.error("Error sending file:", err);
			}
		}
	);
});

//Error Handling Middleware
// app.use(require("./middleware/error-handler"));

//Function Start
async function start() {
	try {
		await connectDB(process.env.MONGO_URL as string);
		console.log("Connected to the DataBase Sucessfully");
		server.listen(PORT, () => {
			console.log(
				`⚡️[server]: Server is listening on http://localhost:${PORT}`
			);
		});
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}
start();
