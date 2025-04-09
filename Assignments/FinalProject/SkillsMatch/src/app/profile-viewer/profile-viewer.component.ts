import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective} from 'ng2-charts'

@Component({
  selector: 'app-profile-viewer',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './profile-viewer.component.html',
  styleUrl: './profile-viewer.component.css'
})
export class ProfileViewerComponent {
  personalInfo: any[] = [
    { name: 'The G', github: 'https://yufhwik', location: 'Kenya' }
  ]

  skills = ['HTML', 'Angular']

  projects = [
    {
      title: 'Backend Software Engineer',
      description: 'Looks like a good job',
    },
    {
      title: 'Backend Software Engineer',
      description: 'Looks like a good job',
    },
    {
      title: 'Backend Software Engineer',
      description: 'Looks like a good job',
    }
  ]
  postedJobs: any[] = [
    { name: 'Job1' }
  ]

  candidatesApplied: any[] = [
    { name: 'Merlow' }
  ]

  offersMade: any[] = [
    { amount: 1 }
  ]

  offersAccepted: any[] = [
    { amount: 1 }
  ]

  //them charts
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
    ],
    datasets: [
      {
        data: [ 65, 71, 80, 81, 80, 82, 80 ],
        label: 'Skill Development',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(35, 137, 218, 0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
  }

  ngOnInit() {
  }

}

