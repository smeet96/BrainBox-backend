import express from "express"
import { PrismaClient } from "@prisma/client"
const contentRouter = express()
contentRouter.use(express.json())
const prisma = new PrismaClient()

contentRouter.post("/create", async (req,res) => {
    const {title , description , category} = req.body
    const authorId = Number(req.body.id)
    if(!req.body){return res.status(411).json("error while fetching data")}

    const content = await prisma.content.create({
        data : {
            title,
            description,
            category,
            authorId,
        }
    })
    if(!content){return res.status(500).json("error while creating content")}
    res.status(200).json("content created successfully")
})

export default contentRouter