import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import jwt from "jsonwebtoken";
import { UserRequest } from "../../utils/types/userTypes";
import { AppDataSource } from "@app/config/data-source";
import { Users } from "@app/models/User";

const userRepository = AppDataSource.getRepository(Users);

export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token;

    // Get token from headers or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    if (!token) {
        return res.status(401).json({ message: "Not Authorized, no token" });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number; roleId: number };

        // Get user from database
        const userQuery = await userRepository.findOneBy({ id: decoded.userId });

        if (!userQuery) {
            return res.status(401).json({ message: "User not found" });
        }

        console.log("Authenticated User:", userQuery);

        req.user = userQuery;

        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
});
