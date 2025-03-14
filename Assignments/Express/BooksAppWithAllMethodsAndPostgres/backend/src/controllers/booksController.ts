import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import 'dotenv/config'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import { Pool } from "pg"
import pool from "../db/db"
import bcrypt from "bcrypt";
import bodyParser, { BodyParser } from "body-parser"
import exp from "constants"
import ansiStyles from "chalk/source/vendor/ansi-styles"
import asyncHandler from "../middleware/asyncHandler"

export const postBookController = asyncHandler (async (req: Request, res: Response) => {
    try {
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
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

export const updateBooksController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const bookCheck = await pool.query("SELECT id FROM book WHERE id = $1", [id]);
        if (bookCheck.rows.length === 0) {
            res.status(400).json({ message: "Book not found" })
            return
        }
        //Insert event
        const bookResult = await pool.query(
            `UPDATE book set user_id=$1, title=$2, author=$3, genre=$4, year=$5, pages=$6, publisher=$7, description=$8, image=$9, price=$10 WHERE id=$11
             RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price, id]
        );
        res.status(201).json({
            message: "Book successfully updated",
            bookResult: bookResult.rows[0]
        })

    } catch (error) {
        console.error("Error adding book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});

export const deleteBookController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        //before deleting, check if the event is available 
        const resultCCheck = await pool.query("SELECT * FROM book WHERE id=$1", [id])
        if (resultCCheck.rows.length === 0) {
            res.status(404).json({
                message: "Book not found"
            })
            return
        }
        await pool.query("DELETE FROM book WHERE id=$1", [id])
        res.json({ message: "Book deleted successfully" });

    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export const booksFilterController =  asyncHandler(async (req: Request, res: Response) => {
    try {
        const { title, genre, sortBy, order } = req.query;
        let query = 'SELECT * FROM book';
        let conditions = [];
        let params: string[] = [];

        if (genre) {
            conditions.push(`genre ILIKE $${params.length + 1}`);
            params.push(`%${genre}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        if (sortBy && (sortBy === 'Pages' || sortBy === 'Year')) {
            const sortOrder = order === 'Ascending' ? 'ASC' : 'DESC';
            query += ` ORDER BY ${sortBy} ${sortOrder}`;
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export const getAllBooksController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM book;")
        res.status(200).json(result.rows)
        return
    } catch (error) {
        console.error("Error getting books:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});

export const getSingleBookController = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const {id} = req.params;
    try {
        const result = await pool.query("SELECT * FROM book WHERE id=$1;", [id])

        if (result.rows.length === 0) {
            res.status(404).json({message: "Book not found"})
        }
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error getting books:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const patchBookController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { user_id, title, author, genre, year, pages, publisher, description, image, price } = req.body

        const checkBook = await pool.query("SELECT * FROM book WHERE id = $1", [id])

        if (checkBook.rows.length === 0) {
            res.status(400).json({ message: "Book not found" })
            return
        }

        const updateBook = await pool.query(`UPDATE book set user_id=$1, title=$2, author=$3, genre=$4, year=$5, pages=$6, publisher=$7, description=$8, image=$9, price=$10
        RETURNING *`,
            [user_id, title, author, genre, year, pages, publisher, description, image, price])

        res.status(201).json({
            message: "Book successfully updated",
            updateBook: updateBook.rows[0]
        })
    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})