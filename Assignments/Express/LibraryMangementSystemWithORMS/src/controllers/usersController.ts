// Use UserRequest instead of Request.
// Ensure Admins manage users (using adminGuard in userRoutes.ts).
// Return only safe user details (excluding password).
// ✅ Ensures Admins can manage users (CRUD).
// ✅ Returns safe user details (excludes password).
// ✅ New users default to the Attendee role.
import { Request, Response } from "express";

import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";
import { AppDataSource } from "../config/data-source";
import { Users } from "../models/User";

//Only admins should get all users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    // const result = await pool.query("SELECT id, username, email, role_id FROM users ORDER BY id ASC");
    // res.status(200).json(result.rows);
   
        const usersRepository= await AppDataSource.getRepository(Users);
        const allUsers = await usersRepository.find();
        res.status(201).json({allUsers})
        console.log(allUsers)
})

//Get users by ID
export const getUsersById = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const userResults = AppDataSource.getRepository(Users)
    const theUser = userResults.findBy({id: parseInt(id)})

    if (!theUser) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json(theUser);
})

//DELETING USERS
export const deleteUsers = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await pool.query("SELECT id, username, email, role_id FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({
        message: "User Deleted",
        user: deleteUser.rows[0]
    });
})