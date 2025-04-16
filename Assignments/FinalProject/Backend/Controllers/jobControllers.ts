import express from 'express'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../Utils/Helpers/asyncHandler'
import pool from '../db/db.config';
// middleware/upload.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // Store file directly in memory (no disk)
export const upload = multer({ storage });


export const createJob = async (req: Request, res: Response) => {
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

    try {
        const result = await pool.query(
            `INSERT INTO Jobs (
                company_id,
                recruiter_id,
                title,
                description,
                location,
                salary_range,
                job_type,
                posted_date,
                expiration_date,
                status,
                experience_required,
                skills,
                experience_level,
                education,
                min_salary,
                max_salary,
                application_count
              ) 
              VALUES (
                $1, $2, $3, $4, $5, 
                $6, $7, CURRENT_DATE, $8, 'open', $9, $10, $11, $12, $13, $14, 0
              )
              RETURNING *;`,
            [
                company_id,
                recruiter_id,
                title,
                description,
                location,
                salary_range,
                job_type,
                expiration_date,
                experience_required,
                skills,
                experience_level,
                education,
                min_salary,
                max_salary,
            ]
        );

        res.status(201).json({
            message: 'Job created successfully',
            job: result.rows[0]
        });

    } catch (err) {
        console.error('Error creating job:', err);
        res.status(500).json({ message: 'Error creating job' });
    }
};

export const applyToJob = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { job_seeker_id, job_id, cover_letter } = req.body;
        const resumeBuffer = req.file?.buffer;

        if (!resumeBuffer) {
            return res.status(400).json({ message: 'Resume file is required.' });
        }

        const result = await pool.query(
            `INSERT INTO Applications 
          (job_seeker_id, job_id, cover_letter, resume_file) 
          VALUES ($1, $2, $3, $4) RETURNING *`,
            [job_seeker_id, job_id, cover_letter, resumeBuffer]
        );

        res.status(201).json({
            message: 'Application submitted successfully',
            application: result.rows[0],
        });
    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


