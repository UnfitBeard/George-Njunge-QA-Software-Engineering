import { BookRequest } from "../../utils/types/bookTypes";
import asyncHandler from "../asyncHandler";
import pool from "../../config/db.config";
import { NextFunction } from "express";

export const librarianGuard = asyncHandler<void, BookRequest>(async(req, res, next)=>{
    const {id: bookId} = req.params;

    if (!req.user) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }

    //if user owner of event
    const bookQuery = await pool.query("SELECT created_by FROM books WHERE id = $1", [bookId]);

   
    if (bookQuery.rows.length === 0) {
        res.status(404).json({ message: "Book not found" });
        return;
    }

    console.log("Book Owner:", bookQuery.rows[0].user_id);

    if (bookQuery.rows[0].created_by !== req.user.id) {
        res.status(403).json({
            message: "Not authorized to edit this book"
        })
        return;
    }
        
    //Attach event details to request
    req.book = {
        id: bookQuery.rows[0].id,
        created_by: bookQuery.rows[0].created_by,
        title: bookQuery.rows[0].title,
        author: bookQuery.rows[0].author,
        genre: bookQuery.rows[0].genre,
        publishedYear: bookQuery.rows[0].year, 
        pages:bookQuery.rows[0].pages,
        price: bookQuery.rows[0].price,
        publisher: bookQuery.rows[0].publisher,
        created_at: bookQuery.rows[0].created_at,
        updated_at: bookQuery.rows[0].updated_at
    };

    next();
    
})