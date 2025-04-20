import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  loginUrl = "http://localhost:3000/api/v1/auth/login";
  registerUrl = "http://localhost:3000/api/v1/auth/register";
  logoutUrl = 'http://localhost:3000/api/v1/auth/logout'

  constructor(private http: HttpClient, private router: Router) {
    // Attempt to get the user data from localStorage
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
  }

  private readonly apiUrl = 'http://localhost:3000/api/v1/auth';
  private currentUserSubject: BehaviorSubject<any>;

   // Method to check if the user is authenticated
   isAuthenticated(): boolean {
    // Check if the user is in localStorage and has a valid session or token
    const currentUser = this.currentUserSubject.value;
    return currentUser !== null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(response => {
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  register(email: string, password: string, user_type: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, { email, password, user_type }, { withCredentials: true }).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
        }
      })
    )
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      tap(user => {
        this.setUserInfo(user);
      })
    );
  }


  logout(): Observable<any> {
    return this.http.post<any>(`${this.logoutUrl}`, {}, { withCredentials: true });
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/refresh-token`, { withCredentials: true });
  }

   // Helper method to get current user info (Optional, if you store the user in local storage)
   getUserInfo(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUserRole(): string {
    const user = this.getUserInfo();
    return user?.user_type || '';
  }

  // Helper method to store user in local storage (Optional)
  setUserInfo(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Helper method to clear user info from local storage (Optional)
  clearUserInfo(): void {
    localStorage.removeItem('currentUser');
  }
}
