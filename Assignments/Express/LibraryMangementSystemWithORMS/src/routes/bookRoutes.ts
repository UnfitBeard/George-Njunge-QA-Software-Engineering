import { Router } from "express";
import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { createBook, deleteBookController, getBookById, getBooks, updateBookController } from "../controllers/bookControllers";
import { protect } from "../middlewares/auth/protect";
import { adminGuard, borrowerGuard, librarianGuard } from "../middlewares/auth/roleMiddleWare";
import { borrowController, returnController } from "@app/controllers/borrowerControllers";
import { ad } from "@faker-js/faker/dist/airline-CBNP41sR";

const router = express.Router()

//creating books protected routes
router.post("/",protect, createBook);
router.put("/:id",protect,librarianGuard, updateBookController);
router.delete("/:id", protect, librarianGuard, deleteBookController)

//Admin//librarian/borrower can borrow a book
router.post("/borrow/:title", protect, borrowController)
router.post("/return/:title", protect, returnController)


//public Routes
router.get("/", getBooks)
router.get("/:id", getBookById)

export default router