import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ChatMessage {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  constructor(private http: HttpClient) { }

  getGeminiResponse(message: ChatMessage) {
    return this.http.post<any>('http://54.87.50.126:3000/api/v1/gemini/chat', message, { withCredentials: true });
  }
}
