import { Request, Response, NextFunction } from 'express';
import asyncHandler from "../Utils/Helpers/asyncHandler";
import bcrypt from 'bcryptjs';
import { generateToken } from '../Utils/Helpers/generateToken';
import { AppDataSource } from '../db/dataSource';
import { User } from '../Models/User';

const userRepository = AppDataSource.getRepository(User);

export const registration = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, user_type } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
        email,
        password_hash,
        user_type,
    });

    await userRepository.save(newUser);

    await generateToken(res, newUser.user_id, newUser.user_type);

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: newUser.user_id,
            email: newUser.email,
            user_type: newUser.user_type
        }
    });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
        res.status(400).json({ message: "Incorrect Password or Username" });
        return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        res.status(400).json({ message: "Incorrect Password or Username" });
        return;
    }

    await generateToken(res, user.user_id, user.user_type);

    res.status(200).json({
        message: "User Logged in successfully",
        user: {
            id: user.user_id,
            email: user.email,
            user_type: user.user_type
        }
    });
});
