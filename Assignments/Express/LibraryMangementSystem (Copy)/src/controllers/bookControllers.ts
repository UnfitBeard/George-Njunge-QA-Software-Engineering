import { NextFunction, Response, Request } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { BookRequest } from "../utils/types/bookTypes";
import { RoleRequest } from "../utils/types/userRoles";
/**
 * @desc Create an event
 * @route POST /api/v1/events
 * @access Organizer Only
 */

export const createBook = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not Authorized" })
            return
        }

        const user_id = req.user?.id;
        const { title, author, genre, year, pages, publisher, description, image, price } = req.body;

        //Ensuring only Organizer or admin can create event
        if (req.user?.role_name !== "Librarian" && req.user?.role_name !== "Admin") {
            res.status(403).json({ message: "Access denied: Only Organizers or Admins can create events" })
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
});

//get All Books everybody
export const getBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await pool.query("SELECT * FROM books ORDER BY created_at ASC");
    res.status(200).json(result.rows);
})

//get single book ...Everybody
export const getBookById = asyncHandler(async (req: BookRequest, res: Response) => {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM books WHERE id=$1", [id]);

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
    }
    res.status(200).json(result.rows[0]);
});

//update books only by librarian or Admin
export const updateBookController = asyncHandler(async (req: BookRequest, res: Response) => {
    try {
        const { id } = req.params
        const { title, author, genre, publishedYear, pages, publisher, description, image, price } = req.body;

        if (!req.user) {
            res.status(401).json({ message: "Not Authorized" });
            return;
        }

        const bookQuery = await pool.query("SELECT created_by FROM books WHERE id = $1", [id]);


        if (bookQuery.rows.length === 0) {
            res.status(404).json({ message: "Book not found" });
            return;
        }


        // Convert req.user.id to a number before comparison
        if (bookQuery.rows[0].created_by !== req.user.id && req.user.role_name !== "Admin") {
            res.status(403).json({ message: "Not authorized to update this book" });
            return;
        }

        const updateBook = await pool.query(`UPDATE books set title=$2, author=$3, genre=$4, year=$5, pages=$6, publisher=$7, description=$8, price=$9 WHERE id=$1
        RETURNING *`,
            [id, title, author, genre, publishedYear, pages, publisher, description, price])

        res.status(201).json({
            message: "Book successfully updated",
            updateBook: updateBook.rows[0]
        })
    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const deleteBookController = asyncHandler(async (req: BookRequest, res, next) => {

    try {
        const { id } = req.params;

        if (!req.user) {
            res.status(201).json({
                message: "Not allowed"
            })
            return;
        }

        const bookQuery = await pool.query("SELECT created_by FROM books WHERE id=$1", [id]);

        if (bookQuery.rows.length === 0) {
            res.status(404).json({ message: "Book does not exist" });
            return;
        }

        if (bookQuery.rows[0].created_by !== req.user.id && req.user.role_name !== "Admin") {
            res.status(403).json({ message: "Not authorized to delete the book" });
            return
        }

        const deleteBook = await pool.query("DELETE FROM books WHERE id=$1", [id]);

        res.status(201).json({
            message: "Book successfully deleted",
            updateBook: deleteBook.rows[0]
        })
    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})
