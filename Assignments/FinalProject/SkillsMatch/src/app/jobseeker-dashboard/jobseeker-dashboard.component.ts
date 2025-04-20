// src/app/components/jobseeker-dashboard/jobseeker-dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { JobsService, MatchResponse } from '../jobs.service';
import { UserService } from '../services/user.service';
interface DisplayJob {
  job_id: number;
  name: string;
  company: string;
  skillsMatch: number;
  keySkills: string[];
  deadline: string;
}

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule, RouterLink],
  templateUrl: './jobseeker-dashboard.component.html',
  styleUrls: ['./jobseeker-dashboard.component.css']
})
export class JobseekerDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private jobsService: JobsService,
    private userService: UserService
  ) {}

  // Core state
  userProfile: any;
  jobs: any[] = [];
  recommendedJobs: DisplayJob[] = [];

  loadingRecommendations = false;
  aiError: string | null = null;

  // New function to load recommendations
  // New function to load recommendations
loadRecommendations() {
  this.loadingRecommendations = true;
  this.aiError = null;  // Reset any previous error

  this.userService.getCurrentUserProfile().subscribe(
    userResp => {
      this.userProfile = userResp.user || userResp;

      // Fetch all jobs
      this.jobsService.getAllJobs().subscribe(
        jobsArray => {
          this.jobs = jobsArray;

          // Call AI match endpoint
          this.jobsService.matchJobs(this.userProfile, this.jobs).subscribe(
            (resp: MatchResponse) => {
              this.loadingRecommendations = false;  // Stop loading after success

              // Map AI response into display jobs
              this.recommendedJobs = resp.recommendedJobs.map((job: any) => ({
                job_id: job.job_id,
                name: job.title,
                company: job.location,
                skillsMatch: job.matchPercentage,
                keySkills: job.skills,
                deadline: job.expiration_date
              }));

              // Chart data
              this.skillGapChartData = {
                labels: resp.skillGapChartData.labels as string[],
                datasets: resp.skillGapChartData.datasets.map((ds: any, idx: number) => ({
                  ...ds,
                  backgroundColor: idx === 0 ? 'rgba(35,137,218,0.2)' : 'rgba(255,95,109,0.2)',
                  borderColor: idx === 0 ? '#2389da' : '#ff5f6d'
                }))
              };

              // Derive topSkills and matchProbability
              this.matchProbability = this.recommendedJobs[0]?.skillsMatch || 0;
              const labels = (this.skillGapChartData.labels ?? []) as string[];
              this.topSkills = labels
                .filter((_, i) => {
                  const userVal = resp.skillGapChartData.datasets[0].data[i] as number;
                  const marketVal = resp.skillGapChartData.datasets[1].data[i] as number;
                  return marketVal - userVal > 10;
                })
                .slice(0, 3);
              this.aiCareerTip = `Focus on ${this.topSkills.join(', ')} to close your top skill gaps.`;
            },
            err => {
              this.loadingRecommendations = false;  // Stop loading after error
              this.aiError = 'Error fetching AI match data. Please try again later.';  // Set AI error message
              console.error('AI match error', err);
            }
          );
        },
        err => {
          this.loadingRecommendations = false;  // Stop loading after error
          console.error('Jobs fetch error', err);
        }
      );
    },
    err => {
      this.loadingRecommendations = false;  // Stop loading after error
      console.error('User fetch error', err);
    }
  );
}


  // Chart data
  skillGapChartData!: ChartConfiguration<'radar'>['data'];
  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: { r: { beginAtZero: true, suggestedMax: 100, ticks: { stepSize: 20 } } }
  };

  // AI-driven insights
  topSkills: string[] = [];
  matchProbability = 0;
  aiCareerTip = '';

  // Other dashboard metrics
  jobsApplied = 0;
  interviews = 3;
  offersReceived = 2;
  profileStrength = 85;
  applicationProgress = 60;
  interviewTrend = 15;
  recentOffers = ['Senior Dev @Tech', 'Lead @Startup'];
  notifications = [
    { id: 1, name: 'Application Viewed', from: 'Tech Corp', type: 'application', date: new Date(Date.now() - 3600000), read: false, priority: 'high' },
    { id: 2, name: 'Interview Scheduled', from: 'Startup Inc', type: 'interview', date: new Date(Date.now() - 7200000), read: true, priority: 'normal' }
  ];

  // Search & filter
  jobSearch = '';
  get filteredJobs() {
    return this.recommendedJobs.filter(job =>
      job.name.toLowerCase().includes(this.jobSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(this.jobSearch.toLowerCase())
    );
  }

  ngOnInit() {
    // 1. Fetch user profile
    this.loadRecommendations()

  }

  dismissNotification(notification: any) {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
  }

  redirectToApplyJob(job: any) {
    localStorage.setItem('selectedJob', JSON.stringify(job));
    this.router.navigate(['job-application'], {state: job});
  }
}
