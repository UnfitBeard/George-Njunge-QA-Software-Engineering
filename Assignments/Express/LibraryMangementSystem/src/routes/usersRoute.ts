import { Router } from "express";
import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController";
import { protect } from "../middlewares/auth/protect";
import { adminGuard, librarianGuard } from "../middlewares/auth/roleMiddleWare";
import { deleteUsers, getUsers, getUsersById } from "../controllers/usersController";
import { borrowController } from "@app/controllers/borrowerControllers";

const router = express.Router()

//creating events protected routes
//only admin should view all users
router.get("/", protect, adminGuard, getUsers)
router.get("/:id", protect, getUsersById)
router.delete("/:id", protect, deleteUsers)

//public Routes
router.post("/", registerUser);
router.post("/",registerUser);

export default router