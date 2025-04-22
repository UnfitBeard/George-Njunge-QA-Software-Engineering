import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userURL = 'http://54.87.50.126:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  getCurrentUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/getDataById`, { withCredentials: true })
      .pipe(
        map(response => {
          if (!response.user) {
            throw new Error('No user data found in response');
          }
          return response.user;
        })
      );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/viewProfile`, {withCredentials: true});
  }

  viewProfileDetails(endpoint?: string): Observable<any> {
    const url = endpoint || `${this.userURL}/viewProfile`;
    return this.http.get<any>(url, {withCredentials: true});
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.patch<any>(`${this.userURL}/jobSeeker`, profileData, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/allUsers`, {withCredentials: true})
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.userURL}/deleteUser/${id}`);
  }

  profileComplete() :Observable<any> {
    return this.http.post<any>(`${this.userURL}/profileComplete`, {}, {withCredentials: true})
  }
}
