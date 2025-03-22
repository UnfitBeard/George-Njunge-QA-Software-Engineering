import { DataServiceService } from './../data-service.service';
import { CommonModule, NgClass, NgComponentOutlet, NgFor, NgIf, NgStyle, NgSwitch } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { EventEmitter } from '@angular/core';

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

  //Variables connect to parent
  @Input() inputData!: string;

  //How about we send data to parent
  @Output() dataEmitter = new EventEmitter<string>()


  sendData() {
    this.dataEmitter.emit('Data from child')
  }

  //API Data
  books:any[] = []
  loading = true;//loading state
  error = ''//store error messages
  data!: string

  constructor(private dataService: DataServiceService) {}
  ngOnInit() {
    //runs before the component renders
    this.dataService.currentData.subscribe(data=>this.data=data)
  }

  onSave = () => {
    this.list.push("AlaminDev")
    this.list.push("Gradio")
    this.list.push("Bernaard")
    console.log(this.day)
  }

}



