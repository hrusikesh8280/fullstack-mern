const express = require("express")
 

require("dotenv").config()
const cors = require("cors")
const connection = require("./connection/db")
const { userRouter } = require("./routes/user.routs")
const { postRouter } = require("./routes/post.routes")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World")
    })

app.use("/",userRouter)
app.use("/",postRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Server is Connected to Mongoose");
    }catch(err){
        console.log(err);
    }
    console.log(`Server is Running at ${process.env.port}`);
})