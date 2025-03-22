import { NextFunction, Response, Request } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { BookRequest } from "../utils/types/bookTypes";
import { RoleRequest } from "../utils/types/userRoles";
import { updateQuantity } from "@app/utils/helpers/bookUpdateQuantity.";
/**
 * @desc Create an event
 * @route POST /api/v1/events
 * @access Organizer Only
 */

export const createBook = asyncHandler(async (req: UserRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "Not Authorized" });

    const { title, author, genre, year, pages, publisher, description, image, price, location } = req.body;
    const { id: user_id, role_name } = req.user;

    if (role_name !== "Librarian" && role_name !== "Admin") {
        return res.status(403).json({ message: "Access denied: Only Librarians or Admins can create books" });
    }

    try {
        await pool.query("BEGIN"); // Start transaction

        const bookExists = await pool.query("SELECT id FROM books WHERE title=$1 AND author=$2", [title, author]);

        let bookID;

        if (bookExists.rows.length > 0) {
            bookID = bookExists.rows[0].id;
            await pool.query("UPDATE books SET bookquantity = bookquantity + 1 WHERE id=$1", [bookID]);
        } else {
            const bookResult = await pool.query(
                `INSERT INTO books (title, author, genre, year, pages, publisher, description, image, price, created_by, bookquantity) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 1) 
                 RETURNING id`,
                [title, author, genre, year, pages, publisher, description, image, price, user_id]
            );
            bookID = bookResult.rows[0].id;
        }

        // Ensure bookID is defined before inserting into bookcopies
        if (bookID) {
            const inventoryNumber = `${bookID}-${Date.now()}`;
            await pool.query(
                "INSERT INTO bookcopies(book_id, inventory_number, condition, status, location) VALUES ($1, $2, 'New', 'Returned', $3)",
                [bookID, inventoryNumber, location]
            );
        }

        await pool.query("COMMIT"); // Commit transaction
        res.status(201).json({ message: "Book added successfully" });

    } catch (error) {
        await pool.query("ROLLBACK"); // Rollback transaction on error
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
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
        const { title, author, genre, publishedYear, pages, publisher, description, image, price, quantity } = req.body;

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

        const updateBook = await pool.query(`UPDATE books set title=$2, author=$3, genre=$4, year=$5, pages=$6, publisher=$7, description=$8, price=$9 quantity = $10 WHERE id=$1
        RETURNING *`,
            [id, title, author, genre, publishedYear, pages, publisher, description, price, quantity])

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
