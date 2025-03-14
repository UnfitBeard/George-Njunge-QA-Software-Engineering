//dotenv
//express instance
//load Variables
//Enable all important middleware
//routes
//load more middlewares e.g errorHandlers
//start server

import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import authRoutes from "./routes/authRoutes"
import usersRoutes from "./routes/usersRoutes"
import bookRoutes from "./routes/booksRoutes"

dotenv.config({ path: __dirname + "./../.env" })

const app = express()

const crypto = require('crypto');

function generateHash(data: any) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Generate two unique hashes
const token1 = generateHash(crypto.randomBytes(32).toString('hex'));
const token2 = generateHash(crypto.randomBytes(32).toString('hex'));

console.log("Token 1:", token1);
console.log("Token 2:", token2);


//NEVER FORGET THIS
app.use(express.json()) //parses app.json
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
    origin: allowedOrigins,
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))


//routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/books", bookRoutes)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

