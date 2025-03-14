import expressAsyncHandler from "express-async-handler";
import { asyncHandler } from "../middlewares/ayncHandler";
import { NextFunction, Request, Response } from "express";
import pool from "../config/db.config";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/helpers/generateToken";

export const registerUser = asyncHandler(
    async(req:Request, res:Response)=>{
        const { name, email, password, role_id } = req.body
        //check if email already exists
        console.log(req.body)
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        //Insert new user
        //ID should be serial....autoIncrement
        const userResult = await pool.query("INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, hashedPassword, role_id])

        //generate jwt token for user access
        generateToken(res, userResult.rows[0].id, userResult.rows[0].role_id)

        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        });
        //next() - redirect atomatically if succcessfuly registered
    });

    export const loginUser = asyncHandler(async(req:Request, res:Response)=>{
            const { email, password} = req.body
            //check if email already exists
            console.log(req.body)
            const emailCheck = await pool.query("SELECT users.id, users.email, users.password, users.role_id FROM users JOIN roles ON users.role_id = roles.role_id WHERE users.email = $1;", [email])
    
            if (emailCheck.rows.length === 0) {
                res.status(400).json({ message: "Invalid Email Or Password" })
                return
            }
    
            const user = emailCheck.rows[0];

            //compare passwords 
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(401).json({message: "Invalid Email or Password"});
                return;
            }

            await generateToken(res, user.id, user.role_id);    
            res.status(200).json({
                message: "User successfully logged in",
                user: emailCheck.rows[0]
            });
            //next() - redirect atomatically if succcessfuly registered
        });

export const logoutUser = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    //We need to immediately invalidate the access token and the refresh token
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),//15 minutes
    });

    res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "production",
        sameSite: "strict",
        expires: new Date(0),//30 days
    });
    res.status(200).json({message: "User successfully logged out"})
})