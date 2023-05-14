
const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:String,
    content:String,
    userId:String
},{
    versionKey:false
})

const PostModel=mongoose.model("Post",postSchema)

module.exports={PostModel}