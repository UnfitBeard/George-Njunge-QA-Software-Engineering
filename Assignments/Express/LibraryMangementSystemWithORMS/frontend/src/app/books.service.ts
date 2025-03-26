import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../interfaces/booksResponse';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  fetchBooks():Observable<Book[]> {
    const booksUrl = "http://localhost:3000/api/v1/books";
    return this.http.get<Book[]>(booksUrl, {withCredentials:true})
  }

  postBooks(bookData:Book): Observable<Book> {
    const booksUrl = "http://localhost:3000/api/v1/books";
    return this.http.post<Book>(booksUrl, bookData, {withCredentials:true})
  }
}
