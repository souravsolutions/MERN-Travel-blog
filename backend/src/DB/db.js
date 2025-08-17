import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)

        console.log("DataBase Connected Successfully")

    } catch (error) {
        console.error("Database Connection Failed")
        process.exit()
    }
}

export default connectDB