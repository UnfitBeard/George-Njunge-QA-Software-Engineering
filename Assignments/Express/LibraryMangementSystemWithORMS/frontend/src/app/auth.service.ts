import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/authResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
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

  register(name: string, email: string, password: string, role_id: number): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, { name, email, password, role_id }, { withCredentials: true }).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
        }
      })
    )
  }
}

