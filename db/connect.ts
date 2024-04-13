import mongoose from "mongoose"

const serverSelectionTimeoutMS: number =
    Number(process.env.SERVER_SELECTION_TIMEOUT_MS) || 5000

const connectDB = (connectionString: string): Promise<typeof mongoose> =>
    mongoose.connect(connectionString, {
        serverSelectionTimeoutMS,
    })

export default connectDB
