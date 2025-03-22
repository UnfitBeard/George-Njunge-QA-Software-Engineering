import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import jwt from "jsonwebtoken"
import pool from "../../config/db.config";
import { UserRequest } from "../../utils/types/userTypes";
import { AppDataSource } from "@app/config/data-source";
import { Users } from "@app/models/User";

const userRepository = AppDataSource.getRepository(Users)
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {userId: number, roleId: number};

        //get the user from the database
        const userQuery = await userRepository.findOneBy({id: decoded.userId})
        

        if (!userQuery) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        console.log(userQuery)

        req.user = userQuery

        //attach the user to the request
        next() //proceed to the next thing

    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }

})