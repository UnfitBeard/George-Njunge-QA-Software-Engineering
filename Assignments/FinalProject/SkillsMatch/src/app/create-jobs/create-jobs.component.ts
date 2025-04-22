import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-jobs',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.css']
})
export class CreateJobsComponent {
  jobForm: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private router: Router
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
      minSalary: [null, Validators.required],
      maxSalary: [null, Validators.required],
      deadline: ['', Validators.required],
      skills: ['', Validators.required],
      experienceLevel: ['Mid Level', Validators.required],
      education: ['']
    });
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const newJob = {
        ...this.jobForm.value,
        id: this.generateId(),
        applicants: [],
        skills: this.jobForm.value.skills.split(',').map((skill: string) => skill.trim()),
        salaryRange: {
          min: this.jobForm.value.minSalary,
          max: this.jobForm.value.maxSalary
        },
        postedDate: new Date().toISOString(),
        status: 'Active'
      };

      // In a real app, you would call a service to save the job
      console.log('New job created:', newJob);

      // Navigate back to dashboard or jobs list
      this.router.navigate(['recruiters-dashboard']);
    }
  }

  goBack(): void {
    this.router.navigate(['recruiters-dashboard']);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
