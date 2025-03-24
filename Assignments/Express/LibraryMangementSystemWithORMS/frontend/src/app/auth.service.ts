import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export interface AuthResponse {
  token: string;
  user: {
      id: number;
      email: string;
      name: string;
  };
}

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:string, password: string): Observable<AuthResponse>{
    const loginUrl = "http://localhost:3000/api/v1/auth/login";
    return this.http.post<AuthResponse>(loginUrl, {email, password})
  }
}

