import express from "express"
import { postUserController2, getAllUsersController, getSingleUserController, updateUserController, deleteUserController } from "../controllers/usersControllers";

//instance of router
const router = express.Router();

//creating the routes
router.post("/", postUserController2);
router.get("/", getAllUsersController);
router.get("/", getSingleUserController);
router.put("/", updateUserController);
router.delete("/", deleteUserController);

export default router
