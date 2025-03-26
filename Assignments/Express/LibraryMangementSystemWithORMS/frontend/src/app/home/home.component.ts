import { error } from 'console';
import { Book } from '../../interfaces/booksResponse';
import { BooksService } from './../books.service';
import { Component } from '@angular/core';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  onSubmitContactForm() {
    throw new Error('Method not implemented.');
  }

  onServiceSelect() {
    throw new Error('Method not implemented.');
  }
  libraryLogoPath: any;
  books: Book[] = []

  constructor(private BooksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.BooksService.fetchBooks().subscribe(
      (data: Book[]) => {
        this.books = data
      },
      (error) => {
        console.log('Failed To fetch Books: ' + error.Message)
      }
    )
  }

  loginRedirect() {
    this.router.navigate(['login'])
  }
}
