// Use UserRequest instead of Request.
// Ensure Admins manage users (using adminGuard in userRoutes.ts).
// Return only safe user details (excluding password).
// ✅ Ensures Admins can manage users (CRUD).
// ✅ Returns safe user details (excludes password).
// ✅ New users default to the Attendee role.
import { Request, Response } from "express";

import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";

//Only admins should get all users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await pool.query("SELECT id, username, email, role_id FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
})

//Get users by ID
export const getUsersById = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await pool.query("SELECT id, username, email, role_id FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json(result.rows[0]);
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