import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import 'dotenv/config'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { Pool } from "pg"
import pool from "./db/db"
import exp from "constants"

type Book = {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    description: string,
    image: string,
    price: number;
    quantity?: number;
}

type Books = Book[]
export { Books, Book }
//configure the dotenv 
//top most level
dotenv.config({ path: __dirname + "./../.env" })

//instance of express
//the second most top level
const app = express()

//load the variables
const port = process.env.PORT
console.log(port) //3000


//enable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))
app.use(express.json())

//User Route
//create user
app.post('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body
        //check if email already exists
        console.log(req.body)
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({message: "User already exists"})
            return
        }

        //Insert new user
        const userResult = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password])
        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    } catch (error) {
        
    }
})


// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concerns 