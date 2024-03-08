import mongoose, { ConnectOptions } from "mongoose"

const connectDB = (connectionString: string): Promise<typeof mongoose> =>
    mongoose.connect(connectionString)

export default connectDB
