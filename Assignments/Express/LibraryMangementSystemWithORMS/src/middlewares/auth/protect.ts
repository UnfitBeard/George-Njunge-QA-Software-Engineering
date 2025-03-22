import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import jwt from "jsonwebtoken"
import pool from "../../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";
export const protect = asyncHandler(async(req: UserRequest, res:Response, next: NextFunction)=>{
    let token;

    //try to get token from auth headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token && req.cookies.access_token) {
        token = req.cookies.access_token
    }

    if(!token) {
        res.status(401).json({message: "Not Authorized, no token"});
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables"); 
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {userId: string, roleId: number};

        //get the user from the database
        const userQuery = await pool.query(
            "SELECT users.id, users.username, users.email, users.role_id, user_roles.role_name FROM users JOIN user_roles ON users.role_id = user_roles.id WHERE users.id = $1",
            [decoded.userId]
        )

        if (userQuery.rows.length === 0) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = userQuery.rows[0]

        //attach the user to the request
        next() //proceed to the next thing

    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }

})