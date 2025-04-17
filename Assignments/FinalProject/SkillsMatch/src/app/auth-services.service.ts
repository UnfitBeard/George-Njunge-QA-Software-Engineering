import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  loginUrl = "http://localhost:3000/api/v1/auth/login";
  registerUrl = "http://localhost:3000/api/v1/auth/register";

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, { email, password }, { withCredentials: true }).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
        }
      })
    )
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

}
