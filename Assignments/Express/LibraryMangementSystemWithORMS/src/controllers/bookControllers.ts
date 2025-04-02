import { NextFunction, Response, Request } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { BookRequest } from "../utils/types/bookTypes";
import { RoleRequest } from "../utils/types/userRoles";
import { AppDataSource } from "../config/data-source";
import { Book } from "../models/Books";
import { Bookcopies } from "../models/BookCopies";
import { parse } from "path";
/**
 * @desc Create an event
 * @route POST /api/v1/events
 * @access Organizer Only
 */

const bookRepository = AppDataSource.getRepository(Book)
const bookCopiesRepo = AppDataSource.getRepository(Bookcopies)

export const createBook = asyncHandler(async (req: BookRequest, res: Response) => {
    if (!req.user) { 
        res.status(401).json({ message: "Not Authorized" });
    return
 }

    const { title, author, genre, year, pages, publisher, description, image, price, location } = req.body;
    const { id: user_id, role_name, role_id } = req.user;

    if (role_id !== 12 && role_id !== 13) {
        res.status(403).json({ message: "Access denied: Only Librarians or Admins can create books" });
        return
    }

    try {
        let book = await bookRepository.findOne({ where: { title, author } });

        if (book) {
            await bookRepository.update(
                { id: book.id },
                { quantity: book.quantity + 1 }
            );
        } else {
            book = await bookRepository.create({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                publication_year: req.body.publication_year,
                pages: req.body.pages,
                image_url: req.body.image_url,
                description: req.body.description,
                quantity: req.body.quantity,
                createdBy: req.user.id
            });

            const savedBook = await bookRepository.save(book);
        }

        // Ensure bookID is defined before inserting into bookcopies
        if (book) {
            const inventoryNumber = `${book.id}-${Date.now()}`;
            const addToCopies = bookCopiesRepo.create({
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
    const intID = parseInt(id)

    const result = await bookRepository.findOne({ where: { id: intID } })

    if (!result) {
        res.status(404).json({ message: "Book not found" });
        return;
    }
    res.status(200).json(result);
});

//update books only by librarian or Admin
export const updateBookController = asyncHandler(async (req: BookRequest, res: Response) => {
    try {
        const { id } = req.params
        const { title, author, genre, publishedYear, pages, publisher, description, image, quantity } = req.body;

        if (!req.user) {
            res.status(401).json({ message: "Not Authorized" });
            return;
        }

        let book = await bookRepository.findOne({ where: { id: parseInt(id) } });

        if (book) {
            await bookRepository.update(
                { id: book.id },
                {
                    title: title,
                    author: author,
                    genre: genre,
                    publisher: publisher,
                    pages: pages,
                    publication_year: publishedYear,
                    description: description,
                    quantity: quantity,
                    image_url: image,
                    createdBy: req.user,
                }
            );
        }


        res.status(201).json({
            message: "Book successfully updated",
            book
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

        const bookQuery = await bookRepository.findOne({ where: { id: parseInt(id) } })

        if (!bookQuery) {
            res.status(404).json({ message: "Book does not exist" });
            return;
        }

        if (req.user.role_id !== 12 && req.user.role_id !== 13) {
            res.status(403).json({ message: "Not authorized to delete the book" });
            return;
        }
        const deleteBook = await bookRepository.delete({ id: bookQuery.id })

        if (deleteBook.affected === 0) {
            res.status(201).json({ message: "Failed to delete book" });
            return;
        }

        res.status(201).json({
            message: "Book successfully deleted",
            deleteBook
        })
    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})
