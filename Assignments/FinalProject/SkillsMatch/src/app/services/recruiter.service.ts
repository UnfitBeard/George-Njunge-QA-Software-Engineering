import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define proper interfaces for nested objects
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }>;
}

export interface ActiveJob {
  max_salary: any;
  min_salary: any;
  location: string;
  id: number;
  title: string;
  description: string;
  deadline: string;
  completion: number;
  status: string;
}

export interface JobApplication {
  job_id: number;
  candidate: {
    name: string;
  };
  jobTitle: string;
  matchScore: number;
}

export interface RecruiterProfile {
  name: string;
  firstname: string;
  lastname: string;
  company: string;
  avatar: string;
  verified: boolean;
  rating: number;
  hires: number;
}

export interface DashboardData {
  postedJobsProgress: number;
  candidateTrend: number;
  offerAcceptanceRate: number;
  averageHireTime: number;
  predictedHires: number;
  candidateMatchData: ChartData;
  hiringTrendsData: ChartData;
  topCandidateSkills: string[];
  recruiter: RecruiterProfile;
  activeJobs: ActiveJob[];
  JobApplications: JobApplication[];
}

export interface JobApplication {
  job_id: number;
  candidate: { name: string };
  jobTitle: string;
  matchScore: number;
  scheduledAt?: string;       // new, optional
  interviewType?: 'video'|'physical';  // new, optional
}


@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private apiUrl = 'http://54.87.50.126:3000/api/v1';

  constructor(private http: HttpClient) { }

  scheduleInterview(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs/applications/schedule`, payload, { withCredentials: true });
  }

  updateJob(job: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/jobs/updateJob/${job.job_id}`, job, { withCredentials: true });
  }

  getDashboardInsights(): Observable<DashboardData> {
    return this.http.post<DashboardData>(
      `${this.apiUrl}/gemini/recruiterDashBoard`,
      {},
      { withCredentials: true }
    );
  }
}
