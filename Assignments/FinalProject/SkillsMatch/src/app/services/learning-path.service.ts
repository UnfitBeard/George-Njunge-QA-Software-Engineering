import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LearningPath {
  role: string;
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
    duration: string;
    resources: string[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class LearningPathService {
  private apiUrl = 'http://54.87.50.126/api/v1/gemini';

  constructor(private http: HttpClient) { }

  // Helper method to get headers with token
  private getHeaders(): HttpHeaders {
    const storedUser = localStorage.getItem('currentUser');
    let token = '';
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        token = user?.token?.accessToken || user?.token || '';
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  // Get learning path for a specific role
  getLearningPath(role: string): Observable<LearningPath> {
    return this.http.post<LearningPath>(
      `${this.apiUrl}/learning-path`,
      { role },
      {
        headers: this.getHeaders(),
        withCredentials: true
      }
    );
  }

  // Save user's progress in a learning path
  saveProgress(role: string, step: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/save-progress`,
      { role, step },
      {
        headers: this.getHeaders(),
        withCredentials: true
      }
    );
  }

  // Get user's progress in learning paths
  getProgress(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/get-progress`,
      {
        headers: this.getHeaders(),
        withCredentials: true
      }
    );
  }
}
