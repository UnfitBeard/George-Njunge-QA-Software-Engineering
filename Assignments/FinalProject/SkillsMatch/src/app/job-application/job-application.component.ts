import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';
import { JobsService } from '../jobs.service';
import { error } from 'console';

@Component({
  selector: 'app-job-application',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent {
  jobApplicationForm: FormGroup;
  isSubmitting = false;
  jobDetails: any = null;
  jobId :any
  jobSeekerId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServicesService,  // Injecting auth service
    private jobApplicationService: JobsService  // Injecting job application service
  ) {
    this.jobApplicationForm = this.fb.group({
      coverLetter: ['', [Validators.required, Validators.maxLength(2000)]],
    });
  }

  ngOnInit(): void {
    // Get job ID from navigation state
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { job_id: number };
    this.jobId = state?.job_id;

    // Get job details from localStorage
    const storedJob = localStorage.getItem('selectedJob');
    if (storedJob) {
      this.jobDetails = JSON.parse(storedJob);
    } else {
      console.error('Job details not found in localStorage!');
      this.router.navigate(['/job-search']);
      return;
    }

    // Build form
    this.jobApplicationForm = this.fb.group({
      coverLetter: ['', [Validators.required, Validators.maxLength(2000)]]
    });

    // Get current logged-in user
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.jobSeekerId = user.id;
      },
      error: (err) => {
        console.error('Auth error:', err);
      }
    });
  }


  onSubmit() {
    if (this.jobApplicationForm.valid) {
      this.isSubmitting = true;

      const formValue = this.jobApplicationForm.value;

      const applicationData = {
        coverLetter: formValue.coverLetter,
        jobId: this.jobId,
        jobSeekerId: this.jobSeekerId,
      };

      this.jobApplicationService.submitApplication(applicationData).subscribe(
        (data) => {
          console.log('Application successful:', data);
          this.isSubmitting = false;
          this.router.navigate(['/job-search']);
        },
        (error) => {
          console.error('Error submitting application:', error);
          this.isSubmitting = false;
        }
      );
    }
  }
}
