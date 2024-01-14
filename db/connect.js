const mongoose = require('mongoose')

const connectDB = (connectionString) => mongoose.connect(connectionString);

module.exports = connectDB;