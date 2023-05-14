const express = require("express")
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router()



postRouter.post("/post",auth,(req,res)=>{
    const payload = req.body;
    try{
        const post = new PostModel(payload)
        post.save()
        res.status(201).json(post)
    }catch(err){
        return res.status(400).json({ error:err.message})
    }
})


postRouter.delete("/delete/:id",auth,async(req,res)=>{
    const{id}=req.params
    try{
        const post = await PostModel.findByIdAndDelete(id)
        if(post){
            return res.status(200).json({message:"post deleted successfully"})
            }
            else{
                return res.status(404).json({message:"post not found"})
                }

    }catch(err){
        return res.status(400).json({error:err.message})
    }
})


postRouter.get("/post",auth,async(req,res)=>{
    try{
        const post = await PostModel.find()
        if(post){
            return res.status(200).json(post)
            }
            else{
                return res.status(404).json({message:"post not found"})
                }

    }catch(err){
        return res.status(400).json({error:err.message})
    }
})

postRouter.patch("/post/:id",auth,async(req,res)=>{
    const{id}=req.params
    const payload = req.body
    try{
        const post = await PostModel.findByIdAndUpdate(id,payload,{new:true})
        if(post){
            return res.status(200).json(post)
            }
            else{
                return res.status(404).json({message:"post not found"})
            }

    }catch(err){
        return res.status(400).json({error:err.message})
    }
})


module.exports={postRouter}