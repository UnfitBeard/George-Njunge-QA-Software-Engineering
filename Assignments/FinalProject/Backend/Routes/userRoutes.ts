import express from 'express'
import { Router } from "express";
import { editProfile, editRecruiterProfile, getUsers } from '../Controllers/userControllers';

const router = express.Router()

router.get("/", getUsers)
router.patch("/jobSeeker", editProfile)
router.patch("/Recruiter", editRecruiterProfile)

export default router