import express from 'express'
import {  applyToJobController, createJob, deleteJob, getAllJobs, updateJob, upload } from '../Controllers/jobControllers'
import { protect } from '../Middlewares/protect';

const router = express.Router()

router.post("/addJobs", protect, createJob)
router.post('/apply', upload.single('resume'), applyToJobController);
router.get("/getAllJobs", getAllJobs)
router.patch("/updateJob/:id", updateJob)
router.delete("/deleteJob/:id", deleteJob)


export default router