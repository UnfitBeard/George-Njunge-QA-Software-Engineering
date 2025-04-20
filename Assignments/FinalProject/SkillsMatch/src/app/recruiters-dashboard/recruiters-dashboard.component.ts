import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RecruiterService, ActiveJob, JobApplication, RecruiterProfile, DashboardData } from '../services/recruiter.service';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-recruiters-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, BaseChartDirective, CommonModule],
  templateUrl: './recruiters-dashboard.component.html',
  styleUrls: ['./recruiters-dashboard.component.css']
})

export class RecruitersDashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  showScheduleModal = false;
  scheduleForm!: FormGroup;
  selectedAppIndex = -1;
  showEditJobModal = false;
  editableJob: any = {};

  constructor(
    private dashboardService: RecruiterService,
    private fb: FormBuilder,
  ) { }

  // Exposed for template binding
  postedJobsProgress!: number;
  candidateTrend!: number;
  offerAcceptanceRate!: number;
  averageHireTime!: number;
  predictedHires!: number;
  recruiter!: DashboardData['recruiter'];
  activeJobs!: DashboardData['activeJobs'];
  applications!: DashboardData['JobApplications'];
  topSkills!: string[];

  // Chart.js data + options
  candidateMatchChartData!: ChartConfiguration<'bar'>['data'];
  hiringTrendsChartData!: ChartConfiguration<'line'>['data'];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  ngOnInit() {
    this.scheduleForm = this.fb.group({
      applicationIndex: [null, Validators.required],
      interviewType: ['video', Validators.required],
      scheduledAt: [null, Validators.required]
    });
    this.loadJobs()

  }
  openScheduleModal(idx: number) {
    this.selectedAppIndex = idx;
    this.scheduleForm.patchValue({ applicationIndex: idx });
    this.showScheduleModal = true;
  }

  closeModal() {
    this.showScheduleModal = false;
    this.scheduleForm.reset({ interviewType: 'video' });
  }

  submitSchedule() {
    if (this.scheduleForm.invalid) return;
    const { applicationIndex, interviewType, scheduledAt } = this.scheduleForm.value;
    const app = this.applications[applicationIndex];

    // Create a _new_ object with the extra fields
    const updatedApp: JobApplication = {
      ...app,
      interviewType,
      scheduledAt
    };

    this.dashboardService.scheduleInterview(updatedApp).subscribe(
      response => {
        if (response) {
          console.log(response)
        }
      }, error => {
        console.log(error)
      }
    )

    console.log('Scheduled application:', updatedApp);
    // then send updatedApp to your backend if you want to persist it…
    this.closeModal();
  }

  //Edit Job
  openEditJobModal(job: any) {
    this.editableJob = {
      ...job,
      job_id: job.id  // Ensure the backend receives job_id, not id
    };
    delete this.editableJob.id; // Optional: clean up
    this.showEditJobModal = true;
  }

  closeEditJobModal() {
    this.showEditJobModal = false;
    this.editableJob = {};
    this.loadJobs()
  }

  updateJob() {
    if (!this.editableJob.job_id) {
      console.error('Missing job_id in editableJob:', this.editableJob);
      alert('Cannot update job without a valid job ID.');
      return;
    }

    this.dashboardService.updateJob(this.editableJob).subscribe({
      next: (res) => {
        alert('Job updated successfully!');
        this.showEditJobModal = false;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update job.');
      }
    });
    this.loadJobs()
  }

  loadJobs() {
    this.dashboardService.getDashboardInsights()
      .subscribe((data: DashboardData) => {
        this.dashboardData = data;

        // map out primitives
        this.postedJobsProgress = data.postedJobsProgress;
        this.candidateTrend = data.candidateTrend;
        this.offerAcceptanceRate = data.offerAcceptanceRate;
        this.averageHireTime = data.averageHireTime;
        this.predictedHires = data.predictedHires;
        this.recruiter = data.recruiter;
        this.activeJobs = data.activeJobs;
        this.applications = data.JobApplications;
        this.topSkills = data.topCandidateSkills;

        // set charts
        this.candidateMatchChartData = data.candidateMatchData;
        this.hiringTrendsChartData = data.hiringTrendsData;
      });
  }
}