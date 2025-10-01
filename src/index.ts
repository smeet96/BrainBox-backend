import express, { Request } from "express"
import jwt from "jsonwebtoken"
import userRouter from "./Routes/userRoute"
import contentRouter from "./Routes/contentRoute"
import dotenv from "dotenv"
import cors from "cors"
const app = express()
app.use(express.json())
dotenv.config()
const pass = process.env.pass!

app.use(cors());

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

app.use("/api/v1/content/" , async (req,res,next) => {
const authorization = req.headers.authorization

if(!authorization){return res.json({"msg" : "did not get authorization headers "})}

const auth = authorization.split(" ")[1]

try {
    const decode = jwt.verify(auth , pass) as {userId : string}
   req.id = decode.userId 
    next() 
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
})


app.use("/api/v1/user",userRouter)
app.use("/api/v1/content",contentRouter)
app.listen(3000)