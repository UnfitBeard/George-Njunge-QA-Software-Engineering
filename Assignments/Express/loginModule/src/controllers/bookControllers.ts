import { NextFunction, Response, Request } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { EventRequest } from "../utils/types/eventTypes";
/**
 * @desc Create an event
 * @route POST /api/v1/events
 * @access Organizer Only
 */

export const createBook = asyncHandler(async(req: UserRequest, res: Response, next: NextFunction)=>{
    try {
        if (!req.user) {
            res.status(401).json({message: "Not Authorized"})
            return
        }

        const user_id = req.user?.id;
        const {title, author, genre, year, pages, publisher, description, image, price} = req.body;

        //Ensuring only Organizer or admin can create event
        if (req.user?.role_name !== "Librarian" && req.user?.role_name !== "Admin") {
            res.status(403).json({message: "Access denied: Only Organizers or Admins can create events"})
            return;
        }

        const bookResult = await pool.query(`INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price, created_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             RETURNING *`,
            [title, author, genre, year, pages, publisher, description, image, price, user_id]
        )

        res.status(201).json({
            message: "Event created successfully",
            book: bookResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" })
    }
})