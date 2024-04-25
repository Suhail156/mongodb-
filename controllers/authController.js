import User from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import  Jwt from 'jsonwebtoken'
import userJoi from "../middlewares/validation.js"

export const  signup = async(req,res)=>{
     try {
      //  const{name,email,username,password}=req.body
    const result=await userJoi.validateAsync(req.body)
    const bcryptpassword=bcrypt.hashSync(result.password,10)
     const newuser=new User({
        name:result.name,
        password:bcryptpassword,
        email:result.email,
        username:result.username,
        photo:req.file? req.file.filename : null
     })
     await newuser.save()
     res.status(200).json({message:"successfully created"})
     } catch (error) {
      if(error.isJoi==true){
         res.status(422).json({details:error.details})
      }
      console.log(error);
     }
   
  }


  export const login = async(req,res)=>{
     const{email,password}=req.body
     const loginsers=await User.findOne({email})
       
     if(!loginsers){
        res.status(404).json({error:"user not found"})
     }
     const validpassword=bcrypt.compareSync(password,loginsers.password)
     if(!validpassword){
        res.status(401).json({error:"unauthorized"})
     }
     const token=Jwt.sign(
        {id:loginsers._id},
        process.env.ACCESS_TOKEN_SECRET
    )
    const{password:bcryptpassword,...rest}=loginsers._doc
    const expiryDate=new Date(Date.now()+60*1000)
    res.cookie("access_token",token,{httpOnly:true,expires:expiryDate})
    .status(200).json({message:"succesfully logined",rest})
  }

//update user
export const updateuser=async(req,res)=>{
   const{id}=req.params
   const{name,email,username,password}=req.body
 const userupdate=  await User.findByIdAndUpdate(id,{name,email,username,password})
    if(!userupdate){
     res.status(404).json({error:"user not found"})
    }
    res.status(200).json({message:"succesfully updated"})
 
}
// route.get("/users/:id",async(req,res)=>{
//   const userid=req.params.id
//   const users=user.findById(userid)
//    if(!users){
//      res.status(404).json({error:"user not found"})
//    }
//    res.status(200).json({message:"successfully fetched"})
// })



//  userdelete
export const deleteuser= async(req,res)=>{
     const userid=req.params.id
      await User.findByIdAndDelete(userid)
      res.status(200).json({message:"succesfully deleted"})
}
