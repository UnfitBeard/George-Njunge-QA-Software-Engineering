import express from 'express'
import { Router } from 'express'
import { applyToJob, createJob, upload } from '../Controllers/jobControllers'

const router = express.Router()

router.post("/addJobs", createJob)
router.post('/apply', upload.single('resume'), applyToJob);


export default router