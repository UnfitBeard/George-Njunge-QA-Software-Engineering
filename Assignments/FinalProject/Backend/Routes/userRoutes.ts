import express from 'express'
import { Router } from "express";
import { editProfile, editRecruiterProfile, geminiUsers } from '../Controllers/userControllers';

const router = express.Router()

// router.get("/", getUsers)
router.get("/geminiUsers", geminiUsers)
router.patch("/jobSeeker", editProfile)
router.patch("/Recruiter", editRecruiterProfile)

export default router