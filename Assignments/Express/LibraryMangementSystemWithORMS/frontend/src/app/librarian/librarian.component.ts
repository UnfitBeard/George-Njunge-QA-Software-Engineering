import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../interfaces/booksResponse';
import { BooksService } from '../books.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-librarian',
  imports: [CommonModule, FormsModule],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.css'
})
export class LibrarianComponent {
  books:Book[] = [];
  errorMessage:string = ''

  router = Inject(Router)
  constructor(private booksservice: BooksService, private route: Router) {}

  onAddNewBook() {
    this.route.navigate(['addBook']);
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
    this.getBooks()
  }

  onUpdate(bookId: number) {
    this.route.navigate(['addBook'])
  }

  getBooks() {
    this.booksservice.fetchBooks().subscribe(
      (data: Book[])=>{
        this.books = data
      },
      (error) => {
        this.errorMessage = 'Failed To fetch Books: ' + error.Message
      }
    )
  }

  ngOnInit():void {
    this.getBooks()
  }

}
