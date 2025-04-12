import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-editor',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css'
})
export class ProfileEditorComponent {
  personalDetailsForm!: FormGroup;
  isSubmitting = false;
  profileCompletion = 0;

  // Sample data for demonstration - replace with your actual data structure
  experienceLevels = ['Beginner (1-2 years)', 'Intermediate (3-5 years)', 'Advanced (5+ years)', 'Expert (8+ years)'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.calculateProfileCompletion();
  }

  initializeForm(): void {
    this.personalDetailsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
      address: this.fb.group({
        location: ['', Validators.required],
        postalAddress: ['']
      }),
      telephone: [''],
      linkedin: [''],
      skills: this.fb.array([this.createSkillGroup()]),
      projects: this.fb.array([]),
      courses: this.fb.array([])
    });

    // Listen to form changes to update completion percentage
    this.personalDetailsForm.valueChanges.subscribe(() => {
      this.calculateProfileCompletion();
    });
  }

  // Skill Form Array Methods
  get skills(): FormArray {
    return this.personalDetailsForm.get('skills') as FormArray;
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({
      skill: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number): void {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  // Project Form Array Methods
  get projects(): FormArray {
    return this.personalDetailsForm.get('projects') as FormArray;
  }

  createProjectGroup(): FormGroup {
    return this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectLink: [''],
      projectDate: ['']
    });
  }

  addProject(): void {
    this.projects.push(this.createProjectGroup());
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  // Course Form Array Methods (if needed)
  get courses(): FormArray {
    return this.personalDetailsForm.get('courses') as FormArray;
  }

  createCourseGroup(): FormGroup {
    return this.fb.group({
      courseName: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseDate: ['', Validators.required]
    });
  }

  addCourse(): void {
    this.courses.push(this.createCourseGroup());
  }

  removeCourse(index: number): void {
    this.courses.removeAt(index);
  }

  // Profile Completion Calculation
  calculateProfileCompletion(): number {
    const totalFields = 8; // Adjust based on your required fields
    let completedFields = 0;
    const formValues = this.personalDetailsForm.value;

    // Check required fields
    if (formValues.firstName) completedFields++;
    if (formValues.lastName) completedFields++;
    if (formValues.description && formValues.description.length >= 100) completedFields++;
    if (formValues.address?.location) completedFields++;

    // Check skills
    if (this.skills.length > 0) {
      const validSkills = this.skills.controls.filter(skill =>
        skill.get('skill')?.value && skill.get('experience')?.value
      ).length;
      completedFields += validSkills / this.skills.length;
    }

    // Calculate percentage
    this.profileCompletion = Math.round((completedFields / totalFields) * 100);
    return this.profileCompletion;
  }

  // Form Submission
  onSubmit(): void {
    if (this.personalDetailsForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.personalDetailsForm.value);
      this.isSubmitting = false;

      // In a real app, you would navigate after successful submission
      // this.router.navigate(['/profile']);

      // Show success message
      alert('Profile updated successfully!');
    }, 1500);
  }

  onCancel(): void {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/profile']);
    }
  }

  // Helper to mark all fields as touched to show validation errors
  private markAllAsTouched(): void {
    Object.values(this.personalDetailsForm.controls).forEach(control => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(subControl => {
          subControl.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            Object.values(arrayControl.controls).forEach(subControl => {
              subControl.markAsTouched();
            });
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control.markAsTouched();
      }
    });
  }
}
