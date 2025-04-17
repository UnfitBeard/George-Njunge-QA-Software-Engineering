import { Interview } from './../Models/Interview';
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../Utils/Helpers/asyncHandler'
import pool from '../db/db.config';
// middleware/upload.ts
import multer from 'multer';
import { error } from 'console';
import { AppDataSource } from '../db/dataSource';
import { Job } from '../Models/Job';
import { Company } from '../Models/Company';
import { Application, ApplicationStatus } from '../Models/Application';
import { JobSeeker } from '../Models/JobSeeker';
import { getRepository } from 'typeorm';

const storage = multer.memoryStorage(); // Store file directly in memory (no disk)
export const upload = multer({ storage });


export const createJob = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
        company_id,
        recruiter_id,
        title,
        description,
        location,
        salary_range,
        job_type,
        expiration_date,
        experience_required,
        skills = null, // Default to null if not provided
        experience_level = null, // Default to null if not provided
        education = null, // Default to null if not provided
        min_salary = null, // Default to null if not provided
        max_salary = null, // Default to null if not provided
    } = req.body;

    const company = await AppDataSource.getRepository(Company).findOneBy({ company_id });
    if (!company) {
        return res.status(400).json({ message: "Invalid company_id" });
    }


    const jobRepo = AppDataSource.getRepository(Job);

    const job = jobRepo.create({
        ...req.body,
        posted_date: new Date(),
        status: 'open', // or JobStatus.OPEN if using enum
        application_count: 0
    });

    try {
        const saved = await jobRepo.save(job);
        res.status(201).json({ message: "Job created", job: saved });
    } catch (err) {
        console.error("Error saving job:", err);
        res.status(500).json({ message: "Error saving job" });
    }
});


export const applyToJobController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const jobId = Number(req.body.job_id);
  const jobSeekerId = Number(req.body.job_seeker_id); // Or use req.user if using JWT
  const file = req.file; // Access file uploaded via multer

  if (isNaN(jobId) || isNaN(jobSeekerId)) {
    return res.status(400).json({
      message: 'Invalid jobId or jobSeekerId provided',
    });
  }

  try {
    // ✅ Check if job exists
    const job = await AppDataSource.getRepository(Job).findOneBy({ job_id: jobId });
    if (!job) throw new Error("Job not found");

    // ✅ Check if job seeker exists
    const jobSeeker = await AppDataSource.getRepository(JobSeeker).findOneBy({ job_seeker_id: jobSeekerId });
    if (!jobSeeker) throw new Error("Job seeker not found");

    // 🛑 Prevent duplicate applications
    const existing = await AppDataSource.getRepository(Application).findOne({
      where: {
        job: { job_id: jobId },
        jobSeeker: { job_seeker_id: jobSeekerId },
      },
    });

    if (existing) {
      throw new Error("You have already applied to this job");
    }

    // 📝 Create new application
    const newApplication = AppDataSource.getRepository(Application).create({
      job,
      jobSeeker,
      status: ApplicationStatus.APPLIED,
      cover_letter: req.body.coverLetter, // Assuming cover letter is in body
      match_score: req.body.matchScore, // Assuming match score is in body
    });

    // Handle file upload (resume) if provided
    if (file) {
      newApplication.cover_letter = file.buffer.toString("base64"); // You can save it in base64 or as a binary blob
    }

    // 💾 Save application
    await AppDataSource.getRepository(Application).save(newApplication);

    // Respond with success
    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (err: any) {
    next(err); // Forward the error to the global error handler
  }
});

export const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the repository for the Job entity
        const jobRepository = AppDataSource.getRepository(Job);

        // Fetch all jobs using TypeORM's find method
        const jobs = await jobRepository.find();

        // Return the jobs in the response
        res.status(200).json({ jobs });
    } catch (error) {
        next(error);
    }
};

export const getJobById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: error });
    }
});

export const updateJob = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id  = parseInt(req.params.id);
    const {
        title,
        company_id,
        description,
        salaryFrom,
        salaryTo,
        jobType,
        deadline,
        location,
        requiredSkills
    } = req.body;

    try {
        // Get the job repository
        const jobRepository = AppDataSource.getRepository(Job);

        // Find the job by its id (use `where` for TypeORM's findOne method)
        const job = await jobRepository.findOne({
            where: { job_id: id }  // Make sure job_id is the correct column name in your Job entity
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Update job fields
        job.title = title;
        job.company_id = company_id;
        job.description = description;
        job.min_salary = salaryFrom;
        job.max_salary = salaryTo;
        job.job_type = jobType;
        job.expiration_date = deadline;
        job.location = location;
        job.skills = requiredSkills.split(',').map((skill: string) => skill.trim());
        job.posted_date = new Date();  // Assuming you want to update the posted date to the current timestamp

        // Save the updated job to the database
        const updatedJob = await jobRepository.save(job);

        // Send the updated job as the response
        res.status(200).json({message:"Updated Job",updatedJob});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export const deleteJob = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Convert the `id` to a number
    const id = parseInt(req.params.id, 10);

    try {
        // Get the job repository
        const jobRepository = AppDataSource.getRepository(Job);

        // Find the job by its job_id (ensure job_id is a number)
        const job = await jobRepository.findOne({
            where: { job_id: id }  // Ensure job_id is a number
        });

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Delete the job
        await jobRepository.remove(job); // This will remove the job entity from the database

        // Send success response
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error("Error deleting job:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export const scheduleInterview = asyncHandler(async(req: Request, res: Response, next: NextFunction)=>{
    const { name, date , interview_time } = req.body
    
})