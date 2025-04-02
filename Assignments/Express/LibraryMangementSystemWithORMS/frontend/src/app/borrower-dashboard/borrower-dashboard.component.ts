import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../../interfaces/booksResponse';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { BorrowedBook } from '../../interfaces/borrowedBooks';
import { title } from 'process';
import { response } from 'express';

@Component({
  selector: 'app-borrower-dashboard',
  imports: [CommonModule],
  templateUrl: './borrower-dashboard.component.html',
  styleUrl: './borrower-dashboard.component.css'
})
export class BorrowerDashboardComponent {
onReturnBook() {
throw new Error('Method not implemented.');
}
onBorrow(title: string) {
this.bookService.borrowBooks(title).subscribe(
  response => {
    if(response) {
      console.log("Book borrowed Sucessfully")
      return;
    }
    }, (error) => {
      console.error("Error Borrowing Book", error)
  }
)
}

  books: Book[] = []
  borrowedBooks: BorrowedBook[] = []

  constructor(private bookService: BooksService) {}


  ngOnInit():void {
    this.bookService.fetchBooks().subscribe(
      (data: Book[])=>{
        this.books = data
      },
      (error) => {
        console.log('Failed To fetch Books: ' + error.Message)
      }
    )
    this.bookService.displayBorrowedBooks().subscribe(
      (data) => {
        this.borrowedBooks = data.borrowedBooks
      }, error => {
        console.log('Failed To fetch borrowedBooks: ' + error.message)
      }
    )
  }

}
