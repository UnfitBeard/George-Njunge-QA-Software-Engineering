import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController"
import { getUsers } from "../controllers/usersController"
import { protect } from "../middlewares/auth/protect"

const router = express.Router()

//public routes
//go to the route "/api/v1/users"..check if there are admin....check if logged in....check if admin....get users......controller
router.get("/", protect,/* adminGuard,*/ getUsers)

export default router