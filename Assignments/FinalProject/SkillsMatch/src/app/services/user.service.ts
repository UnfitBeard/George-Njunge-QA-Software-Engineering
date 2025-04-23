import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userURL = 'http://54.87.50.126/api/v1/users';

  constructor(private http: HttpClient) {}

  // Helper method to get headers with token
  private getHeaders(): HttpHeaders {
    const storedUser = localStorage.getItem('currentUser');
    let token = '';
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        token = user?.token || '';
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  getCurrentUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/getDataById`, { 
      withCredentials: true,
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        if (!response.user) {
          throw new Error('No user data found in response');
        }
        console.log(response.user)
        return response.user;
      })
    );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/viewProfile`, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  viewProfileDetails(endpoint?: string): Observable<any> {
    const url = endpoint || `${this.userURL}/viewProfile`;
    return this.http.get<any>(url, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.patch<any>(`${this.userURL}/jobSeeker`, profileData, { 
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/allUsers`, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.userURL}/deleteUser/${id}`, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }

  profileComplete(): Observable<any> {
    return this.http.post<any>(`${this.userURL}/profileComplete`, {}, {
      withCredentials: true,
      headers: this.getHeaders()
    });
  }
}
