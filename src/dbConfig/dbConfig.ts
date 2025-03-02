import mongoose from "mongoose";

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI is not defined in environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URI);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("✅ MongoDB is successfully connected.");
        });

        connection.on('error', (err) => {
            console.error("❌ MongoDB connection error:", err);
            process.exit(1);
        });

    } catch (err) {
        console.error("🚨 Something went wrong while connecting to MongoDB:", err);
    }
}
