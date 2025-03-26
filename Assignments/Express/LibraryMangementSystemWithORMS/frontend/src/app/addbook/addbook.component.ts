import { BooksService } from './../books.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../interfaces/booksResponse';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {

  constructor(private bookService: BooksService, private router: Router) {}

  form = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    genre: new FormControl(''),
    publisher: new FormControl(''),
    publication_year: new FormControl(''),
    pages: new FormControl(''),
    image_url: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(''),
    location: new FormControl()
  });

  ngOnInit() {

  }

  onSubmit() {
    if (this.form.valid) {
      this.bookService.postBooks(this.form.value as unknown as Book).subscribe(
        (response) => {
          console.log("Books posted sucessfully");
          this.form.reset()
        },(error)=>{
          console.log("Error posting books", error)
        }
      )
    }
  }
}
