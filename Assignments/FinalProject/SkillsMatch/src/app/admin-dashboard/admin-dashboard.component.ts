import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { ChangeDetectorRef } from '@angular/core';
import annotationPlugin from 'chartjs-plugin-annotation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
Chart.register(annotationPlugin);
@Component({
  selector: 'app-admin-dashboard',
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

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

  users: any[] = [
    {
      id: 1,
      username: 'johndoe',
      role: 'Admin',
      status: 'Active',
      lastLogin: new Date(),
      email: 'john@example.com',
      registered: new Date('2024-01-01'),
      lastActivity: '2 hours ago',
      isExpanded: false
    },
    // More users...
  ];

  jobs: any[] = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Corp',
      status: 'Open',
      applications: 15,
      postedDate: new Date(),
      deadline: new Date('2024-06-01'),
      isExpanded: false,
      description: 'Full-stack development position...'
    },
    // More jobs...
  ];

  notifications = [
    {
      id: 1,
      title: 'New Application',
      message: 'Merlow Smith applied for Software Engineer',
      type: 'info',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    // More notifications...
  ];

  //Charts
  public predictiveHiringChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Actual Applications',
        data: [120, 145, 130, 160, 175, 190, 210],
        borderColor: '#36A2EB',
        fill: false
      },
      {
        label: 'AI Prediction',
        data: [null, null, null, null, 175, 195, 220],
        borderColor: '#FF6384',
        borderDash: [5, 5],
        fill: false
      }
    ]
  };

  public anomalyDetectionChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Application Anomalies',
      data: [45, 52, 48, 85],
      backgroundColor: ['#4CAF50', '#4CAF50', '#4CAF50', '#FF5252']
    }]
  };

  public skillGapChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['JavaScript', 'Python', 'Cloud', 'AI/ML', 'Communication'],
    datasets: [
      {
        label: 'Current Skills',
        data: new Array(5).fill(0).map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        pointBackgroundColor: '#36A2EB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#36A2EB',
        fill: true // Proper fill configuration
      },
      {
        label: 'Industry Demand',
        data: new Array(5).fill(0).map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: '#FF6384',
        pointBackgroundColor: '#FF6384',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF6384',
        fill: true
      }
    ]
  };
  // Add chart options
  public predictiveChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      annotation: {
        annotations: {
          predictionLine: {
            type: 'line',
            scaleID: 'x',
            value: 4,
            borderColor: 'gray',
            borderDash: [5, 5],
            label: {
              content: 'Prediction Start',
              display: true
            }
          }
        }
      }
    }
  };

  public anomalyChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return value > 75 ? `Anomaly detected: ${value}` : `Normal: ${value}`;
          }
        }
      }
    }
  };

  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  // Add AI data properties
  predictedHiring = 245;
  topGrowingSkill = 'AI/ML Development';
  anomalies = [{ week: 'Week 4', value: 85 }];
  aiRecommendations = [
    'Increase AI/ML training programs',
    'Focus on cloud certification initiatives',
    'Improve technical interview processes'
  ];

  // Add to ngOnInit for mock data simulation
  simulateAIData() {
    setInterval(() => {
      this.predictedHiring = Math.floor(Math.random() * 300) + 200;

      // Update radar chart data safely
      this.skillGapChartData = {
        ...this.skillGapChartData,
        datasets: [
          {
            ...this.skillGapChartData.datasets[0],
            data: new Array(5).fill(0).map(() => Math.floor(Math.random() * 100))
          },
          this.skillGapChartData.datasets[1]
        ]
      };

      // Trigger Angular change detection
      this.cdr.detectChanges();
    }, 5000);
  }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,  // Ensures responsiveness for smaller screens
  };

  public lineChartLegend = true;

  //Searches and stuff especially filtering
  userSearch = '';
  jobSearch = '';

  get filteredUsers() {
    return this.users.filter(user =>
      user.username.toLowerCase().includes(this.userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(this.userSearch.toLowerCase())
    );
  }

  get filteredJobs() {
    return this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.jobSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(this.jobSearch.toLowerCase())
    );
  }

  get unreadNotifications() {
    return this.notifications.filter(n => !n.read).length;
  }

  toggleUserExpand(user: any) {
    user.isExpanded = !user.isExpanded;
  }
  toggleJobExpand(job:any) {
    job.isExpanded = !job.isExpanded
  }

  dismissNotification(notification: any) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
  }

  clearNotifications() {
    this.notifications = [];
  }

  getNotificationIcon(type: string) {
    switch (type) {
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  }

  onDelete(userOrJob: any): void {
    if (userOrJob && userOrJob.id) {
      if (userOrJob.hasOwnProperty('role')) {
        // Deleting a user
        this.users = this.users.filter(user => user.id !== userOrJob.id);
      } else if (userOrJob.hasOwnProperty('title')) {
        // Deleting a job
        this.jobs = this.jobs.filter(job => job.id !== userOrJob.id);
      }
    }
  }



  onEdit(userToEdit: any): void {

  }


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }
}
