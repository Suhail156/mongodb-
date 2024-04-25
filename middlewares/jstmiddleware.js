import Jwt from "jsonwebtoken"

export const verifytoken=(req,res,next)=>{
    const token=req.headers["authorization"]
    if(!token){
       res.status(404).json({error:"usernot found"})
    }
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
          if(err){
           res.status(404).json({error:"unauthorized"})
          }
          req.email=decoded.email
          next()
    })
}
