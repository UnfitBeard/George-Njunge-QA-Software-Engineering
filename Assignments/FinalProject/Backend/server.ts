import express from 'express'
import pool from './db/db.config'
import cors from 'cors'
import userRoutes from './Routes/authRoutes'

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: "GET, PUT, DELETE",
    credentials: true
}))

app.get("/api/v1/users", async(req, res) => {
    try {
        const users = await pool.query("SELECT * FROM Users");
        res.status(200).json({
            user: users.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

app.use("/api/v1/auth", userRoutes)

app.listen(3000, ()=> {
    console.log('The server is listening on port 3000')
})