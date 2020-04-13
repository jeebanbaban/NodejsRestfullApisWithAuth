require("dotenv").config()
const express = require("express")
const app = express()
const userRouter = require("./apis/user/user.router")

app.use(express.json())

app.use("/api/users",userRouter)

app.listen(process.env.APP_PORT,()=>{console.log("Server is Running on : "+process.env.APP_PORT);
})