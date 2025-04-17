import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  baseURL = 'http://localhost:3000/api/v1/jobs/'

  constructor(private http: HttpClient) { }

  getAllJobs():Observable<any> {
    return this.http.get<any>(`${this.baseURL}getAllJobs`, {withCredentials: true} )
  }

}
