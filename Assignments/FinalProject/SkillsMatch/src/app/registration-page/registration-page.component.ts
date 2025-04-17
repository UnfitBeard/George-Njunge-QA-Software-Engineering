import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServicesService } from '../auth-services.service';

@Component({
  selector: 'app-registration-page',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  selectedRole: string = ''

  onRoleSelected(role: string) {
    this.selectedRole = role;
    this.myForm.get('role')?.setValue(role);
    console.log("Selected role set to form:", this.myForm.get('role')?.value); // log it
  }

  constructor(private router: Router, private authService: AuthServicesService) { }

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('',Validators.required)
  })

  onSubmit() {
    if (this.myForm.invalid) {
      console.warn("All fields are required!");
      return;
    }


    const { email, password } = this.myForm.value

    if (email && password && this.selectedRole) {
      this.authService.register(email ,password , this.selectedRole).subscribe(
        response => {
          console.log("Registration Sucessful")
          this.router.navigate(['login'])
        },error => {
          console.log("Registration failed: ", error)
          alert("Registration failed. Please try again.");
        }
      )
      return
    }

  }
  }
