import { asyncHandler } from "../middlewares/ayncHandler";
import { Response, Request } from "express";
import pool from "../config/db.config";


//only admins should get all users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC;")
    res.status(200).json(result.rows)
})