import express from "express"
import { Routes } from "react-router-dom"
import { loginUser, logoutUser, registerUser } from "../controllers/authController"
import { postBookController } from "../controllers/eventsController"
import { protect } from "../middlewares/auth/protect"

const router = express.Router()

//public routes
router.post("/", protect, postBookController)
//router.post("/login", loginUser)
//router.post("/logout",logoutUser)

export default router