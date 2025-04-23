import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="registration-container">
      <h2>Register</h2>
      <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            [class.is-invalid]="email.invalid && email.touched"
          />
          <div class="invalid-feedback" *ngIf="email.invalid && email.touched">
            <div *ngIf="email.errors?.['required']">Email is required</div>
            <div *ngIf="email.errors?.['email']">Please enter a valid email</div>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password"
            [class.is-invalid]="password.invalid && password.touched"
          />
          <div class="invalid-feedback" *ngIf="password.invalid && password.touched">
            <div *ngIf="password.errors?.['required']">Password is required</div>
            <div *ngIf="password.errors?.['minlength']">Password must be at least 8 characters</div>
          </div>
        </div>

        <div class="form-group">
          <label>Role</label>
          <div class="role-buttons">
            <button 
              type="button" 
              [class.active]="selectedRole === 'jobseeker'"
              (click)="onRoleSelected('job_seeker')"
            >
              Job Seeker
            </button>
            <button 
              type="button" 
              [class.active]="selectedRole === 'recruiter'"
              (click)="onRoleSelected('recruiter')"
            >
              Recruiter
            </button>
          </div>
          <div class="invalid-feedback" *ngIf="role.invalid && role.touched">
            Please select a role
          </div>
        </div>

        <button type="submit" [disabled]="myForm.invalid">Register</button>
      </form>
    </div>
  `,
  styles: [`
    .registration-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .is-invalid {
      border-color: #dc3545;
    }
    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .role-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .role-buttons button {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }
    .role-buttons button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    button[type="submit"] {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RegistrationPageComponent {
  selectedRole: string = '';

  constructor(private router: Router, private authService: AuthServicesService) {}

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', Validators.required)
  });

  get email() { return this.myForm.get('email')!; }
  get password() { return this.myForm.get('password')!; }
  get role() { return this.myForm.get('role')!; }

  onRoleSelected(role: string) {
    this.selectedRole = role;
    this.myForm.get('role')?.setValue(role);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.myForm.value;

    if (email && password && this.selectedRole) {
      this.authService.register(email, password, this.selectedRole).subscribe({
        next: () => {
          console.log("Registration Successful");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Registration failed:", error);
          alert("Registration failed. Please try again.");
        }
      });
    }
  }
}
