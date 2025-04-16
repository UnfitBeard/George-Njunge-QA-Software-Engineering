import express from 'express'
import pool from './db/db.config'
import cors from 'cors'
import authRoutes from './Routes/authRoutes'
import usersRoutes from './Routes/userRoutes'
import jobRouter from './Routes/jobRoutes'

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: "GET, PUT, DELETE",
    credentials: true
}))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/jobs", jobRouter)

app.listen(3000, ()=> {
    console.log('The server is listening on port 3000')
})