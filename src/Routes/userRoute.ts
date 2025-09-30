import { PrismaClient } from "@prisma/client"
import express from "express"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();
const prisma = new PrismaClient()
const userRouter = express()
userRouter.use(express.json())
const pass = process.env.pass!

userRouter.post("/signup" , async (req,res) => {
    const body = req.body
if (!body){
    return res.json({"msg" : "send credentials"})
}
 const users = await prisma.user.create({
        data: {
            username:body.name,
            email:body.email,
            password:body.password

        },
    })
    if(!users){
       return res.json({"msg":"error while creating account"})
    } else {res.json({"msg":"user created successfully"})}
})

userRouter.post("/signin", async (req,res)=> {
    const body = req.body
    if(!body){
        return res.json({"msg" : "send credentials"})
    }

    const signin = await prisma.user.findFirst({
        where : {
            email : body.email,
            password : body.password
        }
    })

    if(!signin){return res.json({"msg" : "email not found"})}
    const email = body.email
    const token = jwt.sign({email} , pass )
    res.json(token)
})

export default userRouter