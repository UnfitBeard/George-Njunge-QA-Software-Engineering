import { asyncHandler } from "../middlewares/ayncHandler";
import { Response, Request } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";

export const postBookController = asyncHandler (async (req: UserRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({message: "Not Authorized"})
            return;
        }

        const user_id = req.user.id;
        const { title, author, genre, year, pages, publisher, description, image, price } = req.body


        if (req.user.role_id !== 1 && req.user.role_id !== 2) {
            res.status(403).json({message: "Access Denied"});
            return;
        }
        //Insert event
        const bookResult = await pool.query(
            `INSERT INTO book (user_id, title, author, genre, year, pages, publisher, description, image, price) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price]
        );
        res.status(201).json({
            message: "Book successfully added",
            bookResult: bookResult.rows[0]
        })

    } catch (error) {
        console.error("Error creating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});