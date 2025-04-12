import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-jobseeker-dashboard',
  imports: [CommonModule, BaseChartDirective, FormsModule, RouterLink],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrls: ['./jobseeker-dashboard.component.css']
})
export class JobseekerDashboardComponent {
constructor(private router: Router) {}
redirectToApplyJob() {
  this.router.navigate(['job-application'])
}

  // Add to component class
  jobsApplied = 15;
  interviews = 3;
  offersReceived = 2;
  profileStrength = 85;
  applicationProgress = 60;
  interviewTrend = 15;
  recentOffers = ['Senior Dev @Tech', 'Lead @Startup'];
  // AI Analytics Data
  skillGapChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['JavaScript', 'Angular', 'Node.js', 'Cloud', 'Communication'],
    datasets: [
      {
        label: 'Your Skills',
        data: [75, 80, 65, 50, 85],
        backgroundColor: 'rgba(35, 137, 218, 0.2)',
        borderColor: '#2389da'
      },
      {
        label: 'Job Market Demand',
        data: [85, 90, 75, 80, 80],
        backgroundColor: 'rgba(255, 95, 109, 0.2)',
        borderColor: '#ff5f6d'
      }
    ]
  };

  radarChartOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: { stepSize: 20 }
      }
    }
  };

  matchProbability = 78;
  topSkills = ['Cloud Computing', 'AI Fundamentals', 'System Design'];
  aiCareerTip = "Based on your profile, we recommend focusing on cloud certification programs to increase your market value.";

  // Enhanced Notifications
  notifications = [
    {
      id: 1,
      name: 'Application Viewed',
      from: 'Tech Corp',
      type: 'application',
      date: new Date(Date.now() - 3600000),
      read: false,
      priority: 'high'
    },
    // ... more notifications
  ];

  // Enhanced Jobs Data
  jobs = [
    {
      name: 'FullStack Developer',
      company: 'Tech Corp',
      skillsMatch: 80,
      deadline: '2024-06-30',
      keySkills: ['Angular', 'Node.js', 'AWS'],
      salary: '$90k - $120k'
    },
    {
      name: 'FullStack Developer',
      company: 'Tech Corp',
      skillsMatch: 80,
      deadline: '2024-06-30',
      keySkills: ['Angular', 'Node.js', 'AWS'],
      salary: '$90k - $120k'
    }
    // ... more jobs
  ];

  jobSearch = '';

  get filteredJobs() {
    return this.jobs.filter(job =>
      job.name.toLowerCase().includes(this.jobSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(this.jobSearch.toLowerCase())
    );
  }

  dismissNotification(notification: any) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
  }
}
