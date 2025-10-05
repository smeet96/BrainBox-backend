import express from "express"
import { PrismaClient } from "@prisma/client"
const contentRouter = express()
contentRouter.use(express.json())
const prisma = new PrismaClient()

contentRouter.post("/create", async (req,res) => {
    const {title , description , category} = req.body
    const authorId = Number(req.id)
    if(!req.body){return res.status(411).json("error while fetching data")}

    const content = await prisma.content.create({
        data : {
            title,
            description,
            authorId,
            category: {
          create: category.map((cat:any) => ({
            type: cat.type
          }))
        }
        }
    })
    if(!content){return res.status(500).json("error while creating content")}
    res.status(200).json("content created successfully")
})

contentRouter.get("/get" , async (req,res)=> {
    const authorId = Number(req.id)
    if(!authorId) {return res.status(411).json("token not found")}
    const contents = await prisma.content.findMany({
        where:{
            authorId : authorId
        },
        select : {
            id : true,
            title : true,
            description : true,
            date : true,
            category : true
        }
    })
    if(!contents){return res.status(411).json("data fetching failed")}
    return res.status(200).json(contents)
})

export default contentRouter