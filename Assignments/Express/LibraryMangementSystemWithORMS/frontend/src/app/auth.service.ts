import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/authResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email:string, password: string): Observable<AuthResponse>{
    const loginUrl = "http://localhost:3000/api/v1/auth/login";
    return this.http.post<AuthResponse>(loginUrl, {email, password}, {withCredentials:true}).pipe(
      tap(response => {
        if (response.token) {
          console.log(response.token)
        }
      })
    )
  }
}

