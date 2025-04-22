import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JobsService, MatchResponse } from '../jobs.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-jobs-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './jobs-search.component.html',
  styleUrls: ['./jobs-search.component.css']
})
export class JobsSearchComponent implements OnInit {
askAI() {
throw new Error('Method not implemented.');
}
  isLoggedIn: boolean = false;
  jobSearchForm: FormGroup;
  aiQuery = '';
  showModal = false;
  selectedJob: any = null;

  experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Manager', 'Executive'];
  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

  allJobs: any[] = [];
  filteredJobs: any[] = [];
  recommendedJobs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private jobsService: JobsService,
    private userService: UserService
  ) {
    this.jobSearchForm = this.fb.group({
      searchTerm: ['', Validators.required],
      salaryRange: [80000, Validators.required],
      experience: ['Mid Level', Validators.required],
      location: ['', Validators.required],
      jobType: ['Full-time', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchJobs();
    this.loadRecommendedJobs(); // 👈 this is the key part
  }

  fetchJobs(): void {
    this.http.get<any>('http://54.87.50.126/api/v1/jobs/getAllJobs').subscribe({
      next: (res) => {
        this.allJobs = res.jobs;
        this.filteredJobs = [...this.allJobs];
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  loadRecommendedJobs(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userResp => {
        const userProfile = userResp.user || userResp;

        this.jobsService.getAllJobs().subscribe(
          jobsArray => {
            this.jobsService.matchJobs(userProfile, jobsArray).subscribe(
              (resp: MatchResponse) => {
                this.recommendedJobs = resp.recommendedJobs.map((job: any) => ({
                  job_id: job.job_id,
                  name: job.title,
                  company: job.location,
                  skillsMatch: job.matchPercentage,
                  keySkills: job.skills,
                  deadline: job.expiration_date
                }));
              },
              err => console.error('AI match error', err)
            );
          },
          err => console.error('Jobs fetch error', err)
        );
      },
      err => console.error('User profile fetch error:', err)
    );
  }

  onSearch(): void {
    if (this.jobSearchForm.valid) {
      const filters = this.jobSearchForm.value;
      this.filteredJobs = this.allJobs.filter(job =>
        (!filters.searchTerm || job.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
        job.min_salary >= filters.salaryRange &&
        (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.jobType || job.job_type === filters.jobType)
      );
    }
  }

  openJobDetailsModal(job: any): void {
    this.selectedJob = job;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = '';
    this.selectedJob = null;
  }

  onApply(job: any): void {
    this.router.navigate(['job-application'], {state:job});
    console.log('Applying to:', job.title);
    this.closeModal();
  }

  onSave(job: any): void {
    console.log('Saving job:', job.title);
  }
}
