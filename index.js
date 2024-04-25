import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
import authRouter from "./routes/router.js"


    const PORT = process.env.PORT || 7000

  mongoose.connect(process.env.DB)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error))

 // middle wares
  app.use(express.json())
app.use("/api/users", authRouter)

  app.listen(PORT,()=>{
    console.log(`Server running on http://localhost${PORT}`);
  })