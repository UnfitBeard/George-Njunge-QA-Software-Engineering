import { BooksService } from './../books.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../interfaces/booksResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  isEditing = false;
  currentBookId:string| null = null

  constructor(private bookService: BooksService, private router: Router, private activatedRoute: ActivatedRoute) {}

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
    location: new FormControl('')
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.currentBookId = id;
      this.loadBookdata(id);
    }
  }
  loadBookdata(id: string) {
    this.bookService.getBookById(Number(id)).subscribe(
      (book:Book)=>{
        this.form.setValue({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publisher: book.publisher,
          publication_year: book.publication_year.toString(),
          pages: book.pages.toString(),
          image_url: book.image_url,
          description: book.description,
          quantity: book.quantity.toString(),
          location: book.location
        });
      },
      (error) => {
        console.error("Error loading book data:", error)
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {

      const bookData = this.form.value as unknown as Book;

      if (this.isEditing) {
        this.bookService.updateBooks(Number(this.currentBookId)).subscribe(
          (response) => {
            console.log("Book sucessfully updated");
            this.router.navigate(['/librarian'])
          },
          (error) => {
            console.error('Error Updating Books:', error)
          }
        )
      } else {
        this.bookService.postBooks(this.form.value as any as Book).subscribe(
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
}
