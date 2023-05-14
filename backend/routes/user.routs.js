const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../models/user.model")

const userRouter = express.Router()



userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password}=req.body
    try{
        const user_exist = await UserModel.exists({email})
        if(user_exist){
            return res.status(400).json({message:"User Already Exists"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                const newUser= new UserModel({name,email,gender,password:hash})
                await newUser.save()
                res.status(200).json({"msg":newUser})
            })
        }

    }catch(err){
        res.status(400).json({"msg":err.msg})
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(200).json({"msg":"Login sucessfull!","token":jwt.sign({"userId":user._id},"skyGoal")})
                }else{
                    res.status(400).json({"msg":"Wrong Credentila"})
                }
            })
        }else{
            res.status(200).json({"message":"No such user Exist"})
        }
    }catch(err){
        res.status(400).json({"msg":err.messgae})
    }
})

  module.exports={userRouter}