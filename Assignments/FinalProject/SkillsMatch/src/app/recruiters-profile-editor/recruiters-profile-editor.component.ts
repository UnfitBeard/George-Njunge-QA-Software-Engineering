import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterService } from '../services/recruiter.service';
import { AuthServicesService } from '../auth-services.service';

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
  recruiterData = history.state.recruiterData;
  errorMessage: string = '';

  // Dropdown options
  experienceOptions = ['0-2 years', '3-5 years', '6-10 years', '10+ years'];
  companySizeOptions = ['1-10 employees', '11-50 employees', '51-200 employees',
                       '201-500 employees', '501-1000 employees', '1000+ employees'];
  industryOptions = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail',
                    'Manufacturing', 'Other'];
  hiringVolumeOptions = ['1-5 hires/month', '6-10 hires/month', '11-20 hires/month',
                        '20+ hires/month'];
  timeToHireOptions = ['1-2 weeks', '3-4 weeks', '1-2 months', '2+ months'];
  isFormReady: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recruiterService: RecruiterService,
    private authService: AuthServicesService
  ) {}

  ngOnInit(): void {
    if (!this.recruiterData) {
      console.warn('No recruiter data found in navigation state. Using defaults.');
      this.recruiterData = {};
    }

    this.initializeForm();
    this.calculateProfileCompletion();

    this.recruiterForm.valueChanges.subscribe(() => {
      this.calculateProfileCompletion();
    });

    this.isFormReady = true;
  }

  initializeForm(): void {
    this.recruiterForm = this.fb.group({
      firstName: [this.recruiterData.firstname || '', [Validators.required, Validators.minLength(2)]],
      lastName: [this.recruiterData.lastname || '', [Validators.required, Validators.minLength(2)]],
      jobTitle: ['', Validators.required],
      yearsExperience: ['', Validators.required],
      companyName: [this.recruiterData.company || '', Validators.required],
      companySize: ['', Validators.required],
      industry: ['', Validators.required],
      companyDescription: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      hiringVolume: ['', Validators.required],
      averageTimeToHire: ['', Validators.required],
      roles: this.fb.array([], Validators.required),
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      linkedin: [''],
      website: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

    if (this.rolesArray.length === 0) {
      this.addRole('Recruiter');
    }
  }

  get rolesArray(): FormArray {
    return this.recruiterForm.get('roles') as FormArray;
  }

  addRole(role: string): void {
    this.rolesArray.push(this.fb.control(role));
  }

  removeRole(index: number): void {
    this.rolesArray.removeAt(index);
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.recruiterForm.get(field);
    return formField!.invalid && (formField!.dirty || formField!.touched);
  }

  calculateProfileCompletion(): void {
    const totalFields = 12;
    let completedFields = 0;
    const formValues = this.recruiterForm.value;

    if (formValues.firstName) completedFields++;
    if (formValues.lastName) completedFields++;
    if (formValues.jobTitle) completedFields++;
    if (formValues.yearsExperience) completedFields++;
    if (formValues.companyName) completedFields++;
    if (formValues.companySize) completedFields++;
    if (formValues.industry) completedFields++;
    if (formValues.companyDescription && formValues.companyDescription.length >= 50) completedFields++;
    if (formValues.hiringVolume) completedFields++;
    if (formValues.averageTimeToHire) completedFields++;
    if (this.rolesArray.length > 0) completedFields++;
    if (formValues.email) completedFields++;
    if (formValues.website) completedFields++;

    this.profileCompletion = Math.round((completedFields / totalFields) * 100);
  }

  onSubmit(): void {
    if (this.recruiterForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formData = this.recruiterForm.value;
    console.log('Form data:', formData); // Debug log

    const storedUser = localStorage.getItem('currentUser');
    console.log('Stored user:', storedUser); // Debug log

    if (!storedUser) {
      this.errorMessage = 'User not authenticated';
      this.isSubmitting = false;
      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);
      console.log('Current user:', currentUser); // Debug log

      const recruiterProfile = {
        user_id: currentUser.user_id,
        company_id: currentUser.company_id || 1,
        firstname: formData.firstName,
        lastname: formData.lastName,
        position: formData.jobTitle,
        phone: formData.phone,
        avatar: 'path/to/avatar.png',
        verified: false,
        rating: 0,
        hires: 0,
        hiring_volume: parseInt(formData.hiringVolume.split('-')[0]),
        average_time_to_hire: this.convertTimeToHireToDays(formData.averageTimeToHire),
        specialization: formData.roles[0]
      };

      console.log('Sending recruiter profile:', recruiterProfile); // Debug log

      this.recruiterService.updateProfile(recruiterProfile).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.router.navigate(['/recruiter/dashboard']);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.errorMessage = error.error?.message || 'Failed to update profile. Please try again.';
          this.isSubmitting = false;
        }
      });
    } catch (error) {
      console.error('Error processing user data:', error);
      this.errorMessage = 'Error processing user data';
      this.isSubmitting = false;
    }
  }

  private convertTimeToHireToDays(timeToHire: string): number {
    // Convert time to hire string to number of days
    if (timeToHire.includes('weeks')) {
      const weeks = parseInt(timeToHire.split('-')[0]);
      return weeks * 7;
    } else if (timeToHire.includes('months')) {
      const months = parseInt(timeToHire.split('-')[0]);
      return months * 30;
    }
    return 0;
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/recruiter/dashboard']);
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.recruiterForm.controls).forEach(key => {
      const control = this.recruiterForm.get(key);
      control?.markAsTouched();
    });
  }
}
