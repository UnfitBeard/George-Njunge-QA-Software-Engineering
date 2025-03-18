import { CommonModule, NgClass, NgComponentOutlet, NgFor, NgIf, NgStyle, NgSwitch } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  myName = "The Gitu"
  isDisabled = false
  value = "Dummy Value"
  list: string[] = ["The G", "Atrocities"]
  day = new Date().getDay()

  onSave = () => {
    this.list.push("AlaminDev")
    this.list.push("Gradio")
    this.list.push("Benaard")
    console.log(this.day)
  }
}
