import { asyncHandler } from "../ayncHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import pool from "../../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";

//Auth Middleware to protect the routes
export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token;

    //Try to get token from authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith("bearer")) {
        token = req.headers.authorization.split(" ")[1];
        return;
    }

    //get the tokens from the cookies
    if (!token && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        res.status(401).json({ message: "Not Authorized, no token" })
    }

    try {
        //we have the token but we need to verify it

      
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT Secret Not Found");
        }
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userID: string, roleId: number }

        //get the user from the database
        const userCheck = await pool.query("SELECT users.id, users.email, users.role_id FROM users JOIN roles ON users.role_id = roles.role_id WHERE users.id = $1;", [decoded.userID])
    
            if (userCheck.rows.length === 0) {
                res.status(401).json({ message: "User not found" })
                return
            }

            //attach user to request
            req.user = userCheck.rows[0]

            next()

    } catch (error) {
        console.error("JWT Error:", error)
        res.status(401).json({ message: "Not authorized token has failed" })
    }
})