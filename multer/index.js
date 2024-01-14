const multer = require('multer');

// Define a function to control which files are accepted
const fileFilter = function (req, file, cb) {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true); // Accept the file
	} else {
		cb(new Error('Unsupported file type')); // Reject the file with an error
	}
};

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024, // 1 MB limit
	},
});

module.exports = upload;
