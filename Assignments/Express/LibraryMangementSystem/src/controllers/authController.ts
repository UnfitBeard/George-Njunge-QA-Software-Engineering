import { Request, Response, NextFunction } from "express"
import pool from "../config/db.config";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/helpers/generateToken";
import asyncHandler from "../middlewares/asyncHandler";

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role_id } = req.body

    // Check if user exists
    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    //before inserting into users, we need to hash the passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //insert into user table 
    const newUser = await pool.query(
        "INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role_id",
        [name, email, hashedPassword, role_id]
    );

    //generate JWT token for user access 
    generateToken(res, newUser.rows[0].id, newUser.rows[0].role_id)

    res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0]
    });

    //next() - I will redirect automatically is successfully registered
})

export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // Check if user exists
    const userExists = await pool.query(`SELECT users.id, users.username, users.email, users.password, users.role_id, user_roles.role_name
         FROM users
         JOIN user_roles ON users.role_id = user_roles.id
         WHERE email = $1`, [email]);

    if (userExists.rows.length === 0) {
        res.status(400).json({ message: "Wrong password or email" });
        return;
    }

    //generate the user
    const user = userExists.rows[0];

    //compare the passwords
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401).json({message: "Incorrect Credentials"})
        return;
    }

    //generate JWT token for user access 
    await generateToken(res, user.id, user.role_id)
     
    res.status(201).json({
        message: "User logged in successfully",
        user: {
            id: user.id,
            name: user.username,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        }
    });

    //next() - I will redirect automatically is successfully registered
})

export const logoutUser = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Secure in production
        sameSite: "strict",
        expires: new Date(0) // 15 minutes
    });


     // Set Refresh Token as HTTP-Only Secure Cookie
     res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // 30 days
    });
    res.status(200).json({message: "User logged out successfully"})
})



