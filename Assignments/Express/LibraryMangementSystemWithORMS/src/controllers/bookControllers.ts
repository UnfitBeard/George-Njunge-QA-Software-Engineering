import { NextFunction, Response, Request } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { BookRequest } from "../utils/types/bookTypes";
import { RoleRequest } from "../utils/types/userRoles";
import { AppDataSource } from "@app/config/data-source";
import { Book } from "@app/models/Books";
import { Bookcopies } from "@app/models/BookCopies";
/**
 * @desc Create an event
 * @route POST /api/v1/events
 * @access Organizer Only
 */

const bookRepository = AppDataSource.getRepository(Book)
const bookCopiesRepo = AppDataSource.getRepository(Bookcopies)

export const createBook = asyncHandler(async (req: BookRequest, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "Not Authorized" });

    const { title, author, genre, year, pages, publisher, description, image, price, location } = req.body;
    const { id: user_id, role_name, role_id } = req.user;

    if (role_id !== 12 && role_id !== 13) {
        return res.status(403).json({ message: "Access denied: Only Librarians or Admins can create books" });
    }

    try {
        let book = await bookRepository.findOne({where: {title, author}});

        if (book) {
            await bookRepository.update(
                {id: book.id},
                {quantity: book.quantity + 1}
            );
        } else {
            book = bookRepository.create({
                title,
                author,
                genre,
                publisher,
                pages,
                publication_year: year,
                description,
                image_url: image,
                createdBy: req.user, 
            });

            await bookRepository.save(book);
        }

        // Ensure bookID is defined before inserting into bookcopies
        if (book) {
            const inventoryNumber = `${book.id}-${Date.now()}`;
            const addToCopies =  bookCopiesRepo.create({
                inventory_number: inventoryNumber,
                location,
                book: book
            });
            await bookCopiesRepo.save(addToCopies)
        }

        res.status(201).json({ message: "Book added successfully" });

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//get All Books everybody
export const getBooks = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const result = await bookRepository.find()
    res.status(200).json(result);
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
