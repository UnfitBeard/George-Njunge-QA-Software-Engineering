import { Request, Response, NextFunction } from 'express';

import asyncHandler from "../Utils/Helpers/asyncHandler";
import pool from '../db/db.config';
import bcrypt from 'bcryptjs'
import { generateToken } from '../Utils/Helpers/generateToken';

export const registration = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, user_type } = req.body
        const checkUser = await pool.query("SELECT email FROM users WHERE email = $1", [email]);
        if (checkUser.rows.length >= 1) {
            res.send({ message: "User already exists" });
            return
        }
        const password_hash = await bcrypt.hash(password, 10);
        const addUser = await pool.query("INSERT INTO users(email, password_hash, user_type) VALUES($1, $2, $3) RETURNING *", [email, password_hash, user_type])
        
        await generateToken(res, addUser.rows[0].id, addUser.rows[0].usertype)
        res.status(201).json({
            message: "User created sucessfully",
            user: addUser.rows
        });
    } catch (error) {
        console.log(error);
    }
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction)=> {
    const {email, password} = req.body

    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkUser.rows.length === 0) {
            res.send({ message: "Incorrect Password or Username" });
            return
        }

    const user = checkUser.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
        res.send({ message: "Incorrect Password or Username" });
        return
    }

    await generateToken(res, user.id, user.user_type);

    res.status(201).json({
        message: "User Logged in succesfully",
        user: {
            id: user.id,
            email: user.email,
            user_type: user.user_type
        }
    })
})