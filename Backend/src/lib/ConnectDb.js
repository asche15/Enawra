import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export async function ConnectDb(params) {
  try {
    const mongoUri = process.env.MONGO_URL;

    if(!mongoUri){
      throw new Error("MONGO_URL is required")
    }

    
    const conn = await mongoose.connect(mongoUri);

    console.log("Mongodb connected", conn.connection.host)

  } catch (error) {
    console.error("Mongodb connection error", error.message);
    process.exit(1);
  }
}