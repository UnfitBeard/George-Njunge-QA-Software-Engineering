import express, { NextFunction, Request, Response } from 'express'
import pool from '../db/db.config';
import asyncHandler from '../Utils/Helpers/asyncHandler';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env['API_KEY']);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await pool.query("SELECT * FROM Users");
  const userCount = users.rowCount
  // Now send that info to Gemini
  const prompt = `There are ${userCount} users in the database and they are ${users.rows}. What insights can you provide based on this? And can you return the data in json format`;

  const result = await model.generateContent(prompt);
  const response = await JSON.stringify(result);

  console.log(response);
  res.json({
    message: "Answer",
    response
  })
}

export const editProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Endpoint to handle form submission and insert into tables
  const {
    firstName,
    lastName,
    phone,
    location,
    bio,
    linkedinUrl,
    experienceLevel,
    telephone,
    postalAddress,
    skills, // An array of skill objects
    projects, // An array of project objects
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start transaction

    // 1. Insert into JobSeekers table
    const jobSeekerResult = await client.query(
      `INSERT INTO JobSeekers (first_name, last_name, phone, location, bio, linkedin_url, experience_level)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING job_seeker_id`,
      [firstName, lastName, phone, location, bio, linkedinUrl, experienceLevel]
    );
    const jobSeekerId = jobSeekerResult.rows[0].job_seeker_id;

    // 2. Insert into JobSeekerSkills table
    for (const skill of skills) {
      const { skillId, experienceLevel, yearsExperience, lastUsed, aiCertified, projectsCount } = skill;
      await client.query(
        `INSERT INTO JobSeekerSkills (job_seeker_id, skill_id, experience_level, years_experience, last_used, ai_certified, projects_count)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [jobSeekerId, skillId, experienceLevel, yearsExperience, lastUsed, aiCertified, projectsCount]
      );
    }

    // 3. Insert into Projects table
    for (const project of projects) {
      const { title, description, startDate, endDate, skillsUsed, projectUrl, isCurrent, teamSize, role } = project;
      await client.query(
        `INSERT INTO Projects (job_seeker_id, title, description, start_date, end_date, skills_used, project_url, is_current, team_size, role)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [jobSeekerId, title, description, startDate, endDate, skillsUsed, projectUrl, isCurrent, teamSize, role]
      );
    }

    await client.query('COMMIT'); // Commit transaction
    res.status(201).json({ message: 'Job seeker created successfully' });
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback transaction on error
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error creating job seeker' });
  } finally {
    client.release(); // Release client back to pool
  }
});

export const editRecruiterProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {
    firstname,
    lastname,
    position,
    phone,
    avatar,
    verified,
    rating,
    hires,
    hiring_volume,
    average_time_to_hire,
    specialization,
    user_id,
    company_id
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO recruiters (
        user_id,
        company_id,
        firstname,
        lastname,
        position,
        phone,
        avatar,
        verified,
        rating,
        hires,
        hiring_volume,
        average_time_to_hire,
        specialization
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13
      )
      ON CONFLICT (recruiter_id) DO UPDATE SET
        company_id = EXCLUDED.company_id,
        firstname = EXCLUDED.firstname,
        lastname = EXCLUDED.lastname,
        position = EXCLUDED.position,
        phone = EXCLUDED.phone,
        avatar = EXCLUDED.avatar,
        verified = EXCLUDED.verified,
        rating = EXCLUDED.rating,
        hires = EXCLUDED.hires,
        hiring_volume = EXCLUDED.hiring_volume,
        average_time_to_hire = EXCLUDED.average_time_to_hire,
        specialization = EXCLUDED.specialization
      RETURNING *;`,
      [
        user_id,
        company_id,
        firstname,
        lastname,
        position,
        phone,
        avatar,
        verified,
        rating,
        hires,
        hiring_volume,
        average_time_to_hire,
        specialization
      ]
    );

    res.status(200).json({
      message: 'Recruiter upserted successfully',
      recruiter: result.rows[0]
    });

  } catch (err) {
    console.error('Error upserting recruiter:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
