import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import User from './models/User.js'
import { ConnectDb } from "./lib/ConnectDb.js";
import { clerkMiddleware } from '@clerk/express'

import fs from "fs"
import path from "path"

dotenv.config()
const app = express()
const PORT =process.env.PORT||3000
const publicDir = path.join(process.cwd(), "public")
const frontendUrl = process.env.FRONTEND_URL

app.use(express.json())
app.use(clerkMiddleware())
app.use(cors({origin:frontendUrl, credentials:true}))

app.get("/health", (req, res) => {
  res.status(200).json({ok: true});
})


if(fs.existsSync(publicDir)){
   app.use(express.static(publicDir))
CHAT_APP03

   app.get("*", (req, res, next) =>{
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, ()=>{

  ConnectDb();
  console.log("the server is running on ", PORT)
})