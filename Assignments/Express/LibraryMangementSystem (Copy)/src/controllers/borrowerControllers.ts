import asyncHandler from "../middlewares/asyncHandler";
import pool from "../config/db.config";

export const borrowController = asyncHandler(async (req, res, next) => {
    const id = req.params
    
    const checkBook = await pool.query("SELECT id FROM books WHERE id=$1",[id]);
    if(checkBook.rows.length === 0) {
        res.status(401).json({message: "Book does not exist"});
    }
})