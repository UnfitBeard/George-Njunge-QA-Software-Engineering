import { Injectable, OnDestroy } from '@angular/core';
import { AuthResponse } from './auth-response';
import { BehaviorSubject, Observable, Subscription, interval, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService implements OnDestroy {
  loginUrl = "http://54.87.50.126/api/v1/auth/login";
  registerUrl = "http://54.87.50.126/api/v1/auth/register";
  logoutUrl = 'http://54.87.50.126/api/v1/auth/logout';
  private refreshSubscription?: Subscription;
  private readonly REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

  constructor(private http: HttpClient, private router: Router) {
    // Initialize with user from localStorage or null
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    
    // Start token refresh if user is authenticated
    if (this.isAuthenticated()) {
      this.startTokenRefresh();
    }
  }

  private readonly apiUrl = 'http://54.87.50.126/api/v1/auth';
  private currentUserSubject: BehaviorSubject<any>;

  // Observable to subscribe to user changes
  get currentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(response => {
        if (response.user) {
          this.setUserInfo(response.user);
          this.startTokenRefresh();
        }
      })
    );
  }

  register(email: string, password: string, user_type: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, { email, password, user_type }, { withCredentials: true });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      tap(user => {
        this.setUserInfo(user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.logoutUrl}`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearUserInfo();
        this.stopTokenRefresh();
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/refresh-token`, { withCredentials: true }).pipe(
      tap(response => {
        if (response.user) {
          this.setUserInfo(response.user);
        }
      })
    );
  }

  private startTokenRefresh(): void {
    // Clear any existing refresh subscription
    this.stopTokenRefresh();

    // Set up new refresh interval
    this.refreshSubscription = interval(this.REFRESH_INTERVAL).subscribe(() => {
      this.refreshToken().subscribe({
        error: (error) => {
          console.error('Token refresh failed:', error);
          this.clearUserInfo();
          this.router.navigate(['/login']);
        }
      });
    });
  }

  private stopTokenRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = undefined;
    }
  }

  // Helper method to get current user info
  getUserInfo(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserRole(): string {
    const user = this.getUserInfo();
    return user?.user_type || '';
  }

  // Helper method to store user in local storage and update subject
  setUserInfo(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Helper method to clear user info from local storage and update subject
  clearUserInfo(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  ngOnDestroy(): void {
    this.stopTokenRefresh();
  }
}
