import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import 'dotenv/config'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { Pool } from "pg"
import pool from "./db/db"
import bcrypt from "bcrypt";
import bodyParser, { BodyParser } from "body-parser"
import exp from "constants"
import ansiStyles from "chalk/source/vendor/ansi-styles"
import { getSingleBookController,booksFilterController, deleteBookController, getAllBooksController, postBookController, updateBooksController, patchBookController } from "./controllers/booksController"
import postUserController, { deleteUserController, getAllUsersController, getSingleUserController, loginControllers, postUserController2, updateUserController } from "./controllers/usersControllers"
import usersRoutes from "./Routes/usersRoute"
import booksRoutes from './Routes/booksRouter'
import { notFound } from "./middleware/notFoundError"

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
dotenv.config({ path: __dirname + "./../.env" })

//instance of express
const app = express()

//load the variables
const port = process.env.PORT
console.log(port) //3000


//enable CORS for all origins  
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//BOOK ROUTES
//create them
app.use("/api/v1/books", booksRoutes)

//USER ROUTES
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/booksFilter", booksRoutes)
app.use("/submit", booksRoutes)

//middlewares after routes
app.use(notFound)

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concerns 