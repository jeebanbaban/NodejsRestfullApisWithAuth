require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = {
    validateToken: (req,res,next)=>{
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            jwt.verify(token,"qwe1234",(error,decoded)=>{
                if(error){
                    return res.json({
                        success: false,
                        message: "Invalid Token!"
                    })
                }else{
                    req.decoded = decoded
                    next()
                }
            })
        }else{
            return res.json({
                success: false,
                message: "Access Denied! Unauthorized User"
            })
        }
    }
}