import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import User from './models/User.js'
import { ConnectDb } from "./lib/connectDb.js";
import { clerkMiddleware } from '@clerk/express'

dotenv.config()
const app = express()
const PORT =process.env.PORT||3000
const frontendUrl = process.env.FRONTEND_URL

app.use(express.json())
app.use(clerkMiddleware())
app.use(cors({origin:frontendUrl, credentials:true}))

app.get("/health", (req, res) => {
  res.status(200).json({ok: true});
})

app.listen(PORT, ()=>{

  ConnectDb();
  console.log("the server is running on ", PORT)
})