import { getBookById } from './../../../src/controllers/bookControllers';
import { displayBorrowedBooks } from './../../../src/controllers/borrowerControllers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from '../interfaces/booksResponse';
import { BorrowedBook } from '../interfaces/borrowedBooks';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  booksUrl = "http://localhost:3000/api/v1/books";
  constructor(private http: HttpClient) { }

  fetchBooks():Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl, {withCredentials: true})
  }

  postBooks(bookData:Book): Observable<Book[]> {
    return this.http.post<Book[]>(this.booksUrl, bookData, {withCredentials:true})
  }

  updateBooks(bookId:number): Observable<Book[]> {
    return this.http.put<Book[]>(this.booksUrl, bookId, {withCredentials: true})
  }

  deleteBooks(bookId: number): Observable<Book[]> {
    return this.http.delete<Book[]>(`${this.booksUrl}${bookId}`,{withCredentials: true})
  }

  borrowBooks(title: string): Observable<Book[]> {
    return this.http.post<Book[]>(`http://localhost:3000/api/v1/books/borrow/${title}`,{due_date: new Date()},{withCredentials:true})
  }

  displayBorrowedBooks(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/api/v1/books/borrowedBooks", {withCredentials: true})
  }

  getBookById(bookId: number):Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/books/${bookId}`, {withCredentials: true})
  }
 }
