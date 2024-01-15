//Express App Imports
const express = require("express");
const path = require("path");
const http = require("http");
const fs = require("fs");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const morgan = require("morgan");

require("express-async-errors");
require("dotenv").config();

const connectDB = require("./db/connect");

//Start Express App
const app = express();
const server = http.createServer(app);

//Setting Environment
const PORT = process.env.PORT || 5000;
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
app.use(xss()); //prevent XSS attacks

//Logger
//create dir if not exist
const logDir = path.join(__dirname, "./log");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}
app.use(
	morgan("dev", {
		skip: function (req, res) {
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
app.use("/api/v1", require("./routes/apiv1"));
app.use("/", express.static("../client/dist"));
app.use("/assests", express.static("../client/dist/assests"));

//Define Routes Here

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
		if (err) {
			console.error("Error sending file:", err);
		}
	});
});

//Error Handling Middleware
app.use(require("./middleware/error-handler"));

//Function Start
async function start() {
	try {
		await connectDB(process.env.MONGO_URL);
		console.log("Connected to the DataBase Sucessfully");
		server.listen(PORT, () => {
			console.log(`Server is listening on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}
start();
