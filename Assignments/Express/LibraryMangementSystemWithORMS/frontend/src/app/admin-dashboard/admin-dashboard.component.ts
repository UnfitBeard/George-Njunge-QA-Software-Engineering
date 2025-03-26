import { error } from 'console';
import { Message } from './../../../node_modules/esbuild-wasm/esm/browser.d';
import { Component } from '@angular/core';
import { Book } from '../../interfaces/booksResponse';
import { BooksService } from '../books.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  books:Book[] = [];
  errorMessage:string = ''

  constructor(private booksservice: BooksService, private router: Router) {}

  onAddNewBook() {
    this.router.navigate(['addBook']);
  }

  onDelete(bookId: number) {
    this.booksservice.deleteBooks(bookId).subscribe(
      ()=>{
        this.books.filter(book=>book.id !== bookId)
      },
      (error) => {
        console.log("Error:" + error.message)
      }
    );
  }

  onUpdate(bookId: number) {

  }

  ngOnInit():void {
    this.booksservice.fetchBooks().subscribe(
      (data: Book[])=>{
        this.books = data
      },
      (error) => {
        this.errorMessage = 'Failed To fetch Books: ' + error.Message
      }
    )
  }

}
