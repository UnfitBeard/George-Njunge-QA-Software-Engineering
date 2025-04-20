import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// DTO for AI match response
export interface MatchResponse {
  recommendedJobs: any[];
  skillGapChartData: {
    labels: string[];
    datasets: { label: string; data: number[] }[];
  };
}

export interface AnalyticsPayload {
  trends: { labels: string[]; actual: number[]; predicted: number[] };
  skills: Array<{ name: string; demand: number }>;
  salaries: Record<'80k-100k'|'100k-120k'|'120k-150k'|'150k+', number>;
  anomalies: Array<{
    job_id: number;
    title: string;
    type: 'applications'|'salary';
    expected: number;
    actual: number;
    deviation: number;
  }>;
}

@Injectable({ providedIn: 'root' })
export class JobsService {
  private baseURL = 'http://localhost:3000/api/v1/jobs';
  private aiURL   = 'http://localhost:3000/api/v1/gemini';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/getAllJobs`, { withCredentials: true });
  }

  submitApplication(applicationData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/jobs/apply', applicationData, {
      withCredentials: true,  // Ensures that cookies are sent with the request
    });
  }

  matchJobs(user: any, jobs: any[]): Observable<MatchResponse> {
    return this.http.post<MatchResponse>(
      `${this.aiURL}/getSkillsAndMatch`,
      { user, jobs },
      { withCredentials: true }
    );
  }

  updateJob(job: any): Observable<any> {
    return this.http.put(`/api/jobs/${job.job_id}`, job, { withCredentials: true });
  }

  deleteJob(id: number) {
    return this.http.delete(`${this.baseURL}/deleteJob/${id}`, {withCredentials: true});
  }

  getAnalytics(): Observable<AnalyticsPayload> {
    return this.http.post<AnalyticsPayload>(`${this.aiURL}/adminGraphs`, { withCredentials: true });
  }

}