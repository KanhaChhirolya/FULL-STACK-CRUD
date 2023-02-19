const express=require("express");
const { usermodel } = require("../model/user.model");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router();
const app=express();
app.use(express.json());



userRouter.post("/register",async(req,res)=>{
    const {email,password,name}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({msg:"something went wrong",error:err.message})
            }else{
                const User= new usermodel({name,email,password:hash});
            await User.save();
            res.send({msg:"new user has been registered"})
            }
        })
        
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await usermodel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token=jwt.sign({email:email,userid:user[0]._id},"hell")
                    res.send({"msg":'logged in',Token:token})
                }else{
                    res.send({msg:"something went wrong"})
                }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.send({msg:"something went wrong",error:error.message})
    }
})

module.exports={
    userRouter
}