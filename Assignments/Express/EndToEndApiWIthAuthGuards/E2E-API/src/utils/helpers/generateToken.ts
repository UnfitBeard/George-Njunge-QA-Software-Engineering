import { Response } from "express";
import dotenv from "dotenv"
import "dotenv/config"
import jwt from "jsonwebtoken";
import path from "path"
import { tr } from "@faker-js/faker/.";

dotenv.config({ path: __dirname + "/../../../.env" })

//Debugging to check if env vars are loaded correctly
console.log("JWT_SECRET", process.env.JWT_SECRET)
console.log("REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET)

export const generateToken = (res: Response, userId: string, role_id: number) => {
    const jwtSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!jwtSecret || !refreshSecret) {
        throw new Error("NO Tokens...undefined in env variables");
    }

    try {
        //short lived access token for 15 minutes
        const accessToken = jwt.sign({userId, role_id}, jwtSecret, {expiresIn: "15m"});

        //long lived token that lasts for 30 days
        const refreshToken = jwt.sign({userId}, refreshSecret, {expiresIn: "30d"});

        //set Access token as HTTP-Only secure cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 15*60*1000,//15 minutes
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "production",
            sameSite: "strict",
            maxAge: 30*24*60*60*1000,//30 days
        });

        return {accessToken, refreshToken}

    } catch (error) {
        console.error("error Gneerating JWT")
    }
}