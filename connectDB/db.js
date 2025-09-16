import mongoose from "mongoose"

const db = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully")
        console.log(conn.connection.host)
    } catch (error) {
        console.log("Error connecting to the datbase server", error.message)
    }
}

export default db