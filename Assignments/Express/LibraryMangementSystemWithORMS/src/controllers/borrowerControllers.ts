import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { BookRequest } from "@app/utils/types/bookTypes";
import { UserRequest } from "@app/utils/types/userTypes";
import { NextFunction } from "express";
import { AppDataSource } from "@app/config/data-source";
import { Book } from "@app/models/Books";
import { Bookcopies } from "@app/models/BookCopies";

const booksRepository = AppDataSource.getRepository(Book)
const bookCopiesRepo = AppDataSource.getRepository(Bookcopies)

export const borrowController = asyncHandler(async (req: UserRequest, res, next) => {
    try {
        const { title } = req.params
        const {librarian_id, due_date, status } = req.body

        if (!req.user) {
            res.status(201).json({ message: "Not Authorized" });
            return;
        }

        const user_id = req.user.id;

        //Ensuring only Organizer or admin and borrower can borrow books
        if (req.user?.role_id !== 12 && req.user?.role_id !== 11 && req.user?.role_id !== 13) {
            res.status(403).json({ message: "Access denied: Only registered users can create borrow books" })
            return;
        }

        const result = await booksRepository.findOne({where: {title}})

        if (!result) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        const book_id = result.id
        const borrowedBook = await pool.query("INSERT INTO borrowers (user_id, book_id, librarian_id, due_date, status) values ($1, $2, $3, $4, $5)", [user_id, book_id, librarian_id, due_date, status]);

        res.status(200).json({message: `Book was borrowed to be returned on day one`});

    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const returnController = asyncHandler(async (req: UserRequest, res, next) => {
    try {
        const { title } = req.params
        const {librarian_id} = req.body

        if (!req.user) {
            res.status(201).json({ message: "Not Authorized" });
            return;
        }

        const user_id = req.user.id;

        //Ensuring only Organizer or admin can create event
        if (req.user?.role_name !== "Librarian" && req.user?.role_name !== "Admin" && req.user?.role_name !== "Borrower") {
            res.status(403).json({ message: "Access denied: Only registered users can create borrow books" })
            return;
        }

        const result = await pool.query("SELECT * FROM books WHERE title=$1", [title]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: "You are Returning The Wrong Book: Consult With The Librarian" });
            return;
        }

        const book_id = result.rows[0].id
        const dueDate = new Date(result.rows[0].due_date)
        const status = "returned"

        if (new Date()>dueDate) {
            res.status(201).json({message: "You have delayed the due date, you might get fined"})
        }

        const borrowedBook = await pool.query(
            "UPDATE borrowers SET user_id=$1, book_id=$2, librarian_id=$3, due_date=$4, status=$5 WHERE id=$6",
            [user_id, book_id, librarian_id, result.rows[0].due_date, status, book_id]
        );
        res.status(200).json({ message: "Book Successfully Returned" });

    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})