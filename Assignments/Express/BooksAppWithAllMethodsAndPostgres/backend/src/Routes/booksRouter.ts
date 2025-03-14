import express from "express"
import { postBookController, getAllBooksController, getSingleBookController, updateBooksController, deleteBookController, booksFilterController } from "../controllers/booksController"

const router = express.Router();

router.post("/", postBookController);
router.get("/", getAllBooksController);
router.get("/:id", getSingleBookController);
router.put("/:id", updateBooksController);
router.delete("/:id", deleteBookController);
router.get("/",booksFilterController)

export default router