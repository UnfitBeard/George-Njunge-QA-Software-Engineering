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

//User Route
//create user
//reading an external file like a database.....use async 
app.post('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        //check if email already exists
        console.log(req.body)
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        //Insert new user
        //ID should be serial....autoIncrement
        const userResult = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password])
        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//get all books
app.get('/api/v1/books', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM book;")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error getting books:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})
//create a book
app.post('/api/v1/books', async (req: Request, res: Response) => {
    try {
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        //Insert event
        const bookResult = await pool.query(
            `INSERT INTO book (user_id, title, author, genre, year, pages, publisher, description, image, price) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price]
        );
        res.status(201).json({
            message: "Book successfully added",
            bookResult: bookResult.rows[0]
        })

    } catch (error) {
        console.error("Error creating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//submit books
app.post('/submit', async (req: Request, res: Response) => {
    try {
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        //Insert event
        const bookResult = await pool.query(
            `INSERT INTO book (user_id, title, author, genre, year, pages, publisher, description, image, price) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price]
        );
        res.status(201).json({
            message: "Book successfully added",
            bookResult: bookResult.rows[0]
        })

    } catch (error) {
        console.error("Error creating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//get Books
app.get('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM book;")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error getting user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})


//booksFilters
app.get('/api/booksFilter', async (req: Request, res: Response) => {
    try {
        const { title, genre, sortBy, order } = req.query;
        let query = 'SELECT * FROM book';
        let conditions = [];
        let params: string[] = [];

        if (genre) {
            conditions.push(`genre ILIKE $${params.length + 1}`);
            params.push(`%${genre}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        if (sortBy && (sortBy === 'Pages' || sortBy === 'Year')) {
            const sortOrder = order === 'Ascending' ? 'ASC' : 'DESC';
            query += ` ORDER BY ${sortBy} ${sortOrder}`;
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Update entire Book record
app.put('/api/v1/books/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const bookCheck = await pool.query("SELECT id FROM book WHERE id = $1", [id]);
        if (bookCheck.rows.length === 0) {
            res.status(400).json({ message: "Book not found" })
            return
        }
        //Insert event
        const bookResult = await pool.query(
            `UPDATE book set user_id=$1, title=$2, author=$3, genre=$4, year=$5, pages=$6, publisher=$7, description=$8, image=$9, price=$10
             RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price]
        );
        res.status(201).json({
            message: "Book successfully updated",
            bookResult: bookResult.rows[0]
        })

    } catch (error) {
        console.error("Error adding book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//Update the fields e.g the title of the books
app.patch('/api/v1/books/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const checkBook = await pool.query("SELECT * FROM book WHERE id = $1", [id])

        if (checkBook.rows.length === 0) {
            res.status(400).json({ message: "Book not found" })
            return
        }

        const updateBook = await pool.query(`UPDATE book set user_id=$1, title=$2, author=$3, genre=$4, year=$5, pages=$6, publisher=$7, description=$8, image=$9, price=$10
        RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price])

        res.status(201).json({
            message: "Book successfully updated",
            updateBook: updateBook.rows[0]
        })
    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//Delete the books
app.delete('/api/v1/books/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const checkBook = await pool.query("SELECT * FROM book WHERE id=$1", [id]);
        if (checkBook.rows.length === 0) {
            res.status(404).json({
                message: "Book not found"
            })
        }
        const deleteBook = await pool.query("DELETE FROM book WHERE id=$1", [id]);
        res.json(201).json({
            message: "Book succesfully deleted"
        })
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

//login users
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (isMatch) {
                res.json({ success: true, message: "Login successful" });
                return;
            }
        }
        res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//get all users
app.get('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM users;")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error getting user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//get a single user
app.get('/api/v1/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const result = await pool.query("SELECT * FROM users WHERE id = $1;", [userId])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//update User
app.put('/api/v1/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body

        const checkUser = await pool.query("SELECT * FROM users WHERE id = $1;", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        const result = await pool.query("UPDATE users set name=$1, email=$2, password=$3 WHERE id=$4 RETURNING*;", [name, email, password, id])
        res.status(201).json({
            message: "User successfully updated",
        })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//Delete the User
app.delete('/api/v1/users/:id', async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const checkUser = await pool.query("SELECT * FROM users WHERE id = $1;", [userId])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        const result = await pool.query("DELETE FROM users WHERE id = $1;", [userId])
        res.status(200).json({ message: "User deleted Successfully" })
    } catch (error) {
        console.error("Error deleting user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concerns 