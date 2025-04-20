import { getAllJobs } from './../../../../Backend/Controllers/jobControllers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userURL = 'http://localhost:3000/api/v1/users';
  private apiUrl = 'http://localhost:3000/api/v1/users/viewProfile';


  getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {withCredentials: true});
  }

  viewProfileDetails() :Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/users/viewProfile',{}, {withCredentials: true})
  }

  constructor(private http: HttpClient) {}

  getCurrentUserProfile(): Observable<any> {
    // Assuming user ID is derived from auth cookie or token
    return this.http.get<any>(`${this.userURL}/getDataById`, { withCredentials: true });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, profileData, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/allUsers`, {withCredentials: true})
  }


  deleteUser(id: number) {
    return this.http.delete(`${this.userURL}/deleteUser/${id}`);
  }
}
