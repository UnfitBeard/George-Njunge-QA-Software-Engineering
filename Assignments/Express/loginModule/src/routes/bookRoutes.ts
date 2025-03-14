import { Router } from "express";
import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { createBook } from "../controllers/bookControllers";
import { protect } from "../middlewares/auth/protect";

const router = express.Router()

router.post("/",protect,createBook)

export default router