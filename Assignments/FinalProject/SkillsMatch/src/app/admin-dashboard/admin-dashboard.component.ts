import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { ChangeDetectorRef } from '@angular/core';
import annotationPlugin from 'chartjs-plugin-annotation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AnalyticsPayload, JobsService } from '../jobs.service';
import { error } from 'console';
import { response } from 'express';
Chart.register(annotationPlugin);
@Component({
  selector: 'app-admin-dashboard',
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  getUsers() {
    this.userService.getAllUsers().subscribe(
      response => {
        console.log(response)
        this.users = response.allUsers
      }, error => {
        console.log(error)
      }
    )
  }

  getJobs() {
    this.jobService.getAllJobs().subscribe(
      (response: any) => {
        console.log('Jobs response:', response);
        this.jobs = response.jobs; // ✅ not the whole object!
      },
      error => {
        console.error('Error fetching jobs:', error);
      }
    );
  }


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

  users: any[] = [];

  jobs: any[] = [];

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

  // Add AI data properties
  predictedHiring = 245;
  topGrowingSkill = 'AI/ML Development';
  // anomalies = [{ week: 'Week 4', value: 85 }];
  aiRecommendations = [
    'Increase AI/ML training programs',
    'Focus on cloud certification initiatives',
    'Improve technical interview processes'
  ];

  // Add to ngOnInit for mock data simulation

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
    if (!userOrJob) {
        console.error('Error: userOrJob is undefined');
        return;
    }

    console.log('Object passed to delete:', userOrJob);

    if (userOrJob.hasOwnProperty('email')) {
        // User
        if (!userOrJob.user_id) {
            console.error('Error: User does not have an id');
            return;
        }

        this.userService.deleteUser(userOrJob.user_id).subscribe(
            (response) => {
                console.log("User deleted successfully");
                this.getUsers(); // ✅ refresh after delete
            },
            (error) => {
                console.error("Error deleting user", error);
            }
        );

    } else if (userOrJob.hasOwnProperty('title')) {
        // Job
        if (!userOrJob.job_id) {
            console.error('Error: Job does not have an id');
            return;
        }

        this.jobService.deleteJob(userOrJob.job_id).subscribe(
            (response) => {
                console.log("Job deleted successfully");
                this.getJobs(); // ✅ refresh after delete
            },
            (error) => {
                console.error("Error deleting job", error);
            }
        );

    } else {
        console.error('Error: Object is neither a user nor a job');
    }
}


  public predictiveHiringChartData!: ChartConfiguration<'line'>['data'];
  public skillGapChartData!: ChartConfiguration<'radar'>['data'];
  public salaryDistributionChartData!: ChartConfiguration<'bar'>['data'];

  public predictiveChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {},        // ← Declare the X axis
      y: {          // ← And at least a basic Y axis
        beginAtZero: true
      }
    },
    plugins: {
      annotation: {
        annotations: {
          predictionLine: {
            type: 'line',
            scaleID: 'x',      // now matches the declared scale
            value: 4,
            borderColor: 'gray',
            borderDash: [5,5],
            label: { content: 'Prediction Start', display: true }
          }
        }
      }
    }
  };


  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    scales: { r: { beginAtZero: true, ticks: { stepSize: 20 } } }
  };

  public barChartOptions: ChartOptions<'bar'> = { responsive: true };

  public anomalies: AnalyticsPayload['anomalies'] = []

  constructor(private cdr: ChangeDetectorRef, private userService: UserService, private jobService: JobsService) { }

  ngOnInit() {
    // ——— fetch and map AI analytics ———
    this.jobService.getAnalytics().subscribe((a: AnalyticsPayload) => {
      // 1) Trends line chart: pad actual[] to match labels
      const labels = a.trends.labels;
      const actual = [...a.trends.actual];
      while (actual.length < labels.length) actual.push(0);

      this.predictiveHiringChartData = {
        labels,
        datasets: [
          { data: actual, label: 'Actual Applications', fill: false },
          { data: a.trends.predicted, label: 'AI Prediction', borderDash: [5,5], fill: false }
        ]
      };

      // 2) Skills radar chart
      this.skillGapChartData = {
        labels: a.skills.map(s => s.name),
        datasets: [
          { data: a.skills.map(s => s.demand), label: 'Demand %', fill: true }
        ]
      };

      // 3) Salary distribution bar chart
      this.salaryDistributionChartData = {
        labels: Object.keys(a.salaries),
        datasets: [
          { data: Object.values(a.salaries), label: 'Jobs per bracket' }
        ]
      };

      // 4) Anomalies table
      this.anomalies = a.anomalies;

      this.cdr.detectChanges();
    });

    this.getJobs()
    this.getUsers()
    setInterval(() => {
      this.getJobs();
      this.getUsers();
    }, 30000); // every 30 seconds

  }
}
