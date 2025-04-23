import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink,FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  loginData = {
    email: '',
    password: ''
  }

  router = inject(Router)
  navigateToSignup() {
    this.router.navigate(['registration-page'])
  }

  myForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService:AuthServicesService) {}

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.token);
          console.log("Login successful", response);
          if (response.user?.user_type === 'admin') {
            this.router.navigate(['admin-dashboard']);
          } else if (response.user?.user_type === 'recruiter') {
            this.router.navigate(['recruiters-dashboard']);
          } else if (response.user?.user_type === 'job_seeker') {
            this.router.navigate(['jobseeker-dashboard']);
          } else {
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.error("Login failed: ", error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
