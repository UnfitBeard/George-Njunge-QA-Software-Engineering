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
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
    origin: allowedOrigins,
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Login and Registration
app.post("/register", async(req, res): Promise<void>=>{                                                                         
    try {
        console.log(req.body); // Check if data is received
        
        const { username, email, password } = req.body;

        if (!username || !email || !password ) {
            res.status(400).json({ message: "All fields are required" });
            return; // ✅ Fix: Ensures function exits after sending response
        }

        // Check if user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
        return; // ✅ Ensures function exits after sending response

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return; // ✅ Ensures function exits after sending response
    }
});

app.post("/login", async (req, res): Promise<void> => {
    try {
        console.log(req.body); // Check if data is received
        
        const { email, password } = req.body;

        if (!email || !password ) {
            res.status(400).json({ message: "All fields are required" });
            return; // ✅ Fix: Ensures function exits after sending response
        }


        // Hash the password before saving
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length === 0) {
            res.status(400).json({ message: "Incorrect Password or Email" });
            return;
        }

        const user = existingUser.rows[0]

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        res.status(200).json({ message: "Login Successful"});
        return;
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return; // ✅ Ensures function exits after sending response
    }
});

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
