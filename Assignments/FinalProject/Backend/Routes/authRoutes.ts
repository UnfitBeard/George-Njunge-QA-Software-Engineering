import express from 'express'
import {Router} from 'express'
import { login, registration } from '../Controllers/authController';

const router = express.Router();

router.post("/register", registration)
router.post("/login", login)

export default router