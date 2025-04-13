import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiters-profile-editor',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './recruiters-profile-editor.component.html',
  styleUrl: './recruiters-profile-editor.component.css'
})
export class RecruitersProfileEditorComponent {
  recruiterForm!: FormGroup;
  isSubmitting = false;
  profileCompletion = 0;
  recruiterData = history.state.recruiterData

  // Dropdown options
  experienceOptions = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];
  companySizeOptions = ['1-10 employees', '11-50 employees', '51-200 employees',
                       '201-500 employees', '501-1000 employees', '1000+ employees'];
  industryOptions = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail',
                    'Manufacturing', 'Other'];
  hiringVolumeOptions = ['1-5 hires/month', '6-10 hires/month', '11-20 hires/month',
                        '20+ hires/month'];
  timeToHireOptions = ['1-2 weeks', '3-4 weeks', '1-2 months', '2+ months'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.calculateProfileCompletion();

    // Update completion on form changes
    this.recruiterForm.valueChanges.subscribe(() => {
      this.calculateProfileCompletion();
    });
  }

  initializeForm(): void {
    this.recruiterForm = this.fb.group({
      // Basic Information
      firstName: [this.recruiterData.firstname || '', [Validators.required, Validators.minLength(2)]],
      lastName: [this.recruiterData.lastname || '', [Validators.required, Validators.minLength(2)]],
      jobTitle: ['', Validators.required],
      yearsExperience: ['', Validators.required],

      // Company Information
      companyName: [this.recruiterData.company || '', Validators.required],
      companySize: ['', Validators.required],
      industry: ['', Validators.required],
      companyDescription: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],

      // Hiring Preferences
      hiringVolume: ['', Validators.required],
      averageTimeToHire: ['', Validators.required],
      roles: this.fb.array([], Validators.required),

      // Contact Information
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      linkedin: [''],
      website: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

    // Add initial role if empty
    if (this.rolesArray.length === 0) {
      this.addRole('Recruiter');
    }
  }

  // Roles Form Array Methods
  get rolesArray(): FormArray {
    return this.recruiterForm.get('roles') as FormArray;
  }

  addRole(role: string): void {
    if (role && role.trim()) {
      this.rolesArray.push(this.fb.control(role.trim()));
      this.rolesArray.markAsTouched();
    }
  }

  removeRole(index: number): void {
    this.rolesArray.removeAt(index);
  }

  // Field validation helper
  isFieldInvalid(field: string): boolean {
    const formField = this.recruiterForm.get(field);
    return formField!.invalid && (formField!.dirty || formField!.touched);
  }

  // Profile Completion Calculation
  calculateProfileCompletion(): void {
    const totalFields = 12; // Total required fields
    let completedFields = 0;
    const formValues = this.recruiterForm.value;

    // Check basic info
    if (formValues.firstName) completedFields++;
    if (formValues.lastName) completedFields++;
    if (formValues.jobTitle) completedFields++;
    if (formValues.yearsExperience) completedFields++;

    // Check company info
    if (formValues.companyName) completedFields++;
    if (formValues.companySize) completedFields++;
    if (formValues.industry) completedFields++;
    if (formValues.companyDescription && formValues.companyDescription.length >= 50) completedFields++;

    // Check hiring preferences
    if (formValues.hiringVolume) completedFields++;
    if (formValues.averageTimeToHire) completedFields++;
    if (this.rolesArray.length > 0) completedFields++;

    // Check contact info
    if (formValues.email) completedFields++;
    if (formValues.website) completedFields++;

    this.profileCompletion = Math.round((completedFields / totalFields) * 100);
  }

  // Form Submission
  onSubmit(): void {
    if (this.recruiterForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.recruiterForm.value);
      this.isSubmitting = false;

      // Show success message
      alert('Profile updated successfully!');
      // this.router.navigate(['/recruiter/dashboard']);
    }, 1500);
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/recruiter/dashboard']);
    }
  }

  // Helper to mark all fields as touched
  private markAllAsTouched(): void {
    Object.values(this.recruiterForm.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(subControl => {
          subControl.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          arrayControl.markAsTouched();
        });
      } else {
        control.markAsTouched();
      }
    });
  }

}
