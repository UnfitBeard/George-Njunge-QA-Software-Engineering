import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-application',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './job-application.component.html',
  styleUrl: './job-application.component.css'
})
export class JobApplicationComponent {
  jobApplicationForm: FormGroup;
  isSubmitting = false; // Add this property

  constructor(private fb: FormBuilder, private router:Router) {
    this.jobApplicationForm = this.fb.group({
      cv: [null, [Validators.required]],
      coverLetter: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  get coverLetter() {
    return this.jobApplicationForm.get('coverLetter');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.jobApplicationForm.get('cv')?.setErrors({ tooLarge: true });
        return;
      }
      this.jobApplicationForm.patchValue({ cv: file });
    }
  }

  onSubmit() {
    if (this.jobApplicationForm.valid) {
      this.isSubmitting = true;

      const formData = new FormData();
      const formValue = this.jobApplicationForm.value;

      // Replace with real data from route or service
      const jobId = 1;
      const jobSeekerId = 1;

      formData.append('resume', formValue.cv);
      formData.append('cover_letter', formValue.coverLetter);
      formData.append('job_id', jobId.toString());
      formData.append('job_seeker_id', jobSeekerId.toString());
      formData.append('match_score', '90.00'); // Optional
      formData.append('feedback', '');         // Optional

      fetch('http://localhost:3000/api/applications/apply', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Application successful:', data);
          this.isSubmitting = false;
          this.router.navigate(['job-search']);
        })
        .catch(error => {
          console.error('Error submitting application:', error);
          this.isSubmitting = false;
        });
    }
  }

}
