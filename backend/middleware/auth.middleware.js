const jwt = require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token,"skyGoal")
        if(decoded){
            req.body.userId = decoded.userId
            next()
        }else{
            res.status(401).json({"msg":"invalid token"})
        }
    }else{
        res.status(400).json({"msg":"Please Login First"})
    }
}

module.exports={auth}