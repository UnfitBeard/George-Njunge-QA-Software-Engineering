import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root', //mandatory
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '1.IntroToAngular';

  listName: string[]=[]
  name="G"

  addName(name: string) {
    this.listName.push(name)
  }
}
