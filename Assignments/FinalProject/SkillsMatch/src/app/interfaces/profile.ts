export interface Skill {
  job_seeker_id: number;
  skill_id: number;
  experience_level: string;
  years_experience: string;
  last_used: string;
  ai_certified: boolean;
  projects_count: number;
}

export interface Project {
  project_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  skills_used: string;
  project_url: string;
  is_current: boolean;
  team_size: number;
  role: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  linkedinUrl: string;
  experienceLevel: string;
  postalAddress: string | null;
  skills: Skill[];
  projects: Project[];
}
