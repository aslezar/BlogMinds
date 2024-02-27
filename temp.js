const axios = require("axios");
const fs = require("fs");
axios({
	url: "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
	method: "post",
	headers: {
		Authorization: "Bearer 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",
	},
	data: {
		inputs: "Headphones driving under water.",
	},
	responseType: "stream",
}).then(async function (response) {
	response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
	// console.log(response.headers);
	//save image
	// const writer = fs.createWriteStream("ada_lovelace.jpg");
	// response.data.pipe(writer);
	// writer.on("finish", () => console.log("done"));
	// writer.on("error", () => console.log("error"));
	// const res = await response.blob();
	// console.log(res);
});
