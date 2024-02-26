const axios = require("axios");
const fs = require("fs");
axios({
	method: "post",
	url: "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
	headers: {
		Authorization: "Bearer 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",
	},
	data: {
		inputs: "Headphones driving under water.",
	},
	responseType: "stream",
}).then(function (response) {
	response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});
