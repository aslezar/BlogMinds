const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB")
        wipeDB()
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err))

async function wipeDB() {
    try {
        await mongoose.connection.dropDatabase()
        console.log("Database wiped successfully.")
    } catch (error) {
        console.error("Error wiping database:", error)
    }
    process.exit()
}
