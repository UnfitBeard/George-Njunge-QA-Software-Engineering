//post event controller

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

const postUserController =  asyncHandler(async (req: Request, res: Response) => { 
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (isMatch) {
                res.json({ success: true, message: "Login successful" });
                return;
            }
        }
        res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export const postUserController2 = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        //check if email already exists
        console.log(req.body)
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if (emailCheck.rows.length > 0) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        //Insert new user
        //ID should be serial....autoIncrement
        const userResult = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password])
        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
});

export const loginControllers = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (isMatch) {
                res.json({ success: true, message: "Login successful" });
                return;
            }
        }
        res.status(401).json({ success: false, message: "Invalid credentials" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
})

export const getAllUsersController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM users;")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error getting user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const getSingleUserController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const result = await pool.query("SELECT * FROM users WHERE id = $1;", [userId])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const updateUserController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body

        const checkUser = await pool.query("SELECT * FROM users WHERE id = $1;", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        const result = await pool.query("UPDATE users set name=$1, email=$2, password=$3 WHERE id=$4 RETURNING*;", [name, email, password, id])
        res.status(201).json({
            message: "User successfully updated",
        })
    } catch (error) {
        console.error("Error creating user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId = req.params.id
        const checkUser = await pool.query("SELECT * FROM users WHERE id = $1;", [userId])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" })
            return
        }
        const result = await pool.query("DELETE FROM users WHERE id = $1;", [userId])
        res.status(200).json({ message: "User deleted Successfully" })
    } catch (error) {
        console.error("Error deleting user:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export default postUserController