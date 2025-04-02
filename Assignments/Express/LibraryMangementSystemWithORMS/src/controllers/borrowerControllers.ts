import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import { AppDataSource } from "../config/data-source";
import { Book } from "../models/Books";
import { Bookcopies, BookStatus } from "../models/BookCopies";
import { BorrowedBooks } from "../models/BorrowedBooks";
import { ILike } from "typeorm";
import { BookRequest } from "../utils/types/bookTypes";

const booksRepository = AppDataSource.getRepository(Book)
const bookCopiesRepo = AppDataSource.getRepository(Bookcopies)
const borrowersRepo = AppDataSource.getRepository(BorrowedBooks)

export const borrowController = asyncHandler(async (req: UserRequest, res, next) => {
    try {
        const { title } = req.params
        const { due_date } = req.body

        if (!req.user) {
            res.status(201).json({ message: "Not Authorized" });
            return;
        }

        const user_id = req.user.id;

        //Ensuring only Organizer or admin and borrower can borrow books
        if (![12, 11, 13].includes(req.user?.role_id)) {
            res.status(403).json({ message: "Access denied: Only registered users can borrow books" });
            return
        }

        const bookExists = await booksRepository.findOne({
            where: { title: ILike(`%${title}%`) }
        });

        if (!bookExists) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        if (bookExists.quantity <= 0) {
            res.status(404).json({ message: 'No copies of the book currently exist' });
            return;
        }

        const copyExists = await bookCopiesRepo.findOne({
            where: { book: { id: bookExists.id } },
            relations: ['book']
        });


        if (!copyExists) {
            res.status(404).json({ message: "No available copies exists at this time" });
            return;
        }

        if (!due_date) {
            res.status(404).json({ message: "Due_date Required" });
            return;
        }


        const borrowedBook = await borrowersRepo.create({
            user: { id: user_id },
            book: { id: bookExists.id },
            copy: { copy_id: copyExists?.copy_id },
            due_date: new Date("2025-04-01")
        });

        await borrowersRepo.save(borrowedBook);

        await booksRepository.update(
            { id: bookExists.id },
            { quantity: bookExists.quantity - 1 }
        )

        await bookCopiesRepo.update(
            { copy_id: copyExists?.copy_id },
            { status: BookStatus.Borrowed }
        )

        res.status(200).json({ message: `Book was borrowed to be returned on ${due_date}` });

    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const returnController = asyncHandler(async (req: UserRequest, res, next) => {
    try {
        const { title } = req.params
        const { librarian_id } = req.body

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

        if (new Date() > dueDate) {
            res.status(201).json({ message: "You have delayed the due date, you might get fined" })
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

export const displayBorrowedBooks = asyncHandler(async (req: BookRequest, res, next) => {

    try {
        const id = req.user?.id

        if (!req.user?.id) {
            res.status(404).json({message: "No Token"})
            return
        }

        const borrowedBooks = await borrowersRepo.find({ where: 
            { user: { id: req.user?.id } } ,
            relations: ['copy', 'book', 'user']
        })

        if (!borrowedBooks) {
            res.status(404).json({ message: "You have no borrowed books" })
            return
        }

        res.status(201).json({
            borrowedBooks
        })
        
    } catch (error) {
        console.error("Cant get borrowed Books:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }

})