import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../../interfaces/booksResponse';
import { error } from 'console';
import { CommonModule } from '@angular/common';

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
onBorrow() {
throw new Error('Method not implemented.');
}

  books: Book[] = []

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
  }

}
