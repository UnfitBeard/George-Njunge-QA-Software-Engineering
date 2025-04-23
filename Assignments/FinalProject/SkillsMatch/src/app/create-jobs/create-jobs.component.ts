import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import { AuthServicesService } from '../auth-services.service';

@Component({
  selector: 'app-create-jobs',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.css']
})
export class CreateJobsComponent {
  jobForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private jobsService: JobsService,
    private authService: AuthServicesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required],
      jobType: ['Full-time', Validators.required],
      location: ['', Validators.required],
      minSalary: [null, [Validators.required, Validators.min(0)]],
      maxSalary: [null, [Validators.required, Validators.min(0)]],
      deadline: ['', Validators.required],
      skills: ['', Validators.required],
      experienceLevel: ['Mid Level', Validators.required],
      education: ['']
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      const formData = this.jobForm.value;
      const storedUser = localStorage.getItem('currentUser');
      
      if (!storedUser) {
        this.errorMessage = 'User not authenticated';
        this.isSubmitting = false;
        return;
      }

      try {
        const currentUser = JSON.parse(storedUser);
        const newJob = {
          company_id: currentUser.company_id || 1, // Fallback to 1 if not available
          recruiter_id: currentUser.user_id,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          salary_range: `[${formData.minSalary}, ${formData.maxSalary})`,
          job_type: formData.jobType,
          posted_date: new Date().toISOString().split('T')[0],
          expiration_date: formData.deadline,
          status: 'open',
          experience_required: formData.experienceLevel,
          application_count: 0,
          skills: formData.skills.split(',').map((skill: string) => skill.trim()),
          experience_level: formData.experienceLevel,
          education: formData.education,
          min_salary: formData.minSalary,
          max_salary: formData.maxSalary
        };

        // Call the service to save the job
        this.jobsService.createJob(newJob).subscribe({
          next: (response) => {
            console.log('Job created successfully:', response);
            this.router.navigate(['recruiters-dashboard']);
          },
          error: (error) => {
            console.error('Error creating job:', error);
            this.errorMessage = error.error?.message || 'Failed to create job. Please try again.';
            this.isSubmitting = false;
          }
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.errorMessage = 'Error processing user data';
        this.isSubmitting = false;
      }
    }
  }

  goBack(): void {
    this.router.navigate(['recruiters-dashboard']);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
