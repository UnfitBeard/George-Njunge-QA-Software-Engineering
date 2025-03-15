import { Router } from "express";
import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { createBook, deleteBookController, getBookById, getBooks, updateBookController } from "../controllers/bookControllers";
import { protect } from "../middlewares/auth/protect";
import { adminGuard, librarianGuard } from "../middlewares/auth/roleMiddleWare";

const router = express.Router()

//creating events protected routes
router.post("/",protect,librarianGuard, createBook);
router.put("/:id",protect, librarianGuard, updateBookController);
router.delete("/:id", protect, librarianGuard, deleteBookController)

//public Routes
router.get("/", getBooks)
router.get("/:id", getBookById)

export default router