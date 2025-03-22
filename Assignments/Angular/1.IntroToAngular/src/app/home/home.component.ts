import { CommonModule, NgClass, NgComponentOutlet, NgFor, NgIf, NgStyle, NgSwitch } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  myName = "the gitu"
  isDisabled = false
  value = "Dummy Value"
  list: string[] = ["The G", "Atrocities"]
  day = new Date().getDay()
  isServerRunning = true
  homes: string[] = ["The HQ Kenya", "Apartment in Lagos", "Beach in Morocco"]

  //API Data
  books:any[] = []
  loading = true;//loading state
  error = ''//store error messages

  constructor(private http: HttpClient) {} //Inject HTTP Client
  ngOnInit() {
    //runs before the component renders
    this.fetchBooks()
  }

  onSave = () => {
    this.list.push("AlaminDev")
    this.list.push("Gradio")
    this.list.push("Bernaard")
    console.log(this.day)
  }

  fetchBooks() {
    this.http.get<any[]>("http://localhost:3000/api/v1/books")
    .subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      }
    })
  }
}



