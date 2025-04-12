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
      this.isSubmitting = true; // Set to true when submitting

      // Simulate API call (replace with your actual submission logic)
      setTimeout(() => {
        console.log('Form submitted:', this.jobApplicationForm.value);
        this.isSubmitting = false; // Reset when done
        // You might want to reset the form here too:
        // this.jobApplicationForm.reset();
      }, 1500);
      this.router.navigate(['job-search'])
    }
  }
}
