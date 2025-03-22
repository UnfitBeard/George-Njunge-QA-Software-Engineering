import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  childProperty: string = 'Child property';

  childMethod() {
    console.log('Child Method called')
  }

  constructor(private dataService: DataServiceService) {}

  sendData() {
    this.dataService.changeData('Data from component child')
  }
}
