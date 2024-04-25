import mongoose from "mongoose"



const userschema=new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,
    photo:String
  })
  const User=mongoose.model("User",userschema)

  export default User
      