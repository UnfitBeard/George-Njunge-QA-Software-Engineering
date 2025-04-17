import express, { NextFunction, Request, Response } from 'express'
import pool from '../db/db.config';
import asyncHandler from '../Utils/Helpers/asyncHandler';
import { AppDataSource } from '../db/dataSource';
import { JobSeeker } from '../Models/JobSeeker';
import { JobSeekerSkill } from '../Models/JobSeekerSkill';
import { Project } from '../Models/Project';
import { Skill } from '../Models/Skill';
import { Recruiter } from '../Models/Recruiter';
import { Company } from '../Models/Company';
import { User } from '../Models/User';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env['API_KEY']);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const geminiUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await pool.query("SELECT * FROM Users");
    const userCount = users.rowCount;
    const userData = JSON.stringify(users.rows, null, 2);

    const prompt = `There are ${userCount} users in the database. Here is their data:\n${userData}\n
Based on this, give useful insights in valid JSON format only. No extra commentary. Analyze:
- Most common registration month
- Frequency of new users over time
- Any anomalies or trends
Return only JSON like:
{
  "mostCommonRegistrationMonth": "March",
  "monthlyRegistrations": {"January": 3, "February": 5, "March": 10},
  "trendInsight": "User registration increased steadily since January"
}`;

    const result = await model.generateContent(prompt);
    const geminiText = await result.response.text();

    let aiInsights: any;
    try {
      aiInsights = sanitizeGeminiJson(geminiText);
    } catch (error) {
      console.warn("Invalid JSON from Gemini:", geminiText);
      aiInsights = { raw: geminiText };
    }

    res.json({
      message: "AI analysis complete",
      users: users.rows,
      insights: aiInsights
    });

  } catch (error) {
    console.error("Error generating Gemini insights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function sanitizeGeminiJson(rawText: string): any {
  // Use regex to remove triple backticks and "json" marker
  const cleaned = rawText
    .replace(/```json\s*/i, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(cleaned); // will throw if it's invalid
}


export const editProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Destructure the incoming request body
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

  // Create a query runner to handle transaction
  const queryRunner = AppDataSource.createQueryRunner();

  // Start transaction
  await queryRunner.startTransaction();

  try {
    // 1. Insert or update into JobSeekers table
    let jobSeeker = await queryRunner.manager.findOne(JobSeeker, {
      where: { phone } // Assuming 'phone' is unique and can be used to find an existing job seeker
    });

    if (!jobSeeker) {
      // Create a new JobSeeker if not exists
      jobSeeker = new JobSeeker();
      jobSeeker.first_name = firstName;
      jobSeeker.last_name = lastName;
      jobSeeker.phone = phone;
      jobSeeker.location = location;
      jobSeeker.bio = bio;
      jobSeeker.linkedin_url = linkedinUrl;
      jobSeeker.experience_level = experienceLevel;

      // Save the job seeker and get the job_seeker_id
      await queryRunner.manager.save(jobSeeker);
    } else {
      // Update the existing JobSeeker
      jobSeeker.first_name = firstName;
      jobSeeker.last_name = lastName;
      jobSeeker.location = location;
      jobSeeker.bio = bio;
      jobSeeker.linkedin_url = linkedinUrl;
      jobSeeker.experience_level = experienceLevel;
      
      await queryRunner.manager.save(jobSeeker);
    }

    // 2. Insert or update into JobSeekerSkills table
    for (const skill of skills) {
      const { skillId, experienceLevel, yearsExperience, lastUsed, aiCertified, projectsCount } = skill;

      // Ensure the skill exists in the skills table, if not, insert it
      let existingSkill = await queryRunner.manager.findOne(Skill, {
        where: { skill_id: skillId }, // Assuming skillId is unique in the skills table
      });

      if (!existingSkill) {
        // Insert the skill if it doesn't exist
        existingSkill = new Skill();
        existingSkill.skill_id = skillId;
        // Assuming the skill has a 'name' property
        existingSkill.name = skillId; // Replace with actual name if available

        await queryRunner.manager.save(existingSkill);
      }

      // Now, check if the jobSeekerSkill already exists
      let jobSeekerSkill = await queryRunner.manager.findOne(JobSeekerSkill, {
        where: {
          job_seeker_id: jobSeeker.job_seeker_id,
          skill_id: skillId,
        },
      });

      if (!jobSeekerSkill) {
        // Create a new job seeker skill if it doesn't exist
        jobSeekerSkill = new JobSeekerSkill();
        jobSeekerSkill.job_seeker_id = jobSeeker.job_seeker_id;
        jobSeekerSkill.skill_id = skillId;
        jobSeekerSkill.experience_level = experienceLevel;
        jobSeekerSkill.years_experience = yearsExperience;
        jobSeekerSkill.last_used = lastUsed;
        jobSeekerSkill.ai_certified = aiCertified;
        jobSeekerSkill.projects_count = projectsCount;

        await queryRunner.manager.save(jobSeekerSkill);
      } else {
        // Update the existing job seeker skill
        jobSeekerSkill.experience_level = experienceLevel;
        jobSeekerSkill.years_experience = yearsExperience;
        jobSeekerSkill.last_used = lastUsed;
        jobSeekerSkill.ai_certified = aiCertified;
        jobSeekerSkill.projects_count = projectsCount;

        await queryRunner.manager.save(jobSeekerSkill);
      }
    }

    // 3. Insert or update into Projects table
    for (const project of projects) {
      const { title, description, startDate, endDate, skillsUsed, projectUrl, isCurrent, teamSize, role } = project;

      // Check if the project for this job seeker already exists
      let existingProject = await queryRunner.manager.findOne(Project, {
        where: {
          jobSeeker: jobSeeker,
          title, // Assuming title is unique for each job seeker
        },
      });

      if (!existingProject) {
        // Create a new project if it doesn't exist
        const newProject = new Project();
        newProject.jobSeeker = jobSeeker;
        newProject.title = title;
        newProject.description = description;
        newProject.start_date = startDate;
        newProject.end_date = endDate;
        newProject.skills_used = skillsUsed;
        newProject.project_url = projectUrl;
        newProject.is_current = isCurrent;
        newProject.team_size = teamSize;
        newProject.role = role;

        await queryRunner.manager.save(newProject);
      } else {
        // Update the existing project
        existingProject.description = description;
        existingProject.start_date = startDate;
        existingProject.end_date = endDate;
        existingProject.skills_used = skillsUsed;
        existingProject.project_url = projectUrl;
        existingProject.is_current = isCurrent;
        existingProject.team_size = teamSize;
        existingProject.role = role;

        await queryRunner.manager.save(existingProject);
      }
    }

    // Commit transaction
    await queryRunner.commitTransaction();
    res.status(201).json({ message: 'Profile updated successfully' });
  } catch (error) {
    // Rollback transaction if error occurs
    await queryRunner.rollbackTransaction();
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Error updating profile' });
  } finally {
    // Release the query runner after transaction
    await queryRunner.release();
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
    // Retrieve the recruiter repository
    const recruiterRepository = AppDataSource.getRepository(Recruiter);
    const userRepository = AppDataSource.getRepository(User);
    const companyRepository = AppDataSource.getRepository(Company);

    // Fetch the User and Company entities based on their IDs
    const user = await userRepository.findOne({ where: { user_id } });
    const company = await companyRepository.findOne({ where: { company_id } });

    if (!user || !company) {
      return res.status(400).json({
        message: 'User or Company not found'
      });
    }

    // Check if recruiter already exists by their recruiter_id
    let recruiter = await recruiterRepository.findOne({
      where: { recruiter_id: req.body.id } // Assuming `id` is the recruiter_id from the request
    });

    if (!recruiter) {
      // Create a new recruiter if it doesn't exist
      recruiter = new Recruiter();
    }

    // Set or update the recruiter details
    recruiter.user = user; // Set the User relation
    recruiter.company = company; // Set the Company relation
    recruiter.firstname = firstname;
    recruiter.lastname = lastname;
    recruiter.position = position;
    recruiter.phone = phone;
    recruiter.avatar = avatar;
    recruiter.verified = verified;
    recruiter.rating = rating;
    recruiter.hires = hires;
    recruiter.hiring_volume = hiring_volume;
    recruiter.average_time_to_hire = average_time_to_hire;
    recruiter.specialization = specialization;

    // Save the recruiter (inserts or updates)
    const savedRecruiter = await recruiterRepository.save(recruiter);

    res.status(200).json({
      message: 'Recruiter upserted successfully',
      recruiter: savedRecruiter
    });

  } catch (err) {
    console.error('Error upserting recruiter:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

