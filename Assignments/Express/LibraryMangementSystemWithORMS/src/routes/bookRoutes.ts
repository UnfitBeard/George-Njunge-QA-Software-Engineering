import express from "express"
import { createBook, deleteBookController, getBookById, getBooks, updateBookController } from "../controllers/bookControllers";
import { protect } from "../middlewares/auth/protect";
import { borrowController, displayBorrowedBooks, returnController } from "./../controllers/borrowerControllers";

const router = express.Router()

//creating books protected routes
router.post("/", protect,createBook);
router.put("/:id",protect,updateBookController);
router.delete("/:id", protect, deleteBookController)

//Admin//librarian/borrower can borrow a book
router.post("/borrow/:title", protect, borrowController)
router.post("/return/:title", protect, returnController)
router.get("/borrowedBooks", protect, displayBorrowedBooks)
router.get("/:id", getBookById)


//public Routes
router.get("/", getBooks)
router.get("/:id", getBookById)

export default router