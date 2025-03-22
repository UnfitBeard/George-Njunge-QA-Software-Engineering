import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root', //mandatory
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  //Accessing the childs properties using ViewChild
@ViewChild(ChildComponent) childComponent!: ChildComponent

  ngAfterViewInit(): void {
    console.log(this.childComponent.childProperty);
    this.childComponent.childMethod();
  }
  title = '1.IntroToAngular';

  //sending data to parent
  receiveData(data: string) {
    console.log('Data received from child:', data)
  }

  //binding child to parent
  parentData = 'data from parent'
  listName: string[]=[]
  name="G"

  addName(name: string) {
    this.listName.push(name)
  }
}
