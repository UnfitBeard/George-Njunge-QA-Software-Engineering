//dotenv
//express instance
//load variables
//enable all important middleware
//create all routes 
//load more middleware - eg error handlers
//start the server 

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import bookROutes from "./routes/bookRoutes"
import userRoutes from "./routes/usersRoute"
import 'reflect-metadata'
import { AppDataSource } from './config/data-source';
import { Repository } from 'typeorm';
import { UserRoles } from './models/UserRoles';



// 1:dotenv
dotenv.config()

//2:instance of express  
const app = express()

//3:NEVER IN YOUR LIFE FORGET THIS 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Cookie parser middleware
app.use(cookieParser())
//eneable CORS for all origins  
// app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))

AppDataSource.initialize()
    .then(async () => {
       const userRepo = await AppDataSource.getRepository(UserRoles);
       const allUsers = await userRepo.find()
       console.log(allUsers)
    })
    .catch((error) => console.log(error))

//4. routes 
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/books", bookROutes)
app.use("/api/v1/users", userRoutes)

//5. middlewares for error handlers 


//6: start the serve 
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀🚀 server is running on port - ${PORT}`)
})
