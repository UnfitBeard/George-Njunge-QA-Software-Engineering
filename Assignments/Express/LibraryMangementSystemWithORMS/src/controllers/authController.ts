import { Request, Response, NextFunction } from "express"
import pool from "../config/db.config";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/helpers/generateToken";
import asyncHandler from "../middlewares/asyncHandler";
import { AppDataSource } from "@app/config/data-source";
import { Users } from "@app/models/User";
import { getRepository } from "typeorm";
import { UserRoles } from "@app/models/UserRoles";

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role_id, created_at } = req.body

    // Check if user exists
    const userRepository = await AppDataSource.getRepository(Users)
    const user = await userRepository.findOneBy({email})

    if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    //before inserting into users, we need to hash the passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //insert into user table 
    const newUser = userRepository.create({
        username: name,
        email,
        password: hashedPassword,
        role_id,
        created_at: `${new Date()}`
    })

    await userRepository.save(newUser);

    //generate JWT token for user access 
    generateToken(res, newUser.id.toString(), newUser.role_id)

    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });

    //next() - I will redirect automatically is successfully registered
})

export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const userRepository = AppDataSource.getRepository(Users);

    // Check if user exists
    const userExists = await userRepository.createQueryBuilder("users")
    .innerJoinAndSelect("users.role", "role")
    .where("users.email = :email", {email})
    .getOne();

    if (!userExists) {
        res.status(400).json({ message: "Wrong password or email" });
        return;
    }

    //generate the user
    const user = userExists;

    //compare the passwords
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401).json({message: "Incorrect Credentials"})
        return;
    }

    //generate JWT token for user access 
    await generateToken(res, user.id.toString(), user.role_id)
     
    res.status(201).json({
        message: "User logged in successfully",
        user: {
            id: user.id,
            name: user.username,
            email: user.email,
            role_id: user.role_id,
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



