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
  private baseURL = 'http://54.87.50.126/api/v1/jobs';
  private aiURL   = 'http://54.87.50.126/api/v1/gemini';

  constructor(private http: HttpClient) { }

  // Helper method to get headers with token
  private getHeaders(): HttpHeaders {
    const storedUser = localStorage.getItem('currentUser');
    let token = '';
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        token = user?.token?.accessToken || user?.token || '';
        console.log('Token being used:', token); // Debug log
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    
    // Ensure the token is properly formatted
    const authHeader = token ? `Bearer ${token}` : '';
    console.log('Auth header:', authHeader); // Debug log
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authHeader
    });
  }

  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/getAllJobs`, { 
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  submitApplication(applicationData: any): Observable<any> {
    return this.http.post('http://54.87.50.126/api/v1/jobs/apply', applicationData, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  matchJobs(user: any, jobs: any[]): Observable<MatchResponse> {
    return this.http.post<MatchResponse>(
      `${this.aiURL}/getSkillsAndMatch`,
      { user, jobs },
      { 
        withCredentials: true,
        headers: this.getHeaders()
      }
    );
  }

  updateJob(job: any): Observable<any> {
    return this.http.put(`/api/jobs/${job.job_id}`, job, { 
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  deleteJob(id: number) {
    return this.http.delete(`${this.baseURL}/deleteJob/${id}`, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  getAnalytics(): Observable<AnalyticsPayload> {
    return this.http.post<AnalyticsPayload>(`${this.aiURL}/adminGraphs`, { 
      withCredentials: true,
      headers: this.getHeaders()
    });
  }
}