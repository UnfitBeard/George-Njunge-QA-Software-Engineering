import { Express } from "express";
import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"
import bodyParser from "body-parser";
import { Pool } from "pg"

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
});

//Route to register the user
app.use(express.json()); // Make sure to parse JSON body

app.post("/register", async (req, res): Promise<void> => {
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



app.listen(5000, () => {
    console.log(`server running on http://localhost:5000`)
})